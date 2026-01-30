import React from 'react';
import { PostFilter } from '../../types/post';
import { ResidenceType, LightDirection, ExperienceLevel } from '@/features/environment-profile/types/environment';
import { Button } from '@/core/components/Button';
import { cn } from '@/core/utils/cn';

interface FilterBarProps {
  filter: PostFilter;
  onFilterChange: (filter: PostFilter) => void;
  className?: string;
}

export const FilterBar = ({ filter, onFilterChange, className }: FilterBarProps) => {
  const handleResidenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, residenceType: e.target.value as ResidenceType || undefined });
  };

  const handleLightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, lightDirection: e.target.value as LightDirection || undefined });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, experienceLevel: e.target.value as ExperienceLevel || undefined });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasFilters = filter.residenceType || filter.lightDirection || filter.experienceLevel;

  return (
    <div className={cn('flex flex-wrap items-center gap-3 p-4 bg-background border-b', className)}>
      <select 
        className='h-9 w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        value={filter.residenceType || ''}
        onChange={handleResidenceChange}
        aria-label='Residence Type'
      >
        <option value=''>🏠 All Homes</option>
        <option value='APARTMENT'>Apartment</option>
        <option value='VILLA'>Villa</option>
        <option value='HOUSE'>House</option>
        <option value='OFFICE'>Office</option>
        <option value='OTHER'>Other</option>
      </select>

      <select 
        className='h-9 w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        value={filter.lightDirection || ''}
        onChange={handleLightChange}
        aria-label='Light Direction'
      >
        <option value=''>☀️ All Light</option>
        <option value='SOUTH'>South</option>
        <option value='SOUTH_EAST'>South East</option>
        <option value='SOUTH_WEST'>South West</option>
        <option value='EAST'>East</option>
        <option value='WEST'>West</option>
        <option value='NORTH'>North</option>
        <option value='NONE'>None</option>
      </select>

      <select 
        className='h-9 w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        value={filter.experienceLevel || ''}
        onChange={handleLevelChange}
        aria-label='Experience Level'
      >
        <option value=''>🌱 All Levels</option>
        <option value='BEGINNER'>Beginner</option>
        <option value='INTERMEDIATE'>Intermediate</option>
        <option value='EXPERT'>Expert</option>
      </select>

      {hasFilters && (
        <Button 
          variant='ghost' 
          size='sm' 
          onClick={clearFilters}
          className='ml-auto text-muted-foreground hover:text-foreground'
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};
