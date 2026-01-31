"use client";

import { useEffect } from 'react';
import { usePostFormStore } from '@/features/post/stores/usePostFormStore';
import { useEnvironment } from '@/features/environment-profile/hooks/use-environment';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { Loading } from '@/core/components/Loading';

export default function EnvLockPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile, isLoading } = useEnvironment(user?.uid);
  const { updateData, nextStep } = usePostFormStore();

  useEffect(() => {
    if (profile) {
      updateData({
        environment: {
          residenceType: profile.residenceType,
          lightDirection: profile.lightDirection,
          experienceLevel: profile.experienceLevel,
          userId: profile.userId,
          location: profile.location || null
        } as any
      });
    }
  }, [profile, updateData]);

  const handleNext = () => {
    nextStep();
    router.push('/posts/create/plant-info');
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Snapshot your environment</h1>
        <p className="text-muted-foreground">We&apos;ll attach your current growing conditions to this post so others can compare.</p>
      </div>

      {profile ? (
        <div className="bg-muted/30 p-6 rounded-xl border space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Residence</p>
              <p className="font-medium">{profile.residenceType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Light</p>
              <p className="font-medium">{profile.lightDirection}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Experience</p>
              <p className="font-medium">{profile.experienceLevel}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">You can update these in your profile settings later.</p>
        </div>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-yellow-800">
          <p className="font-semibold">No profile found</p>
          <p className="text-sm">Please set up your environment profile first to get the best experience.</p>
          <Button variant="outline" className="mt-4 border-yellow-300" onClick={() => router.push('/onboarding/setup')}>Setup Profile</Button>
        </div>
      )}

      <div className="pt-4 flex gap-4">
        <Button variant="outline" className="flex-1" onClick={() => router.back()}>Back</Button>
        <Button className="flex-[2]" size="lg" onClick={handleNext} disabled={!profile}>Confirm & Next</Button>
      </div>
    </div>
  );
}
