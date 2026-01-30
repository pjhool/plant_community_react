"use client";

import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/core/utils/cn';

const descriptionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  failureCause: z.string().optional(),
});

type DescriptionFormData = z.infer<typeof descriptionSchema>;

export default function DescriptionPage() {
  const router = useRouter();
  const { data, updateData, nextStep } = usePostFormStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<DescriptionFormData>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      title: data.title || '',
      content: data.content || '',
      failureCause: data.failureCause || '',
    }
  });

  const onSubmit = (formData: DescriptionFormData) => {
    updateData(formData);
    nextStep();
    router.push('/posts/create/summary');
  };

  const isFailure = data.type === 'FAILURE';

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Tell us the story</h1>
        <p className="text-muted-foreground">Share the details so others can learn or help.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Post Title</label>
          <input 
            {...register('title')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="e.g., My Monstera has yellow leaves"
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        {isFailure && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-600">What went wrong? (Failure Cause)</label>
            <select 
              {...register('failureCause')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select a reason...</option>
              <option value="OVERWATERING">Overwatering</option>
              <option value="UNDERWATERING">Underwatering</option>
              <option value="PESTS">Pests</option>
              <option value="LIGHT_ISSUE">Light Issue</option>
              <option value="DISEASE">Disease</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            {...register('content')}
            rows={6}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe the situation in detail..."
          />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <div className="pt-4 flex gap-4">
          <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Back</Button>
          <Button type="submit" className="flex-[2]" size="lg">Review Post</Button>
        </div>
      </form>
    </div>
  );
}
