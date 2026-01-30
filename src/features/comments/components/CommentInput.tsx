import React, { useState } from 'react';
import { Button } from '@/core/components/Button';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  isLoading?: boolean;
}

export const CommentInput = ({ onSubmit, isLoading }: CommentInputProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-start py-4 border-t mt-4">
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          rows={2}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <Button type="submit" disabled={!content.trim() || isLoading} isLoading={isLoading}>
        Post
      </Button>
    </form>
  );
};
