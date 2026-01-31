import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PostType, PlantInfo } from '../../feed/types/post';
import { EnvironmentProfileSnapshot } from '../../feed/types/post';

interface PostFormData {
    type: PostType;
    title: string;
    content: string;
    images: string[];
    imageFiles: File[];
    environment: Partial<EnvironmentProfileSnapshot>;
    plant: Partial<PlantInfo> & { duration?: number; status?: 'DEAD' | 'RECOVER_IMPOSSIBLE' };
    failureCauses: string[];
    failureCause: string;
    causeAnalysis?: string;
    learnedLesson?: string;
    // Comparison Specific
    comparisonTarget?: 'ENVIRONMENT' | 'MANAGEMENT' | 'RESULT';
    isValidated?: boolean;
    // Survival Specific
    managementSummary?: string;
    waterCycle?: string;
    sunlightLevel?: string;
    ventilation?: string;
}

interface PostFormStore {
    data: PostFormData;
    step: number;
    updateData: (data: Partial<PostFormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    reset: () => void;
}

const initialData: PostFormData = {
    type: PostType.SURVIVAL, // default to survival but UI will focus failure
    title: '',
    content: '',
    images: [],
    imageFiles: [],
    environment: {},
    plant: { name: '', imageUrls: [] },
    failureCauses: [],
    failureCause: '',
    comparisonTarget: undefined,
    isValidated: false,
};

export const usePostFormStore = create<PostFormStore>()(
    persist(
        (set) => ({
            data: initialData,
            step: 1,
            updateData: (newData) => set((state) => ({
                data: { ...state.data, ...newData }
            })),
            nextStep: () => set((state) => ({ step: state.step + 1 })),
            prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
            setStep: (step) => set({ step }),
            reset: () => set({ data: initialData, step: 1 }),
        }),
        {
            name: 'post-form-storage',
            // Don't persist image files
            partialize: (state) => ({
                data: { ...state.data, imageFiles: [] },
                step: state.step,
            }),
        }
    )
);
