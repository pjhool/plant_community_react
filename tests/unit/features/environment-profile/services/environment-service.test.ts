import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EnvironmentService } from '@/features/environment-profile/services/environment-service';
import { getDoc, writeBatch } from 'firebase/firestore';

vi.mock('@/core/services/firebase', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  writeBatch: vi.fn(() => ({
    set: vi.fn(),
    update: vi.fn(),
    commit: vi.fn().mockResolvedValue(undefined),
  })),
  serverTimestamp: vi.fn(),
}));

describe('EnvironmentService', () => {
  const mockUserId = 'user123';
  const mockProfile = {
    residenceType: 'APARTMENT',
    lightDirection: 'SOUTH',
    experienceLevel: 'BEGINNER',
  } as const;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return profile if it exists', async () => {
      const mockData = { ...mockProfile, userId: mockUserId };
      (getDoc as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockData,
      });

      const result = await EnvironmentService.getProfile(mockUserId);
      expect(result).toEqual(mockData);
    });

    it('should return null if profile does not exist', async () => {
      (getDoc as any).mockResolvedValueOnce({
        exists: () => false,
      });

      const result = await EnvironmentService.getProfile(mockUserId);
      expect(result).toBeNull();
    });
  });

  describe('saveProfile', () => {
    it('should save profile and update user onboarding status using batch', async () => {
      const mockBatch = {
        set: vi.fn(),
        update: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined),
      };
      vi.mocked(writeBatch).mockReturnValue(mockBatch as any);

      await EnvironmentService.saveProfile(mockUserId, mockProfile);

      // Verify writeBatch was called
      expect(writeBatch).toHaveBeenCalled();

      // Verify environment data save via batch.set
      expect(mockBatch.set).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          userId: mockUserId,
          residenceType: 'APARTMENT',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );

      // Verify user onboarding status update via batch.set (with merge)
      expect(mockBatch.set).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({ isOnboarded: true }),
        { merge: true }
      );

      // Verify batch.commit was called
      expect(mockBatch.commit).toHaveBeenCalled();
    });
  });

});
