import { create } from 'zustand';
import { AuthState } from '../types/user';
import { AuthService } from '../services/auth-service';
import { useEffect } from 'react';

interface AuthStore extends AuthState {
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setUser: (user: AuthState['user']) => void;
    signOut: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setUser: (user) => set({ user }),
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

    // Actions are stable in Zustand
    const setUser = useAuthStore(state => state.setUser);
    const setLoading = useAuthStore(state => state.setLoading);
    const setError = useAuthStore(state => state.setError);
    const signOut = useAuthStore(state => state.signOut);

    useEffect(() => {
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
    }, [setUser, setLoading]); // Use stable action references

    return {
        user,
        isLoading,
        error,
        setUser,
        setLoading,
        setError,
        signOut
    };
};
