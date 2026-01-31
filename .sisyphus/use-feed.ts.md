import { useInfiniteQuery } from '@tanstack/react-query';
import { FeedService } from '../services/feed-service';
import { useEnvironmentStore } from '@/features/environment-profile/stores/useEnvironmentStore';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const useFeed = () => {
    const { environment } = useEnvironmentStore();

    return useInfiniteQuery({
        queryKey: ['feed', environment?.residenceType || 'recent'],
        queryFn: async ({ pageParam }) => {
            const lastDoc = pageParam as QueryDocumentSnapshot<DocumentData> | undefined;
            
            if (environment) {
                return FeedService.getEnvironmentFeed(environment, lastDoc);
            } else {
                return FeedService.getRecentFeed(lastDoc);
            }
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.lastDoc,
    });
};
