
import { Navigation } from '@/components/layout/Navigation';
import { CreatePost } from '@/components/posts/CreatePost';

const CreatePostPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-6">
        <CreatePost />
      </main>
    </div>
  );
};

export default CreatePostPage;
