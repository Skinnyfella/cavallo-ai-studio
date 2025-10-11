import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Music2, Sparkles, Copy, Download, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music2 className="w-8 h-8 text-secondary" />
            <h1 className="text-xl font-bold">Cavalllo Studios</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Tokens Remaining</p>
              <p className="text-2xl font-bold text-primary">{tokens}</p>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="icon"
              className="rounded-xl"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {!showResults ? (
          // Input Form
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Your Song</h2>
              <p className="text-muted-foreground">
                Fill in the details and let AI bring your ideas to life
              </p>
            </div>

            <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-8">
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
                  className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-lg font-semibold shadow-lg shadow-primary/30 group"
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
              <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6">
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
              <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Melody Guide</h3>
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
                </div>
              </Card>

              {/* Production Tips Card */}
              <Card className="backdrop-blur-xl bg-card-glass/40 border-border/50 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Production Tips</h3>
                  <Download className="w-5 h-5 text-muted-foreground" />
                </div>
                
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
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />
          <p className="text-sm text-muted-foreground">
            © 2025 Cavalllo Studios — The Vision That Builds The Future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
