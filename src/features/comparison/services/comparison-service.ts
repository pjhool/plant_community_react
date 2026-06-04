import { 
    collection, 
    query, 
    where, 
    getDocs, 
    addDoc,
    serverTimestamp,
    doc,
    getDoc
} from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { Post, PostType } from '../../feed/types/post';
import { Comparison } from '../types/comparison';

export const ComparisonService = {
    /**
     * Fetch failure posts for a specific user to allow selection
     */
    getUserFailurePosts: async (userId: string): Promise<Post[]> => {
        try {
            const q = query(
                collection(db, 'posts'),
                where('userId', '==', userId),
                where('type', '==', PostType.FAILURE)
            );
            
            const querySnapshot = await getDocs(q);
            const posts: Post[] = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() } as Post);
            });
            
            return posts;
        } catch (error) {
            console.error('Error fetching failure posts:', error);
            throw error;
        }
    },

    /**
     * Create a comparison request
     */
    createComparison: async (data: Omit<Comparison, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
        try {
            const docRef = await addDoc(collection(db, 'comparisons'), {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            return docRef.id;
        } catch (error) {
            console.error('Error creating comparison:', error);
            throw error;
        }
    }
};
