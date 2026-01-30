import { PostType, PlantInfo } from '@/features/feed/types/post';
import { Environment } from '@/features/environment-profile/types/environment';

export interface PostCreationState {
    type: PostType | null;
    environmentSnapshot: Environment | null;
    plantInfo: PlantInfo;
    title: string;
    content: string;
    images: File[];
    failureCause?: string;
    learnedLesson?: string;
}

export const initialPostCreationState: PostCreationState = {
    type: null,
    environmentSnapshot: null,
    plantInfo: {
        name: '',
        species: '',
        imageUrls: [],
    },
    title: '',
    content: '',
    images: [],
};
