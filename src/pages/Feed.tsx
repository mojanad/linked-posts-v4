import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import PostComposer from "@/components/PostComposer";
import PostCard from "@/components/PostCard";
import { FileText } from "lucide-react";

const Feed = () => {
  const { posts } = useData();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-6 stagger-children">
          <PostComposer />
          
          <div className="space-y-5">
            {posts.map((post, index) => (
              <div key={post.id} style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="glass-card rounded-2xl p-12 text-center animate-fade-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">No posts yet</h3>
              <p className="mt-2 text-muted-foreground">Be the first to share something!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Feed;
