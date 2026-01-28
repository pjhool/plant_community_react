import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EnvironmentService } from '../services/environment-service';
import { useEnvironmentStore } from '../stores/useEnvironmentStore';
import { useEffect } from 'react';
import { EnvironmentProfile } from '../types/environment';

export const useEnvironment = (userId?: string) => {
  const queryClient = useQueryClient();
  const { profile, setProfile } = useEnvironmentStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['environment-profile', userId],
    queryFn: () => userId ? EnvironmentService.getProfile(userId) : Promise.resolve(null),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);

  const saveMutation = useMutation({
    mutationFn: ({ userId, profile }: { userId: string, profile: Omit<EnvironmentProfile, 'userId' | 'createdAt' | 'updatedAt'> }) => 
      EnvironmentService.saveProfile(userId, profile),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['environment-profile', userId] });
    },
  });

  return {
    profile: data || profile,
    isLoading,
    error,
    saveProfile: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
};
