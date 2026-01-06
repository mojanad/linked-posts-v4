import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, ImagePlus } from "lucide-react";
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
      toast.success("Photo updated!");
    }
  };

  if (!profileUser) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-muted-foreground text-sm">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-xl px-4 py-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 mb-6 animate-fade-in">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                <AvatarImage 
                  src={isOwnProfile ? currentUser?.profilePhoto : profileUser.profilePhoto} 
                  alt={profileUser.name} 
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {profileUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                  onClick={() => setIsPhotoDialogOpen(true)}
                >
                  <ImagePlus className="h-4 w-4" />
                </Button>
              )}
            </div>

            <h1 className="text-xl font-semibold mt-4">{profileUser.name}</h1>
            
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {profileUser.email}
              </div>
            </div>
            
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Joined {format(new Date(profileUser.createdAt), "MMMM yyyy")}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/50 w-full justify-center">
              <div className="text-center">
                <p className="font-semibold">{userPosts.length}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">1.2K</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">892</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="bg-card rounded-2xl border border-border/50 p-8 text-center">
              <p className="text-muted-foreground text-sm">
                {isOwnProfile ? "You haven't posted yet" : "No posts yet"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Update Photo</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Paste image URL..."
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            className="rounded-xl"
          />
          {newPhotoUrl && (
            <div className="flex justify-center">
              <img
                src={newPhotoUrl}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover"
                onError={() => setNewPhotoUrl("")}
              />
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsPhotoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePhoto} disabled={!newPhotoUrl.trim()}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
