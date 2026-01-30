import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from './PostCard';
import { describe, it, expect, vi } from 'vitest';
import { Post, PostType, PostStatus } from '../../types/post';

describe('PostCard', () => {
  const mockPost: Post = {
    id: '1',
    authorId: 'user1',
    author: {
        uid: 'user1',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'test-url',
        bio: '',
        createdAt: { seconds: 1234567890, nanoseconds: 0 } as any,
        updatedAt: { seconds: 1234567890, nanoseconds: 0 } as any,
        isOnboarded: true
    },
    type: PostType.GENERAL,
    status: PostStatus.PUBLISHED,
    title: 'Test Post',
    content: 'This is a test post content.',
    images: ['test-image.jpg'],
    environment: {
        residenceType: 'APARTMENT',
        lightDirection: 'SOUTH',
        experienceLevel: 'BEGINNER',
        snapshotAt: { seconds: 1234567890, nanoseconds: 0 } as any,
        userId: 'user1',
        location: 'Test Location',
        id: 'env1',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
    } as any, 
    plant: {
        name: 'Monstera',
        imageUrls: []
    },
    views: 10,
    likes: 5,
    commentsCount: 2,
    createdAt: { seconds: 1234567890, nanoseconds: 0 } as any,
    updatedAt: { seconds: 1234567890, nanoseconds: 0 } as any
  };

  it('renders post content correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post content.')).toBeInTheDocument();
    expect(screen.getByText('By Test User')).toBeInTheDocument();
    expect(screen.getByText('👁️ 10')).toBeInTheDocument();
    expect(screen.getByText('❤️ 5')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(<PostCard post={mockPost} />);
    const image = screen.getByAltText('Test Post');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<PostCard post={mockPost} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Test Post').closest('div')!);
    expect(handleClick).toHaveBeenCalled();
  });
});
