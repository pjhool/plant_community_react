import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentService } from '../services/comment-service';
import { Comment } from '../types/comment';

export const useComments = (postId: string) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => CommentService.getComments(postId),
        enabled: !!postId,
    });
};

export const useCommentMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'likes'>) =>
            CommentService.createComment(postId, commentData),
        onSuccess: () => {
            // 게시물 상세 정보와 댓글 목록을 무효화하여 최신 상태 유지
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
    });
};
