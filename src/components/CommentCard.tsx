import { useState } from "react";
import { Link } from "react-router-dom";
import { Comment } from "@/types";
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
import { MoreHorizontal, Pencil, Trash2, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const { user } = useAuth();
  const { getUserById, updateComment, deleteComment } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const author = getUserById(comment.userId);
  const isAuthor = user?.id === comment.userId;

  const handleUpdate = () => {
    if (editContent.trim()) {
      updateComment(comment.id, editContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5 animate-fade-in">
      <div className="flex gap-4">
        <Link to={`/profile/${author?.id}`} className="shrink-0">
          <Avatar className="h-10 w-10 ring-2 ring-primary/10 transition-all duration-300 hover:ring-primary/30">
            <AvatarImage src={author?.profilePhoto} alt={author?.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
              {author?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                to={`/profile/${author?.id}`}
                className="font-semibold hover:text-primary transition-colors"
              >
                {author?.name}
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </p>
            </div>

            {isAuthor && !isEditing && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card-elevated rounded-xl p-1">
                  <DropdownMenuItem
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg cursor-pointer gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => deleteComment(comment.id)}
                    className="rounded-lg cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {isEditing ? (
            <div className="mt-3 space-y-3 animate-fade-in">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[80px] rounded-xl border-0 bg-secondary/50 focus-visible:ring-2 focus-visible:ring-primary/50"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdate} className="btn-gradient rounded-xl gap-1">
                  <Check className="h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel} className="rounded-xl gap-1">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-foreground/90 leading-relaxed">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
