import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EnvironmentService } from './environment-service';
import { getDoc, setDoc } from 'firebase/firestore';

vi.mock('@/core/services/firebase', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
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
    it('should save profile with timestamps', async () => {
      await EnvironmentService.saveProfile(mockUserId, mockProfile);
      expect(setDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          userId: mockUserId,
          residenceType: 'APARTMENT',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });
  });
});
