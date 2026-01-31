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
        return <ErrorMessage message='피드를 불러오는데 실패했습니다.' />;
    }

    const allPosts = data?.pages.flatMap(page => page.posts) || [];

    if (allPosts.length === 0) {
        return (
            <div className='text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl bg-muted/20'>
                <p className='text-lg mb-2'>아직 기록이 없어요 🌿</p>
                <p className='text-sm'>첫 번째 주인공이 되어 식물 이야기를 들려주세요!</p>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            {allPosts.length < 3 && (
                <div className='bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 text-sm text-orange-800 text-center font-medium'>
                    ⚠️ 아직 기록이 적어요. 다른 환경의 기록도 참고해보세요!
                </div>
            )}

            <div className='flex flex-col gap-4'>
                {allPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {hasNextPage && (
                <div className='flex justify-center py-6'>
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        variant='outline'
                        className='w-full max-w-xs'
                    >
                        {isFetchingNextPage ? '불러오는 중...' : '더 많은 기록 보기'}
                    </Button>
                </div>
            )}
        </div>
    );
};
