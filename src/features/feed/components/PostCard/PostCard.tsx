import { Post, PostType } from '../../types/post';
import { getEnvironmentTag } from '@/features/environment-profile/utils/labels';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PostCardProps {
    post: Post;
    onClick?: () => void;
}

export const PostCard = ({ post, onClick }: PostCardProps) => {
    const router = useRouter();
    const isSurvival = post.type === PostType.SURVIVAL;
    const statusEmoji = isSurvival ? '⭕' : '❌';
    const statusText = isSurvival ? '생존' : '사망';

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.push(`/posts/${post.id}`);
        }
    };

    return (
        <div
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-card text-card-foreground mb-4"
            onClick={handleClick}
        >
            {/* Header: Environment Tag */}
            <div className="mb-3">
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                    [{getEnvironmentTag(
                        post.environment.residenceType,
                        post.environment.lightDirection,
                        post.environment.experienceLevel
                    )}]
                </span>
            </div>

            {/* Plant Info & Status */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold">
                    {post.plant.name} · <span className={isSurvival ? 'text-blue-600' : 'text-red-600'}>{statusEmoji} {statusText}</span>
                </h3>
            </div>

            <hr className="border-gray-100 mb-3" />

            {post.images && post.images.length > 0 && (
                <div className="w-full h-48 bg-muted rounded-xl mb-4 overflow-hidden relative border border-gray-50">
                    <Image
                        src={post.images[0]}
                        alt={post.plant.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                {post.content}
            </p>

            <div className="flex justify-between items-center text-xs text-gray-400">
                <span>By {post.author?.displayName || 'Unknown'}</span>
                <div className="flex gap-3">
                    <span className="flex items-center gap-1">👍 {post.likes}</span>
                    <span className="flex items-center gap-1">💬 {post.commentsCount}</span>
                </div>
            </div>
        </div>
    );
};
