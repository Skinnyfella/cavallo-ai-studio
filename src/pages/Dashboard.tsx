import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music2, Sparkles, Copy, Download, User, Crown, FileText, Mic, Play, Settings } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CustomSongRequestModal } from "@/components/CustomSongRequestModal";

type Plan = "basic" | "pro" | "pro_plus";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userPlan] = useState<Plan>("pro_plus"); // Change this to test different plans
  const [tokens, setTokens] = useState(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    mood: "",
    artist: "",
    language: "",
    idea: "",
  });

  const handleGenerate = () => {
    if (tokens < 4) {
      toast.error("Not enough tokens! Please refill to continue.");
      return;
    }

    setIsGenerating(true);
    setTokens(prev => prev - 4);
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
      toast.success("Song generated successfully!");
    }, 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getPlanTheme = (plan: Plan) => {
    const themes = {
      basic: {
        bg: "bg-gradient-basic",
        accent: "text-primary",
        glow: "shadow-primary/20",
        badge: "bg-primary/20 text-primary border-primary/30",
        label: "Basic",
      },
      pro: {
        bg: "bg-gradient-pro",
        accent: "text-silver",
        glow: "shadow-silver/20",
        badge: "bg-silver/20 text-silver border-silver/30",
        label: "Pro",
      },
      pro_plus: {
        bg: "bg-gradient-pro-plus",
        accent: "text-gold",
        glow: "shadow-gold/30",
        badge: "bg-gold/20 text-gold border-gold/30",
        label: "Pro+",
      },
    };
    return themes[plan];
  };

  const theme = getPlanTheme(userPlan);

  return (
    <div className={`min-h-screen ${theme.bg} relative overflow-hidden`}>
      {/* Aurora effect for Pro+ */}
      {userPlan === "pro_plus" && (
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gold/10 via-primary/10 to-transparent animate-aurora pointer-events-none" />
      )}

      {/* Particle trails for Pro */}
      {userPlan === "pro" && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-silver rounded-full animate-pulse-glow" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music2 className="w-8 h-8 text-secondary" />
            <h1 className="text-xl font-bold">Cavalllo Studios</h1>
            <Badge className={`${theme.badge} ml-2`}>
              {userPlan === "pro_plus" && <Crown className="w-3 h-3 mr-1" />}
              {theme.label}
            </Badge>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Tokens Remaining</p>
              <p className={`text-2xl font-bold ${theme.accent}`}>{tokens}</p>
            </div>
            <div className="relative">
              <div className={`absolute inset-0 rounded-full ${
                userPlan === "pro_plus" ? "bg-gradient-to-r from-gold to-primary p-0.5 animate-pulse-glow" :
                userPlan === "pro" ? "bg-gradient-to-r from-silver to-primary p-0.5" :
                "bg-primary/50 p-0.5"
              }`}>
                <div className="bg-background rounded-full">
                  <Avatar className="w-10 h-10 cursor-pointer" onClick={() => navigate("/profile")}>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {!showResults ? (
          // Input Form
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Your Song</h2>
              <p className="text-muted-foreground">
                Fill in the details and let AI bring your ideas to life
              </p>
            </div>

            {/* Upgrade banner for Basic users */}
            {userPlan === "basic" && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
                <p className="text-sm text-center text-muted-foreground">
                  ✨ Upgrade to <span className="text-silver font-semibold">Pro</span> to unlock melody matching and voice features
                </p>
              </div>
            )}

            <Card className={`backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-8 ${theme.glow} shadow-xl`}>
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground/90">Song Title</Label>
                  <Input
                    placeholder="Enter your song title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-input/50 border-border/50 rounded-xl h-12 mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-foreground/90">Genre</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                      <SelectTrigger className="bg-input/50 border-border/50 rounded-xl h-12 mt-2">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border/50 rounded-xl">
                        <SelectItem value="afrobeat">Afrobeat</SelectItem>
                        <SelectItem value="pop">Pop</SelectItem>
                        <SelectItem value="rnb">R&B</SelectItem>
                        <SelectItem value="hip-hop">Hip Hop</SelectItem>
                        <SelectItem value="gospel">Gospel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-foreground/90">Mood</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                      <SelectTrigger className="bg-input/50 border-border/50 rounded-xl h-12 mt-2">
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border/50 rounded-xl">
                        <SelectItem value="happy">Happy</SelectItem>
                        <SelectItem value="romantic">Romantic</SelectItem>
                        <SelectItem value="melancholic">Melancholic</SelectItem>
                        <SelectItem value="energetic">Energetic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-foreground/90">Artist Inspiration</Label>
                    <Input
                      placeholder="e.g., Burna Boy, Tems"
                      value={formData.artist}
                      onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                      className="bg-input/50 border-border/50 rounded-xl h-12 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground/90">Language</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, language: value })}>
                      <SelectTrigger className="bg-input/50 border-border/50 rounded-xl h-12 mt-2">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border/50 rounded-xl">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="pidgin">Pidgin</SelectItem>
                        <SelectItem value="yoruba">Yoruba</SelectItem>
                        <SelectItem value="igbo">Igbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground/90">Your Idea (Optional)</Label>
                  <Textarea
                    placeholder="Share your concepts, phrases, or themes..."
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    className="bg-input/50 border-border/50 rounded-xl min-h-32 mt-2"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !formData.title || !formData.genre}
                  className={`w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-lg font-semibold shadow-lg ${theme.glow} group`}
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 animate-pulse-glow" />
                      Generating Magic...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Music2 className="w-5 h-5" />
                      Generate Song (4 Tokens)
                    </span>
                  )}
                </Button>
              </div>
            </Card>

            {/* Pro+ Custom Song Request Card */}
            {userPlan === "pro_plus" && (
              <Card className="mt-6 backdrop-blur-xl bg-gradient-to-r from-gold/10 to-primary/10 border-gold/30 rounded-3xl p-6 shadow-xl shadow-gold/20 cursor-pointer hover:shadow-gold/30 transition-all group"
                   onClick={() => setShowCustomModal(true)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gold">📝 Request a Custom Song</h3>
                      <p className="text-sm text-muted-foreground">
                        Work directly with our creative team
                      </p>
                    </div>
                  </div>
                  <Crown className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
                </div>
              </Card>
            )}
          </div>
        ) : (
          // Results View
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Your Song is Ready!</h2>
                <p className="text-muted-foreground">"{formData.title}"</p>
              </div>
              <Button
                onClick={() => setShowResults(false)}
                variant="outline"
                className="rounded-xl"
              >
                Create Another
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Lyrics Card */}
              <Card className={`backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6 ${theme.glow} shadow-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Your Lyrics</h3>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopy("Sample lyrics content")}
                    className="rounded-xl"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-2">VERSE 1</p>
                    <p className="leading-relaxed">
                      In the city lights, we dance tonight<br />
                      Hearts beating fast, everything feels right<br />
                      Your smile lights up the darkest skies<br />
                      Together we rise, we touch the sky
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-secondary mb-2">CHORUS</p>
                    <p className="leading-relaxed">
                      We're unstoppable, incredible<br />
                      Nothing can break us now<br />
                      We're unshakeable, unmistakable<br />
                      Together we'll show them how
                    </p>
                  </div>
                </div>
              </Card>

              {/* Melody Guide Card */}
              <Card className={`backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6 ${theme.glow} shadow-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Melody Guide</h3>
                  {userPlan !== "basic" && (
                    <Badge className={theme.badge}>Enhanced</Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-card rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Vocal Range</p>
                    <p className="font-semibold">Medium (Safe for most singers)</p>
                  </div>
                  
                  <div className="bg-gradient-card rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Scale</p>
                    <p className="font-semibold">A Major</p>
                  </div>
                  
                  <div className="bg-gradient-card rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Tempo</p>
                    <p className="font-semibold">96 BPM</p>
                  </div>
                  
                  <div className="bg-gradient-card rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-2">Hook Solfa</p>
                    <p className="font-mono text-primary">m s l | s f m | r d | —</p>
                  </div>

                  {/* Pro features */}
                  {(userPlan === "pro" || userPlan === "pro_plus") && (
                    <>
                      <Button variant="outline" className="w-full rounded-xl gap-2">
                        🎵 Change Key
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl gap-2">
                        🎤 Auto-match my voice
                      </Button>
                    </>
                  )}
                </div>
              </Card>

              {/* Production Tips / AI Studio Sample Card */}
              <Card className={`backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6 ${theme.glow} shadow-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    {userPlan === "pro_plus" ? "🎧 AI Studio Sample" : "Production Tips"}
                  </h3>
                  {userPlan === "pro_plus" ? (
                    <Crown className={`w-5 h-5 ${theme.accent}`} />
                  ) : (
                    <Download className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                {userPlan === "pro_plus" ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-card rounded-xl p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                        <Play className="w-8 h-8 text-gold" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Professional AI-generated sample ready
                      </p>
                      <Button className="w-full rounded-xl bg-gold hover:bg-gold/90 text-background font-semibold">
                        <Play className="w-4 h-4 mr-2" />
                        Play Sample
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full rounded-xl gap-2">
                      <Download className="w-4 h-4" />
                      Download Sample
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gradient-card rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">
                        Try 95 BPM with warm harmonies for a smooth Afrobeat feel.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-card rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">
                        Add reverb on chorus for richness and depth in the vocal delivery.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-card rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">
                        Use soft percussion to match the energetic mood while keeping it clean.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-card rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">
                        Layer backing vocals in the chorus for a fuller, stadium-ready sound.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Custom Song Request Modal */}
      <CustomSongRequestModal 
        open={showCustomModal} 
        onOpenChange={setShowCustomModal}
      />

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 relative z-10">
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

export default Dashboard;
