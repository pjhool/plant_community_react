import React from 'react';
import { ResidenceType } from '../../types/environment';

interface ResidenceSelectorProps {
  value: ResidenceType | '';
  onChange: (value: ResidenceType) => void;
}

const RESIDENCE_OPTIONS: { label: string; value: ResidenceType }[] = [
  { label: '원룸', value: 'STUDIO' },
  { label: '아파트', value: 'APARTMENT' },
  { label: '주택', value: 'HOUSE' },
];

export const ResidenceSelector: React.FC<ResidenceSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {RESIDENCE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`p-4 border rounded-lg text-center transition-colors ${value === option.value
              ? 'bg-green-100 border-green-500 text-green-700'
              : 'bg-white border-gray-200 hover:border-green-300'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
