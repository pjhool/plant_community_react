import { useComments } from '../hooks/use-comments';
import { CommentInput } from './CommentInput';
import { CommentItem } from './CommentItem';
import { Loading } from '@/core/components/Loading';
import { Post } from '../../feed/types/post';
import { useMemo } from 'react';

interface CommentSectionProps {
    post: Post;
}

export function CommentSection({ post }: CommentSectionProps) {
    const { data: comments, isLoading, error } = useComments(post.id);

    // 정렬 알고리즘 적용
    const sortedComments = useMemo(() => {
        if (!comments) return [];

        return [...comments].sort((a, b) => {
            // 1. 환경 일치 점수 계산 (거주형태, 채광방향 일치 시 가중치)
            const getScore = (comment: typeof a) => {
                let score = 0;
                const profile = comment.author.profileSnapshot;
                if (profile) {
                    if (profile.residenceType === post.environment.residenceType) score += 2;
                    if (profile.lightDirection === post.environment.lightDirection) score += 2;
                }
                if (comment.type === 'CASE_SHARING') score += 1;
                return score;
            };

            const scoreA = getScore(a);
            const scoreB = getScore(b);

            if (scoreA !== scoreB) return scoreB - scoreA;

            // 2. 좋아요 순 (likes는 현재 0이 기본이나 확장성 고려)
            if (a.likes !== b.likes) return b.likes - a.likes;

            // 3. 최신순 (이미 getComments에서 정렬되어 올 수 있으나 확실히 함)
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
            return dateB - dateA;
        });
    }, [comments, post.environment]);

    if (isLoading) return <div className='flex justify-center py-10'><Loading size='sm' /></div>;
    if (error) return <div className='text-center py-10 text-red-500 text-sm'>댓글을 불러오지 못했습니다.</div>;

    return (
        <div className='space-y-8'>
            <div className='border-t border-gray-100 pt-8'>
                <h3 className='font-bold text-lg mb-6 flex items-center gap-2'>
                    💬 댓글
                    <span className='bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs'>
                        {comments?.length || 0}
                    </span>
                </h3>

                <CommentInput postId={post.id} />
            </div>

            <div className='space-y-4'>
                {sortedComments.length > 0 ? (
                    sortedComments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            isAuthor={comment.authorId === post.authorId}
                        />
                    ))
                ) : (
                    <div className='bg-gray-50 rounded-2xl p-10 text-center'>
                        <p className='text-sm text-gray-400 leading-relaxed font-medium'>
                            아직 조언이 도착하지 않았어요.<br />
                            동일한 환경의 집사들에게 첫 번째 사례를 들려주세요!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
