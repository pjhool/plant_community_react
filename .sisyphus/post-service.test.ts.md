import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PostService } from '@/features/post/services/post-service';
import { StorageService } from '@/core/services/storage';
import { addDoc, collection } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    addDoc: vi.fn().mockResolvedValue({ id: 'new-post-id' }),
    serverTimestamp: vi.fn(() => ({})),
    doc: vi.fn(),
    updateDoc: vi.fn(),
}));

vi.mock('@/core/services/firebase', () => ({
    db: {},
}));

vi.mock('@/core/services/storage', () => ({
    StorageService: {
        uploadMultipleImages: vi.fn().mockResolvedValue(['url1', 'url2']),
    }
}));

describe('PostService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a post with images successfully', async () => {
        const userId = 'user123';
        const postData = { title: 'Test Post', content: 'Test Content' };
        const images = [new File([], 'img1.jpg')];

        const postId = await PostService.createPost(userId, postData, images);

        expect(postId).toBe('new-post-id');
        expect(StorageService.uploadMultipleImages).toHaveBeenCalledWith(userId, images);
        expect(addDoc).toHaveBeenCalled();
    });
});
