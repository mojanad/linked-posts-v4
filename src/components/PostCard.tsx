import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MoreHorizontal, MessageCircle, Pencil, Trash2, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  showCommentCount?: boolean;
}

const PostCard = ({ post, showCommentCount = true }: PostCardProps) => {
  const { user } = useAuth();
  const { getUserById, getCommentsByPost, updatePost, deletePost } = useData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isLiked, setIsLiked] = useState(false);

  const author = getUserById(post.userId);
  const comments = getCommentsByPost(post.id);
  const isAuthor = user?.id === post.userId;

  const handleUpdate = () => {
    if (editContent.trim()) {
      updatePost(post.id, editContent);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  return (
    <>
      <article className="glass-card rounded-2xl overflow-hidden hover-lift animate-fade-in">
        <div className="p-5 sm:p-6">
          <header className="flex items-start justify-between gap-4">
            <Link
              to={`/profile/${author?.id}`}
              className="flex items-center gap-3 group"
            >
              <Avatar className="h-12 w-12 ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30">
                <AvatarImage src={author?.profilePhoto} alt={author?.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                  {author?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold leading-none group-hover:text-primary transition-colors">
                  {author?.name}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </Link>

            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card-elevated rounded-xl p-1">
                  <DropdownMenuItem
                    onClick={() => setIsEditDialogOpen(true)}
                    className="rounded-lg cursor-pointer gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="rounded-lg cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </header>

          <div className="mt-4">
            <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">{post.content}</p>
            {post.image && (
              <div className="mt-4 overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
          </div>
        </div>

        {showCommentCount && (
          <footer className="flex items-center gap-2 border-t border-border/30 px-5 py-3 sm:px-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isLiked 
                  ? 'text-pink-500 bg-pink-500/10' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Heart className={`h-4 w-4 transition-all ${isLiked ? 'fill-current scale-110' : ''}`} />
              Like
            </button>
            <Link
              to={`/post/${post.id}`}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </Link>
          </footer>
        )}
      </article>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="glass-card-elevated rounded-2xl border-border/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Edit Post</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[120px] rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="btn-gradient rounded-xl">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
