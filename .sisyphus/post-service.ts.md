import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { Post, PostStatus } from '@/features/feed/types/post';
import { StorageService } from '@/core/services/storage';

export const PostService = {
    /**
     * Create a new post with images
     */
    createPost: async (userId: string, postData: any, imageFiles: File[]): Promise<string> => {
        try {
            // 1. Upload images first
            const imageUrls = await StorageService.uploadMultipleImages(userId, imageFiles);
            
            // 2. Prepare post document
            const newPost = {
                ...postData,
                authorId: userId,
                images: imageUrls,
                status: PostStatus.PUBLISHED,
                views: 0,
                likes: 0,
                commentsCount: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            // 3. Save to Firestore
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            return docRef.id;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    /**
     * Hide a post
     */
    hidePost: async (postId: string): Promise<void> => {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, { status: PostStatus.HIDDEN, updatedAt: serverTimestamp() });
    }
};
