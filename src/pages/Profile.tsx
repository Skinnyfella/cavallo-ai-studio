import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Music2, 
  Coins, 
  Crown, 
  Download, 
  Trash2, 
  ArrowLeft,
  Settings,
  LogOut,
  Zap,
  User,
  Heart,
  Users,
  Mic,
  Upload,
  Play,
  Eye,
  CreditCard,
  Calendar,
  Star,
  Volume2,
  Edit3,
  Camera,
  Mail,
  Lock
} from "lucide-react";
import { toast } from "sonner";

type Plan = "basic" | "pro" | "proplus";

const Profile = () => {
  const navigate = useNavigate();
  const [userPlan] = useState<Plan>("proplus");
  const [tokens] = useState(32);
  const [activeTab, setActiveTab] = useState("overview");
  const [genrePreferences, setGenrePreferences] = useState([70, 85, 60, 45, 90, 75]);
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Williams",
    username: "skinnybeats",
    email: "sarah@example.com",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  });

  const getPlanConfig = (plan: Plan) => {
    const configs = {
      basic: { 
        label: "Basic", 
        color: "bg-emerald-600 text-white",
        gradient: "from-emerald-500 to-green-500",
        theme: "emerald",
        bgGradient: "from-emerald-900 via-green-800 to-teal-900",
        cardBg: "bg-emerald-800/10 border-emerald-400/20",
        textPrimary: "text-emerald-100",
        textSecondary: "text-emerald-200",
        buttonHover: "hover:bg-emerald-800/50"
      },
      pro: { 
        label: "Pro", 
        color: "bg-blue-600 text-white",
        gradient: "from-blue-500 to-cyan-500", 
        theme: "blue",
        bgGradient: "from-blue-900 via-indigo-800 to-cyan-900",
        cardBg: "bg-blue-800/10 border-blue-400/20",
        textPrimary: "text-blue-100",
        textSecondary: "text-blue-200",
        buttonHover: "hover:bg-blue-800/50"
      },
      proplus: { 
        label: "Pro+", 
        color: "bg-purple-600 text-white",
        gradient: "from-purple-500 to-fuchsia-500",
        theme: "purple",
        bgGradient: "from-purple-900 via-violet-800 to-fuchsia-900",
        cardBg: "bg-purple-800/10 border-purple-400/20",
        textPrimary: "text-purple-100",
        textSecondary: "text-purple-200",
        buttonHover: "hover:bg-purple-800/50"
      },
    };
    return configs[plan];
  };

  const planConfig = getPlanConfig(userPlan);

  const getDashboardRoute = (plan: Plan) => {
    const routes = {
      basic: "/dashboard/basic",
      pro: "/dashboard/pro", 
      proplus: "/dashboard/proplus"
    };
    return routes[plan];
  };

  // Plan-specific settings
  const maxSongs = userPlan === "basic" ? 10 : userPlan === "pro" ? 50 : 999;
  const maxTokens = userPlan === "basic" ? 20 : userPlan === "pro" ? 35 : 50;
  
  const savedSongs = [
    {
      id: "1",
      title: "Summer Vibes",
      date: "2025-01-08",
      plan: userPlan,
      genre: "Afrobeat",
      bpm: 120,
      key: "F# Minor",
      duration: "3:24",
      isLiked: true,
      hasLyrics: true,
      hasMelody: userPlan !== "basic",
      hasVocals: userPlan === "proplus"
    },
    {
      id: "2", 
      title: "Midnight Dreams",
      date: "2025-01-07",
      plan: userPlan,
      genre: "R&B",
      bpm: 85,
      key: "C Major",
      duration: "2:45",
      isLiked: false,
      hasLyrics: true,
      hasMelody: userPlan !== "basic",
      hasVocals: userPlan === "proplus"
    },
    {
      id: "3",
      title: "City Lights",
      date: "2025-01-06", 
      plan: userPlan,
      genre: "Pop",
      bpm: 128,
      key: "G Major",
      duration: "3:12",
      isLiked: true,
      hasLyrics: true,
      hasMelody: userPlan !== "basic",
      hasVocals: userPlan === "proplus"
    }
  ].slice(0, Math.min(8, maxSongs)); // Show sample songs based on plan limits

  const collaborations = [
    {
      id: "1",
      title: "Ocean Waves (Remix)",
      collaborator: "MikeBeats",
      status: "active",
      lastActivity: "2 hours ago"
    },
    {
      id: "2", 
      title: "Thunder Storm",
      collaborator: "ProducerX",
      status: "completed",
      lastActivity: "1 day ago"
    }
  ];

  const genreLabels = ["Pop", "Hip Hop", "R&B", "Rock", "Afrobeats", "Electronic"];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${planConfig.bgGradient} ${planConfig.textPrimary}`}>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(getDashboardRoute(userPlan))}
            className={`flex items-center gap-2 ${planConfig.textSecondary} ${planConfig.buttonHover} border-${planConfig.theme}-400/30`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="space-y-8">
          {/* User Summary Header */}
          <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-3xl shadow-lg`}>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-border">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback className="text-lg">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 p-0 border-2 border-background"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div>
                    <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                    <p className="text-muted-foreground text-lg">@{userProfile.username}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <Badge className={planConfig.color}>
                      <Star className="h-3 w-3 mr-1" />
                      {planConfig.label} Plan
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Joined {userProfile.joinDate}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                      {tokens} tokens remaining
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      className={`bg-gradient-to-r ${planConfig.gradient} hover:opacity-90 text-white shadow-lg`}
                      onClick={() => navigate("/plans")}
                    >
                      {userPlan === "basic" ? "Unlock More Features" : 
                       userPlan === "pro" ? "Upgrade to Pro+" : 
                       "Creator Dashboard"}
                    </Button>
                  </div>
                </div>

                <div className="text-right space-y-3">
                  <div>
                    <p className="text-2xl font-bold">{savedSongs.length}</p>
                    <p className="text-sm text-muted-foreground">Songs Created</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{savedSongs.filter(s => s.isLiked).length}</p>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{collaborations.filter(c => c.status === "active").length}</p>
                    <p className="text-sm text-muted-foreground">Collaborations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full grid-cols-5 ${planConfig.cardBg} backdrop-blur-xl`}>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="songs" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                My Music
              </TabsTrigger>
              <TabsTrigger value="ai-profile" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                AI Profile
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Music Activity Tab */}
            <TabsContent value="songs" className="space-y-6">
              <Tabs defaultValue="my-songs" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="my-songs">My Songs</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
                </TabsList>

                <TabsContent value="my-songs">
                  <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        My Songs ({savedSongs.length}/{maxSongs === 999 ? '∞' : maxSongs})
                      </CardTitle>
                      {userPlan === "basic" && (
                        <p className="text-sm text-muted-foreground">
                          Lyrics only • Text downloads • {10 - savedSongs.length} slots remaining
                        </p>
                      )}
                      {userPlan === "pro" && (
                        <p className="text-sm text-muted-foreground">
                          Lyrics + Melody • MIDI downloads • Key changes available
                        </p>
                      )}
                      {userPlan === "proplus" && (
                        <p className="text-sm text-muted-foreground">
                          Full songs + AI vocals • Professional quality • Unlimited storage
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {savedSongs.map((song) => (
                          <div key={song.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className={`h-12 w-12 bg-gradient-to-br ${planConfig.gradient} rounded-lg flex items-center justify-center`}>
                                <Volume2 className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{song.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <span>{song.genre}</span>
                                  <span>•</span>
                                  <span>{song.bpm} BPM</span>
                                  <span>•</span>
                                  <span>{song.key}</span>
                                  <span>•</span>
                                  <span>{song.duration}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Created on {song.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" title="Add to favorites">
                                <Heart className={`h-4 w-4 ${song.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                              
                              {/* Play button - available for Pro+ with vocals, Pro with melody preview */}
                              {song.hasVocals && (
                                <Button variant="ghost" size="sm" title="Play AI vocal demo">
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {/* View lyrics - available for all plans */}
                              <Button variant="ghost" size="sm" title="View lyrics">
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {/* Download options vary by plan */}
                              {userPlan === "basic" && (
                                <Button variant="ghost" size="sm" title="Download lyrics (text only)">
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {userPlan === "pro" && (
                                <Button variant="ghost" size="sm" title="Download lyrics + melody (MIDI)">
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {userPlan === "proplus" && (
                                <Button variant="ghost" size="sm" title="Download full song (MP3)">
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="favorites">
                  <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        Favorite Songs ({savedSongs.filter(s => s.isLiked).length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {savedSongs.filter(s => s.isLiked).map((song) => (
                          <div key={song.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Heart className="h-6 w-6 text-white fill-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{song.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <span>{song.genre}</span>
                                  <span>•</span>
                                  <span>{song.bpm} BPM</span>
                                  <span>•</span>
                                  <span>{song.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="collaborations">
                  <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Collaborations ({collaborations.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {collaborations.map((collab) => (
                          <div key={collab.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className={`h-12 w-12 bg-gradient-to-br ${planConfig.gradient} rounded-lg flex items-center justify-center`}>
                                <Users className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{collab.title}</h3>
                                <p className="text-sm text-muted-foreground">with @{collab.collaborator}</p>
                                <p className="text-xs text-muted-foreground">Last activity: {collab.lastActivity}</p>
                              </div>
                            </div>
                            <Badge variant={collab.status === "active" ? "default" : "secondary"}>
                              {collab.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* AI Profile Tab */}
            <TabsContent value="ai-profile" className="space-y-6">
              {userPlan === "basic" ? (
                /* Basic Plan - No AI Profile Features */
                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardContent className="p-8 text-center">
                    <Mic className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">AI Profile Features</h3>
                    <p className="text-muted-foreground mb-6">
                      Voice upload, melody matching, and AI vocal features are available with Pro and Pro+ plans.
                    </p>
                    <Button 
                      className={`bg-gradient-to-r ${planConfig.gradient} hover:opacity-90 text-white shadow-lg`}
                      onClick={() => navigate("/plans")}
                    >
                      Upgrade to Pro
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mic className="h-5 w-5" />
                        {userPlan === "pro" ? "Voice Upload & Matching" : "Advanced Voice Training"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload your voice sample for AI training
                      </p>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Voice Sample
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Current Voice Models</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">Primary Voice</p>
                            <p className="text-sm text-muted-foreground">Uploaded Jan 2024</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Genre Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {genreLabels.map((genre, index) => (
                      <div key={genre} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">{genre}</label>
                          <span className="text-sm text-muted-foreground">{genrePreferences[index]}%</span>
                        </div>
                        <Slider
                          value={[genrePreferences[index]]}
                          onValueChange={(value) => {
                            const newPreferences = [...genrePreferences];
                            newPreferences[index] = value[0];
                            setGenrePreferences(newPreferences);
                          }}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
                </div>
              )}
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Current Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-muted/50 to-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={planConfig.color}>
                          {planConfig.label} Plan
                        </Badge>
                        <span className="text-sm text-muted-foreground">Active</span>
                      </div>
                      <p className="text-2xl font-bold">
                        ${userPlan === "basic" ? "15" : userPlan === "pro" ? "25" : "40"}/month
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {userPlan === "basic" ? "Just Getting Started" :
                         userPlan === "pro" ? "For Serious Artists" :
                         "For Professionals & Songwriters"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Next billing: February 8, 2025
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Token Usage</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Used</span>
                          <span>{maxTokens - tokens}/{maxTokens} tokens</span>
                        </div>
                        <Progress 
                          value={((maxTokens - tokens) / maxTokens) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => navigate("/plans")}
                    >
                      {userPlan === "proplus" ? "Manage Billing" : "Upgrade Plan"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: "Jan 8, 2025", amount: "$40.00", status: "Paid" },
                        { date: "Dec 8, 2024", amount: "$40.00", status: "Paid" },
                        { date: "Nov 8, 2024", amount: "$25.00", status: "Paid" }
                      ].map((bill, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{bill.date}</p>
                            <p className="text-sm text-muted-foreground">{bill.amount}</p>
                          </div>
                          <Badge variant="secondary">{bill.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Account Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Display Name</label>
                      <Input 
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input 
                        value={userProfile.username}
                        onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        type="email" 
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      />
                    </div>
                    
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Update Email
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Two-Factor Authentication
                      </Button>
                      
                      {userPlan === "pro" && (
                        <Button variant="outline" className="w-full justify-start">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Connect Spotify/YouTube
                        </Button>
                      )}
                      
                      {userPlan === "proplus" && (
                        <>
                          <Button variant="outline" className="w-full justify-start">
                            <Volume2 className="h-4 w-4 mr-2" />
                            Connect Music Profiles
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Users className="h-4 w-4 mr-2" />
                            Team Access Management
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Export All Data
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        This action cannot be undone
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {savedSongs.slice(0, 3).map((song) => (
                        <div key={song.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                          <div className={`h-8 w-8 bg-gradient-to-br ${planConfig.gradient} rounded flex items-center justify-center`}>
                            <Volume2 className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{song.title}</p>
                            <p className="text-xs text-muted-foreground">{song.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Songs this month</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tokens used</span>
                      <span className="font-medium">{maxTokens - tokens}/{maxTokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Collaborations</span>
                      <span className="font-medium">{collaborations.length}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${planConfig.cardBg} backdrop-blur-xl rounded-2xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Plan Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Badge className={`${planConfig.color} text-center w-full justify-center`}>
                      {planConfig.label} Member
                    </Badge>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Tokens</span>
                        <span>{tokens} remaining</span>
                      </div>
                      <Progress value={(tokens / maxTokens) * 100} className="h-2" />
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate("/plans")}
                    >
                      Manage Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
