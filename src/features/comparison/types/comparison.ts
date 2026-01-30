import { Timestamp } from 'firebase/firestore';
import { Post } from '../../feed/types/post';

export interface Comparison {
    id: string;
    userId: string;
    postIds: string[]; // Two failure posts being compared
    situationPostId: string; // The current situation post (could be a question)
    
    // Metadata
    title: string;
    description: string;
    
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface ComparisonDetail extends Omit<Comparison, 'postIds' | 'situationPostId'> {
    failurePosts: Post[];
    situationPost: Post;
}
