import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, Send, Sparkles } from "lucide-react";
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
    <div className="glass-card rounded-2xl p-5 sm:p-6 animate-fade-in">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12 ring-2 ring-primary/10 shrink-0">
          <AvatarImage src={user?.profilePhoto} alt={user?.name} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none rounded-xl border-0 bg-secondary/50 text-base placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/50"
          />

          {showImageInput && (
            <div className="flex items-center gap-2 animate-fade-in">
              <input
                type="url"
                placeholder="Paste image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 rounded-xl border-0 bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowImageInput(false);
                  setImageUrl("");
                }}
                className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          {imageUrl && (
            <div className="relative overflow-hidden rounded-xl animate-scale-in">
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-48 w-full object-cover"
                onError={() => setImageUrl("")}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImageInput(!showImageInput)}
              className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary gap-2"
            >
              <ImagePlus className="h-5 w-5" />
              <span className="hidden sm:inline">Add image</span>
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isPosting}
              className="btn-gradient rounded-xl gap-2 px-5"
            >
              {isPosting ? (
                <Sparkles className="h-4 w-4 animate-pulse" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Publish</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
