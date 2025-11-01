import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Music, Download, Mic, Play, Pause, Upload, Volume2, Edit3, Settings, Users, Zap, Infinity, Crown, Layers, Headphones, Star, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ProDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    mood: '',
    duration: '',
    bpm: '',
    artistInspiration: '',
    language: '',
    ideas: '',
    voiceFile: null as File | null
  });
  const [artistSuggestions, setArtistSuggestions] = useState<string[]>([]);
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(false);
  
  // Primary voice management
  const [hasPrimaryVoice, setHasPrimaryVoice] = useState(false);
  const [primaryVoice, setPrimaryVoice] = useState<{
    name: string;
    uploadDate: string;
    duration: string;
  } | null>(null);
  const [showVoiceUploadModal, setShowVoiceUploadModal] = useState(false);
  
  // Voice profile for professional optimization
  const [voiceProfile, setVoiceProfile] = useState<{
    optimalKeys: string[];
    vocalRange: string;
    rangeDetail: string;
    voiceCharacteristics: string[];
    confidenceScore: number;
    preferredTempo: number[];
    isAnalyzed: boolean;
  } | null>(null);
  
  // Key selection state
  const [selectedKey, setSelectedKey] = useState('C Major');
  const [showKeyDropdown, setShowKeyDropdown] = useState(false);
  
  // Auto-match voice state
  const [isVoiceMatching, setIsVoiceMatching] = useState(false);
  const [voiceMatchResult, setVoiceMatchResult] = useState<{
    suggestedKey: string;
    vocalRange: string;
    confidence: number;
  } | null>(null);
  
  // BPM suggestion state
  const [bpmSuggestion, setBpmSuggestion] = useState<string>('');
  const [currentGenreRecommendation, setCurrentGenreRecommendation] = useState<string>('');
  
  // Melody preview state
  const [isPreviewingMelody, setIsPreviewingMelody] = useState(false);
  const [melodyPreviewSample, setMelodyPreviewSample] = useState<string>('');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  
  // AI Singer state
  const [isPlayingAISinger, setIsPlayingAISinger] = useState(false);
  const [aiSingerProgress, setAiSingerProgress] = useState(0);
  const [aiSingerLyrics, setAiSingerLyrics] = useState<string>('');
  
  // Available musical keys
  const musicalKeys = [
    'C Major', 'C# Major', 'D Major', 'D# Major', 'E Major', 
    'F Major', 'F# Major', 'G Major', 'G# Major', 'A Major', 
    'A# Major', 'B Major'
  ];
  
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

  // Genre to BPM recommendations with detailed tooltips (keys match dropdown values exactly)
  const genreBPMRecommendations = {
    'afrobeats': { 
      recommended: '100-120', 
      tooltip: '🎵 Afrobeats typically uses 100-120 BPM for that perfect danceable groove. This tempo allows for complex polyrhythms while keeping the energy high!' 
    },
    'pop': { 
      recommended: '90-120', 
      tooltip: '✨ Pop music at 90-120 BPM hits the sweet spot - upbeat enough to be catchy but comfortable for singing along.' 
    },
    'hiphop': { 
      recommended: '70-90', 
      tooltip: '🎤 Hip-Hop works best at 70-90 BPM - slow enough for clear lyrical delivery but with enough punch for head-nodding beats.' 
    },
    'rnb': { 
      recommended: '90-120', 
      tooltip: '� R&B flows beautifully at 90-120 BPM, giving space for smooth vocals and soulful melodies to breathe naturally.' 
    },
    'gospel': { 
      recommended: '80-120', 
      tooltip: '🙏 Gospel music ranges from 80-120 BPM, allowing for both powerful ballads and uplifting praise songs that move hearts and souls.' 
    },
    'highlife': { 
      recommended: '100-130', 
      tooltip: '🎺 Highlife dances at 100-130 BPM with its signature guitar rhythms and brass sections creating that classic West African swing.' 
    },
    'amapiano': { 
      recommended: '100-120', 
      tooltip: '🇿� Amapiano flows at 100-120 BPM with deep house influences and jazzy piano chords creating that smooth South African groove.' 
    },
    'reggae': { 
      recommended: '60-90', 
      tooltip: '🇯🇲 Reggae grooves at a relaxed 60-90 BPM with emphasis on the off-beat, creating that laid-back Caribbean feel that made Bob Marley famous.' 
    },
    'dancehall': { 
      recommended: '90-120', 
      tooltip: '🌴 Dancehall energizes at 90-120 BPM with that distinctive Caribbean bounce and digital rhythms perfect for party vibes.' 
    },
    'folk': { 
      recommended: '70-100', 
      tooltip: '🪕 Folk music breathes at 70-100 BPM, perfect for storytelling and acoustic instruments that connect with the heart.' 
    },
    'country': { 
      recommended: '80-120', 
      tooltip: '🤠 Country music ranges from 80-120 BPM, from slow ballads to boot-stomping barn burners that tell life stories.' 
    },
    'jazz': { 
      recommended: '90-140', 
      tooltip: '🎷 Jazz swings anywhere from 90-140 BPM depending on the style - from smooth ballads to energetic bebop that showcases musical virtuosity.' 
    }
  };
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [generationsUsed, setGenerationsUsed] = useState(7);
  const [activeTab, setActiveTab] = useState('create');
  const maxGenerations = 10;

  // Check for primary voice and profile on component mount (simulate API call)
  React.useEffect(() => {
    const savedVoice = localStorage.getItem('primaryVoice');
    const savedProfile = localStorage.getItem('voiceProfile');
    
    if (savedVoice) {
      const voiceData = JSON.parse(savedVoice);
      setPrimaryVoice(voiceData);
      setHasPrimaryVoice(true);
    }
    
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setVoiceProfile(profileData);
      // Auto-set optimal key from profile
      if (profileData.optimalKeys && profileData.optimalKeys.length > 0) {
        setSelectedKey(profileData.optimalKeys[0]);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle genre selection - auto-suggest BPM
    if (field === 'genre') {
      const bpmData = genreBPMRecommendations[value as keyof typeof genreBPMRecommendations];
      if (bpmData) {
        setFormData(prev => ({ ...prev, bpm: bpmData.recommended }));
        setBpmSuggestion(bpmData.tooltip);
        setCurrentGenreRecommendation(bpmData.recommended);
      } else {
        // Clear suggestions if genre doesn't have recommendations
        setBpmSuggestion('');
        setCurrentGenreRecommendation('');
      }
    }
    
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
    
    // Handle BPM selection - show recommendation status
    if (field === 'bpm' && formData.genre) {
      const bpmData = genreBPMRecommendations[formData.genre as keyof typeof genreBPMRecommendations];
      if (bpmData) {
        if (value === bpmData.recommended) {
          // User selected the recommended BPM - show the tooltip
          setBpmSuggestion(bpmData.tooltip);
        } else {
          // User selected a different BPM - show alternative message
          setBpmSuggestion(`You chose ${value} BPM instead of the recommended ${bpmData.recommended} BPM for ${formData.genre}. Great for adding your unique touch!`);
        }
      }
    }
  };

  const handleArtistSelect = (artist: string) => {
    setFormData(prev => ({ ...prev, artistInspiration: artist }));
    setShowArtistSuggestions(false);
  };

  const handleVoiceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, voiceFile: file }));
        
        // Save as primary voice (simulate backend save)
        const voiceData = {
          name: file.name,
          uploadDate: new Date().toLocaleDateString(),
          duration: "0:15" // Simulated duration
        };
        
        // Create comprehensive voice profile (simulate AI analysis)
        const profileData = {
          optimalKeys: ['G Major', 'A Major', 'F Major'], // AI-determined optimal keys
          vocalRange: 'Medium',
          rangeDetail: 'C4-G5', // Specific range from analysis
          voiceCharacteristics: ['Warm', 'Clear', 'Expressive'],
          confidenceScore: 94, // AI confidence in analysis
          preferredTempo: [120, 140], // BPM range that suits their voice
          isAnalyzed: true
        };
        
        localStorage.setItem('primaryVoice', JSON.stringify(voiceData));
        localStorage.setItem('voiceProfile', JSON.stringify(profileData));
        setPrimaryVoice(voiceData);
        setVoiceProfile(profileData);
        setHasPrimaryVoice(true);
        setShowVoiceUploadModal(false);
        
        toast.success(`Voice analyzed! Profile created with ${profileData.confidenceScore}% accuracy.`);
        
        // If user came from generate button, automatically go to melody editor
        if (activeTab === 'voice') {
          setTimeout(() => {
            setActiveTab('melody');
            toast.info('Voice setup complete! Ready for melody editing.');
          }, 1000);
        }
      } else {
        toast.error("Please upload a valid audio file.");
      }
    }
  };

  // Helper functions to simulate voice analysis
  const getOptimalKeyForVoice = () => {
    // Simulate different voice types returning different keys
    const voiceKeys = [
      'G Major', 'A Major', 'F Major', 'C Major', 'D Major', 'E Major'
    ];
    return voiceKeys[Math.floor(Math.random() * voiceKeys.length)];
  };

  const getVocalRangeFromPitch = () => {
    const ranges = ['Medium-Low', 'Medium', 'Medium-High', 'High'];
    return ranges[Math.floor(Math.random() * ranges.length)];
  };

  // Sample melody lyrics for preview
  const melodyPreviewLines = [
    "There's fire on the mountain tonight",
    "Dancing through the shadows of light", 
    "Every heartbeat tells a story untold",
    "Rising like the morning sun so bold",
    "Whispers in the wind call out my name",
    "Nothing will ever be the same"
  ];

  // Melody preview function
  const handlePreviewMelody = async () => {
    if (!hasPrimaryVoice || !primaryVoice) {
      toast.error("Please upload your primary voice first");
      setShowVoiceUploadModal(true);
      return;
    }

    setIsPreviewingMelody(true);
    
    try {
      // Pick a random preview line
      const randomLine = melodyPreviewLines[Math.floor(Math.random() * melodyPreviewLines.length)];
      setMelodyPreviewSample(randomLine);
      
      // Simulate AI melody generation with user's voice
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Start "playing" the preview
      setIsPlayingPreview(true);
      toast.success(`Generated melody preview in ${selectedKey} using ${primaryVoice.name}`);
      
      // Simulate playback duration (6 seconds)
      setTimeout(() => {
        setIsPlayingPreview(false);
        toast.info("Preview complete! Like what you heard?");
      }, 6000);
      
    } catch (error) {
      toast.error("Preview generation failed. Please try again.");
    } finally {
      setIsPreviewingMelody(false);
    }
  };

  // AI Singer function
  const handlePlayAISinger = async () => {
    if (!hasPrimaryVoice || !primaryVoice) {
      toast.error("Please upload your primary voice first");
      setShowVoiceUploadModal(true);
      return;
    }

    if (!formData.title || !formData.genre) {
      toast.error("Please complete song creation first");
      return;
    }

    setIsPlayingAISinger(true);
    setAiSingerProgress(0);
    
    try {
      // Generate AI lyrics based on user inputs
      const moodText = formData.mood ? ` ${formData.mood}` : '';
      const inspirationText = formData.artistInspiration ? ` inspired by ${formData.artistInspiration}` : '';
      const generatedLyrics = `"${formData.title}" - A${moodText} ${formData.genre} song${inspirationText}`;
      setAiSingerLyrics(generatedLyrics);
      
      toast.success(`🎵 Playing ${generatedLyrics}`);
      
      // Simulate realistic playback with progress
      const progressInterval = setInterval(() => {
        setAiSingerProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsPlayingAISinger(false);
            toast.success("🎤 AI Singer performance complete! Your voice sounds amazing!");
            return 100;
          }
          return prev + 1.25; // 1.25% every 100ms = 8 seconds total
        });
      }, 100);
      
    } catch (error) {
      toast.error("AI Singer playback failed. Please try again.");
      setIsPlayingAISinger(false);
      setAiSingerProgress(0);
    }
  };

  // Auto-match voice function
  const handleAutoMatchVoice = async () => {
    if (!hasPrimaryVoice || !primaryVoice) {
      toast.error("Please upload your primary voice first");
      setShowVoiceUploadModal(true);
      return;
    }

    setIsVoiceMatching(true);
    
    try {
      // Simulate voice analysis (replace with actual backend call later)
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second simulation
      
      // Mock voice analysis results (replace with actual backend response)
      const mockAnalysis = {
        suggestedKey: getOptimalKeyForVoice(),
        vocalRange: getVocalRangeFromPitch(),
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100% confidence
      };
      
      setVoiceMatchResult(mockAnalysis);
      setSelectedKey(mockAnalysis.suggestedKey);
      
      toast.success(
        `Voice matched! Key: ${mockAnalysis.suggestedKey}, Range: ${mockAnalysis.vocalRange}`,
        { duration: 4000 }
      );
      
    } catch (error) {
      toast.error("Voice matching failed. Please try again.");
    } finally {
      setIsVoiceMatching(false);
    }
  };

  const handleGenerate = async () => {
    if (generationsUsed >= maxGenerations) {
      toast.error("Daily limit reached! Upgrade to Pro+ for unlimited generations.");
      return;
    }

    if (!formData.title || !formData.genre || !formData.mood || !formData.duration || !formData.artistInspiration || !formData.language) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Auto-suggest BPM if not provided
    if (!formData.bpm) {
      const bpmData = genreBPMRecommendations[formData.genre as keyof typeof genreBPMRecommendations];
      if (bpmData) {
        setFormData(prev => ({ ...prev, bpm: bpmData.recommended }));
        setBpmSuggestion(bpmData.tooltip);
        toast.info(`BPM auto-set to ${bpmData.recommended} (${bpmData.tooltip})`);
      }
    }

    // Check for primary voice and navigate accordingly
    if (!hasPrimaryVoice) {
      // No primary voice - go to voice setup
      setActiveTab('voice');
      toast.info("Please set up your primary voice first");
      return;
    }

    setIsGenerating(true);
    
    // Professional AI generation with voice optimization
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationsUsed(prev => prev + 1);
      
      // Auto-optimize using voice profile
      if (voiceProfile && voiceProfile.isAnalyzed) {
        // Apply optimal settings from voice profile
        setSelectedKey(voiceProfile.optimalKeys[0]);
        setActiveTab('results');
        toast.success(`AI optimized your song using your voice profile! Key: ${voiceProfile.optimalKeys[0]}, Range: ${voiceProfile.vocalRange}`);
      } else {
        // Fallback to melody editor if no profile
        setActiveTab('melody');
        toast.success(`Song generated! Review your AI-optimized melody.`);
      }
    }, 4000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info("Recording started... Speak for 10-15 seconds for best results.");
    } else {
      toast.success("Recording saved! AI will learn your voice style.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-cyan-900 py-8 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/plans')}
              className="text-blue-200 hover:text-white hover:bg-blue-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <div className="h-6 w-px bg-blue-400" />
            <div className="flex items-center gap-2">
              <Volume2 className="w-6 h-6 text-blue-300" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                AI Singer + Pitch Guide
              </h1>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg shadow-blue-500/30">
                Pro
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-blue-200 font-medium">Daily Generations</p>
              <p className="text-2xl font-bold text-blue-100">{generationsUsed}/{maxGenerations}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile/pro')}
              className="w-12 h-12 bg-blue-800/50 hover:bg-blue-700/50 text-blue-200 hover:text-white border border-blue-400/30 rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40">
              <Mic className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <p className="text-blue-200 text-lg">
          Upload your voice and let AI sing with your style! 🎤
        </p>
        
        {/* Voice Status Indicator */}
        {voiceMatchResult && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Voice Optimized</span>
              </div>
              <span className="text-green-300 text-xs">
                {voiceMatchResult.suggestedKey} • {voiceMatchResult.vocalRange}
              </span>
            </div>
          </div>
        )}
        
        {/* Generation Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-blue-200 mb-2">
            <span>Generations Used Today</span>
            <span>{generationsUsed}/{maxGenerations}</span>
          </div>
          <Progress 
            value={(generationsUsed / maxGenerations) * 100} 
            className="h-2 bg-blue-800"
          />
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge className="bg-blue-600/30 text-blue-200 border-blue-500/50">
            <Mic className="w-3 h-3 mr-1" />
            Voice Upload
          </Badge>
          <Badge className="bg-cyan-600/30 text-cyan-200 border-cyan-500/50">
            <Volume2 className="w-3 h-3 mr-1" />
            AI Singer
          </Badge>
          <Badge className="bg-indigo-600/30 text-indigo-200 border-indigo-500/50">
            <Settings className="w-3 h-3 mr-1" />
            Pitch Guide
          </Badge>
          <Badge className="bg-blue-600/30 text-blue-200 border-blue-500/50">
            <Edit3 className="w-3 h-3 mr-1" />
            Melody Editor
          </Badge>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur border border-blue-500/30">
            <TabsTrigger value="create" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Create Song
            </TabsTrigger>
            <TabsTrigger value="voice" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Voice Setup
            </TabsTrigger>
            <TabsTrigger value="melody" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Melody Editor
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Results
            </TabsTrigger>
          </TabsList>

          {/* Create Song Tab */}
          <TabsContent value="create">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Creation Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
                  <div className="space-y-6">
                    {/* Song Title */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        Song Title *
                      </label>
                      <Input 
                        placeholder="Enter your song title" 
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-black/20 border-blue-400/50 text-white placeholder:text-blue-300 focus:border-blue-400"
                      />
                    </div>

                    {/* Genre & Mood */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Genre *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('genre', value)}>
                          <SelectTrigger className="bg-black/20 border-blue-400/50 text-white">
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-blue-500">
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
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Mood *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('mood', value)}>
                          <SelectTrigger className="bg-black/20 border-blue-400/50 text-white">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-blue-500">
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
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Duration *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('duration', value)}>
                          <SelectTrigger className="bg-black/20 border-blue-400/50 text-white">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-blue-500">
                            <SelectItem value="30s">30 seconds</SelectItem>
                            <SelectItem value="45s">45 seconds</SelectItem>
                            <SelectItem value="60s">1 minute</SelectItem>
                            <SelectItem value="90s">1:30 minutes</SelectItem>
                            <SelectItem value="120s">2 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Language *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('language', value)}>
                          <SelectTrigger className="bg-black/20 border-blue-400/50 text-white">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-blue-500">
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="pidgin">Pidgin</SelectItem>
                            <SelectItem value="mix">Mix of Both</SelectItem>
                            <SelectItem value="other" disabled>Other languages (coming soon)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* BPM Field - Full Width */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        BPM (Beats Per Minute)
                      </label>
                      <Select 
                        value={formData.bpm} 
                        onValueChange={(value) => handleInputChange('bpm', value)}
                      >
                        <SelectTrigger className="bg-black/20 border-blue-400/50 text-white">
                          <SelectValue placeholder="Select BPM range" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-blue-500">
                          <SelectItem value="70-90">Hip-Hop/Trap: 70-90 BPM</SelectItem>
                          <SelectItem value="90-120">Pop/R&B: 90-120 BPM</SelectItem>
                          <SelectItem value="100-120">Afrobeats: 100-120 BPM</SelectItem>
                          <SelectItem value="120-140">House/EDM: 120-140 BPM</SelectItem>
                          <SelectItem value="140-160">Drum & Bass: 140-160 BPM</SelectItem>
                          <SelectItem value="160-180">Hardcore/Gabber: 160-180 BPM</SelectItem>
                          <SelectItem value="60-80">Ballad/Slow: 60-80 BPM</SelectItem>
                          <SelectItem value="80-100">Mid-tempo: 80-100 BPM</SelectItem>
                        </SelectContent>
                      </Select>
                      {(bpmSuggestion || formData.genre) && (
                        <div className="mt-2 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                          <p className="text-xs text-blue-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            <span className="font-medium text-blue-200">Pro Tip:</span>
                            {bpmSuggestion || (formData.genre ? (() => {
                              const bpmData = genreBPMRecommendations[formData.genre as keyof typeof genreBPMRecommendations];
                              return bpmData ? bpmData.tooltip : `Selected ${formData.genre} - Choose the BPM range that matches your creative vision!`;
                            })() : "Select a genre above to get BPM recommendations!")}
                          </p>
                        </div>
                      )}
                    </div>



                    {/* Artist Inspiration - Full Width */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        Artist Inspiration *
                      </label>
                      <Input
                        placeholder="e.g., Beyoncé, Burna Boy, Ed Sheeran..."
                        value={formData.artistInspiration}
                        onChange={(e) => handleInputChange('artistInspiration', e.target.value)}
                        onFocus={() => formData.artistInspiration && setShowArtistSuggestions(artistSuggestions.length > 0)}
                        onBlur={() => setTimeout(() => setShowArtistSuggestions(false), 200)}
                        className="bg-black/20 border-blue-400/50 text-white placeholder:text-blue-300 focus:border-blue-400"
                      />
                      
                      {showArtistSuggestions && (
                        <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-blue-400/50 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {artistSuggestions.map((artist, index) => (
                            <div
                              key={index}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleArtistSelect(artist);
                              }}
                              className="px-4 py-2 hover:bg-blue-800/30 cursor-pointer text-white text-sm border-b border-blue-400/20 last:border-b-0"
                            >
                              {artist}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Ideas */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        Your Ideas & Concepts
                      </label>
                      <Textarea 
                        placeholder="Describe your song concept, story, or specific lyrics you want included..."
                        value={formData.ideas}
                        onChange={(e) => handleInputChange('ideas', e.target.value)}
                        className="bg-black/20 border-blue-400/50 text-white placeholder:text-blue-300 focus:border-blue-400"
                        rows={6}
                      />
                    </div>

                    {/* Generate Button */}
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating || generationsUsed >= maxGenerations}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 text-lg shadow-2xl shadow-blue-500/40 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                          AI is learning your voice & creating...
                        </>
                      ) : (
                        <>
                          <Music className="w-5 h-5 mr-3" />
                          Generate AI Singer Version (1 Token)
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Pro Features Sidebar */}
              <div>
                <Card className="p-6 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
                  <h3 className="font-semibold text-blue-200 mb-4 flex items-center">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Pro Features
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Mic className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium">Voice Upload & AI Singer</p>
                        <p className="text-blue-300">AI sings with your voice style</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Settings className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium">Pitch Correction</p>
                        <p className="text-blue-300">Visual pitch guide & auto-correction</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Edit3 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium">Melody Editor</p>
                        <p className="text-blue-300">Customize and tweak melodies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Volume2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium">High-Quality Audio</p>
                        <p className="text-blue-300">320kbps exports & preview</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Upgrade Prompt */}
                <Card className="mt-4 p-4 bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border-purple-500/40">
                  <h4 className="font-semibold text-purple-200 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Want More Power?
                  </h4>
                  <div className="text-xs text-purple-300 space-y-1 mb-3">
                    <p>• AI beat maker & producer tools</p>
                    <p>• Real-time collaboration</p>
                    <p>• Studio stems & WAV exports</p>
                    <p>• Unlimited generations</p>
                  </div>
                  <Button 
                    onClick={() => navigate('/plans')}
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Upgrade to Pro+
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Voice Setup Tab */}
          <TabsContent value="voice">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Voice Upload */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-200 mb-4">Upload Voice Sample</h3>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-blue-400/50 rounded-lg p-8 text-center bg-black/20">
                    {formData.voiceFile ? (
                      <div>
                        <Music className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-200 font-medium">{formData.voiceFile.name}</p>
                        <p className="text-sm text-blue-300">Voice sample uploaded!</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-200 mb-2">Upload your voice sample</p>
                        <p className="text-sm text-blue-300">MP3, WAV, or M4A (10-30 seconds recommended)</p>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleVoiceUpload}
                    accept="audio/*"
                    className="hidden"
                  />
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full border-blue-400/50 text-blue-200 hover:bg-blue-600/20"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Voice File
                  </Button>
                </div>
              </Card>

              {/* Record Voice */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-200 mb-4">Record Voice Sample</h3>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-blue-400/50 rounded-lg p-8 text-center bg-black/20">
                    <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-blue-200 font-medium">
                      {isRecording ? 'Recording in progress...' : 'Ready to record'}
                    </p>
                    <p className="text-sm text-blue-300">
                      {isRecording ? 'Speak naturally for 10-15 seconds' : 'Click below to start recording'}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={toggleRecording}
                    className={`w-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    {isRecording ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Voice Tips */}
            <Card className="mt-6 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/40">
              <h3 className="font-semibold text-blue-200 mb-3">🎙️ Voice Recording Tips:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-300">
                <ul className="space-y-1">
                  <li>• Record in a quiet environment</li>
                  <li>• Speak clearly and naturally</li>
                  <li>• 10-30 seconds is optimal</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Include varied tones and emotions</li>
                  <li>• Avoid background music</li>
                  <li>• Use good quality microphone if possible</li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          {/* Melody Editor Tab */}
          <TabsContent value="melody">
            <Card className="p-8 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
              <h3 className="text-xl font-semibold text-blue-200 mb-6">AI-Optimized Melody {voiceProfile ? '(Voice Matched)' : '(Review & Approve)'}</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Pitch Guide */}
                <div>
                  <h4 className="font-semibold text-blue-200 mb-4">AI Voice Optimization</h4>
                  <div className="bg-black/20 rounded-lg p-6 border border-blue-500/30">
                    {/* Voice Profile Status */}
                    {voiceProfile ? (
                      <div className="mb-4 p-3 bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-500/40 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm font-medium">Voice Optimized</span>
                          <span className="text-green-300 text-xs ml-auto">{voiceProfile.confidenceScore}% match</span>
                        </div>
                        <p className="text-xs text-green-300 mb-2">
                          AI selected optimal settings for your voice profile
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {voiceProfile.voiceCharacteristics.map((char, i) => (
                            <span key={i} className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded">
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 p-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/40 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-blue-400 text-sm font-medium">Standard Settings</span>
                        </div>
                        <p className="text-xs text-blue-300">
                          Upload your voice for personalized optimization
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-blue-300">
                        <span>Vocal Range:</span>
                        <span className="font-medium text-blue-200">
                          {voiceProfile ? `${voiceProfile.vocalRange} (${voiceProfile.rangeDetail})` : "Medium (Safe for most singers)"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-blue-300">
                        <span>Optimal Key:</span>
                        <span className="font-medium text-blue-200">
                          {voiceProfile ? voiceProfile.optimalKeys[0] : selectedKey}
                          {voiceProfile && <span className="text-green-400 text-xs ml-1">✓ AI Selected</span>}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-blue-300">
                        <span>Optimal BPM:</span>
                        <span className="font-medium text-blue-200">
                          {voiceProfile ? `${voiceProfile.preferredTempo[0]}-${voiceProfile.preferredTempo[1]} BPM` : "120 BPM"}
                          {voiceProfile && <span className="text-green-400 text-xs ml-1">✓ Voice Matched</span>}
                        </span>
                      </div>
                      {voiceMatchResult && (
                        <div className="flex justify-between text-sm text-blue-300">
                          <span>Voice Match:</span>
                          <span className="font-medium text-green-400">
                            {voiceMatchResult.confidence}% confidence
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Melody Preview Display */}
                    {melodyPreviewSample && (
                      <div className="mb-4 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/40 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${isPlayingPreview ? 'bg-green-400 animate-pulse' : 'bg-purple-400'}`}></div>
                          <span className="text-purple-400 text-sm font-medium">
                            {isPlayingPreview ? 'Now Playing' : 'Preview Generated'}
                          </span>
                        </div>
                        <div className="bg-black/30 rounded p-3 mb-2">
                          <p className="text-white text-sm italic">"{melodyPreviewSample}"</p>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-300">Key: {selectedKey}</span>
                          <span className="text-purple-300">Voice: {primaryVoice?.name}</span>
                        </div>
                        {isPlayingPreview && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div className="bg-green-400 h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
                            </div>
                            <p className="text-xs text-green-400 mt-1">Playing melody preview...</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Mock Pitch Visualization */}
                    <div className="bg-black/40 rounded p-4 border border-blue-500/20">
                      <div className="text-xs text-blue-400 mb-2">
                        Pitch Pattern {voiceMatchResult ? "(Optimized for your voice)" : ""}:
                      </div>
                      <div className="flex items-end justify-between h-20 gap-1">
                        {[40, 60, 45, 70, 55, 80, 65, 50, 75, 60, 45, 65].map((height, i) => (
                          <div 
                            key={i} 
                            className={`w-4 rounded-t ${
                              voiceMatchResult 
                                ? "bg-gradient-to-t from-green-600 to-cyan-400" 
                                : "bg-gradient-to-t from-blue-600 to-cyan-400"
                            }`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Melody Controls */}
                <div>
                  <h4 className="font-semibold text-blue-200 mb-4">Melody Controls</h4>
                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => setShowKeyDropdown(true)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Change Key
                    </Button>
                    <Button 
                      onClick={handleAutoMatchVoice}
                      disabled={isVoiceMatching || !hasPrimaryVoice}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-50"
                    >
                      {isVoiceMatching ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Analyzing your voice...
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Auto-match My Voice
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-400/50 text-blue-200 hover:bg-blue-600/20"
                      onClick={() => toast.info("Tip: Use 'Preview Melody' to hear your voice with different keys and ranges!")}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Melody Tips & Guide
                    </Button>
                    <Button 
                      onClick={handlePreviewMelody}
                      disabled={isPreviewingMelody || !hasPrimaryVoice}
                      className={`w-full ${
                        isPlayingPreview 
                          ? "bg-green-600 hover:bg-green-700 text-white animate-pulse" 
                          : "border-blue-400/50 text-blue-200 hover:bg-blue-600/20"
                      }`}
                      variant={isPlayingPreview ? "default" : "outline"}
                    >
                      {isPreviewingMelody ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Generating Preview...
                        </>
                      ) : isPlayingPreview ? (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Playing Preview...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Preview Melody
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            {/* Voice Optimization Header */}
            {voiceProfile && (
              <Card className="p-4 bg-gradient-to-r from-green-900/20 to-cyan-900/20 border-green-500/30 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-400">AI-Optimized for Your Voice</h3>
                      <p className="text-sm text-green-300">
                        Generated using your voice profile • {voiceProfile.confidenceScore}% accuracy match
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium">{voiceProfile.optimalKeys[0]}</p>
                    <p className="text-xs text-green-300">{voiceProfile.vocalRange} Range</p>
                  </div>
                </div>
              </Card>
            )}
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Lyrics */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-200 mb-4">Your Lyrics</h3>
                <div className="space-y-4 text-sm text-blue-300">
                  <div>
                    <p className="font-medium mb-1 text-blue-200">VERSE 1:</p>
                    <p className="italic">In the city lights, we dance tonight</p>
                    <p className="italic">Hearts beating fast, everything feels right</p>
                    <p className="italic">Your smile lights up the darkest skies</p>
                    <p className="italic">Together we rise, we touch the sky</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-blue-200">CHORUS:</p>
                    <p className="italic">We're unstoppable, incredible</p>
                    <p className="italic">Nothing can break us now</p>
                    <p className="italic">We're unshakeable, unmistakable</p>
                    <p className="italic">Together we'll show them how</p>
                  </div>
                </div>
              </Card>

              {/* Melody Guide */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-200 mb-4">
                  Melody Guide 
                  <Badge className="ml-2 bg-green-600 text-white">{voiceProfile ? 'Voice Matched' : 'Enhanced'}</Badge>
                </h3>
                
                <div className="space-y-4">
                  {/* Voice Optimization Details */}
                  <div className="space-y-2 text-sm border-b border-blue-500/20 pb-3">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Vocal Range:</span>
                      <span className="font-medium text-blue-200">
                        {voiceProfile ? `${voiceProfile.vocalRange} (${voiceProfile.rangeDetail})` : "Medium (C4-G5)"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Optimal Key:</span>
                      <span className="font-medium text-blue-200">
                        {voiceProfile ? voiceProfile.optimalKeys[0] : "C Major"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">BPM Range:</span>
                      <span className="font-medium text-blue-200">
                        {voiceProfile ? `${voiceProfile.preferredTempo[0]}-${voiceProfile.preferredTempo[1]}` : "120"} BPM
                      </span>
                    </div>
                  </div>

                  {/* Tonic Solfa Notation */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-200 text-base">Tonic Solfa:</h4>
                    
                    <div className="bg-black/30 rounded p-3 border border-blue-500/20">
                      <p className="text-blue-300 text-xs mb-2 font-medium">VERSE:</p>
                      <p className="font-mono text-blue-200 text-sm">d - r - m - f | s - f - m - d |</p>
                      <p className="font-mono text-blue-200 text-sm">m - r - d - r | m - f - s - s |</p>
                    </div>
                    
                    <div className="bg-black/30 rounded p-3 border border-blue-500/20">
                      <p className="text-blue-300 text-xs mb-2 font-medium">CHORUS:</p>
                      <p className="font-mono text-blue-200 text-sm">s - l - s - f | m - r - d - d |</p>
                      <p className="font-mono text-blue-200 text-sm">f - s - l - t | d' - s - f - m |</p>
                    </div>
                    
                    <div className="bg-black/30 rounded p-3 border border-blue-500/20">
                      <p className="text-blue-300 text-xs mb-2 font-medium">HOOK MELODY:</p>
                      <p className="font-mono text-blue-200 text-sm">m - s - f - d | r - m - d - s, |</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Singer Audio */}
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-200 mb-4">
                  AI Singer Audio 
                  <Badge className="ml-2 bg-yellow-600 text-white">Voice Matched</Badge>
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/30 text-center">
                    <Volume2 className={`w-12 h-12 mx-auto mb-2 ${isPlayingAISinger ? 'text-green-400 animate-bounce' : 'text-blue-400'}`} />
                    <p className="text-blue-200 font-medium">
                      {isPlayingAISinger ? 'AI Singer Performing!' : 'AI Singer Ready!'}
                    </p>
                    <p className="text-sm text-blue-300">
                      {hasPrimaryVoice && primaryVoice 
                        ? `Using ${primaryVoice.name} voice style` 
                        : 'Upload voice for personalized singing'
                      }
                    </p>
                    {formData.title && !isPlayingAISinger && (
                      <p className="text-xs text-cyan-300 mt-1">
                        Ready to perform: "{formData.title}"
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handlePlayAISinger}
                      disabled={isPlayingAISinger}
                      className={`w-full ${
                        isPlayingAISinger 
                          ? 'bg-green-600 animate-pulse' 
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      } text-white`}
                    >
                      {isPlayingAISinger ? (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Playing "{formData.title}"... {Math.round(aiSingerProgress)}%
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Play AI Singer Version
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full border-blue-400/50 text-blue-200 hover:bg-blue-600/20">
                      <Download className="w-4 h-4 mr-2" />
                      Download High Quality
                    </Button>
                  </div>

                  {/* AI Singer Progress Display */}
                  {isPlayingAISinger && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">AI Singer Performing</span>
                        <span className="text-green-300 text-xs ml-auto">{Math.round(aiSingerProgress)}%</span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full transition-all duration-300" 
                            style={{width: `${aiSingerProgress}%`}}
                          />
                        </div>
                      </div>
                      
                      <div className="text-xs text-green-300">
                        <p>🎤 Singing with {primaryVoice?.name} voice style</p>
                        <p>🎵 Key: {selectedKey} | BPM: {formData.bpm || 'Auto'}</p>
                        {aiSingerLyrics && <p className="italic mt-1">"{aiSingerLyrics}"</p>}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-blue-400 pt-2 border-t border-blue-500/30">
                    <p>✅ Pitch corrected</p>
                    <p>✅ Voice style applied</p>
                    <p>✅ High-quality audio (320kbps)</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Create Another */}
            <Card className="mt-6 p-6 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 text-center">
              <h3 className="font-semibold text-blue-200 mb-2 flex items-center justify-center">
                <Volume2 className="w-5 h-5 mr-2" />
                Love your AI singer? 🎤
              </h3>
              <p className="text-blue-300 mb-4">You have {maxGenerations - generationsUsed} generations left today.</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setActiveTab('create')} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  Create Another Song
                </Button>
                <Button variant="outline" onClick={() => navigate('/plans')} className="border-blue-400/50 text-blue-200 hover:bg-blue-600/20">
                  <Star className="w-4 h-4 mr-2" />
                  Upgrade to Pro+ for Unlimited
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Key Selection Modal */}
      <Dialog open={showKeyDropdown} onOpenChange={setShowKeyDropdown}>
        <DialogContent className="bg-gray-900 border-blue-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-200">
              Select Musical Key
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 p-4">
            <p className="text-blue-300 text-sm">
              Current Key: <span className="font-semibold text-blue-200">{selectedKey}</span>
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {musicalKeys.map((key) => (
                <Button
                  key={key}
                  variant={selectedKey === key ? "default" : "outline"}
                  className={`${
                    selectedKey === key 
                      ? "bg-blue-600 text-white" 
                      : "border-blue-400/50 text-blue-200 hover:bg-blue-600/20"
                  }`}
                  onClick={() => {
                    setSelectedKey(key);
                    setShowKeyDropdown(false);
                    toast.success(`Key changed to ${key}`);
                  }}
                >
                  {key}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voice Upload Modal */}
      <Dialog open={showVoiceUploadModal} onOpenChange={setShowVoiceUploadModal}>
        <DialogContent className="bg-gray-900 border-blue-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-200">
              Upload Your Primary Voice
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 p-4">
            <div className="text-center">
              <Mic className="h-16 w-16 mx-auto mb-4 text-blue-400" />
              <p className="text-blue-200 mb-2">
                Upload a voice sample to personalize your AI singer
              </p>
              <p className="text-sm text-blue-300">
                Best results with 10-30 second clear recordings
              </p>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3"
              >
                <Upload className="h-5 w-5 mr-2" />
                Choose Audio File
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleVoiceUpload}
                className="hidden"
              />

              <div className="text-xs text-blue-400 text-center">
                Supported formats: MP3, WAV, M4A, AAC
              </div>
            </div>

            {/* Current Voice Status */}
            {hasPrimaryVoice && primaryVoice && (
              <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mic className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-200">Current Primary Voice</p>
                    <p className="text-sm text-blue-300">{primaryVoice.name}</p>
                    <p className="text-xs text-blue-400">Uploaded {primaryVoice.uploadDate}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowVoiceUploadModal(false)}
                className="flex-1 border-blue-400/50 text-blue-200 hover:bg-blue-600/20"
              >
                Cancel
              </Button>
              {hasPrimaryVoice && (
                <Button
                  onClick={() => setShowVoiceUploadModal(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProDashboard;