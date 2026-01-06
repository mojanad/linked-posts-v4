import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CommentCard from "@/components/CommentCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useAuth();
  const { getPostById, getCommentsByPost, addComment } = useData();
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = getPostById(postId || "");
  const comments = getCommentsByPost(postId || "");

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    addComment(postId!, user!.id, commentContent.trim());
    setCommentContent("");
    setIsSubmitting(false);
    toast.success("Comment added!");
  };

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground">Post not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground rounded-xl px-3 py-2 -ml-3 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Link>

        <div className="animate-fade-in">
          <PostCard post={post} showCommentCount={false} />
        </div>

        <div className="mt-8 space-y-6">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
            Comments ({comments.length})
          </h2>

          {/* Comment composer */}
          <div className="glass-card rounded-2xl p-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 ring-2 ring-primary/10 shrink-0">
                <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="min-h-[80px] resize-none rounded-xl border-0 bg-secondary/50 focus-visible:ring-2 focus-visible:ring-primary/50"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddComment}
                    disabled={!commentContent.trim() || isSubmitting}
                    className="btn-gradient rounded-xl gap-2"
                  >
                    {isSubmitting ? (
                      <Sparkles className="h-4 w-4 animate-pulse" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-4 stagger-children">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="glass-card rounded-2xl p-10 text-center animate-fade-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <MessageCircle className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="mt-4 text-muted-foreground">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
