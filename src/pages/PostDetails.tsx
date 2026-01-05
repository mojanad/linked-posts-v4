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
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Navbar />
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Link>

        <PostCard post={post} showCommentCount={false} />

        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Comments ({comments.length})
          </h2>

          {/* Comment composer */}
          <div className="flex gap-3 rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profilePhoto} alt={user?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="min-h-[60px] resize-none border-0 bg-muted/50 focus-visible:ring-1"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!commentContent.trim() || isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-3">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center">
                <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
