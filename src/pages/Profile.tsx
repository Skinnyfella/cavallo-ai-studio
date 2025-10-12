import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Music2, 
  Coins, 
  Crown, 
  Download, 
  Trash2, 
  ArrowLeft,
  Settings,
  LogOut,
  Zap
} from "lucide-react";
import { toast } from "sonner";

type Plan = "basic" | "pro" | "pro_plus";

const Profile = () => {
  const navigate = useNavigate();
  const [userPlan] = useState<Plan>("pro_plus");
  const [tokens] = useState(20);

  const getPlanBadge = (plan: Plan) => {
    const configs = {
      basic: { label: "Basic", color: "bg-primary/20 text-primary border-primary/30" },
      pro: { label: "Pro", color: "bg-silver/20 text-silver border-silver/30" },
      pro_plus: { label: "Pro+", color: "bg-gold/20 text-gold border-gold/30" },
    };
    return configs[plan];
  };

  const planConfig = getPlanBadge(userPlan);

  const savedSongs = [
    {
      id: "1",
      title: "Summer Vibes",
      date: "2025-01-08",
      plan: "pro_plus",
      genre: "Afrobeat",
    },
    {
      id: "2",
      title: "Midnight Dreams",
      date: "2025-01-07",
      plan: "pro",
      genre: "R&B",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <Music2 className="w-8 h-8 text-secondary" />
            <h1 className="text-xl font-bold">Profile & Settings</h1>
          </div>

          <div className="w-24" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6 h-fit">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-24 h-24">
                <div className={`absolute inset-0 rounded-full ${
                  userPlan === "pro_plus" ? "bg-gradient-to-r from-gold to-primary animate-pulse-glow" :
                  userPlan === "pro" ? "bg-gradient-to-r from-silver to-primary" :
                  "bg-primary/50"
                } p-1`}>
                  <Avatar className="w-full h-full">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold">MusicMaker</h2>
                <p className="text-sm text-muted-foreground">Joined Jan 2025</p>
              </div>

              <Badge className={`${planConfig.color} px-4 py-1.5 font-semibold`}>
                {userPlan === "pro_plus" && <Crown className="w-4 h-4 mr-1" />}
                {planConfig.label}
              </Badge>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
              <Button
                variant="outline"
                className="w-full rounded-xl justify-start gap-2"
                onClick={() => toast.info("Settings coming soon")}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl justify-start gap-2 text-destructive hover:text-destructive"
                onClick={() => navigate("/")}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Token Wallet */}
            <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-6 h-6 text-gold" />
                  Token Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gold">{tokens} Tokens</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      4 tokens per song generation
                    </p>
                  </div>
                  <Button className="rounded-xl bg-gold hover:bg-gold/90 text-background font-semibold shadow-lg shadow-gold/30">
                    <Zap className="w-4 h-4 mr-2" />
                    Buy More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Plan Management */}
            <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6">
              <CardHeader className="p-0 pb-6">
                <CardTitle>Upgrade Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="p-0 grid md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-6 rounded-xl border-silver/30 hover:bg-silver/10 hover:border-silver/50 transition-all group"
                  disabled={userPlan === "pro" || userPlan === "pro_plus"}
                >
                  <div className="text-left w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-silver/20 text-silver border-silver/30">Pro</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unlock melody matching & voice features
                    </p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-6 rounded-xl border-gold/30 hover:bg-gold/10 hover:border-gold/50 transition-all group"
                  disabled={userPlan === "pro_plus"}
                >
                  <div className="text-left w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-gold/20 text-gold border-gold/30">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro+
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI collaboration + premium features
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Saved Songs */}
            <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="flex items-center gap-2">
                  <Music2 className="w-6 h-6 text-primary" />
                  Saved Songs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {savedSongs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-card border border-border/30 hover:border-primary/50 transition-all group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{song.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {song.genre}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Generated on {song.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => toast.success("Download started")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                          onClick={() => toast.success("Song deleted")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />
          <p className="text-sm text-muted-foreground">
            © 2025 Cavalllo Studios — Create. Refine. Elevate.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
