"use client";

import { useState } from 'react';
import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { PostService } from '@/features/post/services/post-service';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { PostType, PostStatus } from '@/features/feed/types/post';

export default function SummaryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, reset } = usePostFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || !user.uid) {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      return;
    }
    setIsSubmitting(true);
    try {
      const isComparison = data.type === PostType.COMPARISON;
      const defaultTitle = isComparison
        ? `${data.plant?.name} 비교 질문`
        : (data.plant?.name ? `${data.plant.name} 실패 기록` : '식물 실패 기록');

      await PostService.createPost({
        authorId: user.uid,
        author: {
          displayName: user.displayName || 'Unknown',
          photoURL: user.photoURL || null
        } as any,
        type: data.type,
        status: PostStatus.PUBLISHED,
        title: data.title || defaultTitle,
        content: data.content,
        images: [],
        environment: data.environment as any,
        plant: data.plant as any,
        // Failure Specific
        failureStatus: data.plant?.status as any,
        failureDuration: data.plant?.duration as any,
        failureCauses: data.failureCauses,
        failureCause: data.failureCauses.join(', '),
        // Comparison Specific
        comparisonTarget: data.comparisonTarget,
        likes: 0,
        views: 0,
        commentsCount: 0
      }, data.imageFiles || []);

      reset();
      router.push('/posts/create/success');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('게시물 공유에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFailure = data.type === PostType.FAILURE;
  const isComparison = data.type === PostType.COMPARISON;

  const getTargetLabel = (target?: string) => {
    switch (target) {
      case 'ENVIRONMENT': return '다른 집사의 환경';
      case 'MANAGEMENT': return '다른 집사의 관리 방법';
      case 'RESULT': return '다른 집사의 결과 상태';
      default: return '미지정';
    }
  };

  return (
    <div className='flex flex-col min-h-[70vh] justify-center space-y-8 px-2'>
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>이렇게 공유돼요</h1>
      </div>

      <div className='bg-white rounded-3xl border-2 border-gray-100 p-8 space-y-6 shadow-sm'>
        <div className='space-y-4'>
          <div className='flex items-start gap-3'>
            <span className='text-xl'>🏠</span>
            <div className='space-y-1'>
              <p className='text-xs text-gray-400 font-bold uppercase'>재배 환경</p>
              <p className='text-lg font-bold text-gray-800'>
                {data.environment?.residenceType} · {data.environment?.lightDirection} · {data.environment?.experienceLevel}
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <span className='text-xl'>🪴</span>
            <div className='space-y-1'>
              <p className='text-xs text-gray-400 font-bold uppercase'>식물 정보</p>
              <p className='text-lg font-bold text-gray-800'>
                {data.plant?.name} ({data.plant?.duration}일 거주)
              </p>
              {!isComparison && (
                <p className='text-sm font-bold text-red-500'>
                  상태: {data.plant?.status === 'DEAD' ? '❌ 사망' : '⭕ 회복불가'}
                </p>
              )}
            </div>
          </div>

          {isFailure && (
            <div className='flex items-start gap-3 border-t border-gray-100 pt-4'>
              <span className='text-xl'>🧐</span>
              <div className='space-y-1'>
                <p className='text-xs text-gray-400 font-bold uppercase'>추정 원인</p>
                <p className='text-lg font-bold text-gray-800'>
                  {data.failureCauses?.length > 0 ? data.failureCauses.join(', ') : '원인 미상'}
                </p>
              </div>
            </div>
          )}

          {isComparison && (
            <div className='flex items-start gap-3 border-t border-gray-100 pt-4'>
              <span className='text-xl'>🔍</span>
              <div className='space-y-1'>
                <p className='text-xs text-gray-400 font-bold uppercase'>비교 대상</p>
                <p className='text-lg font-bold text-gray-800'>
                  {getTargetLabel(data.comparisonTarget)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className='bg-gray-50 p-4 rounded-xl text-center space-y-1'>
          <p className='text-sm text-gray-600 font-medium'>이 기록은 같은 환경의<br />집사들에게만 보여요</p>
        </div>
      </div>

      <div className='pt-6 flex gap-3'>
        <Button variant='outline' className='flex-1 h-14 rounded-xl border-gray-200' onClick={() => router.back()} disabled={isSubmitting}>뒤로</Button>
        <Button
          className='flex-[2] h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700'
          onClick={handleSubmit}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          공유하기
        </Button>
      </div>
    </div>
  );
}
