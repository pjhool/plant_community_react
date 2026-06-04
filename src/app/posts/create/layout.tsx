"use client";

import { ReactNode } from 'react';
import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { Button } from '@/core/components/Button';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/core/utils/cn';

const STEPS = [
  { id: 1, label: 'Type', path: '/posts/create/type' },
  { id: 2, label: 'Environment', path: '/posts/create/env-lock' },
  { id: 3, label: 'Plant', path: '/posts/create/plant-info' },
  { id: 4, label: 'Content', path: '/posts/create/description' },
  { id: 5, label: 'Review', path: '/posts/create/summary' },
];

export default function PostCreateLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { step, prevStep, reset } = usePostFormStore();

  const currentStep = STEPS.find(s => pathname.includes(s.path.split('/').pop()!))?.id || step;

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All progress will be lost.')) {
      reset();
      router.push('/');
    }
  };

  const handleBack = () => {
    prevStep();
    const prevPath = STEPS.find(s => s.id === currentStep - 1)?.path;
    if (prevPath) router.push(prevPath);
    else router.back();
  };

  if (pathname.includes('/success')) {
      return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="bg-background border-b h-16 flex items-center shrink-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
          <div className="flex gap-2 items-center">
            {STEPS.map((s) => (
              <div 
                key={s.id}
                className={cn(
                  "w-2 h-2 rounded-full",
                  s.id === currentStep ? "bg-primary w-6" : s.id < currentStep ? "bg-primary/50" : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-12">
        <div className="bg-background rounded-xl border shadow-sm p-6 md:p-10">
            {children}
        </div>
      </main>

      {/* Footer Navigation (Optional, often handled per page) */}
    </div>
  );
}
