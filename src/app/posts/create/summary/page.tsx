"use client";

import { useState } from 'react';
import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { PostService } from '@/features/post/services/post-service';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';

export default function SummaryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, reset } = usePostFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await PostService.createPost({
        authorId: user.uid,
        author: {
          displayName: user.displayName || 'Unknown',
          photoURL: user.photoURL || undefined
        } as any,
        type: data.type,
        status: 'PUBLISHED' as any,
        title: data.title,
        content: data.content,
        images: [],
        environment: data.environment as any,
        plant: data.plant as any,
        likes: 0,
        views: 0,
        commentsCount: 0
      }, selectedFiles);

      reset();
      router.push('/posts/create/success');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>Review and Publish</h1>
        <p className='text-muted-foreground'>Almost done! Take a look and add some photos.</p>
      </div>

      <div className='space-y-6'>
        <div className='bg-muted/30 p-6 rounded-xl border space-y-4 text-sm'>
          <div>
            <p className='text-xs text-muted-foreground uppercase tracking-wider font-semibold'>Category</p>
            <p className='font-medium'>{data.type}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground uppercase tracking-wider font-semibold'>Plant</p>
            <p className='font-medium'>{data.plant?.name} {data.plant?.species && `(${data.plant.species})`}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground uppercase tracking-wider font-semibold'>Title</p>
            <p className='font-medium'>{data.title}</p>
          </div>
          <div className='pt-2 border-t'>
            <p className='text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1'>Content</p>
            <p className='whitespace-pre-wrap'>{data.content}</p>
          </div>
        </div>

        <div className='space-y-3'>
          <label className='text-sm font-medium'>Add Photos</label>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleFileChange}
            className='block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20'
          />
          {selectedFiles.length > 0 && (
            <p className='text-xs text-muted-foreground'>{selectedFiles.length} images selected</p>
          )}
        </div>

        <div className='pt-4 flex gap-4'>
          <Button variant='outline' className='flex-1' onClick={() => router.back()} disabled={isSubmitting}>Back</Button>
          <Button className='flex-[2]' size='lg' onClick={handleSubmit} isLoading={isSubmitting} disabled={isSubmitting}>Publish Post</Button>
        </div>
      </div>
    </div>
  );
}