import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Music, Download, Mic, Play, Pause, Upload, Volume2, Edit3, Settings, Users, Zap, Infinity, Crown, Layers, Headphones, User, X, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const ProPlusDashboard = () => {
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
    voiceFile: null as File | null,
    referenceLink: ''
  });
  const [artistSuggestions, setArtistSuggestions] = useState<string[]>([]);
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(false);
  
  // Voice management state
  const [hasPrimaryVoice, setHasPrimaryVoice] = useState(false);
  const [primaryVoice, setPrimaryVoice] = useState<{name: string, uploadDate: string} | null>(null);
  const [showVoiceUploadModal, setShowVoiceUploadModal] = useState(false);
  const voiceFileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  // Melody preview state  
  const [isPreviewingMelody, setIsPreviewingMelody] = useState(false);
  const [melodyPreviewSample, setMelodyPreviewSample] = useState<string>('');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  
  // Melody editor state
  const [selectedKey, setSelectedKey] = useState('C Major');
  const [showKeyDropdown, setShowKeyDropdown] = useState(false);
  
  // Auto-match voice state
  const [isVoiceMatching, setIsVoiceMatching] = useState(false);
  const [voiceMatchResult, setVoiceMatchResult] = useState<{
    suggestedKey: string;
    vocalRange: string;
    confidence: number;
  } | null>(null);
  
  // Available keys for the dropdown
  const availableKeys = [
    'C Major',
    'C# Major', 
    'D Major',
    'D# Major',
    'E Major',
    'F Major',
    'F# Major',
    'G Major',
    'A Major',
    'B Major'
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

  // BPM recommendations by genre
  const genreBPMMap = {
    'Afrobeats': { bpm: '110', reason: 'Typical Afrobeats tempo' },
    'Hip-Hop': { bpm: '80', reason: 'Classic Hip-Hop tempo' },
    'Trap': { bpm: '75', reason: 'Modern Trap tempo' },
    'Pop': { bpm: '120', reason: 'Standard Pop tempo' },
    'R&B': { bpm: '95', reason: 'Smooth R&B tempo' },
    'House': { bpm: '128', reason: 'Club-ready House tempo' },
    'EDM': { bpm: '130', reason: 'High-energy EDM tempo' },
    'Dancehall': { bpm: '90', reason: 'Caribbean Dancehall tempo' },
    'Amapiano': { bpm: '112', reason: 'South African Amapiano tempo' },
    'Drill': { bpm: '140', reason: 'Aggressive Drill tempo' },
    'Reggae': { bpm: '75', reason: 'Laid-back Reggae tempo' },
    'Gospel': { bpm: '100', reason: 'Uplifting Gospel tempo' }
  };
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [bpmSuggestion, setBpmSuggestion] = useState<string>('');
  const [beatSettings, setBeatSettings] = useState({
    tempo: [120],
    instruments: ['drums', 'bass'],
    complexity: [70]
  });
  const [activeTab, setActiveTab] = useState('create');
  const [songStructure, setSongStructure] = useState('');
  const [structureTip, setStructureTip] = useState('');
  const [rhymeScheme, setRhymeScheme] = useState('');
  const [rhymeTip, setRhymeTip] = useState('');
  const [collaborators] = useState([
    { name: 'Sarah M.', role: 'Producer', status: 'online' },
    { name: 'Mike T.', role: 'Mixer', status: 'away' }
  ]);

  // Request a songwriter/producer form state
  const [requestForm, setRequestForm] = useState({
    fullName: '',
    email: '',
    songTitle: '',
    genre: 'Afrobeats',
    songType: 'Full Song',
    mood: 'Happy',
    description: '',
    agree: false
  });
  const [requestFiles, setRequestFiles] = useState<File | null>(null);
  const requestFileRef = useRef<HTMLInputElement>(null);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  
  // New forms for Beat Production and Collaboration (human)
  const [beatForm, setBeatForm] = useState({
    projectName: '',
    genre: '',
    tempo: '',
    instruments: '',
    usageType: '',
    description: '',
    agree: false
  });
  const beatFileRef = useRef<HTMLInputElement>(null);
  const [beatFile, setBeatFile] = useState<File | null>(null);
  const [isSubmittingBeat, setIsSubmittingBeat] = useState(false);

  const [collabForm, setCollabForm] = useState({
    title: '',
    role: '',
    lookingFor: '',
    genre: '',
    mood: '',
    description: '',
    linkOrFile: '',
    terms: '',
    agree: false
  });
  const collabFileRef = useRef<HTMLInputElement>(null);
  const [isSubmittingCollab, setIsSubmittingCollab] = useState(false);

  const handleRequestChange = (field: string, value: any) => {
    setRequestForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBeatChange = (field: string, value: any) => {
    setBeatForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBeatFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setBeatFile(file);
  };

  const handleBeatSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!beatForm.agree) {
      toast.error('Please agree to be contacted about this project.');
      return;
    }
    setIsSubmittingBeat(true);
    try {
      await new Promise(res => setTimeout(res, 1000));
      toast.success('Beat request sent! We will contact you via email.');
      setBeatForm({ projectName: '', genre: '', tempo: '', instruments: '', usageType: '', description: '', agree: false });
      setBeatFile(null);
      if (beatFileRef.current) beatFileRef.current.value = '';
    } catch (err) {
      toast.error('Failed to send beat request.');
    } finally {
      setIsSubmittingBeat(false);
    }
  };

  const handleCollabChange = (field: string, value: any) => {
    setCollabForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCollabSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!collabForm.agree) {
      toast.error('Please agree to be contacted about this collaboration.');
      return;
    }
    setIsSubmittingCollab(true);
    try {
      await new Promise(res => setTimeout(res, 1000));
      toast.success('Collaboration request sent! We will contact you via email.');
      setCollabForm({ title: '', role: '', lookingFor: '', genre: '', mood: '', description: '', linkOrFile: '', terms: '', agree: false });
      if (collabFileRef.current) collabFileRef.current.value = '';
    } catch (err) {
      toast.error('Failed to send collaboration request.');
    } finally {
      setIsSubmittingCollab(false);
    }
  };

  // Live chat placeholder
  const handleChatClick = () => {
    toast.info('Live chat coming soon — stay tuned!');
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setRequestFiles(file);
  };

  const handleRequestSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!requestForm.fullName.trim() || !requestForm.email.trim()) {
      toast.error('Please provide your full name and email.');
      return;
    }
    if (!requestForm.agree) {
      toast.error('You must agree to be contacted about this project.');
      return;
    }

    setIsSubmittingRequest(true);
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      toast.success('Song request sent! We will contact you via email.');
      // reset form
      setRequestForm({ fullName: '', email: '', songTitle: '', genre: 'Afrobeats', songType: 'Full Song', mood: 'Happy', description: '', agree: false });
      setRequestFiles(null);
      if (requestFileRef.current) requestFileRef.current.value = '';
    } catch (err) {
      toast.error('Failed to send request. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle genre selection - auto-suggest BPM
    if (field === 'genre') {
      const bpmData = genreBPMMap[value as keyof typeof genreBPMMap];
      if (bpmData) {
        setFormData(prev => ({ ...prev, bpm: bpmData.bpm }));
        setBpmSuggestion(bpmData.reason);
        toast.success(`${bpmData.bpm} BPM suggested - ${bpmData.reason}`);
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
    
    // Clear BPM suggestion when manually editing BPM
    if (field === 'bpm') {
      setBpmSuggestion('');
    }
  };

  const handleArtistSelect = (artist: string) => {
    setFormData(prev => ({ ...prev, artistInspiration: artist }));
    setShowArtistSuggestions(false);
  };

  // Voice management functions
  useEffect(() => {
    // Check for existing primary voice and profile on component mount
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
    }
  }, []);

  const handleVoiceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate voice processing and save as primary voice
      const voiceData = {
        name: file.name,
        uploadDate: new Date().toLocaleDateString()
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
      
      // If user came from generate button, automatically go to beats editor
      if (activeTab === 'voice') {
        setTimeout(() => {
          setActiveTab('beats');
          toast.info('Voice setup complete! Ready for beat creation.');
        }, 1000);
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
        toast.info("Preview complete! Ready for full beat creation?");
      }, 6000);
      
    } catch (error) {
      toast.error("Preview generation failed. Please try again.");
    } finally {
      setIsPreviewingMelody(false);
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
    if (!formData.title || !formData.genre || !formData.mood || !formData.duration || !formData.artistInspiration || !formData.language) {
      toast.error("Please fill in all required fields.");
      return;
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
      
      // Auto-optimize using voice profile
      if (voiceProfile && voiceProfile.isAnalyzed) {
        // Apply optimal settings from voice profile
        setActiveTab('results');
        toast.success(`AI optimized your complete songwriter suite! Key: ${voiceProfile.optimalKeys[0]}, Range: ${voiceProfile.vocalRange}`);
      } else {
        // Fallback to beats editor if no profile
        setActiveTab('beats');
        toast.success(`Song generated! Review your AI-optimized composition.`);
      }
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
            
              <div className="flex items-center gap-2">
              
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
          Human collaboration hub for songwriters, beat producers, and collaborators — connect with real people to bring your project to life.
        </p>
        
        {/* Feature Highlights - focused on human collaboration */}
              </div>

      {/* Main Interface */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
    <TabsList className="grid w-full grid-cols-3 bg-black/40 backdrop-blur border border-purple-500/30">
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Songwriting
            </TabsTrigger>
            <TabsTrigger value="beats" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Beat Production
            </TabsTrigger>
            <TabsTrigger value="collab" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Collaboration
            </TabsTrigger>
          </TabsList>

          {/* Songwriting Tab */}
          <TabsContent value="create">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Creation Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <div className="flex items-start justify-between mb-2">
                     <div className="mr-4">
                      <h3 className="text-xl font-semibold text-purple-200 mb-1">Songwriting Request</h3>
                      <p className="text-sm text-purple-300 mb-3">Fill out this form to request a professional songwriter to co-write, refine, or develop your song idea.</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Button variant="ghost" size="icon" onClick={handleChatClick} className="text-purple-300 hover:text-white">
                        <MessageSquare className="w-5 h-5" />
                      </Button>
                      <span className="text-xs text-purple-300 mt-1">Live Chat</span>
                    </div>
                  </div>
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
                        <Select onValueChange={(value) => {
                          setSongStructure(value);
                          // Map tips to each structure
                          const tips: Record<string, string> = {
                            'verse-chorus-bridge': 'Classic pop/afrobeats pattern (most popular).',
                            'hook-verse-hook': 'Used a lot in afrobeat and hip-hop — short, catchy, repeat-heavy.',
                            'verse-chorus-outro': "Simple, emotional songs, especially R&B.",
                            'freeform': 'For songwriters who want to do their own unique thing.'
                          };
                          setStructureTip(tips[value] ?? '');
                        }}>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select structure" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="verse-chorus-bridge">Verse – Chorus – Verse – Chorus – Bridge – Chorus</SelectItem>
                            <SelectItem value="hook-verse-hook">Hook – Verse – Hook</SelectItem>
                            <SelectItem value="verse-chorus-outro">Verse – Chorus – Verse – Chorus – Outro</SelectItem>
                            <SelectItem value="freeform">Freeform / Open Structure</SelectItem>
                          </SelectContent>
                        </Select>

                        {structureTip && (
                          <p className="text-xs text-purple-300 mt-2">Pro tip: {structureTip}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Rhyme Scheme
                        </label>
                        <Select onValueChange={(value) => {
                          setRhymeScheme(value);
                          const tips: Record<string, string> = {
                            'aabb': 'AABB → Line 1 rhymes with Line 2, Line 3 rhymes with Line 4.',
                            'abab': 'ABAB → Alternating rhymes.',
                            'abba': 'ABBA → Wrap-around pattern (used in ballads or poetic songs).',
                            'free': 'Freestyle / No Set Pattern → For rap or spoken-word style writing.'
                          };
                          setRhymeTip(tips[value] ?? '');
                        }}>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white">
                            <SelectValue placeholder="Select rhyme style" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-500">
                            <SelectItem value="aabb">AABB </SelectItem>
                            <SelectItem value="abab">ABAB </SelectItem>
                            <SelectItem value="abba">ABBA(ballad/poetic)</SelectItem>
                            <SelectItem value="free">Freestyle / No Set Pattern</SelectItem>
                          </SelectContent>
                        </Select>

                        {rhymeTip && (
                          <p className="text-xs text-purple-300 mt-2">Pro tip: {rhymeTip}</p>
                        )}
                      </div>
                    </div>
                    {/* Main pro tip shown until the user picks a structure or rhyme scheme */}
                    {(!songStructure && !rhymeScheme) && (
                      <p className="text-sm text-purple-300 mb-2">
                        Pro tip: If you’re not sure what to pick, choose <span className="font-semibold">Freeform</span> for structure and <span className="font-semibold">Freestyle</span> for rhyme — it gives your songwriter more creative freedom.
                      </p>
                    )}

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

                    {/* Optional File Upload for Songwriter (artist/demo) */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Upload Demo / Melody (optional)
                      </label>
                      <div className="flex items-center gap-3">
                        <input ref={requestFileRef} type="file" accept="audio/*" onChange={(e) => handleFilesChange(e)} className="text-sm text-purple-300" />
                        {requestFiles && <p className="text-sm text-purple-300">{requestFiles.name}</p>}
                      </div>
                      <p className="text-xs text-purple-400 mt-1">Attach a demo (.mp3, .wav) or melody to help the songwriter.</p>
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
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={requestForm.agree} onChange={(e) => handleRequestChange('agree', e.target.checked)} className="accent-purple-500" id="songwriter-agree" />
                      <label htmlFor="songwriter-agree" className="text-sm text-purple-300">I agree to be contacted about this songwriting via email.</label>
                    </div>

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
                      <Crown className="w-4 h-4 text-purple-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">Songwriting</p>
                        <p className="text-purple-300">Professional songwriters ready to co-write with you</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Headphones className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">Beat Production</p>
                        <p className="text-purple-300">Request human beat producers for custom instrumentals</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-purple-200 font-medium">Collaboration</p>
                        <p className="text-purple-300">Find artists, producers, and engineers to collaborate with</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Early Access Features */}
                
              </div>
            </div>
          </TabsContent>

          {/* Beat Maker Tab */}
          <TabsContent value="beats">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-200 mb-2">Beat Production Request</h3>
                      <p className="text-sm text-purple-300 mb-4">Fill out this form to request a human beat producer for your project.</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex flex-col items-center">
                      <Button variant="ghost" size="icon" onClick={handleChatClick} className="text-purple-300 hover:text-white">
                        <MessageSquare className="w-5 h-5" />
                      </Button>
                      <span className="text-xs text-purple-300 mt-1">Live Chat</span>
                    </div>
                  </div>

                  <form onSubmit={handleBeatSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Project Name (optional)</label>
                      <Input value={beatForm.projectName} onChange={(e) => handleBeatChange('projectName', e.target.value)} placeholder="Project name" className="bg-black/20 border-purple-400/50 text-white" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">Genre / Style</label>
                        <Select value={beatForm.genre} onValueChange={(value) => handleBeatChange('genre', value)}>
                          <SelectTrigger className="bg-black/20 border-purple-400/50 text-white"><SelectValue placeholder="Select genre" /></SelectTrigger>
                          <SelectContent className="bg-black border-purple-500/30">
                            <SelectItem value="Trap">Trap</SelectItem>
                            <SelectItem value="Afrobeat">Afrobeat</SelectItem>
                            <SelectItem value="Pop">Pop</SelectItem>
                            <SelectItem value="R&B">R&B</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">Preferred Tempo (BPM)</label>
                        <Input type="number" value={beatForm.tempo} onChange={(e) => handleBeatChange('tempo', e.target.value)} placeholder="e.g. 120" className="bg-black/20 border-purple-400/50 text-white" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Instruments / Sound Direction</label>
                      <Textarea value={beatForm.instruments} onChange={(e) => handleBeatChange('instruments', e.target.value)} placeholder="e.g., Drums heavy, synths soft, Afro groove" className="bg-black/20 border-purple-400/50 text-white" rows={4} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Reference Track Upload</label>
                      <input ref={beatFileRef} type="file" accept="audio/*" onChange={handleBeatFile} className="text-sm text-purple-300" />
                      {beatFile && <p className="text-sm text-purple-300 mt-2">{beatFile.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Usage Type</label>
                      <Select value={beatForm.usageType} onValueChange={(value) => handleBeatChange('usageType', value)}>
                        <SelectTrigger className="bg-black/20 border-purple-400/50 text-white"><SelectValue placeholder="Select usage" /></SelectTrigger>
                        <SelectContent className="bg-black border-purple-500/30">
                          <SelectItem value="Exclusive">Exclusive beat</SelectItem>
                          <SelectItem value="Non-exclusive">Non-exclusive</SelectItem>
                          <SelectItem value="Custom Remake">Custom remake</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Description / Notes</label>
                      <Textarea value={beatForm.description} onChange={(e) => handleBeatChange('description', e.target.value)} placeholder="Describe your concept, artist vibe, or lyrics inspiration." className="bg-black/20 border-purple-400/50 text-white" rows={4} />
                    </div>

                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={beatForm.agree} onChange={(e) => handleBeatChange('agree', e.target.checked)} className="accent-purple-500" />
                      <label className="text-sm text-purple-300">I agree to be contacted about this project via email.</label>
                    </div>

                    <div>
                      <Button type="submit" onClick={handleBeatSubmit} className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white" disabled={isSubmittingBeat}>
                        {isSubmittingBeat ? 'Sending...' : 'Send Beat Request'}
                      </Button>
                    </div>
                  </form>
                </Card>

                <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">Beat Production Tips</h3>
                  <p className="text-sm text-purple-300">Include reference tracks and a short note about the groove you want. The more detail, the faster a producer can match your vision.</p>
                  <ul className="text-sm text-purple-300 mt-3 space-y-1 list-disc list-inside">
                    <li>Preferred tempo and key</li>
                    <li>Reference tracks or stems</li>
                    <li>Usage (exclusive/non-exclusive)</li>
                  </ul>
                </Card>
              </div>
          </TabsContent>

          {/* Collaboration Requests */}
          <TabsContent value="collab">
            <div className="grid lg:grid-cols-1 gap-6">
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-200 mb-1">Collaboration Request</h3>
                    <p className="text-sm text-purple-300 mb-4">Describe your collaboration and who you're looking for.</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex flex-col items-center">
                    <Button variant="ghost" size="icon" onClick={handleChatClick} className="text-purple-300 hover:text-white">
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                    <span className="text-xs text-purple-300 mt-1">Live Chat</span>
                  </div>
                </div>

                <form onSubmit={handleCollabSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Collab Title</label>
                    <Input value={collabForm.title} onChange={(e) => handleCollabChange('title', e.target.value)} placeholder="Project / Collab title" className="bg-black/20 border-purple-400/50 text-white" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Your Role</label>
                      <Select value={collabForm.role} onValueChange={(value) => handleCollabChange('role', value)}>
                        <SelectTrigger className="bg-black/20 border-purple-400/50 text-white"><SelectValue placeholder="Select your role" /></SelectTrigger>
                        <SelectContent className="bg-black border-purple-500/30">
                          <SelectItem value="Artist">Artist</SelectItem>
                          <SelectItem value="Songwriter">Songwriter</SelectItem>
                          <SelectItem value="Producer">Producer</SelectItem>
                          <SelectItem value="Mixing Engineer">Mixing Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Looking For</label>
                      <Select value={collabForm.lookingFor} onValueChange={(value) => handleCollabChange('lookingFor', value)}>
                        <SelectTrigger className="bg-black/20 border-purple-400/50 text-white"><SelectValue placeholder="Who are you looking for?" /></SelectTrigger>
                        <SelectContent className="bg-black border-purple-500/30">
                          <SelectItem value="Artist">Artist</SelectItem>
                          <SelectItem value="Songwriter">Songwriter</SelectItem>
                          <SelectItem value="Producer">Producer</SelectItem>
                          <SelectItem value="Mixing Engineer">Mixing Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Genre</label>
                      <Select value={collabForm.genre} onValueChange={(value) => handleCollabChange('genre', value)}>
                        <SelectTrigger className="bg-black/20 border-purple-400/50 text-white"><SelectValue placeholder="Select genre" /></SelectTrigger>
                        <SelectContent className="bg-black border-purple-500/30">
                          <SelectItem value="Afrobeats">Afrobeats</SelectItem>
                          <SelectItem value="Pop">Pop</SelectItem>
                          <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                          <SelectItem value="R&B">R&B</SelectItem>
                          <SelectItem value="Electronic">Electronic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Mood</label>
                      <Select value={collabForm.mood} onValueChange={(value) => handleCollabChange('mood', value)}>
                        <SelectTrigger className="bg-black/20 border-purple-400/50 text-white"><SelectValue placeholder="Select mood" /></SelectTrigger>
                        <SelectContent className="bg-black border-purple-500/30">
                          <SelectItem value="Happy">Happy</SelectItem>
                          <SelectItem value="Sad">Sad</SelectItem>
                          <SelectItem value="Energetic">Energetic</SelectItem>
                          <SelectItem value="Chill">Chill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Description</label>
                    <Textarea value={collabForm.description} onChange={(e) => handleCollabChange('description', e.target.value)} placeholder="Describe your concept, artist vibe, or lyrics inspiration." className="bg-black/20 border-purple-400/50 text-white" rows={5} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Upload Demo / Project Link</label>
                    <div className="flex gap-3 items-center">
                      <input ref={collabFileRef} type="file" accept="audio/*" onChange={(e) => handleCollabChange('linkOrFile', e.target.files?.[0]?.name ?? '')} className="text-sm text-purple-300" />
                      <Input placeholder="Or paste a URL" value={collabForm.linkOrFile} onChange={(e) => handleCollabChange('linkOrFile', e.target.value)} className="bg-black/20 border-purple-400/50 text-white" />
                    </div>
                    <p className="text-xs text-purple-400 mt-1">Upload a demo (.mp3, .wav) or paste a project/demo link.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={collabForm.agree} onChange={(e) => handleCollabChange('agree', e.target.checked)} className="accent-purple-500" />
                    <label className="text-sm text-purple-300">I agree to be contacted about this collaboration via email.</label>
                  </div>

                  <div>
                    <Button type="submit" onClick={handleCollabSubmit} className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white" disabled={isSubmittingCollab}>
                      {isSubmittingCollab ? 'Sending...' : 'Send Collaboration Request'}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </TabsContent>

          {/* Voice Clone tab removed per product decision */}

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

      {/* Key Selection Modal */}
      <Dialog open={showKeyDropdown} onOpenChange={setShowKeyDropdown}>
        <DialogContent className="bg-gray-900 border-purple-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-200">
              Select Musical Key
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 p-4">
            <p className="text-purple-300 text-sm">
              Current Key: <span className="font-semibold text-purple-200">{selectedKey}</span>
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {availableKeys.map((key) => (
                <Button
                  key={key}
                  variant={selectedKey === key ? "default" : "outline"}
                  className={`${
                    selectedKey === key 
                      ? "bg-purple-600 text-white" 
                      : "border-purple-400/50 text-purple-200 hover:bg-purple-600/20"
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
        <DialogContent className="bg-gray-900 border-purple-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-200">
              Upload Your Primary Voice
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 p-4">
            <div className="text-center">
              <Mic className="h-16 w-16 mx-auto mb-4 text-purple-400" />
              <p className="text-purple-200 mb-2">
                Upload a voice sample to personalize your AI singer
              </p>
              <p className="text-sm text-purple-300">
                Best results with 10-30 second clear recordings
              </p>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <Button
                onClick={() => voiceFileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white py-3"
              >
                <Upload className="h-5 w-5 mr-2" />
                Choose Audio File
              </Button>
              
              <input
                ref={voiceFileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleVoiceUpload}
                className="hidden"
              />

              <div className="text-xs text-purple-400 text-center">
                Supported formats: MP3, WAV, M4A, AAC
              </div>
            </div>

            {/* Current Voice Status */}
            {hasPrimaryVoice && primaryVoice && (
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Mic className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-purple-200">Current Primary Voice</p>
                    <p className="text-sm text-purple-300">{primaryVoice.name}</p>
                    <p className="text-xs text-purple-400">Uploaded {primaryVoice.uploadDate}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowVoiceUploadModal(false)}
                className="flex-1 border-purple-400/50 text-purple-200 hover:bg-purple-600/20"
              >
                Cancel
              </Button>
              {hasPrimaryVoice && (
                <Button
                  onClick={() => setShowVoiceUploadModal(false)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white"
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

export default ProPlusDashboard;