import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './auth-service';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, getDoc } from 'firebase/firestore';

// Mocks are already set up in src/test/setup.ts, but we might need to spy on them or mock return values specifics here
// Since setup.ts uses vi.mock, we can access the mocked functions directly to assert calls.

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should sign up user and create firestore document', async () => {
        const mockUser = {
            uid: 'test-uid',
            email: 'test@example.com',
        };

        vi.mocked(createUserWithEmailAndPassword).mockResolvedValue({
            user: mockUser,
        } as any);

        const displayName = 'Test User';
        const hashedPassword = 'password';

        const user = await AuthService.signUpWithEmail('test@example.com', 'password', displayName);

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password');
        // Check if setDoc was called to create user profile
        expect(setDoc).toHaveBeenCalled();
        expect(user.displayName).toBe(displayName);
        expect(user.email).toBe('test@example.com');
    });

    it('should sign in user and fetch profile', async () => {
        const mockUser = {
            uid: 'test-uid',
            email: 'test@example.com',
        };

        vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
            user: mockUser,
        } as any);

        // Mock getDoc to return a user profile
        vi.mocked(getDoc).mockResolvedValue({
            exists: () => true,
            data: () => ({
                uid: 'test-uid',
                email: 'test@example.com',
                displayName: 'Fetched User',
            })
        } as any);

        const user = await AuthService.signInWithEmail('test@example.com', 'password');

        expect(signInWithEmailAndPassword).toHaveBeenCalled();
        expect(getDoc).toHaveBeenCalled();
        expect(user.displayName).toBe('Fetched User');
    });

    it('should sign out', async () => {
        await AuthService.signOut();
        expect(signOut).toHaveBeenCalled();
    });

});
