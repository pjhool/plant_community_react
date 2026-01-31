export type ResidenceType = 'STUDIO' | 'APARTMENT' | 'HOUSE';
export type LightDirection = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST' | 'UNKNOWN';
export type ExperienceLevel = 'FIRST' | 'FAILED' | 'SUCCESS';

export interface EnvironmentProfile {
  id?: string;
  userId: string;
  residenceType: ResidenceType;
  lightDirection: LightDirection;
  experienceLevel: ExperienceLevel;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentSnapshot extends Omit<EnvironmentProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  timestamp: string;
}
