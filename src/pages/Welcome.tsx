import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";
import cavallloLogo from "@/assets/cavalllo-logo.png";
const Welcome = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow animate-pulse-glow delay-1000" />
      
      <div className="relative z-10 text-center px-6 animate-fade-in-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Music2 className="w-12 h-12 text-secondary animate-pulse-glow" />
          
        </div>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light tracking-wide">
          where ideas are born, built and seen.
        </p>
        
        {/* CTA Button */}
        <Button onClick={() => navigate("/auth")} size="lg" className="group relative bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-2xl shadow-2xl shadow-primary/50 transition-all duration-300 hover:shadow-primary/70 hover:scale-105">
          <span className="relative z-10">Start Creating</span>
          <div className="absolute inset-0 bg-primary-glow opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity" />
        </Button>
        
        {/* Subtitle */}
        <p className="mt-8 text-sm text-muted-foreground/60">
          AI-Powered Music Creation • From Concept to Composition
        </p>
      </div>
    </div>;
};
export default Welcome;