import React, { useState } from 'react';
import { Button } from '@/core/components/Button';

interface SurvivalFormProps {
  onSubmit: (data: { survivalDays: number; healthStatus: string }) => void;
  isLoading?: boolean;
}

export const SurvivalForm = ({ onSubmit, isLoading }: SurvivalFormProps) => {
  const [days, setDays] = useState(0);
  const [status, setStatus] = useState('HEALTHY');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ survivalDays: days, healthStatus: status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Days Survived</label>
        <input 
          type="number" 
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Current Health</label>
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="HEALTHY">Thriving</option>
          <option value="OK">Stable</option>
          <option value="STRUGGLING">Struggling</option>
          <option value="RECOVERING">Recovering</option>
        </select>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Log Survival Status
      </Button>
    </form>
  );
};
