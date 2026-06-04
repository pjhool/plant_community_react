"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { useEnvironment } from '@/features/environment-profile/hooks/use-environment';
import { Loading } from '@/core/components/Loading';

export default function ComparisonIntroPage() {
    const router = useRouter();
    const { data, nextStep } = usePostFormStore();
    const { profile, isLoading } = useEnvironment();

    const handleNext = () => {
        nextStep();
        router.push('/posts/create/comparison/target');
    };

    if (isLoading) return <Loading />;

    return (
        <div className='flex flex-col min-h-[60vh] justify-center space-y-10 px-2'>
            <div className='bg-white rounded-3xl border-2 border-gray-100 p-8 space-y-6 shadow-sm'>
                <div className='space-y-4 text-center'>
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold'>
                        <span>🔒</span> 비교 질문 작성
                    </div>
                    <h1 className='text-3xl font-bold tracking-tight leading-tight'>
                        다른 집사와의<br />&apos;조건 차이&apos;를 이해해봐요
                    </h1>
                    <p className='text-gray-500 leading-relaxed'>
                        이 질문은 성과를 비교하는 것이 아니라,<br />
                        서로 다른 환경과 관리법의 차이를<br />
                        이해하기 위한 질문입니다.
                    </p>
                </div>
            </div>

            <div className='space-y-4'>
                <p className='text-sm font-bold text-gray-700 ml-1'>내 환경 요약 (고정)</p>
                <div className='bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-wrap gap-x-4 gap-y-2'>
                    <span className='px-3 py-1 bg-white rounded-lg border border-gray-200 text-sm font-medium'>🏠 {profile?.residenceType || '원룸'}</span>
                    <span className='px-3 py-1 bg-white rounded-lg border border-gray-200 text-sm font-medium'>☀️ {profile?.lightDirection || '북향'}</span>
                    <span className='px-3 py-1 bg-white rounded-lg border border-gray-200 text-sm font-medium'>🪴 {data.plant?.name}</span>
                    <span className='px-3 py-1 bg-white rounded-lg border border-gray-200 text-sm font-medium'>📅 {data.plant?.duration}일 차</span>
                </div>
            </div>

            <div className='pt-6'>
                <Button
                    className='w-full h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700'
                    onClick={handleNext}
                >
                    계속하기
                </Button>
            </div>
        </div>
    );
}
