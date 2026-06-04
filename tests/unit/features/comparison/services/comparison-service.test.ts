import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComparisonService } from '@/features/comparison/services/comparison-service';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

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
        const userId = 'user123';
        const data = { optionA: { label: 'A' }, optionB: { label: 'B' } };

        const postId = await ComparisonService.createComparison(userId, data);

        expect(postId).toBe('new-comparison-id');
        expect(addDoc).toHaveBeenCalled();
    });

    it('should submit a vote successfully', async () => {
        const voteData = { postId: 'post1', userId: 'user1', selectedOption: 'A' as const };

        await ComparisonService.vote(voteData);

        expect(setDoc).toHaveBeenCalled();
    });
});
