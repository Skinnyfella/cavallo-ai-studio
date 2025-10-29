import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Music, Download, Mic, Play, Pause, Upload, Volume2, Edit3, Settings, Star, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const BasicDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    mood: '',
    duration: '',
    artistInspiration: '',
    language: '',
    ideas: ''
  });
  const [artistSuggestions, setArtistSuggestions] = useState<string[]>([]);
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Popular artists database for suggestions
  const popularArtists = [
    // International Pop/R&B
    "Beyoncé", "Taylor Swift", "Adele", "Ed Sheeran", "Bruno Mars", "The Weeknd", 
    "Ariana Grande", "Dua Lipa", "Justin Bieber", "Rihanna", "Drake", "Post Malone",
    "Billie Eilish", "Olivia Rodrigo", "Harry Styles", "Doja Cat", "SZA", "Lizzo",
    
    // Afrobeats/African Artists
    "Burna Boy", "Wizkid", "Davido", "Tiwa Savage", "Yemi Alade", "Mr Eazi",
    "Tekno", "Kizz Daniel", "Fireboy DML", "Joeboy", "Omah Lay", "Rema",
    "Asake", "Ayra Starr", "Tems", "CKay", "Oxlade", "Bella Shmurda",
    
    // Hip-Hop/Rap
    "Kendrick Lamar", "J. Cole", "Travis Scott", "Future", "Lil Baby", "DaBaby",
    "Megan Thee Stallion", "Cardi B", "Nicki Minaj", "21 Savage", "Lil Wayne",
    
    // R&B/Soul
    "Frank Ocean", "The Weeknd", "H.E.R.", "Summer Walker", "Jhené Aiko", "Daniel Caesar",
    "Kali Uchis", "Solange", "Alicia Keys", "John Legend", "Anderson .Paak",
    
    // Alternative/Indie
    "Lorde", "Lana Del Rey", "Arctic Monkeys", "Tame Impala", "Vampire Weekend",
    "Bad Bunny", "Rosalía", "J Balvin", "Ozuna", "Karol G"
  ];
  const [generationsUsed, setGenerationsUsed] = useState(2);
  const [generatedSong, setGeneratedSong] = useState<null | {
    lyrics: { verse: string; chorus: string };
    melodyGuide: {
      vocalRange: string;
      scale: string;
      tempo: number;
      hookSolfa: string;
    };
  }>(null);
  const maxGenerations = 3;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle artist inspiration search
    if (field === 'artistInspiration') {
      if (value.length >= 2) {
        const filtered = popularArtists.filter(artist => 
          artist.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 6); // Limit to 6 suggestions
        setArtistSuggestions(filtered);
        setShowArtistSuggestions(true);
      } else {
        setShowArtistSuggestions(false);
      }
    }
  };

  const handleArtistSelect = (artist: string) => {
    setFormData(prev => ({ ...prev, artistInspiration: artist }));
    setShowArtistSuggestions(false);
  };

  const handleGenerate = async () => {
    if (generationsUsed >= maxGenerations) {
      toast.error("Daily limit reached! Upgrade to Pro for more generations.");
      return;
    }

    if (!formData.title || !formData.genre || !formData.mood || !formData.duration || !formData.artistInspiration || !formData.language) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationsUsed(prev => prev + 1);
      
      // Generate sample song data
      setGeneratedSong({
        lyrics: {
          verse: `In the city lights, we dance tonight
Hearts beating fast, everything feels right
Your smile lights up the perfect skies
Together we rise, we touch the stars tonight`,
          chorus: `We're unstoppable, incredible
Nothing can break us now
We're unstoppable, unforgettable
This is our moment, wow`
        },
        melodyGuide: {
          vocalRange: "Medium",
          scale: "A Major", 
          tempo: 96,
          hookSolfa: "m s l | s f m | r d |"
        }
      });
      
      toast.success("✨ Your song is ready! Lyrics and melody guide created.");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 py-8 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/plans')}
              className="text-emerald-200 hover:text-white hover:bg-emerald-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <div className="h-6 w-px bg-emerald-400" />
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6 text-emerald-300" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                AI Song Generator
              </h1>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg shadow-emerald-500/30">
                Basic
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-emerald-200 font-medium">Daily Generations</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-emerald-100">{generationsUsed}/{maxGenerations}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile/basic')}
              className="w-12 h-12 bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-200 hover:text-white border border-emerald-400/30 rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <Music className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <p className="text-emerald-200 text-lg">
          Create your first song with AI - perfect for beginners! ✨
        </p>
        
        {/* Generation Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-emerald-200 mb-2">
            <span>Generations Used Today</span>
            <span>{generationsUsed}/{maxGenerations}</span>
          </div>
          <Progress 
            value={(generationsUsed / maxGenerations) * 100} 
            className="h-2 bg-emerald-800"
          />
          {generationsUsed >= maxGenerations && (
            <p className="text-sm text-amber-300 mt-2 font-medium">
              Daily limit reached! Upgrade to Pro for 10 generations/day.
            </p>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge className="bg-emerald-600/30 text-emerald-200 border-emerald-500/50">
            <Music className="w-3 h-3 mr-1" />
            AI-Generated Lyrics
          </Badge>
          <Badge className="bg-green-600/30 text-green-200 border-green-500/50">
            <Download className="w-3 h-3 mr-1" />
            Demo Downloads
          </Badge>
          <Badge className="bg-teal-600/30 text-teal-200 border-teal-500/50">
            <Star className="w-3 h-3 mr-1" />
            3 Daily Generations
          </Badge>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Creation Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-black/40 backdrop-blur-xl border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
              <div className="space-y-6">
                {/* Song Title */}
                <div>
                  <label className="block text-sm font-medium text-emerald-200 mb-2">
                    Song Title *
                  </label>
                  <Input 
                    placeholder="Enter your song title" 
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-black/20 border-emerald-400/50 text-white placeholder:text-emerald-300 focus:border-emerald-400"
                  />
                </div>

                {/* Genre & Mood */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Genre *
                    </label>
                    <Select onValueChange={(value) => handleInputChange('genre', value)}>
                      <SelectTrigger className="bg-black/20 border-emerald-400/50 text-white">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-emerald-500">
                        <SelectItem value="pop">Pop</SelectItem>
                        <SelectItem value="rock">Rock</SelectItem>
                        <SelectItem value="hip-hop">Hip Hop</SelectItem>
                        <SelectItem value="r&b">R&B</SelectItem>
                        <SelectItem value="country">Country</SelectItem>
                        <SelectItem value="electronic">Electronic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Mood *
                    </label>
                    <Select onValueChange={(value) => handleInputChange('mood', value)}>
                      <SelectTrigger className="bg-black/20 border-emerald-400/50 text-white">
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-emerald-500">
                        <SelectItem value="happy">Happy & Upbeat</SelectItem>
                        <SelectItem value="sad">Sad & Emotional</SelectItem>
                        <SelectItem value="energetic">Energetic & Powerful</SelectItem>
                        <SelectItem value="chill">Chill & Relaxed</SelectItem>
                        <SelectItem value="romantic">Romantic & Sweet</SelectItem>
                        <SelectItem value="motivational">Motivational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-emerald-200 mb-2">
                    Duration *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger className="bg-black/20 border-emerald-400/50 text-white w-full md:w-64">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-emerald-500">
                      <SelectItem value="60s">1 minute</SelectItem>
                      <SelectItem value="90s">1.5 minutes</SelectItem>
                      <SelectItem value="120s">2 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Artist Inspiration & Language */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Artist Inspiration *
                    </label>
                    <Input
                      type="text"
                      value={formData.artistInspiration}
                      onChange={(e) => handleInputChange('artistInspiration', e.target.value)}
                      placeholder="Start typing... e.g., Bey, Burna, Billie"
                      className="bg-black/20 border-emerald-400/50 text-white placeholder:text-emerald-300/50"
                      onFocus={() => {
                        if (formData.artistInspiration.length >= 2) {
                          setShowArtistSuggestions(true);
                        }
                      }}
                      onBlur={(e) => {
                        // Check if the blur is happening because of clicking on a suggestion
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          // Delay hiding to allow clicking on suggestions
                          setTimeout(() => setShowArtistSuggestions(false), 300);
                        }
                      }}
                    />
                    
                    {/* Artist Suggestions Dropdown */}
                    {showArtistSuggestions && artistSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-emerald-900/95 border border-emerald-400/30 rounded-lg shadow-xl backdrop-blur-sm max-h-48 overflow-y-auto">
                        {artistSuggestions.map((artist, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-emerald-800/50 cursor-pointer text-emerald-100 border-b border-emerald-400/10 last:border-b-0 transition-colors"
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent blur from happening
                              handleArtistSelect(artist);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Mic className="w-4 h-4 text-emerald-400" />
                              <span>{artist}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Language *
                    </label>
                    <Select onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger className="bg-black/20 border-emerald-400/50 text-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-emerald-500">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="pidgin">Pidgin</SelectItem>
                        <SelectItem value="mix">Mix of Both</SelectItem>
                        <SelectItem value="coming-soon" disabled className="text-emerald-400/50 cursor-not-allowed">
                          Other languages coming soon...
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Ideas */}
                <div>
                  <label className="block text-sm font-medium text-emerald-200 mb-2">
                    Your Ideas (Optional)
                  </label>
                  <Textarea 
                    placeholder="Share your concepts, phrases, or themes... e.g., 'love song about summer nights' or 'upbeat song about chasing dreams'"
                    value={formData.ideas}
                    onChange={(e) => handleInputChange('ideas', e.target.value)}
                    className="bg-black/20 border-emerald-400/50 text-white placeholder:text-emerald-300 focus:border-emerald-400"
                    rows={6}
                  />
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || generationsUsed >= maxGenerations}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 text-lg shadow-2xl shadow-emerald-500/40 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      ✨ Creating your song...
                    </>
                  ) : (
                    <>
                      <Music className="w-5 h-5 mr-3" />
                      Generate My Song (4 Tokens)
                    </>
                  )}
                </Button>

                {generationsUsed >= maxGenerations && (
                  <div className="text-center">
                    <Button 
                      onClick={() => navigate('/plans')}
                      variant="outline"
                      className="border-emerald-400/50 text-emerald-200 hover:bg-emerald-600/20"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Upgrade for More Generations
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Basic Features Sidebar */}
          <div>
            <Card className="p-6 bg-black/40 backdrop-blur-xl border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
              <h3 className="font-semibold text-emerald-200 mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2" />
                Basic Features
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Music className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-200 font-medium">AI Song Generation</p>
                    <p className="text-emerald-300">Lyrics + melody generated automatically</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-200 font-medium">Demo Downloads</p>
                    <p className="text-emerald-300">High-quality demo audio files</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-200 font-medium">Daily Generations</p>
                    <p className="text-emerald-300">3 song generations per day</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="mt-4 p-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/40">
              <h4 className="font-semibold text-blue-200 mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Want More?
              </h4>
              <div className="text-xs text-blue-300 space-y-1 mb-3">
                <p>• Upload your voice for AI singing</p>
                <p>• 10 generations per day</p>
                <p>• Pitch correction & guides</p>
                <p>• High-quality audio exports</p>
              </div>
              <Button 
                onClick={() => navigate('/plans')}
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upgrade to Pro
              </Button>
            </Card>
          </div>
        </div>

        {/* Your Song is Ready! Section - Shows after generation */}
        {generatedSong && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-emerald-200 mb-6 text-center">🎵 Your Song is Ready!</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Lyrics Section */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-200 mb-4 flex items-center">
                  <Edit3 className="w-5 h-5 mr-2" />
                  Lyrics Section
                </h3>
                <div className="space-y-4 text-sm text-emerald-300">
                  <div>
                    <p className="font-medium mb-2 text-emerald-200 flex items-center">
                      <Volume2 className="w-4 h-4 mr-1" />
                      VERSE:
                    </p>
                    <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-500/20">
                      {generatedSong.lyrics.verse.split('\n').map((line, i) => (
                        <p key={i} className="italic leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2 text-emerald-200 flex items-center">
                      <Music className="w-4 h-4 mr-1" />
                      CHORUS:
                    </p>
                    <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-500/20">
                      {generatedSong.lyrics.chorus.split('\n').map((line, i) => (
                        <p key={i} className="italic leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            
              {/* Melody Guide */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-200 mb-4 flex items-center">
                  <Mic className="w-5 h-5 mr-2" />
                  Melody Guide
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-500/20">
                      <p className="font-medium text-emerald-200 mb-1">Vocal Range:</p>
                      <p className="text-emerald-300">{generatedSong.melodyGuide.vocalRange}</p>
                    </div>
                    <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-500/20">
                      <p className="font-medium text-emerald-200 mb-1">Scale:</p>
                      <p className="text-emerald-300">{generatedSong.melodyGuide.scale}</p>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-500/20">
                    <p className="font-medium text-emerald-200 mb-1">Tempo:</p>
                    <p className="text-emerald-300">{generatedSong.melodyGuide.tempo} BPM</p>
                  </div>
                  
                  <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/20">
                    <p className="font-medium text-emerald-200 mb-2">Hook Solfa:</p>
                    <p className="font-mono text-lg text-emerald-100 bg-black/30 rounded px-3 py-2 text-center tracking-wider">
                      {generatedSong.melodyGuide.hookSolfa}
                    </p>
                    <p className="text-xs text-emerald-400 mt-2 text-center">Sing this melody pattern for the hook</p>
                  </div>

                  <div className="text-xs text-emerald-400 pt-3 border-t border-emerald-500/30 space-y-1">
                    <p>✅ AI-generated lyrics & melody guide</p>
                    <p>✅ Vocal range optimized for beginners</p>
                    <p>✅ Solfa notation for easy singing</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Create Another Song */}
            <Card className="mt-8 p-6 bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-500/30 text-center">
              <h3 className="font-semibold text-emerald-200 mb-2 flex items-center justify-center">
                <Music className="w-5 h-5 mr-2" />
                Ready for another song? 
              </h3>
              <p className="text-emerald-300 mb-4">You have {maxGenerations - generationsUsed} generations left today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setGeneratedSong(null);
                    setFormData({
                      title: '',
                      genre: '',
                      mood: '',
                      duration: '',
                      artistInspiration: '',
                      language: '',
                      ideas: ''
                    });
                  }} 
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white"
                >
                  Create Another Song
                </Button>
                <Button variant="outline" onClick={() => navigate('/plans')} className="border-emerald-400/50 text-emerald-200 hover:bg-emerald-600/20">
                  <Star className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicDashboard;