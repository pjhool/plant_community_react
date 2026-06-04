"use client";

import { useEffect } from 'react';
import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { useEnvironment } from '@/features/environment-profile/hooks/use-environment';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { Loading } from '@/core/components/Loading';

export default function EnvLockPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile, isLoading } = useEnvironment(user?.uid);
  const { updateData, nextStep } = usePostFormStore();

  useEffect(() => {
    if (profile) {
      updateData({
        environment: {
          residenceType: profile.residenceType,
          lightDirection: profile.lightDirection,
          experienceLevel: profile.experienceLevel,
          userId: profile.userId,
          location: profile.location || null
        } as any
      });
    }
  }, [profile, updateData]);

  const handleNext = () => {
    nextStep();
    router.push('/posts/create/plant-info');
  };

  if (isLoading) return <Loading />;

  return (
    <div className='flex flex-col min-h-[60vh] justify-center space-y-10 px-2'>
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight leading-tight'>
          이 기록은 아래 환경에<br />공유돼요
        </h1>
      </div>

      {profile ? (
        <div className='bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-6 shadow-sm'>
          <div className='flex items-center gap-4 border-b border-gray-200 pb-4'>
            <span className='text-2xl'>🏠</span>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 font-medium uppercase tracking-wider'>거주 및 채광</span>
              <span className='text-lg font-bold text-gray-800'>{profile.residenceType || '원룸'} · {profile.lightDirection || '북향'}</span>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-2xl'>🌱</span>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 font-medium uppercase tracking-wider'>나의 숙련도</span>
              <span className='text-lg font-bold text-gray-800'>{profile.experienceLevel || '초보'}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-yellow-50 p-8 rounded-3xl border border-yellow-100 text-yellow-800 text-center space-y-4'>
          <p className='font-bold text-lg'>환경 정보가 없어요</p>
          <p className='text-sm leading-relaxed'>기록 작성을 위해 먼저<br />환경 프로필을 설정해주세요.</p>
          <Button
            className='w-full bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl'
            onClick={() => router.push('/onboarding/setup')}
          >
            프로필 설정하러 가기
          </Button>
        </div>
      )}

      <div className='space-y-6'>
        <div className='bg-red-50/50 p-4 rounded-xl border border-red-100/50 text-center'>
          <p className='text-sm text-gray-600 leading-relaxed'>
            <span className='font-bold text-red-600'>기록 신뢰</span>를 위해<br />
            작성 중 환경 변경은 불가능해요
          </p>
        </div>

        <div className='flex gap-3'>
          <Button variant='outline' className='flex-1 h-14 rounded-xl border-gray-200' onClick={() => router.back()}>뒤로</Button>
          <Button
            className='flex-[2] h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700'
            onClick={handleNext}
            disabled={!profile}
          >
            계속하기
          </Button>
        </div>
      </div>
    </div>
  );
}
