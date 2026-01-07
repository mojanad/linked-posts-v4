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
import { ArrowLeft, Send } from "lucide-react";
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
          <p className="text-muted-foreground text-sm">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-xl px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <PostCard post={post} showCommentCount={false} />

        {/* Comments Section - Unified */}
        <div className="bg-card rounded-2xl border border-border/50 mt-4 animate-fade-in overflow-hidden">
          <div className="px-4 py-3 border-b border-border/50">
            <p className="text-sm font-medium">{comments.length} Comments</p>
          </div>

          {/* Comments List */}
          <div className="divide-y divide-border/50">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-muted-foreground text-sm">No comments yet. Be the first!</p>
              </div>
            )}
          </div>

          {/* Add Comment - At Bottom */}
          <div className="p-4 border-t border-border/50 bg-muted/30">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="min-h-[60px] rounded-xl resize-none bg-background"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!commentContent.trim() || isSubmitting}
                    className="rounded-full"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
