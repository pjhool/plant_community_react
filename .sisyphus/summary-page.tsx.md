"use client";

import { usePostForm } from "@/features/post/hooks/use-post-form";
import { usePostMutation } from "@/features/post/hooks/use-post-mutation";
import { Button } from "@/core/components/Button";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
    const { state, reset } = usePostForm();
    const { createPost, isCreating } = usePostMutation();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            await createPost({
                postData: {
                    type: state.type,
                    title: `Failed with ${state.plantInfo.name}`,
                    content: `My ${state.plantInfo.species || 'plant'} ${state.plantInfo.name} failed.`,
                    plant: state.plantInfo,
                    environment: state.environmentSnapshot || { residenceType: 'UNKNOWN' },
                },
                images: state.images
            });
            reset();
            router.push('/');
        } catch (error) {
            alert('Failed to create post');
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-md mx-auto py-10 text-center">
            <h1 className="text-2xl font-bold">Ready to share?</h1>
            <div className="border p-4 rounded bg-muted text-left">
                <p><strong>Type:</strong> {state.type}</p>
                <p><strong>Plant:</strong> {state.plantInfo.name} ({state.plantInfo.species || 'N/A'})</p>
            </div>
            
            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => router.back()}>Back</Button>
                <Button 
                    onClick={handleSubmit} 
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : 'Share My Story'}
                </Button>
            </div>
        </div>
    );
}
