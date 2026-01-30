"use client";

import { usePostForm } from "@/features/post/hooks/use-post-form";
import { Button } from "@/core/components/Button";
import { useRouter } from "next/navigation";

export default function PlantInfoPage() {
    const { state, updateState } = usePostForm();
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 max-w-md mx-auto py-10">
            <h1 className="text-2xl font-bold text-center">Tell us about your plant</h1>
            <div className="grid gap-4">
                <input 
                    type="text" 
                    placeholder="Plant Name (e.g. My Monstera)" 
                    className="border p-2 rounded"
                    value={state.plantInfo.name}
                    onChange={(e) => updateState({ plantInfo: { ...state.plantInfo, name: e.target.value } })}
                />
                <input 
                    type="text" 
                    placeholder="Species (Optional)" 
                    className="border p-2 rounded"
                    value={state.plantInfo.species}
                    onChange={(e) => updateState({ plantInfo: { ...state.plantInfo, species: e.target.value } })}
                />
            </div>
            
            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => router.back()}>Back</Button>
                <Button 
                    disabled={!state.plantInfo.name} 
                    onClick={() => router.push('/posts/create/summary')}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
