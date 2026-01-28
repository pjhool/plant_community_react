import React from 'react';
import { EnvironmentProfile } from '../../types/environment';

interface EnvironmentCardProps {
  profile: EnvironmentProfile;
  className?: string;
}

export const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ profile, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
        <span>🏠</span> 나의 재배 환경
      </h3>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
          {profile.residenceType}
        </span>
        <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-100">
          {profile.lightDirection}
        </span>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
          {profile.experienceLevel}
        </span>
      </div>
    </div>
  );
};
