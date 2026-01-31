import React from 'react';
import { LightDirection } from '../../types/environment';

interface LightSelectorProps {
  value: LightDirection | '';
  onChange: (value: LightDirection) => void;
}

const LIGHT_OPTIONS: { label: string; value: LightDirection }[] = [
  { label: '남향', value: 'SOUTH' },
  { label: '동향', value: 'EAST' },
  { label: '북향', value: 'NORTH' },
  { label: '서향', value: 'WEST' },
  { label: '불명', value: 'UNKNOWN' },
];

export const LightSelector: React.FC<LightSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {LIGHT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`p-4 border rounded-lg text-center transition-colors ${value === option.value
              ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
              : 'bg-white border-gray-200 hover:border-yellow-300'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
