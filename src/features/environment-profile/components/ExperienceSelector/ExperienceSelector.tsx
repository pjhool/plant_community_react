import React from 'react';
import { ExperienceLevel } from '../../types/environment';

interface ExperienceSelectorProps {
  value: ExperienceLevel | '';
  onChange: (value: ExperienceLevel) => void;
}

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevel; description: string }[] = [
  { label: '초보', value: 'BEGINNER', description: '식물을 처음 키워보거나 아직 익숙하지 않아요.' },
  { label: '중급', value: 'INTERMEDIATE', description: '식물을 여러 번 키워봤고 관리법을 어느 정도 알아요.' },
  { label: '전문가', value: 'EXPERT', description: '식물 박사님! 어려운 식물도 척척 키워내요.' },
];

export const ExperienceSelector: React.FC<ExperienceSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {EXPERIENCE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`p-4 border rounded-lg text-left transition-colors ${
            value === option.value
              ? 'bg-blue-100 border-blue-500'
              : 'bg-white border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className={`font-bold ${value === option.value ? 'text-blue-700' : 'text-gray-900'}`}>
            {option.label}
          </div>
          <div className="text-sm text-gray-500 mt-1">{option.description}</div>
        </button>
      ))}
    </div>
  );
};
