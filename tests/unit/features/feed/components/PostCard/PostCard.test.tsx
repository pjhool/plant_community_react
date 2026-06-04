import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostCard } from '@/features/feed/components/PostCard/PostCard';
import { Post, PostType, PostStatus } from '@/features/feed/types/post';
import { Timestamp } from 'firebase/firestore';

const mockPost: Post = {
    id: '123',
    authorId: 'user1',
    author: { uid: 'user1', displayName: 'Test Author', email: 'test@test.com', photoURL: null, bio: '', createdAt: {} as any, updatedAt: {} as any },
    type: PostType.FAILURE,
    status: PostStatus.PUBLISHED,
    title: 'My Dead Plant',
    content: 'It died so fast...',
    images: ['https://example.com/plant.jpg'],
    environment: { residenceType: 'APARTMENT', lightDirection: 'SOUTH', experienceLevel: 'BEGINNER', snapshotAt: {} as Timestamp },
    plant: { name: 'Monstera', imageUrls: [] },
    views: 10,
    likes: 5,
    commentsCount: 2,
    createdAt: {} as Timestamp,
    updatedAt: {} as Timestamp,
};

describe('PostCard', () => {
    it('renders post information correctly', () => {
        render(<PostCard post={mockPost} />);
        
        expect(screen.getByText('My Dead Plant')).toBeDefined();
        expect(screen.getByText('It died so fast...')).toBeDefined();
        expect(screen.getByText('By Test Author')).toBeDefined();
        expect(screen.getByText('👁️ 10')).toBeDefined();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<PostCard post={mockPost} onClick={handleClick} />);
        
        fireEvent.click(screen.getByText('My Dead Plant'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
