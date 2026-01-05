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
    <div className="flex gap-3 rounded-lg bg-muted/30 p-4">
      <Link to={`/profile/${author?.id}`}>
        <Avatar className="h-10 w-10">
          <AvatarImage src={author?.profilePhoto} alt={author?.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {author?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <Link
              to={`/profile/${author?.id}`}
              className="font-medium hover:underline"
            >
              {author?.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </p>
          </div>

          {isAuthor && !isEditing && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteComment(comment.id)}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2 space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[60px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleUpdate}>
                <Check className="mr-1 h-4 w-4" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-sm text-foreground/90">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
