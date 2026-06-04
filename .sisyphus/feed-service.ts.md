import { 
    collection, 
    query, 
    where, 
    orderBy, 
    limit, 
    startAfter, 
    getDocs, 
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { Post, PostStatus } from '../types/post';
import { Environment } from '@/features/environment-profile/types/environment';

const POSTS_PER_PAGE = 10;

export const FeedService = {
    /**
     * Get feed based on user environment
     */
    getEnvironmentFeed: async (
        userEnv: Environment, 
        lastDoc?: QueryDocumentSnapshot<DocumentData>
    ): Promise<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> => {
        try {
            // Simplified query for now: Filter by residenceType and sort by createdAt
            // Complex queries require composite indexes which we'll optimize in Task 4.9
            let q = query(
                collection(db, 'posts'),
                where('status', '==', PostStatus.PUBLISHED),
                where('environment.residenceType', '==', userEnv.residenceType),
                orderBy('createdAt', 'desc'),
                limit(POSTS_PER_PAGE)
            );

            if (lastDoc) {
                q = query(q, startAfter(lastDoc));
            }

            const querySnapshot = await getDocs(q);
            const posts: Post[] = [];

            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() } as Post);
            });

            return {
                posts,
                lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
            };
        } catch (error) {
            console.error("Error fetching feed:", error);
            throw error;
        }
    },

    /**
     * Get recent posts (fallback or general feed)
     */
    getRecentFeed: async (
        lastDoc?: QueryDocumentSnapshot<DocumentData>
    ): Promise<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> => {
        try {
            let q = query(
                collection(db, 'posts'),
                where('status', '==', PostStatus.PUBLISHED),
                orderBy('createdAt', 'desc'),
                limit(POSTS_PER_PAGE)
            );

            if (lastDoc) {
                q = query(q, startAfter(lastDoc));
            }

            const querySnapshot = await getDocs(q);
            const posts: Post[] = [];

            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() } as Post);
            });

            return {
                posts,
                lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
            };
        } catch (error) {
            console.error("Error fetching recent feed:", error);
            throw error;
        }
    }
};
