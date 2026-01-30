"use client";

import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center space-y-6 py-12 text-center'>
      <CheckCircle2 className='w-20 h-20 text-green-500' />
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>Published Successfully!</h1>
        <p className='text-muted-foreground'>Your post is now visible to the community.</p>
      </div>
      <div className='pt-4 w-full max-w-xs space-y-3'>
        <Button className='w-full' onClick={() => router.push('/')}>Go to Home Feed</Button>
        <Button variant='outline' className='w-full' onClick={() => router.push('/posts/create/type')}>Create Another Post</Button>
      </div>
    </div>
  );
}
"