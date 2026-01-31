import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { ComparisonPost, ComparisonVote } from '../types/comparison';
import { PostStatus } from '@/features/feed/types/post';

export const ComparisonService = {
    /**
     * Create a comparison question
     */
    createComparison: async (userId: string, data: any): Promise<string> => {
        const newPost = {
            ...data,
            authorId: userId,
            status: PostStatus.PUBLISHED,
            views: 0,
            likes: 0,
            commentsCount: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, 'posts'), newPost);
        return docRef.id;
    },

    /**
     * Vote on an option
     */
    vote: async (voteData: Omit<ComparisonVote, 'votedAt'>): Promise<void> => {
        const voteRef = doc(db, 'votes', `${voteData.postId}_${voteData.userId}`);
        await setDoc(voteRef, {
            ...voteData,
            votedAt: serverTimestamp(),
        });
    }
};
