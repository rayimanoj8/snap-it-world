
import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';
import { Post } from '@/types';
import { api, API_ENDPOINTS } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.posts);
      const postsData = response.data;
      
      // Check like status for each post
      const postsWithLikeStatus = await Promise.all(
        postsData.map(async (post: Post) => {
          try {
            const likeResponse = await api.get(`${API_ENDPOINTS.likes}/post/${post.id}/liked`);
            return { ...post, liked: likeResponse.data.liked };
          } catch {
            return { ...post, liked: false };
          }
        })
      );
      
      setPosts(postsWithLikeStatus.reverse()); // Show newest first
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-full max-w-lg mx-auto">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <div className="bg-muted rounded-lg p-8">
          <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
          <p className="text-muted-foreground">Be the first to share something amazing!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 pb-20 md:pb-4">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onPostUpdate={handlePostUpdate}
        />
      ))}
    </div>
  );
};
