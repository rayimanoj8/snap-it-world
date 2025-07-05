
import { Navigation } from '@/components/layout/Navigation';
import { PostFeed } from '@/components/posts/PostFeed';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-6">
        <PostFeed />
      </main>
    </div>
  );
};

export default Home;
