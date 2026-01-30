import React from 'react';
import { Comment } from '../types/comment';
import { format } from 'date-fns';
import { cn } from '@/core/utils/cn';

interface CommentItemProps {
  comment: Comment;
  isAuthor?: boolean;
}

export const CommentItem = ({ comment, isAuthor }: CommentItemProps) => {
  return (
    <div className="flex gap-3 py-4">
      <div className="w-8 h-8 rounded-full bg-muted shrink-0 overflow-hidden">
        {comment.author.photoURL && <img src={comment.author.photoURL} alt="" className="w-full h-full object-cover" />}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{comment.author.displayName}</span>
          {isAuthor && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">Author</span>}
          <span className="text-xs text-muted-foreground">
            {comment.createdAt?.seconds ? format(new Date(comment.createdAt.seconds * 1000), 'MMM d, HH:mm') : 'Just now'}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{comment.content}</p>
        <div className="flex items-center gap-4 pt-1">
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Like {comment.likes > 0 && `(${comment.likes})`}</button>
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Reply</button>
        </div>
      </div>
    </div>
  );
};
