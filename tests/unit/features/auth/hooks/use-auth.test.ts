import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { AuthService } from '@/features/auth/services/auth-service';

vi.mock('@/features/auth/services/auth-service', () => ({
    AuthService: {
        onAuthStateChanged: vi.fn(() => () => { }),
        getUserProfile: vi.fn(),
        mapFirebaseUserToUser: vi.fn(),
    },
}));

describe('useAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Assuming we can access the hook's result to call reset, 
        // but better to mock or call the store directly if possible.
        // However, useAuth returns the store functions.
        const { result } = renderHook(() => useAuth());
        result.current.reset();
    });

    it('should initialize with loading state', async () => {
        vi.mocked(AuthService.onAuthStateChanged).mockImplementation((cb: any) => {
            // Don't call cb immediately to simulate loading
            return () => { };
        });

        const { result } = renderHook(() => useAuth());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.user).toBe(null);
    });

    it('should update state when user is authenticated', async () => {
        const mockFirebaseUser = { uid: '123', email: 'test@test.com' };
        const mockProfile: any = {
            uid: '123',
            email: 'test@test.com',
            displayName: 'Test User',
            photoURL: null,
            bio: '',
            createdAt: new Date() as any,
            updatedAt: new Date() as any,
        };

        vi.mocked(AuthService.onAuthStateChanged).mockImplementation((cb: any) => {
            cb(mockFirebaseUser);
            return () => { };
        });

        vi.mocked(AuthService.getUserProfile).mockResolvedValue(mockProfile);

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.user).toEqual(mockProfile);
        });
    });

    it('should set user to null when unauthenticated', async () => {
        vi.mocked(AuthService.onAuthStateChanged).mockImplementation((cb: any) => {
            cb(null);
            return () => { };
        });

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.user).toBe(null);
        });
    });

    it('should not cause infinite loop on mount', async () => {
        const spy = vi.spyOn(AuthService, 'onAuthStateChanged');

        const { rerender } = renderHook(() => useAuth());

        // Rerender manually to check if effect runs again
        rerender();
        rerender();

        // The effect should only run once on mount because setUser and setLoading are stable
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
