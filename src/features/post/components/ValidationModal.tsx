"use client";

import { useState } from 'react';
import { Button } from '@/core/components/Button';
import { cn } from '@/core/utils/cn';
import { useRouter } from 'next/navigation';
import { usePostFormStore } from '../stores/usePostFormStore';

interface ValidationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CHECKLIST = [
    { id: 'CLEAR_TARGET', label: '비교 대상이 명확한가요?' },
    { id: 'ENV_INCLUDED', label: '내 환경 정보가 포함되었나요?' },
    { id: 'NOT_BRAGGING', label: '단순 자랑이나 비하 목적은 아닌가요?' },
] as const;

export function ValidationModal({ isOpen, onClose }: ValidationModalProps) {
    const router = useRouter();
    const { updateData, nextStep } = usePostFormStore();
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        const newSet = new Set(checkedItems);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setCheckedItems(newSet);
    };

    const allChecked = checkedItems.size === CHECKLIST.length;

    const handleConfirm = () => {
        if (!allChecked) return;
        updateData({ isValidated: true });
        nextStep();
        router.push('/posts/create/summary');
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
            <div className='bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200'>
                <div className='p-8 space-y-6'>
                    <div className='space-y-2 text-center'>
                        <h2 className='text-2xl font-bold text-gray-900'>게시 전 마지막 확인</h2>
                        <p className='text-sm text-gray-500'>신뢰도 높은 커뮤니티를 위해<br />아래 항목을 확인해주세요.</p>
                    </div>

                    <div className='space-y-3'>
                        {CHECKLIST.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                                    checkedItems.has(item.id)
                                        ? 'border-green-500 bg-green-50/50'
                                        : 'border-gray-50 bg-gray-50/50 hover:border-gray-100'
                                )}
                            >
                                <div className={cn(
                                    'w-5 h-5 rounded border flex items-center justify-center transition-all',
                                    checkedItems.has(item.id) ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'
                                )}>
                                    {checkedItems.has(item.id) && <span className='text-[10px]'>✓</span>}
                                </div>
                                <span className={cn(
                                    'text-sm font-bold transition-colors',
                                    checkedItems.has(item.id) ? 'text-green-700' : 'text-gray-500'
                                )}>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className='flex flex-col gap-3 pt-2'>
                        <Button
                            className={cn(
                                'h-14 rounded-xl text-lg font-bold transition-all',
                                allChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            )}
                            disabled={!allChecked}
                            onClick={handleConfirm}
                        >
                            확인 완료 및 게시하기
                        </Button>
                        <Button
                            variant='ghost'
                            className='h-12 text-gray-500 font-medium'
                            onClick={onClose}
                        >
                            취소
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
