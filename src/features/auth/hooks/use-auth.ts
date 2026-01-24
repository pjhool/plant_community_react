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
    const store = useAuthStore();

    useEffect(() => {
        const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                // Determine if we need to fetch profile. Ideally, we optimize this.
                // For now, let's just assume we want fresh data or mapped data.
                try {
                    const user = await AuthService.getUserProfile(firebaseUser.uid) || AuthService.mapFirebaseUserToUser(firebaseUser);
                    store.setUser(user);
                } catch (e: any) {
                    // Fallback to basic info if Firestore fetch fails
                    store.setUser(AuthService.mapFirebaseUserToUser(firebaseUser));
                    console.error("Failed to fetch user profile", e);
                }
            } else {
                store.setUser(null);
            }
            store.setLoading(false);
        });

        return () => unsubscribe();
    }, []); // Empty dependency array ensures this runs once on mount

    return store;
};
