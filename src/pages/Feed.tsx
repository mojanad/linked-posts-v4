import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import PostComposer from "@/components/PostComposer";
import PostCard from "@/components/PostCard";

const Feed = () => {
  const { posts } = useData();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="mx-auto max-w-xl px-4 py-6">
        <div className="space-y-4">
          <PostComposer />
          
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {posts.length === 0 && (
            <div className="bg-card rounded-2xl border border-border/50 p-8 text-center">
              <p className="text-muted-foreground text-sm">No posts yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Feed;
