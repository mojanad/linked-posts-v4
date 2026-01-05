import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      toast.success("Profile photo updated!");
    }
  };

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Navbar />
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-6">
        <Card className="mb-6 overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
          <CardContent className="relative pb-6">
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  <AvatarImage src={isOwnProfile ? currentUser?.profilePhoto : profileUser.profilePhoto} alt={profileUser.name} />
                  <AvatarFallback className="bg-primary text-3xl text-primary-foreground">
                    {profileUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow"
                    onClick={() => setIsPhotoDialogOpen(true)}
                  >
                    <ImagePlus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="ml-0 pt-20 sm:ml-40 sm:pt-2">
              <h1 className="text-2xl font-bold">{profileUser.name}</h1>
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {profileUser.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined {format(new Date(profileUser.createdAt), "MMMM yyyy")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Posts ({userPosts.length})
          </h2>
          
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
              <p className="text-muted-foreground">
                {isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Paste image URL..."
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
          />
          {newPhotoUrl && (
            <div className="flex justify-center">
              <img
                src={newPhotoUrl}
                alt="Preview"
                className="h-32 w-32 rounded-full object-cover"
                onError={() => setNewPhotoUrl("")}
              />
            </div>
          )}
          <DialogFooter>
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
