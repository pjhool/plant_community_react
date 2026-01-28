'use client';

import { useEnvironment } from '@/features/environment-profile/hooks/use-environment';
import { useAuth } from '@/features/auth/hooks/use-auth';
import Link from 'next/link';

export default function OnboardingSummaryPage() {
  const { user } = useAuth();
  const { profile, isLoading } = useEnvironment(user?.uid);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="text-5xl mb-6">🌿</div>
        <h1 className="text-2xl font-bold mb-4">환경 설정 완료!</h1>
        <p className="text-gray-600 mb-8">
          이제 {user?.displayName || '집사'}님의 환경에 맞는 식물 정보를 추천해드릴게요.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <div className="mb-4">
            <span className="text-sm text-gray-500">거주 환경</span>
            <div className="font-medium text-lg">{profile?.residenceType}</div>
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-500">채광 방향</span>
            <div className="font-medium text-lg">{profile?.lightDirection}</div>
          </div>
          <div>
            <span className="text-sm text-gray-500">나의 수준</span>
            <div className="font-medium text-lg">{profile?.experienceLevel}</div>
          </div>
        </div>

        <Link
          href="/"
          className="block w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          시작하기
        </Link>
      </div>
    </div>
  );
}
