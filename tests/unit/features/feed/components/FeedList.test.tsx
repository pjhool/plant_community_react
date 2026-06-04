import { render, screen, fireEvent } from '@testing-library/react';
import { FeedList } from '@/features/feed/components/FeedList/FeedList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFeed } from '@/features/feed/hooks/use-feed';

// Mock useFeed hook
vi.mock('@/features/feed/hooks/use-feed');

// PostCard uses next/image and useRouter — mock them to keep tests simple
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

vi.mock('@/features/environment-profile/utils/labels', () => ({
  getEnvironmentTag: vi.fn(() => 'TAG'),
}));

describe('FeedList', () => {
  // Minimal post shapes — just enough for PostCard to render without crashing
  const mockPosts = [
    {
      id: '1',
      title: 'Post 1',
      content: 'content 1',
      type: 'FAILURE',
      status: 'PUBLISHED',
      authorId: 'u1',
      author: { displayName: 'User 1' },
      images: [],
      plant: { name: 'Plant 1', imageUrls: [] },
      environment: {
        userId: 'u1',
        residenceType: 'APARTMENT',
        lightDirection: 'SOUTH',
        experienceLevel: 'BEGINNER',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        snapshotAt: {},
      },
      views: 0,
      likes: 0,
      commentsCount: 0,
      createdAt: {},
      updatedAt: {},
    },
    {
      id: '2',
      title: 'Post 2',
      content: 'content 2',
      type: 'FAILURE',
      status: 'PUBLISHED',
      authorId: 'u2',
      author: { displayName: 'User 2' },
      images: [],
      plant: { name: 'Plant 2', imageUrls: [] },
      environment: {
        userId: 'u2',
        residenceType: 'APARTMENT',
        lightDirection: 'SOUTH',
        experienceLevel: 'BEGINNER',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        snapshotAt: {},
      },
      views: 0,
      likes: 0,
      commentsCount: 0,
      createdAt: {},
      updatedAt: {},
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    (useFeed as any).mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    render(<FeedList />);
    // Loading component renders a wrapper with role="status"
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });

    render(<FeedList />);
    // Matches the Korean error message used in FeedList.tsx
    expect(screen.getByText('피드를 불러오는데 실패했습니다.')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { pages: [{ posts: [] }] },
    });

    render(<FeedList />);
    // Matches the Korean empty-state text in FeedList.tsx
    expect(screen.getByText(/아직 기록이 없어요/i)).toBeInTheDocument();
    expect(screen.getByText(/첫 번째 주인공이 되어 식물 이야기를 들려주세요/i)).toBeInTheDocument();
  });

  it('renders posts', () => {
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { pages: [{ posts: mockPosts }] },
      hasNextPage: false,
    });

    render(<FeedList />);
    // PostCard renders plant.name inside <h3> with sibling spans (e.g. "Plant 1 · ❌ 사망").
    // Use a regex or substring match to avoid exact-text mismatch.
    expect(screen.getByText(/Plant 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Plant 2/i)).toBeInTheDocument();
  });

  it('renders load more button when hasNextPage is true', () => {
    const fetchNextPage = vi.fn();
    (useFeed as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { pages: [{ posts: mockPosts }] },
      hasNextPage: true,
      fetchNextPage,
      isFetchingNextPage: false,
    });

    render(<FeedList />);
    // Matches the Korean button text in FeedList.tsx
    const button = screen.getByText('더 많은 기록 보기');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(fetchNextPage).toHaveBeenCalled();
  });
});
