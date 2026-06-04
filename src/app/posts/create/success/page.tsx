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
        <h1 className='text-3xl font-bold'>기록이 공유되었습니다!</h1>
        <p className='text-muted-foreground'>당신의 실패 경험이 다른 집사들에게 큰 도움이 될 거예요.</p>
      </div>
      <div className='pt-4 w-full max-w-xs space-y-3'>
        <Button className='w-full h-14 rounded-xl text-lg font-bold bg-green-600' onClick={() => router.push('/')}>홈으로 돌아가기</Button>
        <Button variant='outline' className='w-full h-14 rounded-xl text-lg font-bold' onClick={() => router.push('/posts/create/type')}>하나 더 기록하기</Button>
      </div>
    </div>
  );
}