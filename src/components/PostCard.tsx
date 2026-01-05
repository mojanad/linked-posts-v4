import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
import { MoreHorizontal, MessageCircle, Pencil, Trash2 } from "lucide-react";
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
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <Link
            to={`/profile/${author?.id}`}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Avatar className="h-12 w-12 ring-2 ring-background">
              <AvatarImage src={author?.profilePhoto} alt={author?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {author?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold leading-none">{author?.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </Link>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setIsEditDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>

        <CardContent className="pb-4">
          <p className="whitespace-pre-wrap text-foreground/90">{post.content}</p>
          {post.image && (
            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt="Post image"
                className="w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}
        </CardContent>

        {showCommentCount && (
          <CardFooter className="border-t border-border/50 pt-3">
            <Link
              to={`/post/${post.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </Link>
          </CardFooter>
        )}
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[120px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
