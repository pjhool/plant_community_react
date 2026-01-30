import React, { useState } from 'react';
import { Post } from '../../feed/types/post';
import { ComparisonSelection } from './ComparisonSelection';
import { Button } from '@/core/components/Button';

interface ComparisonFormProps {
  userFailurePosts: Post[];
  situationPost: Post;
  onSubmit: (title: string, description: string, postIds: string[]) => void;
}

export const ComparisonForm = ({ userFailurePosts, situationPost, onSubmit }: ComparisonFormProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 2) {
      setSelectedIds([...selectedIds, id]);
    } else {
      alert('You can only select up to 2 posts to compare.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length !== 2) {
      alert('Please select exactly 2 failure posts to compare.');
      return;
    }
    onSubmit(title, description, selectedIds);
  };

  return (
    <form onSubmit={handleFormSubmit} className='space-y-8'>
      <div className='space-y-4'>
        <label className='text-lg font-bold'>1. Select 2 failure cases to compare</label>
        <p className='text-sm text-muted-foreground italic'>Which of your previous failures should the community look at?</p>
        <ComparisonSelection 
          posts={userFailurePosts} 
          selectedIds={selectedIds} 
          onSelect={toggleSelect} 
        />
        <p className='text-xs text-muted-foreground'>{selectedIds.length}/2 selected</p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Comparison Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            placeholder='e.g., Which failure matches my current issue?'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Question for the Community</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            placeholder='Explain why you are comparing these two cases...'
          />
        </div>
      </div>

      <Button type='submit' className='w-full' size='lg' disabled={selectedIds.length !== 2 || !title}>
        Create Comparison
      </Button>
    </form>
  );
};
