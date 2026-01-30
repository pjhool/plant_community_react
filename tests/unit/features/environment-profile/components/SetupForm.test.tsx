import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SetupForm } from '@/features/environment-profile/components/SetupForm/SetupForm';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useEnvironment } from '@/features/environment-profile/hooks/use-environment';
import { useRouter } from 'next/navigation';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/features/auth/hooks/use-auth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/features/environment-profile/hooks/use-environment', () => ({
  useEnvironment: vi.fn(),
}));

describe('SetupForm', () => {
  const mockPush = vi.fn();
  const mockSaveProfile = vi.fn();
  const mockSetUser = vi.fn();
  const mockUser = { uid: 'user123', displayName: 'Test User' };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useAuth as any).mockReturnValue({ user: mockUser, setUser: mockSetUser });
    (useEnvironment as any).mockReturnValue({
      saveProfile: mockSaveProfile,
      isSaving: false,
    });
  });

  it('should render step 1 initially and "Next" button should be disabled', () => {
    render(<SetupForm />);

    expect(screen.getByText(/어디에서 식물을 키우시나요/i)).toBeDefined();
    const nextButton = screen.getByRole('button', { name: /다음/i });
    expect(nextButton).toBeDisabled();
  });

  it('should enable "Next" button when a residence type is selected', async () => {
    render(<SetupForm />);

    const apartmentButton = screen.getByRole('button', { name: /아파트/i });
    fireEvent.click(apartmentButton);

    const nextButton = screen.getByRole('button', { name: /다음/i });
    expect(nextButton).not.toBeDisabled();
  });

  it('should navigate through all steps and call saveProfile on completion', async () => {
    render(<SetupForm />);

    // Step 1: Residence
    fireEvent.click(screen.getByRole('button', { name: /아파트/i }));
    fireEvent.click(screen.getByRole('button', { name: /다음/i }));

    // Step 2: Light
    expect(screen.getByText(/빛이 어느 정도 들어오나요/i)).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /남향/i }));
    fireEvent.click(screen.getByRole('button', { name: /다음/i }));

    // Step 3: Experience
    expect(screen.getByText(/식물 키우기 실력은 어느 정도인가요/i)).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /초보/i }));

    const finishButton = screen.getByRole('button', { name: /완료/i });
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(mockSaveProfile).toHaveBeenCalledWith({
        userId: mockUser.uid,
        profile: {
          residenceType: 'APARTMENT',
          lightDirection: 'SOUTH',
          experienceLevel: 'BEGINNER',
        },
      });
      expect(mockPush).toHaveBeenCalledWith('/onboarding/summary');
    });
  });

  it('should show "Saving..." state and disable button when isSaving is true', () => {
    (useEnvironment as any).mockReturnValue({
      saveProfile: mockSaveProfile,
      isSaving: true,
    });

    render(<SetupForm />);

    // In any step, if isSaving is true, the action button shows "Saving..."
    const savingButton = screen.getByRole('button', { name: /저장 중/i });
    expect(savingButton).toBeDefined();
    expect(savingButton).toBeDisabled();
  });

  it('should go back to previous step when "Prev" button is clicked', () => {
    render(<SetupForm />);

    // Move to Step 2
    fireEvent.click(screen.getByRole('button', { name: /아파트/i }));
    fireEvent.click(screen.getByRole('button', { name: /다음/i }));

    expect(screen.getByText(/빛이 어느 정도 들어오나요/i)).toBeDefined();

    // Click Previous
    fireEvent.click(screen.getByRole('button', { name: /이전/i }));

    expect(screen.getByText(/어디에서 식물을 키우시나요/i)).toBeDefined();
  });
});
