"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { cn } from '@/core/utils/cn';
import { useState } from 'react';

const CAUSES = [
    { id: 'OVERWATERING', label: '과습' },
    { id: 'LACK_OF_LIGHT', label: '채광 부족' },
    { id: 'POOR_VENTILATION', label: '통풍 문제' },
    { id: 'SOIL_PROBLEM', label: '흙 문제' },
    { id: 'UNKNOWN', label: '잘 모르겠어요' },
];

export default function CausesPage() {
    const router = useRouter();
    const { data, updateData, nextStep } = usePostFormStore();
    const [selectedCauses, setSelectedCauses] = useState<string[]>(data.failureCauses || []);

    const toggleCause = (id: string) => {
        setSelectedCauses(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        );
    };

    const handleNext = () => {
        if (selectedCauses.length === 0) {
            alert('최소 하나 이상의 원인을 선택해주세요. 잘 모르겠다면 "잘 모르겠어요"를 선택해주세요.');
            return;
        }
        updateData({ failureCauses: selectedCauses });
        nextStep();
        router.push('/posts/create/description');
    };

    return (
        <div className='flex flex-col min-h-[60vh] justify-center space-y-10 px-2'>
            <div className='space-y-4 text-center'>
                <h1 className='text-3xl font-bold tracking-tight'>원인이 뭐라고 생각해요?</h1>
                <p className='text-gray-500'>(복수 선택 가능)</p>
            </div>

            <div className='grid gap-3'>
                {CAUSES.map((cause) => (
                    <button
                        key={cause.id}
                        onClick={() => toggleCause(cause.id)}
                        className={cn(
                            'flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left shadow-sm',
                            selectedCauses.includes(cause.id)
                                ? 'border-green-500 bg-green-50/50'
                                : 'border-gray-100 bg-white hover:border-gray-200'
                        )}
                    >
                        <div className={cn(
                            'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all',
                            selectedCauses.includes(cause.id)
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-200'
                        )}>
                            {selectedCauses.includes(cause.id) && <span className='text-xs'>✓</span>}
                        </div>
                        <span className='text-lg font-medium text-gray-800'>{cause.label}</span>
                    </button>
                ))}
            </div>

            <div className='pt-6 flex gap-3'>
                <Button variant='outline' className='flex-1 h-14 rounded-xl border-gray-200' onClick={() => router.back()}>뒤로</Button>
                <Button
                    className='flex-[2] h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700'
                    onClick={handleNext}
                >
                    다음
                </Button>
            </div>
        </div>
    );
}
