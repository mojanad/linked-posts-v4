import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";
import { toast } from "sonner";

const PostComposer = () => {
  const { user } = useAuth();
  const { addPost } = useData();
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write something to post");
      return;
    }

    setIsPosting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    addPost(user!.id, content.trim(), imagePreview || undefined);
    setContent("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

          {imagePreview && (
            <div className="relative mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-xl max-h-48 object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 hover:bg-background"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Image className="h-4 w-4" />
              <span className="text-xs hidden sm:inline">Photo</span>
            </Button>

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
