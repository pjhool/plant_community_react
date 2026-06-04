"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/core/utils/cn';
import { PostType } from '@/features/feed/types/post';

const plantSchema = z.object({
  name: z.string().min(1, '식물 이름을 입력해주세요'),
  duration: z.coerce.number().min(1, '기간을 입력해주세요'),
  status: z.enum(['DEAD', 'RECOVER_IMPOSSIBLE']),
});

type PlantFormData = z.infer<typeof plantSchema>;

export default function PlantInfoPage() {
  const router = useRouter();
  const { data, updateData, nextStep } = usePostFormStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: data.plant?.name || '',
      duration: data.plant?.duration || 0,
      status: data.plant?.status || 'DEAD',
    }
  });

  const currentStatus = watch('status');

  const onSubmit = (formData: PlantFormData) => {
    updateData({
      plant: { ...data.plant, ...formData },
      // For failure post, we need to map some fields to the post level eventually
    });
    nextStep();

    if (data.type === PostType.FAILURE) {
      router.push('/posts/create/causes');
    } else if (data.type === PostType.COMPARISON) {
      router.push('/posts/create/comparison');
    } else if (data.type === PostType.SURVIVAL) {
      router.push('/posts/create/survival');
    } else {
      router.push('/posts/create/description');
    }
  };

  return (
    <div className='flex flex-col min-h-[60vh] justify-center space-y-8 px-2'>
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>어떤 식물이었나요?</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-bold text-gray-700 ml-1'>식물 이름</label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>🔍</span>
              <input
                {...register('name')}
                className='flex h-14 w-full rounded-2xl border-2 border-gray-100 bg-white pl-10 pr-4 py-2 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none'
                placeholder='식물 이름을 검색하거나 입력하세요'
              />
            </div>
            {errors.name && <p className='text-xs text-red-500 ml-1'>{errors.name.message}</p>}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-bold text-gray-700 ml-1'>키운 기간 (일)</label>
            <input
              type='number'
              {...register('duration')}
              className='flex h-14 w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-2 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none'
              placeholder='예: 17'
            />
            {errors.duration && <p className='text-xs text-red-500 ml-1'>{errors.duration.message}</p>}
          </div>

          <div className='space-y-3'>
            <label className='text-sm font-bold text-gray-700 ml-1'>상태</label>
            <div className='grid grid-cols-1 gap-3'>
              <label className={cn(
                'flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer',
                currentStatus === 'DEAD' ? 'border-red-500 bg-red-50/30' : 'border-gray-100 bg-white'
              )}>
                <input type='radio' value='DEAD' {...register('status')} className='w-5 h-5 accent-red-500' />
                <span className='font-medium text-gray-800'>❌ 완전 사망</span>
              </label>
              <label className={cn(
                'flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer',
                currentStatus === 'RECOVER_IMPOSSIBLE' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 bg-white'
              )}>
                <input type='radio' value='RECOVER_IMPOSSIBLE' {...register('status')} className='w-5 h-5 accent-orange-500' />
                <span className='font-medium text-gray-800'>⭕ 회복 불가 상태</span>
              </label>
            </div>
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
