'use client';

import { useEnvironment } from '@/features/environment-profile/hooks/use-environment';
import { useAuth } from '@/features/auth/hooks/use-auth';
import Link from 'next/link';
import { getResidenceLabel, getLightLabel, getExperienceLabel } from '@/features/environment-profile/utils/labels';

export default function OnboardingSummaryPage() {
  const { user } = useAuth();
  const { profile, isLoading } = useEnvironment(user?.uid);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-2xl font-bold mb-8">내 환경 요약</h1>

        <div className="bg-gray-50 rounded-xl p-8 mb-8 text-left space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <span className="text-xl font-bold">
              {getResidenceLabel(profile?.residenceType)} · {getLightLabel(profile?.lightDirection)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <span className="text-lg text-gray-700">
              {getExperienceLabel(profile?.experienceLevel, true)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/feed"
            className="block w-full px-4 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            이 환경으로 피드 보기
          </Link>
          <Link
            href="/onboarding/setup"
            className="block w-full px-4 py-3 bg-white text-gray-500 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200"
          >
            환경 수정
          </Link>
        </div>
      </div>
    </div>
  );
}
