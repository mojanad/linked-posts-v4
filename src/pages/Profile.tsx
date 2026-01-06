import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, ImagePlus, FileText, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser, updateProfilePhoto } = useAuth();
  const { getUserById, getPostsByUser } = useData();
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const profileUser = getUserById(userId || "");
  const userPosts = getPostsByUser(userId || "");
  const isOwnProfile = currentUser?.id === userId;

  const handleUpdatePhoto = () => {
    if (newPhotoUrl.trim()) {
      updateProfilePhoto(newPhotoUrl.trim());
      setIsPhotoDialogOpen(false);
      setNewPhotoUrl("");
      toast.success("Profile photo updated!");
    }
  };

  if (!profileUser) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground">User not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Profile Header */}
        <div className="glass-card rounded-3xl overflow-hidden mb-8 animate-fade-in">
          {/* Cover gradient */}
          <div className="h-32 sm:h-40 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          </div>
          
          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <div className="absolute -top-16 sm:-top-20 left-6">
              <div className="relative group">
                <Avatar className="h-28 w-28 sm:h-36 sm:w-36 border-4 border-card ring-4 ring-primary/10 shadow-medium transition-all duration-300 group-hover:ring-primary/30">
                  <AvatarImage 
                    src={isOwnProfile ? currentUser?.profilePhoto : profileUser.profilePhoto} 
                    alt={profileUser.name} 
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-3xl sm:text-4xl text-primary-foreground font-bold">
                    {profileUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <Button
                    size="icon"
                    className="absolute bottom-1 right-1 h-9 w-9 rounded-full shadow-medium bg-card hover:bg-secondary border border-border/50"
                    onClick={() => setIsPhotoDialogOpen(true)}
                  >
                    <ImagePlus className="h-4 w-4 text-foreground" />
                  </Button>
                )}
              </div>
            </div>

            {/* User info */}
            <div className="pt-16 sm:pt-20 sm:pl-44">
              <h1 className="font-display text-2xl sm:text-3xl font-bold">{profileUser.name}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1.5">
                  <Mail className="h-4 w-4" />
                  {profileUser.email}
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1.5">
                  <Calendar className="h-4 w-4" />
                  Joined {format(new Date(profileUser.createdAt), "MMMM yyyy")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-5">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Posts ({userPosts.length})
          </h2>
          
          {userPosts.length > 0 ? (
            <div className="space-y-5 stagger-children">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center animate-fade-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4 text-muted-foreground">
                {isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="glass-card-elevated rounded-2xl border-border/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Update Profile Photo</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Paste image URL..."
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            className="h-12 rounded-xl border-0 bg-secondary/50 px-4 focus-visible:ring-2 focus-visible:ring-primary/50"
          />
          {newPhotoUrl && (
            <div className="flex justify-center animate-scale-in">
              <img
                src={newPhotoUrl}
                alt="Preview"
                className="h-32 w-32 rounded-full object-cover ring-4 ring-primary/20"
                onError={() => setNewPhotoUrl("")}
              />
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsPhotoDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleUpdatePhoto} disabled={!newPhotoUrl.trim()} className="btn-gradient rounded-xl">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
