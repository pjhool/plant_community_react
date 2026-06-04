import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { FeedService } from '../services/feed-service';
import { useEnvironmentStore } from '@/features/environment-profile/stores/useEnvironmentStore';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Post, PostFilter } from '../types/post';

export const useFeed = (filter: PostFilter = {}) => {
    const { profile: environment } = useEnvironmentStore();

    return useInfiniteQuery<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }, Error, InfiniteData<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }, QueryDocumentSnapshot<DocumentData> | undefined>, (string | PostFilter)[], QueryDocumentSnapshot<DocumentData> | undefined>({
        queryKey: ['feed', environment?.id || 'none', filter],
        queryFn: async ({ pageParam }): Promise<{ posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> => {
            const lastDoc = pageParam as QueryDocumentSnapshot<DocumentData> | undefined;

            // If specific filters are provided via FilterBar, use getFeed directly
            if (Object.keys(filter).length > 0) {
                return FeedService.getFeed(filter, lastDoc);
            }

            // Default behavior: use environment-based feed if profile exists, else recent
            if (environment) {
                return FeedService.getEnvironmentProfileFeed(environment, lastDoc);
            } else {
                return FeedService.getRecentFeed(lastDoc);
            }
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.lastDoc,
    });
};
