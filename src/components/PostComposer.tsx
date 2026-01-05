import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, Send } from "lucide-react";
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
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    addPost(user!.id, content.trim(), imageUrl.trim() || undefined);
    setContent("");
    setImageUrl("");
    setShowImageInput(false);
    setIsPosting(false);
    toast.success("Post published!");
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-background">
            <AvatarImage src={user?.profilePhoto} alt={user?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[80px] resize-none border-0 bg-muted/50 focus-visible:ring-1"
            />

            {showImageInput && (
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="Paste image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {imageUrl && (
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-48 w-full object-cover"
                  onError={() => setImageUrl("")}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowImageInput(!showImageInput)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Add image
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isPosting}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostComposer;
