import { Timestamp } from 'firebase/firestore';

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    author: {
        displayName: string;
        photoURL?: string;
    };
    content: string;
    likes: number;
    parentId?: string; // For threading
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
