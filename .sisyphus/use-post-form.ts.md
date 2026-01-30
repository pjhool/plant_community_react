import { create } from 'zustand';
import { PostCreationState, initialPostCreationState } from '../types/post-creation';
import { PostType } from '@/features/feed/types/post';

interface PostFormStore {
    state: PostCreationState;
    step: number;
    setStep: (step: number) => void;
    updateState: (updates: Partial<PostCreationState>) => void;
    reset: () => void;
}

export const usePostFormStore = create<PostFormStore>((set) => ({
    state: initialPostCreationState,
    step: 1,
    setStep: (step) => set({ step }),
    updateState: (updates) => set((s) => ({ state: { ...s.state, ...updates } })),
    reset: () => set({ state: initialPostCreationState, step: 1 }),
}));

export const usePostForm = () => {
    const { state, step, setStep, updateState, reset } = usePostFormStore();

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(Math.max(1, step - 1));

    return {
        state,
        step,
        nextStep,
        prevStep,
        updateState,
        reset,
    };
};
