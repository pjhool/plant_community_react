"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { PostType } from '@/features/feed/types/post';
import { Button } from '@/core/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/core/utils/cn';
import { useEffect, Suspense } from 'react';

const TYPES = [
  { id: PostType.SURVIVAL, label: '⭕ 잘 자라고 있어요', description: '식물이 자라는 기쁜 소식을 공유해주세요.' },
  { id: PostType.FAILURE, label: '❌ 실패했어요', description: '실패 기록은 같은 환경의 집사들에게 큰 도움이 돼요.' },
  { id: PostType.COMPARISON, label: '🔍 비교 질문 🔒', description: '다른 집사의 환경이나 관리법과 차이를 비교해봐요.' },
];

function TypeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, updateData, nextStep } = usePostFormStore();

  useEffect(() => {
    const defaultType = searchParams.get('default');
    if (defaultType === 'COMPARISON') {
      updateData({ type: PostType.COMPARISON });
    } else if (!data.type || data.type === PostType.SURVIVAL) {
      updateData({ type: PostType.FAILURE });
    }
  }, [searchParams]);

  const handleSelect = (type: PostType) => {
    updateData({ type });
  };

  const handleNext = () => {
    nextStep();
    router.push('/posts/create/env-lock');
  };

  return (
    <div className='flex flex-col min-h-[60vh] justify-center space-y-12 px-2'>
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>무엇을 기록할까요?</h1>
      </div>

      <div className='grid gap-6'>
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id)}
            className={cn(
              'flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all text-center gap-2',
              data.type === t.id
                ? 'border-green-500 bg-green-50/50 shadow-md scale-[1.02]'
                : 'border-gray-100 hover:border-gray-200 bg-white'
            )}
          >
            <span className='text-xl font-bold'>{t.label}</span>
            <span className='text-sm text-gray-500 max-w-[200px] leading-relaxed'>{t.description}</span>
          </button>
        ))}
      </div>

      <div className='pt-8'>
        <Button
          className='w-full h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700'
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default function TypePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TypeContent />
    </Suspense>
  );
}