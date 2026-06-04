"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/core/components/Loading';

export default function PostCreatePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the first step of the post creation wizard
        router.replace('/posts/create/type');
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loading size="lg" />
        </div>
    );
}
