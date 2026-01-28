import { SetupForm } from '@/features/environment-profile/components/SetupForm/SetupForm';

export default function OnboardingSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">반가워요!</h1>
        <p className="text-gray-600">더 나은 식물 생활을 위해 환경 정보를 알려주세요.</p>
      </div>
      <SetupForm />
    </div>
  );
}
