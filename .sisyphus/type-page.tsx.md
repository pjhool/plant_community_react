"use client";

import { usePostForm } from "@/features/post/hooks/use-post-form";
import { PostType } from "@/features/feed/types/post";
import { Button } from "@/core/components/Button";
import { useRouter } from "next/navigation";

export default function PostTypePage() {
    const { state, updateState, nextStep } = usePostForm();
    const router = useRouter();

    const handleSelect = (type: PostType) => {
        updateState({ type });
        // In a real app, we'd navigate to the next step
        // router.push('/posts/create/plant-info');
    };

    return (
        <div className="flex flex-col gap-6 max-w-md mx-auto py-10">
            <h1 className="text-2xl font-bold text-center">What story do you want to share?</h1>
            <div className="grid gap-4">
                <Button 
                    onClick={() => handleSelect(PostType.FAILURE)}
                    variant={state.type === PostType.FAILURE ? "default" : "outline"}
                    className="h-20 text-lg"
                >
                    🥀 My Plant Failed
                </Button>
                <Button 
                    onClick={() => handleSelect(PostType.COMPARISON)}
                    variant={state.type === PostType.COMPARISON ? "default" : "outline"}
                    className="h-20 text-lg"
                    disabled // Task for Phase 6
                >
                    🆚 Help me compare (Coming Soon)
                </Button>
                <Button 
                    onClick={() => handleSelect(PostType.SURVIVAL)}
                    variant={state.type === PostType.SURVIVAL ? "default" : "outline"}
                    className="h-20 text-lg"
                    disabled // Task for Phase 8
                >
                    📈 Survival Diary (Coming Soon)
                </Button>
            </div>
            
            <div className="flex justify-end mt-6">
                <Button 
                    disabled={!state.type} 
                    onClick={() => router.push('/posts/create/plant-info')}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
