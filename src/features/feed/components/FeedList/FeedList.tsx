import { PostCard } from '../PostCard/PostCard';
import { useFeed } from '../../hooks/use-feed';
import { Loading } from '@/core/components/Loading';
import { Button } from '@/core/components/Button';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { PostFilter } from '../../types/post';

interface FeedListProps {
    filter?: PostFilter;
}

export const FeedList = ({ filter }: FeedListProps) => {
    const { 
        data, 
        isLoading, 
        isError, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useFeed(filter);

    if (isLoading) {
        return <div className='flex justify-center p-12'><Loading size='lg' /></div>;
    }

    if (isError) {
        return <ErrorMessage message='Failed to load feed. Please try again.' />;
    }

    const allPosts = data?.pages.flatMap(page => page.posts) || [];

    if (allPosts.length === 0) {
        return (
            <div className='text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/20'>
                <p className='text-lg'>No posts found.</p>
                <p className='text-sm'>Try changing your filters or be the first to share your story!</p>
            </div>
        );
    }

    return (
        <div className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {allPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            
            {hasNextPage && (
                <div className='flex justify-center py-6'>
                    <Button 
                        onClick={() => fetchNextPage()} 
                        disabled={isFetchingNextPage}
                        variant='secondary'
                        size='lg'
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More Posts'}
                    </Button>
                </div>
            )}
        </div>
    );
};
