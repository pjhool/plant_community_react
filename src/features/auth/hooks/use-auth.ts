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
        const { isInitialized, setInitialized, setUser, setLoading } = useAuthStore.getState();
        if (isInitialized) return;
        setInitialized(true);

        const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userProfile = await AuthService.getUserProfile(firebaseUser.uid) || AuthService.mapFirebaseUserToUser(firebaseUser);
                    setUser(userProfile);
                } catch (e: any) {
                    setUser(AuthService.mapFirebaseUserToUser(firebaseUser));
                    console.error("Failed to fetch user profile", e);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
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
