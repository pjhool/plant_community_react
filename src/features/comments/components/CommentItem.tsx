import { Comment } from '../types/comment';
import { getEnvironmentTag } from '@/features/environment-profile/utils/labels';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/core/utils/cn';

interface CommentItemProps {
  comment: Comment;
  isAuthor: boolean; // Is the comment author the same as the post author?
}

export function CommentItem({ comment, isAuthor }: CommentItemProps) {
  const { author } = comment;
  const profile = author.profileSnapshot;

  // Convert Firestore Timestamp to Date if necessary
  const createdAt = comment.createdAt?.toDate ? comment.createdAt.toDate() : new Date(comment.createdAt);

  return (
    <div className={cn(
      'flex flex-col gap-2 p-4 rounded-2xl transition-all',
      comment.type === 'CASE_SHARING' ? 'bg-green-50/30 border border-green-100' : 'bg-white'
    )}>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm ring-1 ring-gray-200'>👤</div>
          <div>
            <div className='flex items-center gap-2'>
              <span className='font-bold text-sm text-gray-900'>{author.displayName}</span>
              {isAuthor && (
                <span className='px-1.5 py-0.5 bg-gray-100 text-[10px] text-gray-500 rounded-md font-bold uppercase'>작성자</span>
              )}
              {comment.type === 'CASE_SHARING' && (
                <span className='px-1.5 py-0.5 bg-green-100 text-[10px] text-green-700 rounded-md font-bold uppercase'>사례 공유</span>
              )}
            </div>
            {profile && (
              <div className='text-[10px] text-gray-400 font-medium'>
                {getEnvironmentTag(
                  profile.residenceType || 'OTHER',
                  profile.lightDirection || 'NONE',
                  profile.experienceLevel || 'BEGINNER'
                )}
              </div>
            )}
          </div>
        </div>
        <span className='text-[10px] text-gray-400'>
          {formatDistanceToNow(createdAt, { addSuffix: true, locale: ko })}
        </span>
      </div>

      <div className='text-sm text-gray-700 leading-relaxed pl-11'>
        {comment.content}
      </div>

      <div className='flex items-center gap-4 pl-11 mt-1'>
        <button className='text-[11px] font-bold text-gray-400 hover:text-green-600 transition-colors'>
          👍 {comment.likes > 0 ? comment.likes : '도움돼요'}
        </button>
      </div>
    </div>
  );
}
