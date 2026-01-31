"use client";

import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { getResidenceLabel, getLightLabel } from '@/features/environment-profile/utils/labels';
import { useEnvironmentStore } from '@/features/environment-profile/stores/useEnvironmentStore';

export default function HomePage() {
    const { signOut, user } = useAuth();
    const { profile } = useEnvironmentStore();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    return (
        <main className='min-h-screen bg-background flex flex-col'>
            <header className='sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className='container flex h-16 items-center justify-between mx-auto px-4'>
                    <div className='flex items-center gap-2'>
                        <span className='text-2xl font-bold text-primary'>🌱 PlantMate</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Button onClick={handleSignOut} variant='ghost' size='sm'>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            <div className='flex-1 flex flex-col items-center justify-center container max-w-lg py-8 mx-auto px-4 text-center'>
                <div className='mb-12'>
                    <span className='text-6xl'>🌿</span>
                    <h1 className='text-3xl font-bold mt-6'>
                        {profile ? '우리 집 환경 소식' : '반가워요!'}
                    </h1>
                </div>

                {profile ? (
                    <div className='w-full space-y-8'>
                        <div className='bg-green-50 rounded-2xl p-8 border border-green-100'>
                            <div className='flex items-center justify-center gap-2 text-xl font-bold text-green-800 mb-2'>
                                <span>🏠</span>
                                <span>{getResidenceLabel(profile.residenceType)} · {getLightLabel(profile.lightDirection)} 환경</span>
                            </div>
                            <p className='text-green-600'>최근 기록 12건이 업데이트 되었어요</p>
                        </div>

                        <Button
                            onClick={() => router.push('/feed')}
                            className='w-full py-6 text-xl font-bold shadow-lg shadow-green-100'
                        >
                            환경 피드 다시 보기
                        </Button>

                        <div className='p-6 bg-gray-50 rounded-xl border border-gray-100 text-left'>
                            <p className='text-sm text-gray-500 mb-1'>환경 브리핑</p>
                            <p className='text-gray-700 font-medium'>
                                지금 이 환경에서 **과습 사망**이 늘고 있어요. <br />
                                물 주기에 주의가 필요합니다!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='w-full space-y-8'>
                        <Button
                            onClick={() => router.push('/onboarding/setup')}
                            className='w-full py-6 text-xl font-bold shadow-lg shadow-green-100'
                        >
                            내 환경의 식물 기록 보기
                        </Button>

                        <div className='space-y-2'>
                            <p className='text-lg font-medium text-gray-700'>환경에 따라 완전히</p>
                            <p className='text-lg font-medium text-gray-700'>다른 결과를 보여줘요</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <nav className='fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-4'>
                <button onClick={() => router.push('/')} className='flex flex-col items-center gap-1 text-green-600'>
                    <span className='text-xl'>🏠</span>
                    <span className='text-[10px] font-bold'>홈</span>
                </button>
                <button onClick={() => router.push('/feed')} className='flex flex-col items-center gap-1 text-gray-400'>
                    <span className='text-xl'>📋</span>
                    <span className='text-[10px]'>기록</span>
                </button>
                <button className='flex flex-col items-center gap-1 text-gray-400'>
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
