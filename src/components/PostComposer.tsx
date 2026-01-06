import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image, Hash, Calendar } from "lucide-react";
import { toast } from "sonner";

const PostComposer = () => {
  const { user } = useAuth();
  const { addPost } = useData();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write something to post");
      return;
    }

    setIsPosting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    addPost(user!.id, content.trim(), imageUrl.trim() || undefined);
    setContent("");
    setImageUrl("");
    setShowImageInput(false);
    setIsPosting(false);
    toast.success("Post published!");
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-4 animate-fade-in">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.profilePhoto} alt={user?.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <input
            type="text"
            placeholder="What is happening!?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none py-2"
          />

          {showImageInput && (
            <input
              type="url"
              placeholder="Paste image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm mt-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-2 rounded-xl max-h-40 object-cover"
              onError={() => setImageUrl("")}
            />
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowImageInput(!showImageInput)}
                className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <Image className="h-4 w-4" />
                <span className="text-xs hidden sm:inline">Media Content</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span className="text-xs hidden sm:inline">Hashtags</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-xs hidden sm:inline">Schedule</span>
              </Button>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isPosting}
              size="sm"
              className="h-8 rounded-full px-4"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
