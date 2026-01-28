'use client';

import React from 'react';
import { useEnvironmentForm } from '../../hooks/use-environment-form';
import { useEnvironment } from '../../hooks/use-environment';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { StepIndicator } from '../StepIndicator/StepIndicator';
import { ResidenceSelector } from '../ResidenceSelector/ResidenceSelector';
import { LightSelector } from '../LightSelector/LightSelector';
import { ExperienceSelector } from '../ExperienceSelector/ExperienceSelector';
import { useRouter } from 'next/navigation';

export const SetupForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { saveProfile, isSaving } = useEnvironment(user?.uid);
  const { 
    step, 
    formData, 
    nextStep, 
    prevStep, 
    updateFormData, 
    isFirstStep, 
    isLastStep 
  } = useEnvironmentForm();

  const handleNext = async () => {
    if (isLastStep) {
      if (!user) return;
      try {
        await saveProfile({ userId: user.uid, profile: formData });
        router.push('/onboarding/summary');
      } catch (e) {
        console.error("Failed to save profile", e);
      }
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">어디에서 식물을 키우시나요?</h2>
            <ResidenceSelector 
              value={formData.residenceType} 
              onChange={(val) => updateFormData({ residenceType: val })} 
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">빛이 어느 정도 들어오나요?</h2>
            <LightSelector 
              value={formData.lightDirection} 
              onChange={(val) => updateFormData({ lightDirection: val })} 
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">식물 키우기 실력은 어느 정도인가요?</h2>
            <ExperienceSelector 
              value={formData.experienceLevel} 
              onChange={(val) => updateFormData({ experienceLevel: val })} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  const canGoNext = () => {
    if (step === 1) return !!formData.residenceType;
    if (step === 2) return !!formData.lightDirection;
    if (step === 3) return !!formData.experienceLevel;
    return false;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <StepIndicator currentStep={step} totalSteps={3} />
      
      <div className="min-h-[300px]">
        {renderStep()}
      </div>

      <div className="mt-8 flex gap-4">
        {!isFirstStep && (
          <button
            onClick={prevStep}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50"
          >
            이전
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canGoNext() || isSaving}
          className={`flex-1 px-4 py-3 rounded-lg text-white font-medium transition-colors ${
            canGoNext() && !isSaving ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isSaving ? '저장 중...' : isLastStep ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
};
