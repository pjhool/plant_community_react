"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { cn } from '@/core/utils/cn';

const TARGETS = [
    { id: 'ENVIRONMENT', label: '다른 집사의 환경', description: '채광, 통풍 등 외부 환경 조건' },
    { id: 'MANAGEMENT', label: '다른 집사의 관리 방법', description: '물 주기, 영양제 등 관리 방식' },
    { id: 'RESULT', label: '다른 집사의 결과 상태', description: '잎의 크기, 성장 속도 등 현재 상태' },
] as const;

export default function TargetSelectionPage() {
    const router = useRouter();
    const { data, updateData, nextStep } = usePostFormStore();

    const handleSelect = (target: typeof TARGETS[number]['id']) => {
        updateData({ comparisonTarget: target });
    };

    const handleNext = () => {
        if (!data.comparisonTarget) {
            alert('비교하고 싶은 항목을 하나 선택해주세요.');
            return;
        }
        nextStep();
        router.push('/posts/create/comparison/input');
    };

    return (
        <div className='flex flex-col min-h-[60vh] justify-center space-y-10 px-2'>
            <div className='space-y-4 text-center'>
                <h1 className='text-3xl font-bold tracking-tight'>무엇과 비교하고 싶나요?</h1>
                <p className='text-gray-500'>가장 궁금한 차이점을 하나만 골라주세요</p>
            </div>

            <div className='grid gap-4'>
                {TARGETS.map((target) => (
                    <button
                        key={target.id}
                        onClick={() => handleSelect(target.id)}
                        className={cn(
                            'flex flex-col items-start p-6 rounded-2xl border-2 transition-all text-left shadow-sm',
                            data.comparisonTarget === target.id
                                ? 'border-green-500 bg-green-50/50'
                                : 'border-gray-100 bg-white hover:border-gray-200'
                        )}
                    >
                        <div className='flex items-center gap-3 mb-1'>
                            <div className={cn(
                                'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                                data.comparisonTarget === target.id ? 'border-green-500 bg-green-500' : 'border-gray-300'
                            )}>
                                {data.comparisonTarget === target.id && <div className='w-2 h-2 rounded-full bg-white' />}
                            </div>
                            <span className='text-lg font-bold text-gray-800'>{target.label}</span>
                        </div>
                        <p className='text-sm text-gray-500 ml-8'>{target.description}</p>
                    </button>
                ))}
            </div>

            <div className='pt-6 flex gap-3'>
                <Button variant='outline' className='flex-1 h-14 rounded-xl border-gray-200' onClick={() => router.back()}>뒤로</Button>
                <Button
                    className='flex-[2] h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700'
                    onClick={handleNext}
                    disabled={!data.comparisonTarget}
                >
                    다음
                </Button>
            </div>
        </div>
    );
}
