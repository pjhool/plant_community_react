"use client";

import { useAuth } from '@/features/auth/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEnvironmentStore } from '@/features/environment-profile/stores/useEnvironmentStore';
import { FeedList } from '@/features/feed/components/FeedList/FeedList';
import { Button } from '@/core/components/Button';
import { useEffect } from 'react';

import { getResidenceLabel, getLightLabel, getExperienceLabel } from '@/features/environment-profile/utils/labels';

export default function FeedPage() {
    const { user } = useAuth();
    const { profile } = useEnvironmentStore();
    const router = useRouter();

    useEffect(() => {
        // Redirect if profile doesn't exist (requirement says environment is a prerequisite)
        if (!profile) {
            router.push('/');
        }
    }, [profile, router]);

    if (!profile) return null;

    return (
        <main className='min-h-screen bg-background pb-20'>
            {/* Sticky Environment Header */}
            <header className='sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b'>
                <div className='container max-w-lg mx-auto px-4 h-16 flex items-center justify-between'>
                    <button onClick={() => router.back()} className='text-gray-600'>
                        <span className='text-xl'>←</span>
                    </button>
                    <div className='flex items-center gap-2 font-bold text-gray-800'>
                        <span>🏠 {getResidenceLabel(profile.residenceType)}</span>
                        <span className='text-gray-300'>·</span>
                        <span>{getLightLabel(profile.lightDirection)}</span>
                        <span className='text-gray-300'>·</span>
                        <span>{getExperienceLabel(profile.experienceLevel)}</span>
                    </div>
                    <div className='w-6' /> {/* Spacer for centering */}
                </div>
            </header>

            <div className='container max-w-lg mx-auto px-4 py-4'>
                {/* Environmental Context Banner */}
                <div className='mb-6 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between'>
                    <div className='text-sm text-green-800'>
                        나와 <strong>같은 조건</strong>의 기록들을 모았어요
                    </div>
                    <span className='text-lg'>✨</span>
                </div>

                {/* Feed List - useFeed will automatically use environment from store if no filter passed */}
                <FeedList filter={{}} />

                <div className='mt-8 text-center'>
                    <Button
                        variant='ghost'
                        onClick={() => router.push('/')}
                        className='text-gray-400 text-sm'
                    >
                        (다른 환경도 보기)
                    </Button>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className='fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-4 z-20'>
                <button onClick={() => router.push('/')} className='flex flex-col items-center gap-1 text-gray-400'>
                    <span className='text-xl'>🏠</span>
                    <span className='text-[10px] font-bold'>홈</span>
                </button>
                <button className='flex flex-col items-center gap-1 text-green-600'>
                    <span className='text-xl'>📋</span>
                    <span className='text-[10px]'>기록</span>
                </button>
                <button onClick={() => router.push('/posts/create')} className='flex flex-col items-center gap-1 text-gray-400'>
                    <span className='text-xl'>✍️</span>
                    <span className='text-[10px]'>작성</span>
                </button>
                <button className='flex flex-col items-center gap-1 text-gray-400'>
                    <span className='text-xl'>👤</span>
                    <span className='text-[10px]'>내정보</span>
                </button>
            </nav>
        </main>
    );
}
