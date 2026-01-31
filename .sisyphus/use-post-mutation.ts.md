import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostService } from '../services/post-service';
import { useAuth } from '@/features/auth/hooks/use-auth';

export const usePostMutation = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async ({ postData, images }: { postData: any, images: File[] }) => {
            if (!user) throw new Error('Authentication required');
            return PostService.createPost(user.uid, postData, images);
        },
        onSuccess: () => {
            // Invalidate feed to show new post
            queryClient.invalidateQueries({ queryKey: ['feed'] });
        },
    });

    return {
        createPost: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        error: createMutation.error,
    };
};
