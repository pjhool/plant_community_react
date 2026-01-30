import { Post, PostType } from '@/features/feed/types/post';

export interface ComparisonPost extends Post {
    type: PostType.COMPARISON;
    optionA: {
        label: string;
        imageUrl?: string;
    };
    optionB: {
        label: string;
        imageUrl?: string;
    };
    comparisonCriteria: string[]; // e.g., ['Watering', 'Light', 'Potting']
}

export interface ComparisonVote {
    postId: string;
    userId: string;
    selectedOption: 'A' | 'B';
    votedAt: any;
}
