import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Mic, Headphones, Piano } from "lucide-react";
import { toast } from "sonner";

type PlanTier = "basic" | "pro" | "proplus";

const Plans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const plans = [
    {
      id: "basic" as PlanTier,
      name: "AI-assisted",
      icon: Mic,
      price: "$15",
      priceNGN: "₦12,000",
      tokens: 20,
      glowColor: "group-hover:shadow-primary/50",
      features: [
        "AI Lyrics Generator",
        "Hook Melody Generator",
        "Artist Inspiration",
        "Genre selection ",
        "Language Selection",
        "Idea/Concept Box",
  
      ],
      cta: "Start Writing",
    },
    {
      id: "pro" as PlanTier,
      name: "AI-enhanced",
      icon: Headphones,
      price: "$25",
      priceNGN: "₦20,000",
      tokens: 40,
      glowColor: "group-hover:shadow-silver/50",
      features: [
        "Includes everything in Basic",
        "AI Singer — creates vocals using your voice tone & style",
        "Pitch Guide + Auto Correction",
        "Melody Editor to refine notes & timing",
        "Primary Voice Setup (upload or record once)",
        "Reuse Primary Voice in future songs",
        "BPM control with smart genre suggestions",
        "High-quality exports (320kbps / WAV)",
        
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      id: "proplus" as PlanTier,
      name: "Human-collaborative",
      icon: Piano,
      price: "$40",
      priceNGN: "₦32,000",
      tokens: 60,
      glowColor: "group-hover:shadow-gold/50",
      features: [
        "Human Songwriting (Work-for-Hire)",
        "Human Beat Production",
        "Human Artist Collaboration",
        "Direct chat with creators (coming soon)",
        "Premium support",
       
      ],
      cta: "Upgrade to Pro+",
    },
  ];

  const handleSelectPlan = (planId: PlanTier) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePayment = () => {
    toast.success("Payment successful! Unlocking your studio...");
    
    setTimeout(() => {
      // Navigate to plan-specific dashboard
      const dashboardRoutes = {
        basic: "/dashboard/basic",
        pro: "/dashboard/pro", 
        proplus: "/dashboard/proplus"
      };
      
      const targetRoute = selectedPlan ? dashboardRoutes[selectedPlan] : "/dashboard";
      navigate(targetRoute);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden py-16 px-6">
      {/* Background effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-glow animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-glow animate-pulse-glow delay-700" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Creative Power Level
          </h1>
          <p className="text-xl text-muted-foreground">
            Pick a plan that matches your music journey.
          </p>
        </div>

        {/* Most Popular Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                
                <div className={`
                  backdrop-blur-xl bg-card-glass/40 border rounded-3xl p-8 h-full
                  transition-all duration-300 hover:scale-105 flex flex-col
                  ${isSelected ? 'border-primary shadow-2xl' : 'border-border/50'}
                  ${plan.glowColor}
                `}>
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-card">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  {/* Plan name */}
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {plan.name}
                  </h3>

                  {/* Pricing */}
                  <div className="text-center mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ month</span>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mb-6">
                    or {plan.priceNGN}
                  </p>

                  {/* Tokens */}
                  <div className="bg-gradient-card rounded-xl p-3 mb-6 text-center">
                    <p className="text-lg font-semibold">
                      {plan.tokens} Tokens Included
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`
                      w-full h-12 rounded-xl font-semibold transition-all
                      ${plan.id === 'basic' ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30' : ''}
                      ${plan.id === 'pro' ? 'bg-silver text-background hover:bg-silver/90 shadow-lg shadow-silver/30' : ''}
                      ${plan.id === 'proplus' ? 'bg-gold text-background hover:bg-gold/90 shadow-lg shadow-gold/30' : ''}
                    `}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Modal */}
        {showPayment && selectedPlan && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in-up">
            <div className="backdrop-blur-xl bg-card-glass/90 border border-border/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Complete Your Purchase</h2>
              <p className="text-muted-foreground mb-6">
                You selected the {plans.find(p => p.id === selectedPlan)?.name} plan
              </p>
              
              <div className="bg-gradient-card rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span>Plan:</span>
                  <span className="font-semibold">
                    {plans.find(p => p.id === selectedPlan)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Tokens:</span>
                  <span className="font-semibold">
                    {plans.find(p => p.id === selectedPlan)?.tokens}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border/50">
                  <span>Total:</span>
                  <span>{plans.find(p => p.id === selectedPlan)?.price}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setShowPayment(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
