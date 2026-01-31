import React from 'react';
import { ExperienceLevel } from '../../types/environment';

interface ExperienceSelectorProps {
  value: ExperienceLevel | '';
  onChange: (value: ExperienceLevel) => void;
}

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevel; description: string }[] = [
  { label: '처음', value: 'FIRST', description: '식물을 처음 키워봐요.' },
  { label: '몇 번 죽여봄', value: 'FAILED', description: '실패한 경험이 있어요.' },
  { label: '어느 정도 키움', value: 'SUCCESS', description: '유지해본 경험이 있어요.' },
];

export const ExperienceSelector: React.FC<ExperienceSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {EXPERIENCE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`p-4 border rounded-lg text-left transition-colors ${value === option.value
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
