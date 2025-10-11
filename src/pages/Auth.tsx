import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music2 } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate auth - in production this would connect to backend
    if (isLogin) {
      toast.success("Welcome back to Cavalllo Studios!");
    } else {
      toast.success("Account created! Let's choose your plan.");
    }
    
    setTimeout(() => {
      navigate("/plans");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-glow animate-pulse-glow" />
      
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Glass card */}
        <div className="backdrop-blur-xl bg-card-glass/40 border border-border/50 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Music2 className="w-8 h-8 text-secondary" />
              <h1 className="text-2xl font-bold">Cavalllo Studios</h1>
            </div>
            <p className="text-muted-foreground">
              {isLogin ? "Welcome back, creator" : "Join the future of music"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground/90">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your_artist_name"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required={!isLogin}
                  className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all rounded-xl h-12"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/90">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all rounded-xl h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/90">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all rounded-xl h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50 hover:scale-[1.02]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary font-semibold">
                {isLogin ? "Sign Up" : "Sign In"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
