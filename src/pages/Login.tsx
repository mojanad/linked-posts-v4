import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error("Invalid credentials. Try sarah@example.com");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-50 blur-xl" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gradient">
            Welcome back
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to continue to Connecta
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card-elevated rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-0 bg-secondary/50 px-4 focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-0 bg-secondary/50 px-4 pr-12 focus-visible:ring-2 focus-visible:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="btn-gradient w-full h-12 rounded-xl text-base font-semibold gap-2 group" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Sparkles className="h-5 w-5 animate-pulse" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Join now
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <div className="glass-card rounded-2xl p-4 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Demo:</span>{" "}
            sarah@example.com (any password)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
