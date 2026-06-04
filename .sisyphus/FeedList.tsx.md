import { PostCard } from '../PostCard/PostCard';
import { useFeed } from '../../hooks/use-feed';
import { Loading } from '@/core/components/Loading';
import { Button } from '@/core/components/Button';
import { ErrorMessage } from '@/core/components/ErrorMessage';

export const FeedList = () => {
    const { 
        data, 
        isLoading, 
        isError, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useFeed();

    if (isLoading) {
        return <Loading size="lg" />;
    }

    if (isError) {
        return <ErrorMessage message="Failed to load feed. Please try again." />;
    }

    if (!data || data.pages[0].posts.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No posts found. Be the first to share your story!
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.pages.map((page, i) => (
                    page.posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ))}
            </div>
            
            {hasNextPage && (
                <div className="flex justify-center py-4">
                    <Button 
                        onClick={() => fetchNextPage()} 
                        disabled={isFetchingNextPage}
                        variant="outline"
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </Button>
                </div>
            )}
        </div>
    );
};
