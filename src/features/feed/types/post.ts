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
    duration?: number;
    status?: string;
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

    // Failure Specific (Optional)
    failureStatus?: 'DEAD' | 'RECOVER_IMPOSSIBLE';
    failureDuration?: number;
    failureCauses?: string[];
    failureCause?: string;
    causeAnalysis?: string;
    learnedLesson?: string;
    comparisonTarget?: 'ENVIRONMENT' | 'MANAGEMENT' | 'RESULT';
}

export interface FailurePost extends Post {
    type: PostType.FAILURE;
    failureStatus: 'DEAD' | 'RECOVER_IMPOSSIBLE';
    failureDuration: number;
    failureCauses: string[];
    failureCause: string; // Existing, can be used for summary or primary cause
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
