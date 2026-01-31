"use client";

import { useAuth } from '@/features/auth/hooks/use-auth';
import { useRouter, useParams } from 'next/navigation';
import { useEnvironmentStore } from '@/features/environment-profile/stores/useEnvironmentStore';
import { PostService } from '@/features/post/services/post-service';
import { Post, PostType } from '@/features/feed/types/post';
import { useEffect, useState } from 'react';
import { Loading } from '@/core/components/Loading';
import { getResidenceLabel, getLightLabel, getExperienceLabel, getEnvironmentTag } from '@/features/environment-profile/utils/labels';
import Image from 'next/image';

export default function PostDetailPage() {
    const { id } = useParams();
    const { profile } = useEnvironmentStore();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            try {
                const data = await PostService.getPost(id as string);
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (isLoading) return <div className='flex justify-center p-20'><Loading size='lg' /></div>;
    if (!post) return <div className='p-20 text-center'>게시물을 찾을 수 없습니다.</div>;

    const isSurvival = post.type === PostType.SURVIVAL;
    const statusEmoji = isSurvival ? '⭕' : '❌';
    const statusText = isSurvival ? '생존' : '사망';

    return (
        <main className='min-h-screen bg-background pb-20'>
            {/* Sticky Environment Header - Requirement 6.1 */}
            <header className='sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b'>
                <div className='container max-w-lg mx-auto px-4 h-16 flex items-center justify-between'>
                    <button onClick={() => router.back()} className='text-gray-600'>
                        <span className='text-xl'>←</span>
                    </button>
                    {profile && (
                        <div className='flex items-center gap-2 font-bold text-gray-800'>
                            <span>🏠 {getResidenceLabel(profile.residenceType)}</span>
                            <span className='text-gray-300'>·</span>
                            <span>{getLightLabel(profile.lightDirection)}</span>
                            <span className='text-gray-300'>·</span>
                            <span>{getExperienceLabel(profile.experienceLevel)}</span>
                        </div>
                    )}
                    <div className='w-6' />
                </div>
            </header>

            <div className='container max-w-lg mx-auto px-4 py-6'>
                {/* Post Author & Time */}
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl'>👤</div>
                    <div>
                        <div className='font-bold text-gray-900'>{post.author?.displayName || 'Unknown'}</div>
                        <div className='text-xs text-gray-400'>
                            {getEnvironmentTag(
                                post.environment.residenceType,
                                post.environment.lightDirection,
                                post.environment.experienceLevel
                            )}
                        </div>
                    </div>
                </div>

                {/* Plant Name & Status */}
                <h1 className='text-2xl font-bold mb-4'>
                    {post.plant.name} · <span className={isSurvival ? 'text-blue-600' : 'text-red-600'}>{statusEmoji} {statusText}</span>
                </h1>

                {/* Content */}
                <div className='prose prose-sm max-w-none text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap'>
                    {post.content}
                </div>

                {/* Images */}
                {post.images && post.images.length > 0 && (
                    <div className='space-y-4 mb-8'>
                        {post.images.map((img, idx) => (
                            <div key={idx} className='relative aspect-square w-full rounded-2xl overflow-hidden border'>
                                <Image
                                    src={img}
                                    alt={`${post.plant.name} ${idx + 1}`}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                <div className='flex items-center gap-4 text-sm text-gray-400 border-y py-4'>
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.commentsCount}</span>
                    <span>👁️ {post.views}</span>
                </div>

                {/* Comments Section Placeholder - Requirement 6.1.1 */}
                <div className='mt-8'>
                    <h3 className='font-bold mb-4'>댓글 {post.commentsCount}</h3>
                    <div className='bg-gray-50 rounded-xl p-8 text-center text-gray-400 text-sm'>
                        아직 댓글이 없습니다.<br />
                        유사한 환경의 경험자들의 조언을 기다려보세요!
                    </div>
                </div>
            </div>
        </main>
    );
}
