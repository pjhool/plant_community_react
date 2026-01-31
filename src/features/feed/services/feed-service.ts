import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    DocumentData,
    QueryDocumentSnapshot,
    QueryConstraint
} from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { Post, PostStatus, PostFilter } from '../types/post';
import { EnvironmentProfile } from '@/features/environment-profile/types/environment';
import { AuthService } from '@/features/auth/services/auth-service';

const POSTS_PER_PAGE = 10;

export const FeedService = {
    /**
     * Get feed with optional filters
     */
    getFeed: async (
        filter: PostFilter = {},
        lastDoc?: QueryDocumentSnapshot<DocumentData>
    ): Promise<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> => {
        try {
            const constraints: QueryConstraint[] = [
                where('status', '==', PostStatus.PUBLISHED),
                orderBy('createdAt', 'desc'),
                limit(POSTS_PER_PAGE)
            ];

            if (filter.type) {
                constraints.push(where('type', '==', filter.type));
            }
            if (filter.residenceType) {
                constraints.push(where('environment.residenceType', '==', filter.residenceType));
            }
            if (filter.lightDirection) {
                constraints.push(where('environment.lightDirection', '==', filter.lightDirection));
            }
            if (filter.experienceLevel) {
                constraints.push(where('environment.experienceLevel', '==', filter.experienceLevel));
            }
            if (filter.userId) {
                constraints.push(where('authorId', '==', filter.userId));
            }

            if (lastDoc) {
                constraints.push(startAfter(lastDoc));
            }

            const q = query(collection(db, 'posts'), ...constraints);
            const querySnapshot = await getDocs(q);
            const posts: Post[] = [];

            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() } as Post);
            });

            // Join Author Data
            const authorIds = Array.from(new Set(posts.map(p => p.authorId)));
            const authorMap = new Map();

            await Promise.all(authorIds.map(async (id) => {
                const profile = await AuthService.getUserProfile(id);
                if (profile) authorMap.set(id, profile);
            }));

            const joinedPosts = posts.map(post => ({
                ...post,
                author: authorMap.get(post.authorId)
            }));

            return {
                posts: joinedPosts,
                lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
            };
        } catch (error) {
            console.error('Error fetching feed:', error);
            throw error;
        }
    },

    /**
     * Get feed based on user environment
     */
    getEnvironmentProfileFeed: async (
        userEnv: EnvironmentProfile,
        lastDoc?: QueryDocumentSnapshot<DocumentData>
    ): Promise<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> => {
        return FeedService.getFeed({
            residenceType: userEnv.residenceType,
            lightDirection: userEnv.lightDirection,
            experienceLevel: userEnv.experienceLevel
        }, lastDoc);
    },

    /**
     * Get recent posts (fallback or general feed)
     */
    getRecentFeed: async (
        lastDoc?: QueryDocumentSnapshot<DocumentData>
    ): Promise<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> => {
        return FeedService.getFeed({}, lastDoc);
    }
};
