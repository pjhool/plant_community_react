"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { PostType } from '@/features/feed/types/post';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { cn } from '@/core/utils/cn';

const TYPES = [
  { id: 'GENERAL', label: 'General Update', description: 'Share progress or a nice photo of your plant.' },
  { id: 'QUESTION', label: 'Ask for Help', description: 'Not sure what is wrong? Ask the community.' },
  { id: 'FAILURE', label: 'Post a Failure', description: 'Document a plant that did not make it to help others learn.' },
  { id: 'SUCCESS', label: 'Success Story', description: 'Share a thriving plant and how you did it.' },
];

export default function TypePage() {
  const router = useRouter();
  const { data, updateData, nextStep } = usePostFormStore();

  const handleSelect = (type: PostType) => {
    updateData({ type });
  };

  const handleNext = () => {
    nextStep();
    router.push('/posts/create/env-lock');
  };

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>What kind of post is this?</h1>
        <p className='text-muted-foreground'>Choose a category that best describes your update.</p>
      </div>

      <div className='grid gap-4'>
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id as PostType)}
            className={cn(
              'flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left',
              data.type === t.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-muted hover:border-muted-foreground/30 bg-card'
            )}
          >
            <span className='font-semibold'>{t.label}</span>
            <span className='text-sm text-muted-foreground mt-1'>{t.description}</span>
          </button>
        ))}
      </div>

      <div className='pt-4'>
        <Button className='w-full' size='lg' onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
}
"