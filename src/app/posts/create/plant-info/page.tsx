"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const plantSchema = z.object({
  name: z.string().min(1, 'Plant name is required'),
  species: z.string().optional(),
});

type PlantFormData = z.infer<typeof plantSchema>;

export default function PlantInfoPage() {
  const router = useRouter();
  const { data, updateData, nextStep } = usePostFormStore();

  const { register, handleSubmit, formState: { errors } } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: data.plant?.name || '',
      species: data.plant?.species || '',
    }
  });

  const onSubmit = (formData: PlantFormData) => {
    updateData({ plant: { ...data.plant, ...formData } });
    nextStep();
    router.push('/posts/create/description');
  };

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>Which plant is this about?</h1>
        <p className='text-muted-foreground'>Help others identify the plant you are sharing.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Plant Nickname / Name</label>
          <input
            {...register('name')}
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='e.g., My favorite Monstera'
          />
          {errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Species (Optional)</label>
          <input
            {...register('species')}
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='e.g., Monstera Deliciosa'
          />
        </div>

        <div className='pt-4 flex gap-4'>
          <Button type='button' variant='outline' className='flex-1' onClick={() => router.back()}>Back</Button>
          <Button type='submit' className='flex-[2]' size='lg'>Continue</Button>
        </div>
      </form>
    </div>
  );
}