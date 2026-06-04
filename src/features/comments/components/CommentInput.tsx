import { useState } from 'react';
import { Button } from '@/core/components/Button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useCommentMutation } from '../hooks/use-comments';
import { useEnvironmentStore } from '@/features/environment-profile/stores/useEnvironmentStore';
import { cn } from '@/core/utils/cn';

interface CommentInputProps {
  postId: string;
}

export function CommentInput({ postId }: CommentInputProps) {
  const { user } = useAuth();
  const { profile } = useEnvironmentStore();
  const [content, setContent] = useState('');
  const [isCaseSharing, setIsCaseSharing] = useState(false);
  const mutation = useCommentMutation(postId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim() || mutation.isPending) return;

    try {
      await mutation.mutateAsync({
        postId,
        authorId: user.uid,
        author: {
          displayName: user.displayName || '익명 집사',
          photoURL: user.photoURL || undefined,
          profileSnapshot: profile || undefined,
        },
        content: content.trim(),
        type: isCaseSharing ? 'CASE_SHARING' : 'NORMAL',
      });
      setContent('');
      setIsCaseSharing(false);
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (!user) {
    return (
      <div className='bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-500 border border-dashed'>
        로그인 후 댓글을 남길 수 있습니다.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div className='relative'>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='사례 중심의 따뜻한 조언을 남겨주세요.'
          className='w-full min-h-[100px] p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none text-sm'
        />

        <div className='flex items-center justify-between mt-2'>
          <button
            type='button'
            onClick={() => setIsCaseSharing(!isCaseSharing)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border',
              isCaseSharing
                ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
                : 'bg-white border-gray-200 text-gray-400'
            )}
          >
            <span>{isCaseSharing ? '✅' : '⚪'}</span>
            사례 공유 (동일 환경 경험)
          </button>

          <Button
            type='submit'
            disabled={!content.trim() || mutation.isPending}
            className='px-6 h-9 rounded-lg font-bold bg-green-600 hover:bg-green-700'
          >
            {mutation.isPending ? '게시 중...' : '게시'}
          </Button>
        </div>
      </div>
    </form>
  );
}
