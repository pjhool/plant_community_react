"use client";

import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/core/components/Button';
import { useRouter } from 'next/navigation';
import { FeedList } from '@/features/feed/components/FeedList/FeedList';
import { FilterBar } from '@/features/feed/components/FilterBar/FilterBar';
import { PostFilter } from '@/features/feed/types/post';

export default function HomePage() {
    const { signOut, user } = useAuth();
    const router = useRouter();
    const [filter, setFilter] = useState<PostFilter>({});

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    return (
        <main className='min-h-screen bg-background'>
            {/* Navigation / Header Stub */}
            <header className='sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className='container flex h-16 items-center justify-between mx-auto px-4'>
                    <div className='flex items-center gap-2'>
                        <span className='text-2xl font-bold text-primary'>🌱 Plant Community</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <span className='text-sm text-muted-foreground hidden sm:inline'>Welcome, {user?.displayName || 'Gardener'}!</span>
                        <Button onClick={handleSignOut} variant='ghost' size='sm'>
                            Sign Out
                        </Button>
                        <Button onClick={() => router.push('/posts/create')} size='sm'>
                            Create Post
                        </Button>
                    </div>
                </div>
            </header>

            <div className='container max-w-6xl py-8 mx-auto px-4'>
                <div className='flex flex-col gap-8'>
                    {/* Welcome Section */}
                    <section className='space-y-4'>
                        <h1 className='text-3xl font-bold tracking-tight'>Discover your neighborhood gardeners</h1>
                        <p className='text-muted-foreground'>See how others are caring for their plants in environments like yours.</p>
                    </section>

                    {/* Feed Section */}
                    <section className='space-y-6'>
                        <FilterBar filter={filter} onFilterChange={setFilter} />
                        <FeedList filter={filter} />
                    </section>
                </div>
            </div>
            {/* Bottom Navigation */}
            <nav className='fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-4 z-50'>
                <button onClick={() => router.push('/')} className='flex flex-col items-center gap-1 text-green-600'>
                    <span className='text-xl'>🏠</span>
                    <span className='text-[10px] font-bold'>홈</span>
                </button>
                <button onClick={() => router.push('/feed')} className='flex flex-col items-center gap-1 text-gray-400'>
                    <span className='text-xl'>📋</span>
                    <span className='text-[10px]'>기록</span>
                </button>
                <button onClick={() => router.push('/posts/create/type')} className='flex flex-col items-center gap-1 text-gray-400'>
                    <span className='text-xl'>✍️</span>
                    <span className='text-[10px]'>작성</span>
                </button>
                <button onClick={() => router.push('/onboarding/summary')} className='flex flex-col items-center gap-1 text-gray-400'>
                    <span className='text-xl'>👤</span>
                    <span className='text-[10px]'>내정보</span>
                </button>
            </nav>
        </main>
    );
}
