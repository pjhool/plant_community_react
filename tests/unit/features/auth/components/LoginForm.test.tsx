import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';
import { AuthService } from '@/features/auth/services/auth-service';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

vi.mock('@/features/auth/services/auth-service', () => ({
    AuthService: {
        signInWithEmail: vi.fn(),
    },
}));

vi.mock('@/features/auth/hooks/use-auth', () => ({
    useAuth: vi.fn(),
}));

describe('LoginForm', () => {
    const mockPush = vi.fn();
    const mockSetError = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as any).mockReturnValue({ push: mockPush });
        (useAuth as any).mockReturnValue({ setError: mockSetError, error: null });
    });

    it('should render login form correctly', () => {
        render(<LoginForm />);
        expect(screen.getByLabelText(/email/i)).toBeDefined();
        expect(screen.getByLabelText(/password/i)).toBeDefined();
        expect(screen.getByRole('button', { name: /log in/i })).toBeDefined();
    });

    it('should show validation errors for empty fields', async () => {
        render(<LoginForm />);
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => {
            expect(screen.getByText(/invalid email address/i)).toBeDefined();
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeDefined();
        });
    });

    it('should call AuthService.signInWithEmail on valid submission', async () => {
        vi.mocked(AuthService.signInWithEmail).mockResolvedValueOnce({} as any);
        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jhpark0509@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => {
            expect(AuthService.signInWithEmail).toHaveBeenCalledWith('jhpark0509@gmail.com', '123456');
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('should display error message on login failure', async () => {
        const errorMessage = "Invalid email or password. Please check your credentials.";
        vi.mocked(AuthService.signInWithEmail).mockRejectedValueOnce(new Error(errorMessage));

        // Re-mock useAuth to return the error state after submission
        (useAuth as any).mockReturnValue({ setError: mockSetError, error: errorMessage });

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jhpark0509@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeDefined();
        });
    });
});
