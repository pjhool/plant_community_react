import { useQuery } from '@tanstack/react-query';
import { AuthService } from '../services/auth-service';
import { useAuth } from './use-auth';

/**
 * Hook to fetch detailed user profile data.
 * Usage: const { data: userProfile, isLoading } = useUser(uid);
 * If no uid is provided, it uses the currently authenticated user's uid.
 */
export const useUser = (uid?: string) => {
    const { user: authUser } = useAuth();
    const targetUid = uid || authUser?.uid;

    return useQuery({
        queryKey: ['user', targetUid],
        queryFn: () => AuthService.getUserProfile(targetUid!),
        enabled: !!targetUid,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
