"use client";

import { useState } from "react";
import { Button } from "@/core/components/Button";
import { ComparisonService } from "../../services/comparison-service";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { PostType } from "@/features/feed/types/post";

export const ComparisonForm = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [labelA, setLabelA] = useState("");
    const [labelB, setLabelB] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !labelA || !labelB) return;

        setIsSubmitting(true);
        try {
            await ComparisonService.createComparison(user.uid, {
                type: PostType.COMPARISON,
                title: `${labelA} vs ${labelB}`,
                content: `Which one do you prefer for your home?`,
                optionA: { label: labelA },
                optionB: { label: labelB },
                comparisonCriteria: ['Preference'],
            });
            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto py-10">
            <h2 className="text-xl font-bold">Create Comparison Question</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Option A</label>
                    <input 
                        className="w-full border rounded p-2" 
                        value={labelA} 
                        onChange={(e) => setLabelA(e.target.value)}
                        placeholder="e.g. Watering Weekly"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Option B</label>
                    <input 
                        className="w-full border rounded p-2" 
                        value={labelB} 
                        onChange={(e) => setLabelB(e.target.value)}
                        placeholder="e.g. Watering Daily"
                    />
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Question"}
            </Button>
        </form>
    );
};
