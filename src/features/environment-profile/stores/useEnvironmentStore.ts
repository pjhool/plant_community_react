import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EnvironmentProfile } from '../types/environment';

interface EnvironmentStore {
  profile: EnvironmentProfile | null;
  setProfile: (profile: EnvironmentProfile | null) => void;
  reset: () => void;
}

export const useEnvironmentStore = create<EnvironmentStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      reset: () => set({ profile: null }),
    }),
    {
      name: 'environment-storage',
    }
  )
);
