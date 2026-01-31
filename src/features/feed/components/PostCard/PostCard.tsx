import { Post } from '../../types/post';
import { Button } from '@/core/components/Button';
import Image from 'next/image';

interface PostCardProps {
    post: Post;
    onClick?: () => void;
}

export const PostCard = ({ post, onClick }: PostCardProps) => {
    return (
        <div
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-card text-card-foreground"
            onClick={onClick}
        >
            {post.images && post.images.length > 0 && (
                <div className="w-full h-48 bg-muted rounded-md mb-4 overflow-hidden relative">
                    <Image
                        src={post.images[0]}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                {post.content}
            </p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>By {post.author?.displayName || 'Unknown'}</span>
                <div className="flex gap-2">
                    <span>👁️ {post.views}</span>
                    <span>❤️ {post.likes}</span>
                </div>
            </div>
        </div>
    );
};
