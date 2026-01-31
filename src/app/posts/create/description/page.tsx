"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/core/utils/cn';

const descriptionSchema = z.object({
  content: z.string().min(1, '상황을 설명해주세요').max(300, '최대 300자까지 입력 가능합니다'),
});

type DescriptionFormData = z.infer<typeof descriptionSchema>;

export default function DescriptionPage() {
  const router = useRouter();
  const { data, updateData, nextStep } = usePostFormStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<DescriptionFormData>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      content: data.content || '',
    }
  });

  const contentValue = watch('content');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      updateData({ imageFiles: files });
    }
  };

  const onSubmit = (formData: DescriptionFormData) => {
    // Generate a default title if not present
    const title = data.plant?.name ? `${data.plant.name} 실패 기록` : '식물 키우기 실패 기록';
    updateData({ ...formData, title });
    nextStep();
    router.push('/posts/create/summary');
  };

  return (
    <div className='flex flex-col min-h-[60vh] justify-center space-y-8 px-2'>
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>어떤 변화가 있었나요?</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 relative'>
            <textarea
              {...register('content')}
              rows={8}
              className='flex w-full rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 text-lg focus:border-green-500 focus:ring-0 transition-all outline-none resize-none'
              placeholder='상황을 자세히 들려주세요 (예: 17일 차에 잎이 갑자기 축 늘어졌어요. 물은 3일에 한 번 줬어요)'
            />
            <div className='absolute bottom-3 right-4 text-sm text-gray-400 font-medium'>
              {contentValue?.length || 0} / 300
            </div>
            {errors.content && <p className='text-xs text-red-500 ml-1'>{errors.content.message}</p>}
          </div>

          <div className='space-y-3'>
            <label className='text-sm font-bold text-gray-700 ml-1'>사진은 선택이에요</label>
            <div className='flex items-center gap-4'>
              <label className='flex flex-col items-center justify-center w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer'>
                <span className='text-2xl mb-1'>📷</span>
                <span className='text-xs text-gray-500 font-medium'>사진 추가</span>
                <input
                  type='file'
                  accept='image/*'
                  multiple
                  className='hidden'
                  onChange={handleImageChange}
                />
              </label>
              {data.imageFiles && data.imageFiles.length > 0 && (
                <div className='text-sm text-green-600 font-medium'>
                  {data.imageFiles.length}장의 사진이 선택됨
                </div>
              )}
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
