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
    ideas: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationsUsed, setGenerationsUsed] = useState(2);
  const maxGenerations = 3;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (generationsUsed >= maxGenerations) {
      toast.error("Daily limit reached! Upgrade to Pro for more generations.");
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
      toast.success("Your song is ready! Demo-quality audio available.");
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
              onClick={() => navigate('/profile')}
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
                      <SelectItem value="30s">30 seconds (Demo)</SelectItem>
                      <SelectItem value="60s">1 minute</SelectItem>
                      <SelectItem value="90s">1.5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
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
                      AI is creating your song...
                    </>
                  ) : (
                    <>
                      <Music className="w-5 h-5 mr-3" />
                      Generate My Song (1 Token)
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

        {/* Demo Results Section - Shows after generation */}
        {generationsUsed > 0 && (
          <div className="mt-8">
            <div className="grid lg:grid-cols-2 gap-6">
            {/* Lyrics Preview */}
            <Card className="p-6 bg-black/40 backdrop-blur-xl border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
              <h3 className="text-xl font-semibold text-emerald-200 mb-4">Your Song is Ready! 🎵</h3>
              <div className="space-y-4 text-sm text-emerald-300">
                <div>
                  <p className="font-medium mb-1 text-emerald-200">VERSE 1:</p>
                  <p className="italic">In the city lights, we dance tonight</p>
                  <p className="italic">Hearts beating fast, everything feels right</p>
                  <p className="italic">Your smile lights up the darkest skies</p>
                  <p className="italic">Together we rise, we touch the sky</p>
                </div>
                <div>
                  <p className="font-medium mb-1 text-emerald-200">CHORUS:</p>
                  <p className="italic">We're unstoppable, incredible</p>
                  <p className="italic">Nothing can break us now</p>
                  <p className="italic">We're unshakeable, unmistakable</p>
                  <p className="italic">Together we'll show them how</p>
                </div>
              </div>
            </Card>
            
            {/* Audio Download */}
            <Card className="p-6 bg-black/40 backdrop-blur-xl border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
              <h3 className="text-xl font-semibold text-emerald-200 mb-4">
                Demo Audio
                <Badge className="ml-2 bg-emerald-600 text-white">Demo Quality</Badge>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50/10 to-green-50/10 rounded-lg p-4 border border-emerald-500/30 text-center">
                  <Music className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                  <p className="text-emerald-200 font-medium">Demo Track Ready!</p>
                  <p className="text-sm text-emerald-300">High-quality demo version</p>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Play Demo Track
                  </Button>
                  <Button variant="outline" className="w-full border-emerald-400/50 text-emerald-200 hover:bg-emerald-600/20">
                    <Download className="w-4 h-4 mr-2" />
                    Download Demo (MP3)
                  </Button>
                </div>

                <div className="text-xs text-emerald-400 pt-2 border-t border-emerald-500/30">
                  <p>✅ AI-generated lyrics & melody</p>
                  <p>✅ Demo-quality audio (192kbps)</p>
                  <p>✅ Basic production mixing</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Create Another */}
          <Card className="mt-6 p-6 bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-500/30 text-center">
            <h3 className="font-semibold text-emerald-200 mb-2 flex items-center justify-center">
              <Music className="w-5 h-5 mr-2" />
              Ready for another song? 
            </h3>
            <p className="text-emerald-300 mb-4">You have {maxGenerations - generationsUsed} generations left today.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()} className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
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