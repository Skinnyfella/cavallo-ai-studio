import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Music, Download, Mic, Play, Pause, Upload, Volume2, Edit3, Settings, Users, Zap, Infinity, Crown, Layers, Headphones, User } from 'lucide-react';
import { toast } from 'sonner';

const ProPlusDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    mood: '',
    duration: '',
    artistInspiration: '',
    language: '',
    ideas: '',
    voiceFile: null as File | null,
    referenceLink: ''
  });
  const [artistSuggestions, setArtistSuggestions] = useState<string[]>([]);
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(false);
  
  // Popular artists database for suggestions
  const popularArtists = [
    // International Pop/R&B
    "Beyoncé", "Taylor Swift", "Adele", "Ed Sheeran", "Bruno Mars", "The Weeknd", 
    "Ariana Grande", "Dua Lipa", "Justin Bieber", "Rihanna", "Drake", "Post Malone",
    "Billie Eilish", "Olivia Rodrigo", "Harry Styles", "Doja Cat", "SZA", "Lizzo",
    
    // Afrobeats/African Artists
    "Burna Boy", "Wizkid", "Davido", "Tiwa Savage", "Yemi Alade", "Ckay", "Omah Lay",
    "Tems", "Fireboy DML", "Joeboy", "Rema", "Ayra Starr", "Asake", "Ruger",
    
    // Hip-Hop/Rap
    "Kendrick Lamar", "J. Cole", "Travis Scott", "Future", "Lil Baby", "DaBaby",
    "Megan Thee Stallion", "Cardi B", "Nicki Minaj", "Tyler, The Creator",
    
    // Nigerian/Pidgin Artists
    "Phyno", "Olamide", "Flavour", "Tekno", "Mr. Eazi", "Kizz Daniel", "Simi",
    "Adekunle Gold", "Falz", "Vector", "MI Abaga", "Ice Prince", "Brymo"
  ];
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [beatSettings, setBeatSettings] = useState({
    tempo: [120],
    instruments: ['drums', 'bass'],
    complexity: [70]
  });
  const [activeTab, setActiveTab] = useState('create');
  const [collaborators] = useState([
    { name: 'Sarah M.', role: 'Producer', status: 'online' },
    { name: 'Mike T.', role: 'Mixer', status: 'away' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle artist inspiration search
    if (field === 'artistInspiration') {
      if (value.length > 0) {
        const filtered = popularArtists.filter(artist => 
          artist.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 8);
        setArtistSuggestions(filtered);
        setShowArtistSuggestions(filtered.length > 0);
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
    if (!formData.title || !formData.genre || !formData.mood || !formData.duration || !formData.artistInspiration || !formData.language) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab('results');
      toast.success("Complete songwriter suite ready! Professional stems available.");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900 py-8 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/plans')}
              className="text-purple-200 hover:text-white hover:bg-purple-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <div className="h-6 w-px bg-purple-400" />
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-purple-300" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
                Songwriter + Producer Suite
              </h1>
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg shadow-purple-500/30">
                Pro+
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-purple-200 font-medium">Generations</p>
              <div className="flex items-center gap-2">
                <Infinity className="w-5 h-5 text-purple-300" />
                <p className="text-2xl font-bold text-purple-100">Unlimited</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile/proplus')}
              className="w-12 h-12 bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 hover:text-white border border-purple-400/30 rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <p className="text-purple-200 text-lg">
          Complete AI-powered music creation suite with collaboration tools! 🎼
        </p>
        
        {/* Feature Highlights */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge className="bg-purple-600/30 text-purple-200 border-purple-500/50">
            <Zap className="w-3 h-3 mr-1" />
            AI Beat Maker
          </Badge>
          <Badge className="bg-fuchsia-600/30 text-fuchsia-200 border-fuchsia-500/50">
            <Users className="w-3 h-3 mr-1" />
            Real-time Collaboration
          </Badge>
          <Badge className="bg-violet-600/30 text-violet-200 border-violet-500/50">
            <Layers className="w-3 h-3 mr-1" />
            Studio Stems
          </Badge>
          <Badge className="bg-purple-600/30 text-purple-200 border-purple-500/50">
            <Crown className="w-3 h-3 mr-1" />
            Early Access
          </Badge>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/40 backdrop-blur border border-purple-500/30">
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Songwriting
            </TabsTrigger>
            <TabsTrigger value="beats" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Beat Maker
            </TabsTrigger>
            <TabsTrigger value="collab" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Collaboration
            </TabsTrigger>
            <TabsTrigger value="voice" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Voice Clone
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Studio Export
            </TabsTrigger>
          </TabsList>

          {/* Songwriting Tab */}
          <TabsContent value="create">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Creation Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <div className="space-y-6">
                    {/* Song Title */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Song Title *
                      </label>
                      <Input 
                        placeholder="Enter your song title" 
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300 focus:border-purple-400"
                      />
                    </div>

                    {/* Genre & Mood */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Genre *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('genre', value)}>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="afrobeats">Afrobeats</SelectItem>
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="hiphop">Hip Hop</SelectItem>
                            <SelectItem value="rnb">R&B</SelectItem>
                            <SelectItem value="gospel">Gospel</SelectItem>
                            <SelectItem value="highlife">Highlife</SelectItem>
                            <SelectItem value="amapiano">Amapiano</SelectItem>
                            <SelectItem value="reggae">Reggae</SelectItem>
                            <SelectItem value="dancehall">Dancehall</SelectItem>
                            <SelectItem value="folk">Folk</SelectItem>
                            <SelectItem value="country">Country</SelectItem>
                            <SelectItem value="jazz">Jazz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Mood & Vibe *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('mood', value)}>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="happy">Happy & Upbeat</SelectItem>
                            <SelectItem value="romantic">Romantic & Loving</SelectItem>
                            <SelectItem value="sad">Sad & Emotional</SelectItem>
                            <SelectItem value="energetic">Energetic & Party</SelectItem>
                            <SelectItem value="chill">Chill & Relaxed</SelectItem>
                            <SelectItem value="inspirational">Inspirational</SelectItem>
                            <SelectItem value="nostalgic">Nostalgic</SelectItem>
                            <SelectItem value="intense">Intense & Dramatic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Duration & Language - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Duration *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('duration', value)}>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="30s">30 seconds</SelectItem>
                            <SelectItem value="45s">45 seconds</SelectItem>
                            <SelectItem value="60s">1 minute</SelectItem>
                            <SelectItem value="90s">1:30 minutes</SelectItem>
                            <SelectItem value="120s">2 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Language *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('language', value)}>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="pidgin">Pidgin</SelectItem>
                            <SelectItem value="mix">Mix of Both</SelectItem>
                            <SelectItem value="other" disabled>Other languages (coming soon)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Artist Inspiration - Full Width */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Artist Inspiration *
                      </label>
                      <Input
                        placeholder="e.g., Beyoncé, Burna Boy, Ed Sheeran..."
                        value={formData.artistInspiration}
                        onChange={(e) => handleInputChange('artistInspiration', e.target.value)}
                        onFocus={() => formData.artistInspiration && setShowArtistSuggestions(artistSuggestions.length > 0)}
                        onBlur={() => setTimeout(() => setShowArtistSuggestions(false), 200)}
                        className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300 focus:border-purple-400"
                      />
                      
                      {showArtistSuggestions && (
                        <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-purple-400/50 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {artistSuggestions.map((artist, index) => (
                            <div
                              key={index}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleArtistSelect(artist);
                              }}
                              className="px-4 py-2 hover:bg-purple-800/30 cursor-pointer text-white text-sm border-b border-purple-400/20 last:border-b-0"
                            >
                              {artist}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Advanced Songwriting Options */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Song Structure
                        </label>
                        <Select>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select structure" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="verse-chorus">Verse-Chorus-Verse-Chorus</SelectItem>
                            <SelectItem value="aaba">AABA (32-bar form)</SelectItem>
                            <SelectItem value="custom">Custom Structure</SelectItem>
                            <SelectItem value="extended">Extended (Bridge + Outro)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Rhyme Scheme
                        </label>
                        <Select>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select rhyme style" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="abab">ABAB (Alternating)</SelectItem>
                            <SelectItem value="aabb">AABB (Couplets)</SelectItem>
                            <SelectItem value="abcb">ABCB (Ballad)</SelectItem>
                            <SelectItem value="free">Free Verse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Reference Link */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Reference Track (Optional)
                      </label>
                      <Input 
                        placeholder="YouTube, Spotify, or SoundCloud link for style reference" 
                        value={formData.referenceLink}
                        onChange={(e) => handleInputChange('referenceLink', e.target.value)}
                        className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300 focus:border-purple-400"
                      />
                    </div>

                    {/* Concept & Lyrics */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Song Concept & Lyrics Ideas
                      </label>
                      <Textarea 
                        placeholder="Describe your song's story, message, or include specific lyrics you want to incorporate..."
                        value={formData.ideas}
                        onChange={(e) => handleInputChange('ideas', e.target.value)}
                        className="bg-black/20 border-purple-400/50 text-white placeholder:text-purple-300 focus:border-purple-400"
                        rows={6}
                      />
                    </div>

                    {/* Generate Button */}
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold py-4 text-lg shadow-2xl shadow-purple-500/40 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                          AI is composing your masterpiece...
                        </>
                      ) : (
                        <>
                          <Crown className="w-5 h-5 mr-3" />
                          Generate Complete Song Suite
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Pro+ Features Sidebar */}
              <div>
                <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <h3 className="font-semibold text-purple-200 mb-4 flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Pro+ Features
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">AI Beat Maker</p>
                        <p className="text-purple-300">Generate custom beats from mood or reference</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">Real-time Collaboration</p>
                        <p className="text-purple-300">Invite producers and co-writers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Layers className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">Studio Stems</p>
                        <p className="text-purple-300">Export individual tracks (vocals, drums, bass)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mic className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">Voice Cloning</p>
                        <p className="text-purple-300">Advanced AI voice synthesis</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Infinity className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">Unlimited Everything</p>
                        <p className="text-purple-300">No daily limits, priority processing</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Early Access Features */}
                <Card className="mt-4 p-4 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/40">
                  <h4 className="font-semibold text-yellow-200 mb-2 flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Early Access
                  </h4>
                  <div className="text-xs text-yellow-300 space-y-1">
                    <p>• Harmony layer generation</p>
                    <p>• AI mastering suite</p>
                    <p>• Advanced voice cloning</p>
                    <p>• Multi-language lyrics</p>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Beat Maker Tab */}
          <TabsContent value="beats">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Beat Settings */}
              <Card className="p-8 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-200 mb-6">AI Beat Maker</h3>
                
                <div className="space-y-6">
                  {/* Tempo */}
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-3">
                      Tempo: {beatSettings.tempo[0]} BPM
                    </label>
                    <Slider
                      value={beatSettings.tempo}
                      onValueChange={(value) => setBeatSettings(prev => ({ ...prev, tempo: value }))}
                      max={200}
                      min={60}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Complexity */}
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-3">
                      Complexity: {beatSettings.complexity[0]}%
                    </label>
                    <Slider
                      value={beatSettings.complexity}
                      onValueChange={(value) => setBeatSettings(prev => ({ ...prev, complexity: value }))}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Instruments */}
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-3">
                      Instruments
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Drums', 'Bass', 'Synth', 'Piano', 'Guitar', 'Strings', 'Brass', 'Pads'].map((instrument) => (
                        <Button
                          key={instrument}
                          variant={beatSettings.instruments.includes(instrument.toLowerCase()) ? 'default' : 'outline'}
                          size="sm"
                          className={`${beatSettings.instruments.includes(instrument.toLowerCase()) 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-black/20 border-purple-400/50 text-purple-200 hover:bg-purple-600/20'
                          }`}
                          onClick={() => {
                            const inst = instrument.toLowerCase();
                            setBeatSettings(prev => ({
                              ...prev,
                              instruments: prev.instruments.includes(inst)
                                ? prev.instruments.filter(i => i !== inst)
                                : [...prev.instruments, inst]
                            }));
                          }}
                        >
                          {instrument}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Generate Beat
                  </Button>
                </div>
              </Card>

              {/* Beat Preview */}
              <Card className="p-8 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-200 mb-6">Beat Preview</h3>
                
                <div className="space-y-4">
                  {/* Waveform Visualization */}
                  <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30">
                    <div className="flex items-end justify-between h-32 gap-1">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-purple-600 to-fuchsia-500 w-2 rounded-t animate-pulse"
                          style={{ 
                            height: `${Math.random() * 80 + 20}%`,
                            animationDelay: `${i * 50}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Beat Controls */}
                  <div className="space-y-3">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Play Beat Preview
                    </Button>
                    <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                      <Download className="w-4 h-4 mr-2" />
                      Export Beat Stems
                    </Button>
                  </div>

                  {/* Beat Info */}
                  <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                    <h4 className="font-medium text-purple-200 mb-2">Generated Beat Info:</h4>
                    <div className="text-sm text-purple-300 space-y-1">
                      <p>• Style: Trap/Hip-Hop Fusion</p>
                      <p>• Key: F# Minor</p>
                      <p>• Drum Pattern: 4/4 with syncopation</p>
                      <p>• Instruments: 6 layers</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collab">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Active Collaborators */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-200 mb-4">Active Collaborators</h3>
                
                <div className="space-y-3">
                  {collaborators.map((collab, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-purple-500/20">
                      <div className={`w-3 h-3 rounded-full ${collab.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                      <div className="flex-1">
                        <p className="text-purple-200 font-medium">{collab.name}</p>
                        <p className="text-xs text-purple-300">{collab.role}</p>
                      </div>
                      <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                        {collab.status}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                    <Users className="w-4 h-4 mr-2" />
                    Invite Collaborator
                  </Button>
                </div>
              </Card>

              {/* Real-time Activity */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-200 mb-4">Live Activity</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-2 bg-green-900/20 rounded border border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-green-200">Sarah M. is editing verse 2 lyrics</p>
                      <p className="text-green-300/60 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 bg-blue-900/20 rounded border border-blue-500/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-blue-200">Mike T. adjusted the bass line</p>
                      <p className="text-blue-300/60 text-xs">5 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 bg-purple-900/20 rounded border border-purple-500/30">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-purple-200">You created a new melody variation</p>
                      <p className="text-purple-300/60 text-xs">12 minutes ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Collaboration Tools */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-200 mb-4">Collaboration Tools</h3>
                
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Chat
                  </Button>
                  <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Shared Notepad
                  </Button>
                  <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Live Playback Sync
                  </Button>
                  <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                    <Download className="w-4 h-4 mr-2" />
                    Export Project
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <h4 className="font-medium text-purple-200 mb-2">Project Status:</h4>
                  <div className="text-sm text-purple-300 space-y-1">
                    <p>• Lyrics: 85% complete</p>
                    <p>• Melody: 90% complete</p>
                    <p>• Beat: 70% complete</p>
                    <p>• Mixing: In progress</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Voice Clone Tab */}
          <TabsContent value="voice">
            <Card className="p-8 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <h3 className="text-xl font-semibold text-purple-200 mb-6">Advanced Voice Cloning</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="font-semibold text-purple-200 mb-3">🎤 Enhanced Features:</h4>
                    <ul className="text-sm text-purple-300 space-y-2">
                      <li>• Multi-emotion voice synthesis</li>
                      <li>• Harmony layer generation</li>
                      <li>• Voice aging/transformation</li>
                      <li>• Multiple language support</li>
                      <li>• Real-time voice effects</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                    <Crown className="w-4 h-4 mr-2" />
                    Access Voice Clone Studio
                  </Button>
                </div>
                
                <div className="bg-black/20 rounded-lg p-6 border border-purple-500/30">
                  <p className="text-purple-200 text-center mb-4">🚀 Coming Soon</p>
                  <p className="text-sm text-purple-300 text-center">
                    Advanced voice cloning features are being fine-tuned. 
                    Pro+ members get early access when available.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Results/Export Tab */}
          <TabsContent value="results">
            <div className="space-y-6">
              {/* Main Results Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Complete Song */}
                <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-200 mb-4">
                    Complete Song
                    <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">Studio Quality</Badge>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 text-center">
                      <Crown className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                      <p className="text-purple-200 font-medium">Master Track Ready!</p>
                      <p className="text-sm text-purple-300">Professional mix & master</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Play Master Track
                      </Button>
                      <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                        <Download className="w-4 h-4 mr-2" />
                        Download WAV (Studio Quality)
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Individual Stems */}
                <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-200 mb-4">
                    Studio Stems
                    <Badge className="ml-2 bg-green-600 text-white">Pro+ Exclusive</Badge>
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Lead Vocals', icon: Mic },
                      { name: 'Harmony Vocals', icon: Volume2 },
                      { name: 'Drums', icon: Music },
                      { name: 'Bass', icon: Headphones },
                      { name: 'Melody', icon: Music },
                      { name: 'Effects', icon: Layers }
                    ].map((stem, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-black/20 rounded border border-purple-500/20">
                        <div className="flex items-center gap-2">
                          <stem.icon className="w-4 h-4 text-purple-300" />
                          <span className="text-purple-200 text-sm">{stem.name}</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20 mt-3">
                      <Download className="w-4 h-4 mr-2" />
                      Download All Stems (ZIP)
                    </Button>
                  </div>
                </Card>

                {/* Project Files */}
                <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-200 mb-4">
                    Project Export
                    <Badge className="ml-2 bg-blue-600 text-white">DAW Ready</Badge>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                      <Settings className="w-8 h-8 text-blue-300 mb-2" />
                      <p className="text-blue-200 font-medium text-sm">Export for your DAW</p>
                      <p className="text-blue-300 text-xs">Pro Tools, Logic, Ableton, etc.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                        Logic Pro X Project
                      </Button>
                      <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                        Ableton Live Set
                      </Button>
                      <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                        Pro Tools Session
                      </Button>
                      <Button variant="outline" className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                        FL Studio Project
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Create Another */}
              <Card className="p-6 bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 border border-purple-500/30 text-center">
                <h3 className="font-semibold text-purple-200 mb-2 flex items-center justify-center">
                  <Crown className="w-5 h-5 mr-2" />
                  Ready for your next masterpiece? 
                </h3>
                <p className="text-purple-300 mb-4">Unlimited generations • Priority processing • Early access features</p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setActiveTab('create')} className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                    Create Another Song
                  </Button>
                  <Button variant="outline" className="border-purple-400/50 text-purple-200 hover:bg-purple-600/20">
                    <Users className="w-4 h-4 mr-2" />
                    Start Collaboration
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProPlusDashboard;