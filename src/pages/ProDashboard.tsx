import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Music, Download, Mic, Play, Pause, Upload, Volume2, Edit3, Settings, Users, Zap, Infinity, Crown, Layers, Headphones, Star, User } from 'lucide-react';
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
    ideas: '',
    voiceFile: null as File | null
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [generationsUsed, setGenerationsUsed] = useState(7);
  const [activeTab, setActiveTab] = useState('create');
  const maxGenerations = 10;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVoiceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, voiceFile: file }));
        toast.success(`Voice file "${file.name}" uploaded successfully!`);
      } else {
        toast.error("Please upload a valid audio file.");
      }
    }
  };

  const handleGenerate = async () => {
    if (generationsUsed >= maxGenerations) {
      toast.error("Daily limit reached! Upgrade to Pro+ for unlimited generations.");
      return;
    }

    if (!formData.title || !formData.genre || !formData.mood || !formData.duration) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationsUsed(prev => prev + 1);
      setActiveTab('results');
      toast.success("Your AI singer is ready! Voice-matched audio available.");
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
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="rock">Rock</SelectItem>
                            <SelectItem value="hip-hop">Hip Hop</SelectItem>
                            <SelectItem value="r&b">R&B</SelectItem>
                            <SelectItem value="country">Country</SelectItem>
                            <SelectItem value="electronic">Electronic</SelectItem>
                            <SelectItem value="jazz">Jazz</SelectItem>
                            <SelectItem value="folk">Folk</SelectItem>
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
                            <SelectItem value="sad">Sad & Emotional</SelectItem>
                            <SelectItem value="energetic">Energetic & Powerful</SelectItem>
                            <SelectItem value="chill">Chill & Relaxed</SelectItem>
                            <SelectItem value="romantic">Romantic & Sweet</SelectItem>
                            <SelectItem value="motivational">Motivational</SelectItem>
                            <SelectItem value="dreamy">Dreamy & Atmospheric</SelectItem>
                            <SelectItem value="intense">Intense & Dramatic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        Duration *
                      </label>
                      <Select onValueChange={(value) => handleInputChange('duration', value)}>
                        <SelectTrigger className="bg-black/20 border-blue-400/50 text-white w-full md:w-64">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-blue-500">
                          <SelectItem value="60s">1 minute</SelectItem>
                          <SelectItem value="90s">1.5 minutes</SelectItem>
                          <SelectItem value="2min">2 minutes</SelectItem>
                          <SelectItem value="3min">3 minutes (Full song)</SelectItem>
                        </SelectContent>
                      </Select>
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
              <h3 className="text-xl font-semibold text-blue-200 mb-6">Melody Editor & Pitch Guide</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Pitch Guide */}
                <div>
                  <h4 className="font-semibold text-blue-200 mb-4">Visual Pitch Guide</h4>
                  <div className="bg-black/20 rounded-lg p-6 border border-blue-500/30">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-blue-300">
                        <span>Vocal Range:</span>
                        <span className="font-medium text-blue-200">Medium (Safe for most singers)</span>
                      </div>
                      <div className="flex justify-between text-sm text-blue-300">
                        <span>Key:</span>
                        <span className="font-medium text-blue-200">C Major</span>
                      </div>
                      <div className="flex justify-between text-sm text-blue-300">
                        <span>Tempo:</span>
                        <span className="font-medium text-blue-200">120 BPM</span>
                      </div>
                    </div>
                    
                    {/* Mock Pitch Visualization */}
                    <div className="bg-black/40 rounded p-4 border border-blue-500/20">
                      <div className="text-xs text-blue-400 mb-2">Pitch Pattern:</div>
                      <div className="flex items-end justify-between h-20 gap-1">
                        {[40, 60, 45, 70, 55, 80, 65, 50, 75, 60, 45, 65].map((height, i) => (
                          <div 
                            key={i} 
                            className="bg-gradient-to-t from-blue-600 to-cyan-400 w-4 rounded-t"
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
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Settings className="w-4 h-4 mr-2" />
                      Change Key
                    </Button>
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Auto-match My Voice
                    </Button>
                    <Button variant="outline" className="w-full border-blue-400/50 text-blue-200 hover:bg-blue-600/20">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Manual Pitch Editing
                    </Button>
                    <Button variant="outline" className="w-full border-blue-400/50 text-blue-200 hover:bg-blue-600/20">
                      <Play className="w-4 h-4 mr-2" />
                      Preview Melody
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
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
                  <Badge className="ml-2 bg-blue-600 text-white">Enhanced</Badge>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Vocal Range:</span>
                    <span className="font-medium text-blue-200">Medium (C4-G5)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Key:</span>
                    <span className="font-medium text-blue-200">C Major</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Tempo:</span>
                    <span className="font-medium text-blue-200">120 BPM</span>
                  </div>
                  <div className="pt-2 border-t border-blue-500/30">
                    <p className="text-blue-300 mb-2">Hook Melody:</p>
                    <div className="font-mono text-xs bg-black/40 p-2 rounded border border-blue-500/30 text-blue-200">
                      C - D - E - G | F - E - D - C
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Settings className="w-3 h-3 mr-2" />
                      Change Key
                    </Button>
                    <Button size="sm" variant="outline" className="w-full border-blue-400/50 text-blue-200 hover:bg-blue-600/20">
                      <Volume2 className="w-3 h-3 mr-2" />
                      Voice Match
                    </Button>
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
                    <Volume2 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <p className="text-blue-200 font-medium">AI Singer Ready!</p>
                    <p className="text-sm text-blue-300">Using your voice style</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Play AI Singer Version
                    </Button>
                    <Button variant="outline" className="w-full border-blue-400/50 text-blue-200 hover:bg-blue-600/20">
                      <Download className="w-4 h-4 mr-2" />
                      Download High Quality
                    </Button>
                  </div>

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
    </div>
  );
};

export default ProDashboard;