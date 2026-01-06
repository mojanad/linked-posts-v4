import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { MoreHorizontal, MessageCircle, Pencil, Trash2, Heart, Share2, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  showCommentCount?: boolean;
}

const PostCard = ({ post, showCommentCount = true }: PostCardProps) => {
  const { user } = useAuth();
  const { getUserById, getCommentsByPost, updatePost, deletePost } = useData();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const author = getUserById(post.userId);
  const comments = getCommentsByPost(post.id);
  const isAuthor = user?.id === post.userId;
  const firstComment = comments[0];
  const firstCommentAuthor = firstComment ? getUserById(firstComment.userId) : null;

  const handleUpdate = () => {
    if (editContent.trim()) {
      updatePost(post.id, editContent);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    navigate(`/post/${post.id}`);
  };

  return (
    <>
      <article 
        onClick={handleCardClick}
        className="bg-card rounded-2xl border border-border/50 overflow-hidden cursor-pointer transition-all hover:border-border animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author?.profilePhoto} alt={author?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {author?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{author?.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="cursor-pointer">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Image */}
        {post.image && (
          <div className="px-4">
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-xl object-cover max-h-80"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 pt-3">
          <p className="text-sm leading-relaxed">{post.content}</p>
        </div>

        {/* Actions */}
        {showCommentCount && (
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                className={`h-8 gap-1.5 rounded-full ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs">1.6k</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{comments.length}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full">
                <Share2 className="h-4 w-4" />
                <span className="text-xs">351</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
              className={`h-8 w-8 rounded-full ${isSaved ? 'text-primary' : ''}`}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        )}

        {/* First Comment Preview */}
        {showCommentCount && firstComment && (
          <div className="border-t border-border/50 px-4 py-3">
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={firstCommentAuthor?.profilePhoto} />
                <AvatarFallback className="bg-secondary text-xs">
                  {firstCommentAuthor?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs">
                  <span className="font-medium">{firstCommentAuthor?.name}</span>{" "}
                  <span className="text-muted-foreground line-clamp-1">{firstComment.content}</span>
                </p>
              </div>
            </div>
            {comments.length > 1 && (
              <p className="text-xs text-muted-foreground mt-2">
                View all {comments.length} comments
              </p>
            )}
          </div>
        )}
      </article>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[100px] rounded-xl"
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
