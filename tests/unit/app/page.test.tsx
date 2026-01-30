import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, it, describe } from 'vitest';
import HomePage from '@/app/page';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useRouter } from 'next/navigation';

// Mock useAuth
vi.mock('@/features/auth/hooks/use-auth', () => ({
    useAuth: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

describe('HomePage', () => {
    it('should call signOut and redirect to /login when Sign Out button is clicked', async () => {
        const signOut = vi.fn().mockResolvedValue(undefined);
        const push = vi.fn();

        (useAuth as any).mockReturnValue({
            signOut,
            user: { displayName: 'Test User' },
        });

        (useRouter as any).mockReturnValue({
            push,
        });

        render(<HomePage />);

        const signOutButton = screen.getByText(/Sign Out \/ 로그아웃/i);
        fireEvent.click(signOutButton);

        expect(signOut).toHaveBeenCalled();
        
        // Wait for the async handleSignOut to call router.push
        await waitFor(() => {
            expect(push).toHaveBeenCalledWith('/login');
        });
    });
});
