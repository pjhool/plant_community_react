export type ResidenceType = 'APARTMENT' | 'VILLA' | 'HOUSE' | 'OFFICE' | 'OTHER';

export type LightDirection = 'SOUTH' | 'SOUTH_EAST' | 'SOUTH_WEST' | 'EAST' | 'WEST' | 'NORTH' | 'NONE';

export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface EnvironmentProfile {
  id?: string;
  userId: string;
  residenceType: ResidenceType;
  lightDirection: LightDirection;
  experienceLevel: ExperienceLevel;
  location?: string; // e.g., "Seoul, Korea"
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentSnapshot extends Omit<EnvironmentProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  timestamp: string;
}
