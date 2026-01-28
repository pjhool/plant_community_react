import { useState } from 'react';
import { ResidenceType, LightDirection, ExperienceLevel } from '../types/environment';

export const useEnvironmentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    residenceType: '' as ResidenceType,
    lightDirection: '' as LightDirection,
    experienceLevel: '' as ExperienceLevel,
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return {
    step,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    isFirstStep: step === 1,
    isLastStep: step === 3,
  };
};
