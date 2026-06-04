import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeedService } from '@/features/feed/services/feed-service';
import { PostStatus } from '@/features/feed/types/post';
import { db } from '@/core/services/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

// Mock Firebase functions
vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    startAfter: vi.fn(),
    getDocs: vi.fn(),
    Timestamp: {
        now: vi.fn(),
        fromDate: vi.fn(),
    }
}));

vi.mock('@/core/services/firebase', () => ({
    db: {},
}));

describe('FeedService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch environment-based feed', async () => {
        const mockPosts = [
            { id: '1', title: 'Post 1', status: PostStatus.PUBLISHED },
            { id: '2', title: 'Post 2', status: PostStatus.PUBLISHED },
        ];

        const mockSnapshot = {
            docs: mockPosts.map(post => ({
                id: post.id,
                data: () => post,
            })),
            forEach: (callback: any) => mockSnapshot.docs.forEach(callback),
        };

        (getDocs as any).mockResolvedValue(mockSnapshot);

        const result = await FeedService.getEnvironmentProfileFeed({
            residenceType: 'APARTMENT',
            // other environment fields...
        } as any);

        expect(result.posts).toHaveLength(2);
        expect(result.posts[0].id).toBe('1');
        expect(collection).toHaveBeenCalledWith(db, 'posts');
        expect(getDocs).toHaveBeenCalled();
    });

    it('should fetch recent feed when no environment is provided', async () => {
        const mockPosts = [
            { id: '3', title: 'Post 3', status: PostStatus.PUBLISHED },
        ];

        const mockSnapshot = {
            docs: mockPosts.map(post => ({
                id: post.id,
                data: () => post,
            })),
            forEach: (callback: any) => mockSnapshot.docs.forEach(callback),
        };

        (getDocs as any).mockResolvedValue(mockSnapshot);

        const result = await FeedService.getRecentFeed();

        expect(result.posts).toHaveLength(1);
        expect(result.posts[0].id).toBe('3');
    });
});
