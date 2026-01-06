import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, User, LogOut, Sparkles } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/30">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-gradient">
            Connecta
          </span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              <span className="hidden font-medium sm:inline">Feed</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-11 w-11 rounded-full p-0">
                  <Avatar className="h-11 w-11 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/50 hover:shadow-glow">
                    <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 glass-card-elevated p-2" align="end" sideOffset={8}>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold truncate">{user?.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator className="my-2 bg-border/50" />
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to={`/profile/${user?.id}`} className="flex items-center gap-2 py-2.5">
                    <User className="h-4 w-4" />
                    <span className="font-medium">View Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-border/50" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="rounded-xl font-medium">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild className="btn-gradient rounded-xl px-5">
              <Link to="/register">Join now</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
