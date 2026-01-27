import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './use-auth';
import { AuthService } from '../services/auth-service';

vi.mock('../services/auth-service', () => ({
    AuthService: {
        onAuthStateChanged: vi.fn(),
        getUserProfile: vi.fn(),
        mapFirebaseUserToUser: vi.fn(),
    },
}));

describe('useAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
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
        const mockProfile = { uid: '123', email: 'test@test.com', displayName: 'Test User' };

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
