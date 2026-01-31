import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '@/features/auth/services/auth-service';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

// Mock Firebase
vi.mock('@/core/services/firebase', () => ({
    auth: {},
    db: {}
}));

vi.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
    GoogleAuthProvider: vi.fn(),
    signInWithPopup: vi.fn(),
    updateProfile: vi.fn(),
    serverTimestamp: vi.fn(),
    getAuth: vi.fn(() => ({})),
}));

vi.mock('firebase/firestore', () => ({
    doc: vi.fn(),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
    serverTimestamp: vi.fn(),
}));

describe('AuthService - signInWithEmail', () => {
    const mockEmail = 'jhpark0509@gmail.com';
    const mockPassword = '123456';
    const mockUid = 'test-uid';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return user profile on successful sign in', async () => {
        const mockUserCredential = {
            user: { uid: mockUid, email: mockEmail }
        };
        vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce(mockUserCredential as any);

        const mockProfile = {
            uid: mockUid,
            email: mockEmail,
            displayName: 'Test User'
        };
        vi.mocked(getDoc).mockResolvedValueOnce({
            exists: () => true,
            data: () => mockProfile
        } as any);

        const result = await AuthService.signInWithEmail(mockEmail, mockPassword);
        expect(result).toEqual(mockProfile);
        expect(signInWithEmailAndPassword).toHaveBeenCalled();
    });

    it('should throw user-friendly error on invalid credentials', async () => {
        const error = { code: 'auth/invalid-credential' };
        vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(error);

        await expect(AuthService.signInWithEmail(mockEmail, mockPassword))
            .rejects.toThrow("Invalid email or password. Please check your credentials.");
    });

    it('should throw user-friendly error on too many requests', async () => {
        const error = { code: 'auth/too-many-requests' };
        vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(error);

        await expect(AuthService.signInWithEmail(mockEmail, mockPassword))
            .rejects.toThrow("Too many failed login attempts. Please try again later.");
    });
});
