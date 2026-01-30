import { create } from 'zustand';
import { AuthState } from '../types/user';
import { AuthService } from '../services/auth-service';
import { useEffect } from 'react';

interface AuthStore extends AuthState {
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setUser: (user: AuthState['user']) => void;
    signOut: () => Promise<void>;
    isInitialized: boolean;
    setInitialized: (val: boolean) => void;
    reset: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    error: null,
    isInitialized: false,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setUser: (user) => set({ user }),
    setInitialized: (val) => set({ isInitialized: val }),
    reset: () => set({ user: null, isLoading: true, error: null, isInitialized: false }),
    signOut: async () => {
        set({ isLoading: true });
        try {
            await AuthService.signOut();
            set({ user: null, error: null });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export const useAuth = () => {
    const user = useAuthStore(state => state.user);
    const isLoading = useAuthStore(state => state.isLoading);
    const error = useAuthStore(state => state.error);
    const signOut = useAuthStore(state => state.signOut);

    useEffect(() => {
        const { setUser, setLoading } = useAuthStore.getState();

        const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Add timeout to prevent hanging if Firestore is unreachable
                    const timeoutPromise = new Promise<null>((_, reject) =>
                        setTimeout(() => reject(new Error('Firestore timeout')), 5000)
                    );

                    const profilePromise = AuthService.getUserProfile(firebaseUser.uid);

                    // Race between fetch and timeout
                    const userProfile = await Promise.race([profilePromise, timeoutPromise])
                        || AuthService.mapFirebaseUserToUser(firebaseUser);

                    setUser(userProfile);
                } catch (e: any) {
                    console.warn("Firestore access timed out, using basic auth profile.", e.message);
                    setUser(AuthService.mapFirebaseUserToUser(firebaseUser));
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        user,
        isLoading,
        error,
        signOut,
        // Expose actions if needed
        setUser: useAuthStore.getState().setUser,
        setError: useAuthStore.getState().setError,
        setLoading: useAuthStore.getState().setLoading,
        reset: useAuthStore.getState().reset,
    };
};
