import { 
    collection, 
    query, 
    where, 
    orderBy, 
    getDocs, 
    addDoc,
    serverTimestamp,
    increment,
    doc,
    updateDoc
} from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { Comment } from '../types/comment';

export const CommentService = {
    /**
     * Fetch comments for a specific post
     */
    getComments: async (postId: string): Promise<Comment[]> => {
        try {
            const q = query(
                collection(db, 'comments'),
                where('postId', '==', postId),
                orderBy('createdAt', 'asc')
            );
            
            const querySnapshot = await getDocs(q);
            const comments: Comment[] = [];
            querySnapshot.forEach((doc) => {
                comments.push({ id: doc.id, ...doc.data() } as Comment);
            });
            
            return comments;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    },

    /**
     * Add a comment to a post
     */
    addComment: async (data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'likes'>): Promise<string> => {
        try {
            // 1. Add comment document
            const docRef = await addDoc(collection(db, 'comments'), {
                ...data,
                likes: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            // 2. Increment comment count on the post
            const postRef = doc(db, 'posts', data.postId);
            await updateDoc(postRef, {
                commentsCount: increment(1)
            });

            return docRef.id;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }
};
