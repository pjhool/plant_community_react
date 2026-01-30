import { Timestamp } from 'firebase/firestore';
import { User } from '@/features/auth/types/user';
import { EnvironmentProfile } from '@/features/environment-profile/types/environment';

export enum PostType {
    FAILURE = 'FAILURE',
    COMPARISON = 'COMPARISON',
    SURVIVAL = 'SURVIVAL',
}

export enum PostStatus {
    PUBLISHED = 'PUBLISHED',
    HIDDEN = 'HIDDEN',
    DRAFT = 'DRAFT',
}

export interface EnvironmentProfileSnapshot extends EnvironmentProfile {
    snapshotAt: Timestamp;
}

export interface PlantInfo {
    name: string;
    species?: string;
    adoptionDate?: Timestamp;
    imageUrls: string[];
}

export interface Post {
    id: string;
    authorId: string;
    author?: User; // Joined data
    type: PostType;
    status: PostStatus;
    title: string;
    content: string;
    images: string[];
    
    // Core Data
    environment: EnvironmentProfileSnapshot;
    plant: PlantInfo;
    
    // Metadata
    views: number;
    likes: number;
    commentsCount: number;
    
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FailurePost extends Post {
    type: PostType.FAILURE;
    failureCause: string;
    causeAnalysis?: string;
    learnedLesson?: string;
}

export interface PostFilter {
    type?: PostType;
    residenceType?: string;
    lightDirection?: string;
    experienceLevel?: string;
    userId?: string;
}
