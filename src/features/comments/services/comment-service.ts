import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    orderBy,
    getDocs,
    doc,
    runTransaction,
    Timestamp
} from 'firebase/firestore';
import { db } from '@/core/services/firebase';
import { Comment } from '../types/comment';

export const CommentService = {
    /**
     * 댓글 작성 (트랜잭션 사용: 댓글 추가 + 게시물 댓글 수 증가)
     */
    createComment: async (
        postId: string,
        commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'likes'>
    ): Promise<string> => {
        const postRef = doc(db, 'posts', postId);
        const commentsRef = collection(db, 'comments');
        const newCommentRef = doc(commentsRef);

        try {
            await runTransaction(db, async (transaction) => {
                const postDoc = await transaction.get(postRef);
                if (!postDoc.exists()) {
                    throw new Error('Post does not exist');
                }

                // 1. 댓글 추가
                transaction.set(newCommentRef, {
                    ...commentData,
                    postId,
                    likes: 0,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });

                // 2. 게시물 댓글 수 업데이트
                const currentCount = postDoc.data().commentsCount || 0;
                transaction.update(postRef, {
                    commentsCount: currentCount + 1,
                    updatedAt: serverTimestamp(),
                });
            });

            return newCommentRef.id;
        } catch (error) {
            console.error('Error creating comment with transaction:', error);
            throw error;
        }
    },

    /**
     * 특정 게시물의 댓글 목록 조회
     */
    getComments: async (postId: string): Promise<Comment[]> => {
        try {
            const commentsRef = collection(db, 'comments');
            const q = query(
                commentsRef,
                where('postId', '==', postId),
                orderBy('createdAt', 'asc') // 기본은 생성순, 이후 클라이언트 정렬 적용 가능
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Comment[];
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }
};
