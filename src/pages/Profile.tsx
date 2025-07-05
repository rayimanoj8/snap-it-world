
import { Navigation } from '@/components/layout/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-6 max-w-4xl mx-auto p-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
            <p className="text-muted-foreground">@{user?.username}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-3 gap-8 mb-6">
              <div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>
            <p className="text-muted-foreground">Your posts will appear here</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
