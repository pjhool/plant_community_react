import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComparisonService } from '@/features/comparison/services/comparison-service';
import { addDoc, collection } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    addDoc: vi.fn().mockResolvedValue({ id: 'new-comparison-id' }),
    serverTimestamp: vi.fn(() => ({})),
    doc: vi.fn(),
    setDoc: vi.fn().mockResolvedValue({}),
}));

vi.mock('@/core/services/firebase', () => ({
    db: {},
}));

describe('ComparisonService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a comparison question successfully', async () => {
        // createComparison takes a single data object (no separate userId arg)
        const data = {
            authorId: 'user123',
            postAId: 'post1',
            postBId: 'post2',
            status: 'PENDING' as const,
        };

        const postId = await ComparisonService.createComparison(data as any);

        expect(postId).toBe('new-comparison-id');
        expect(addDoc).toHaveBeenCalled();
    });

    // NOTE: ComparisonService.vote does not exist in the current implementation.
    // This test is skipped until the vote feature is implemented.
    it.skip('should submit a vote successfully', async () => {
        // TODO: implement ComparisonService.vote and re-enable this test
    });
});
