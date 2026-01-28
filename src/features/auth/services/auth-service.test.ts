import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// This is a smoke test to ensure the auth mocks are working correctly
// and to satisfy Task 2.1 requirements for setting up the mock service.
describe('Auth Service Mocks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should mock getAuth correctly', () => {
        const auth = getAuth();
        expect(auth).toBeDefined();
        expect(auth.currentUser).toBeNull();
    });

    it('should mock signInWithEmailAndPassword', async () => {
        const mockUser = { email: 'test@example.com' };
        vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
            user: mockUser,
        } as any);

        const result = await signInWithEmailAndPassword({} as any, 'test@example.com', 'password');
        expect(result.user.email).toBe('test@example.com');
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'password');
    });

    it('should mock signOut', async () => {
        await signOut({} as any);
        expect(signOut).toHaveBeenCalled();
    });
});
