import { EnvironmentProfile } from '@/features/environment-profile/types/environment';
import { User } from '@/features/auth/types/user';

export type CommentType = 'NORMAL' | 'CASE_SHARING';

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    author: {
        displayName: string;
        photoURL?: string;
        profileSnapshot?: Partial<EnvironmentProfile>;
    };
    content: string;
    type: CommentType;
    likes: number;
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
}

export interface CommentWithAuthor extends Comment {
    authorProfile?: User;
}
