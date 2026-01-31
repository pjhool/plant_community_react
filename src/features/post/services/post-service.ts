import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { Post, PostType } from '../../feed/types/post';
import { StorageService } from '@/core/services/storage';

export const PostService = {
    /**
     * Create a new post with optional images
     */
    createPost: async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>, imageFiles: File[]): Promise<string> => {
        try {
            // 1. Create document initial draft
            const postsRef = collection(db, 'posts');
            const docRef = await addDoc(postsRef, {
                ...postData,
                images: [], // Placeholder
                likes: 0,
                views: 0,
                commentsCount: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            // 2. Upload images if any
            let imageUrls: string[] = [];
            if (imageFiles.length > 0) {
                imageUrls = await StorageService.uploadImages(imageFiles, `posts/${docRef.id}`);
                
                // 3. Update document with image URLs
                await updateDoc(doc(db, 'posts', docRef.id), {
                    images: imageUrls,
                });
            }

            return docRef.id;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }
};
