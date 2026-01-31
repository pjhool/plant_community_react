"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { ValidationModal } from '@/features/post/components/ValidationModal';

const questionSchema = z.object({
    title: z.string().min(1, '제목을 입력해주세요').max(40, '최대 40자까지 가능합니다'),
    content: z.string().min(30, '최소 30자 이상 입력해주세요 (더 자세한 비교를 위해)').max(500, '최대 500자까지 가능합니다'),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function QuestionInputPage() {
    const router = useRouter();
    const { data, updateData } = usePostFormStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<QuestionFormData>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            title: data.title || '',
            content: data.content || '',
        },
        mode: 'onChange'
    });

    const contentValue = watch('content');
    const titleValue = watch('title');

    const onSubmit = (formData: QuestionFormData) => {
        updateData(formData);
        setIsModalOpen(true);
    };

    return (
        <div className='flex flex-col min-h-[60vh] justify-center space-y-8 px-2'>
            <div className='space-y-4 text-center'>
                <h1 className='text-3xl font-bold tracking-tight'>궁금한 점을 알려주세요</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <div className='space-y-6'>
                    <div className='space-y-2'>
                        <div className='flex justify-between items-end ml-1'>
                            <label className='text-sm font-bold text-gray-700'>질문 제목</label>
                            <span className='text-xs text-gray-400 font-medium'>{titleValue?.length || 0} / 40</span>
                        </div>
                        <input
                            {...register('title')}
                            className='flex h-14 w-full rounded-2xl border-2 border-gray-100 bg-white px-5 py-2 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none'
                            placeholder='무엇이 궁금한지 한마디로 요약해봐요'
                        />
                        {errors.title && <p className='text-xs text-red-500 ml-1'>{errors.title.message}</p>}
                    </div>

                    <div className='space-y-2'>
                        <div className='flex justify-between items-end ml-1'>
                            <label className='text-sm font-bold text-gray-700'>질문 내용</label>
                            <span className='text-xs text-gray-400 font-medium'>{contentValue?.length || 0} / 500 (최소 30자)</span>
                        </div>
                        <textarea
                            {...register('content')}
                            rows={6}
                            className='flex w-full rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none resize-none'
                            placeholder='비교하고 싶은 상황을 자세히 적어주시면 더 정확한 답변을 얻을 수 있어요'
                        />
                        {errors.content && <p className='text-xs text-red-500 ml-1'>{errors.content.message}</p>}
                    </div>

                    <div className='bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 space-y-3'>
                        <p className='text-sm font-bold text-blue-700'>💡 좋은 질문 가이드</p>
                        <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex gap-2'>
                                <span className='text-green-500'>✔</span>
                                <span>채광은 비슷한데 물 주기 차이가 있나요?</span>
                            </li>
                            <li className='flex gap-2'>
                                <span className='text-red-400'>✖</span>
                                <span className='text-gray-400'>왜 제 것만 키우기 힘든가요? (감정적인 표현)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='pt-4 flex gap-3'>
                    <Button type='button' variant='outline' className='flex-1 h-14 rounded-xl border-gray-200' onClick={() => router.back()}>뒤로</Button>
                    <Button
                        type='submit'
                        className='flex-[2] h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700 focus:ring-green-100'
                        disabled={!isValid}
                    >
                        게시 전 확인
                    </Button>
                </div>
            </form>

            <ValidationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
