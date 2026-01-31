import React from 'react';
import Image from 'next/image';
import { Post } from '../../feed/types/post';
import { cn } from '@/core/utils/cn';

interface ComparisonSelectionProps {
  posts: Post[];
  selectedIds: string[];
  onSelect: (postId: string) => void;
}

export const ComparisonSelection = ({ posts, selectedIds, onSelect }: ComparisonSelectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
      {posts.map((post) => {
        const isSelected = selectedIds.includes(post.id);
        return (
          <div
            key={post.id}
            onClick={() => onSelect(post.id)}
            className={cn(
              "p-3 rounded-lg border-2 cursor-pointer transition-all flex gap-3",
              isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-muted hover:border-muted-foreground/20 bg-card"
            )}
          >
            <div className="w-16 h-16 rounded bg-muted overflow-hidden shrink-0 relative">
              {post.images[0] && (
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{post.title || 'Untitled Failure'}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
            </div>
          </div>
        );
      })}
      {posts.length === 0 && (
        <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
          No failure posts found. You need to create failure posts before you can compare them.
        </div>
      )}
    </div>
  );
};
