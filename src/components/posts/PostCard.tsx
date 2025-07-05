
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { Post } from '@/types';
import { api, API_ENDPOINTS } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface PostCardProps {
  post: Post;
  onPostUpdate?: (updatedPost: Post) => void;
}

export const PostCard = ({ post, onPostUpdate }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiking, setIsLiking] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      if (isLiked) {
        // Unlike
        await api.delete(`${API_ENDPOINTS.likes}/${post.id}`);
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        // Like
        await api.post(API_ENDPOINTS.likes, { postId: post.id });
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }

      if (onPostUpdate) {
        onPostUpdate({
          ...post,
          liked: !isLiked,
          likeCount: isLiked ? likeCount - 1 : likeCount + 1
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto post-card-hover">
      <CardHeader className="flex flex-row items-center space-y-0 pb-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {post.user.firstName?.[0]}{post.user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-semibold">{post.user.firstName} {post.user.lastName}</p>
          <p className="text-xs text-muted-foreground">@{post.user.username}</p>
        </div>
      </CardHeader>

      {post.imageUrl && (
        <div className="relative">
          <img
            src={post.imageUrl}
            alt="Post image"
            className="w-full aspect-square object-cover"
          />
        </div>
      )}

      <CardContent className="pt-4">
        <p className="text-sm text-foreground">{post.content}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className={`heart-animation ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Share className="h-5 w-5" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          {likeCount} {likeCount === 1 ? 'like' : 'likes'}
        </span>
      </CardFooter>
    </Card>
  );
};
