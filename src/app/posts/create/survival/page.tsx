"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const survivalSchema = z.object({
    waterCycle: z.string().min(1, '물 주기 정보를 입력해주세요'),
    sunlightLevel: z.string().min(1, '채광 정보를 입력해주세요'),
    ventilation: z.string().min(1, '통풍 정보를 입력해주세요'),
    managementSummary: z.string().min(10, '관리 노하우를 10자 이상 적어주세요'),
});

type SurvivalFormData = z.infer<typeof survivalSchema>;

export default function SurvivalPage() {
    const router = useRouter();
    const { data, updateData, nextStep } = usePostFormStore();

    const { register, handleSubmit, formState: { errors } } = useForm<SurvivalFormData>({
        resolver: zodResolver(survivalSchema),
        defaultValues: {
            waterCycle: data.waterCycle || '',
            sunlightLevel: data.sunlightLevel || '',
            ventilation: data.ventilation || '',
            managementSummary: data.managementSummary || '',
        }
    });

    const onSubmit = (formData: SurvivalFormData) => {
        updateData(formData);
        nextStep();
        router.push('/posts/create/description');
    };

    return (
        <div className='flex flex-col min-h-[60vh] justify-center space-y-8 px-2'>
            <div className='space-y-4 text-center'>
                <h1 className='text-3xl font-bold tracking-tight'>
                    어떻게 관리하셨나요?
                </h1>
                <p className='text-gray-500'>
                    집사님만의 생존 비법을 공유해주세요.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <div className='space-y-6'>
                    {/* 물 주기 */}
                    <div className='space-y-2'>
                        <label className='text-sm font-bold text-gray-700 ml-1'>💧 물 주기</label>
                        <input
                            {...register('waterCycle')}
                            className='flex h-14 w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-2 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none'
                            placeholder='예: 겉흙이 마르면 듬뿍'
                        />
                        {errors.waterCycle && <p className='text-xs text-red-500 ml-1'>{errors.waterCycle.message}</p>}
                    </div>

                    {/* 햇빛 */}
                    <div className='space-y-2'>
                        <label className='text-sm font-bold text-gray-700 ml-1'>☀️ 햇빛</label>
                        <input
                            {...register('sunlightLevel')}
                            className='flex h-14 w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-2 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none'
                            placeholder='예: 창가 바로 앞 (직사광선)'
                        />
                        {errors.sunlightLevel && <p className='text-xs text-red-500 ml-1'>{errors.sunlightLevel.message}</p>}
                    </div>

                    {/* 통풍 */}
                    <div className='space-y-2'>
                        <label className='text-sm font-bold text-gray-700 ml-1'>🌬️ 통풍</label>
                        <input
                            {...register('ventilation')}
                            className='flex h-14 w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-2 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none'
                            placeholder='예: 하루 2시간 이상 환기'
                        />
                        {errors.ventilation && <p className='text-xs text-red-500 ml-1'>{errors.ventilation.message}</p>}
                    </div>

                    {/* 관리 노하우 */}
                    <div className='space-y-2'>
                        <label className='text-sm font-bold text-gray-700 ml-1'>✨ 관리 노하우 요약</label>
                        <textarea
                            {...register('managementSummary')}
                            className='flex w-full min-h-[120px] rounded-2xl border-2 border-gray-100 bg-white p-4 text-base focus:border-green-500 focus:ring-0 transition-all outline-none resize-none'
                            placeholder='식물을 건강하게 키운 핵심 비결이 무엇인가요?'
                        />
                        {errors.managementSummary && <p className='text-xs text-red-500 ml-1'>{errors.managementSummary.message}</p>}
                    </div>
                </div>

                <div className='pt-4 flex gap-3'>
                    <Button type='button' variant='outline' className='flex-1 h-14 rounded-xl border-gray-200' onClick={() => router.back()}>뒤로</Button>
                    <Button type='submit' className='flex-[2] h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700'>다음</Button>
                </div>
            </form>
        </div>
    );
}
