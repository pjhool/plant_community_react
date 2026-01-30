import { render, screen, fireEvent } from '@testing-library/react';
import { FeedList } from './FeedList';
import { describe, it, expect, vi } from 'vitest';
import { useFeed } from '../../hooks/use-feed';

// Mock useFeed hook
vi.mock('../../hooks/use-feed');

describe('FeedList', () => {
  const mockPosts = [
    { id: '1', title: 'Post 1', author: { displayName: 'User 1' } },
    { id: '2', title: 'Post 2', author: { displayName: 'User 2' } },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    (useFeed as any).mockReturnValue({
      isLoading: true,
      data: undefined
    });
    
    render(<FeedList />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // Assumes Loading component has role='status' or similar check
  });

  it('renders error state', () => {
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined
    });
    
    render(<FeedList />);
    expect(screen.getByText('Failed to load feed. Please try again.')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { pages: [{ posts: [] }] }
    });
    
    render(<FeedList />);
    expect(screen.getByText('No posts found. Be the first to share your story!')).toBeInTheDocument();
  });

  it('renders posts', () => {
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { pages: [{ posts: mockPosts }] },
      hasNextPage: false
    });
    
    render(<FeedList />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('renders load more button when hasNextPage is true', () => {
    const fetchNextPage = vi.fn();
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { pages: [{ posts: mockPosts }] },
      hasNextPage: true,
      fetchNextPage,
      isFetchingNextPage: false
    });
    
    render(<FeedList />);
    const button = screen.getByText('Load More');
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(fetchNextPage).toHaveBeenCalled();
  });
});
