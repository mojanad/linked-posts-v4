import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import PostComposer from "@/components/PostComposer";
import PostCard from "@/components/PostCard";

const Feed = () => {
  const { posts } = useData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      
      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-6">
          <PostComposer />
          
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
              <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Feed;
