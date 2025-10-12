import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CustomSongRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomSongRequestModal = ({ open, onOpenChange }: CustomSongRequestModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    mood: "",
    artistStyle: "",
    theme: "",
    additionalNotes: "",
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.genre || !formData.mood || !formData.theme) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitted(true);
    toast.success("Request submitted successfully!");
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      title: "",
      genre: "",
      mood: "",
      artistStyle: "",
      theme: "",
      additionalNotes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-gold/30 rounded-3xl shadow-2xl shadow-gold/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-gold via-primary to-gold bg-clip-text text-transparent">
            {isSubmitted ? "Request Received! 🎵" : "Let's Create Your Custom Hit"}
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-6 mt-4">
            <div>
              <Label className="text-foreground/90">Song Title *</Label>
              <Input
                placeholder="Enter your song title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-input/50 border-border/50 rounded-xl h-12 mt-2 focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-foreground/90">Genre *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                  <SelectTrigger className="bg-input/50 border-border/50 rounded-xl h-12 mt-2">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border/50 rounded-xl">
                    <SelectItem value="afrobeat">Afrobeats</SelectItem>
                    <SelectItem value="rnb">R&B</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                    <SelectItem value="gospel">Gospel</SelectItem>
                    <SelectItem value="amapiano">Amapiano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground/90">Mood / Emotion *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                  <SelectTrigger className="bg-input/50 border-border/50 rounded-xl h-12 mt-2">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border/50 rounded-xl">
                    <SelectItem value="happy">Happy</SelectItem>
                    <SelectItem value="sad">Sad</SelectItem>
                    <SelectItem value="energetic">Energetic</SelectItem>
                    <SelectItem value="chill">Chill</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="motivational">Motivational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-foreground/90">Artist Style Inspiration</Label>
              <Input
                placeholder="e.g., Asake, Burna Boy, Rihanna"
                value={formData.artistStyle}
                onChange={(e) => setFormData({ ...formData, artistStyle: e.target.value })}
                className="bg-input/50 border-border/50 rounded-xl h-12 mt-2 focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div>
              <Label className="text-foreground/90">Theme / Story Idea *</Label>
              <Textarea
                placeholder="Describe the story, message, or theme you want the song to convey..."
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                className="bg-input/50 border-border/50 rounded-xl min-h-32 mt-2 focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div>
              <Label className="text-foreground/90">Additional Notes (Optional)</Label>
              <Textarea
                placeholder="Any other details or preferences..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="bg-input/50 border-border/50 rounded-xl min-h-24 mt-2 focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-gold via-primary to-gold text-lg font-semibold shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all"
            >
              <Music2 className="w-5 h-5 mr-2" />
              Submit Custom Request
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-primary rounded-full animate-pulse-glow" />
              <div className="relative flex items-center justify-center w-full h-full">
                <Sparkles className="w-12 h-12 text-gold animate-pulse" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gold">🎵 Thank you for your request!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our creative team will review your idea. You'll receive an email update soon — please check your inbox from time to time.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 py-4">
              <div className="h-1 w-1 bg-gold rounded-full animate-pulse-glow" style={{ animationDelay: "0s" }} />
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "0.2s" }} />
              <div className="h-3 w-3 bg-secondary rounded-full animate-pulse-glow" style={{ animationDelay: "0.4s" }} />
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "0.6s" }} />
              <div className="h-1 w-1 bg-gold rounded-full animate-pulse-glow" style={{ animationDelay: "0.8s" }} />
            </div>

            <Button
              onClick={handleClose}
              variant="outline"
              className="rounded-xl border-gold/50 hover:bg-gold/10"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
