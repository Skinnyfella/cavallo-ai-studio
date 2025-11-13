import React from 'react';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 bg-black/40 text-white">
          <h1 className="text-2xl font-bold mb-4">About Cavallo</h1>
          <p className="mb-4">Cavallo is a modern creative studio designed for artists who want to bring their ideas to life — whether through AI tools or real human collaboration.</p>

          <h2 className="text-xl font-semibold mt-4 mb-2">We provide three tiers:</h2>
          <ul className="list-disc list-inside space-y-2 mb-4 text-sm">
            <li><strong>Basic</strong> – Create AI-assisted lyrics, melodies, and simple vocals.</li>
            <li><strong>Pro</strong> – Access advanced AI tools like voice-toned singing, melody editing, vocal guides, and high-quality exports.</li>
            <li><strong>Pro+</strong> – Connect with real human songwriters, beat makers, and collaborators for professional results.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4 mb-2">Our mission</h2>
          <p className="mb-4">Make music creation accessible, fast, and powerful for every artist — beginner or professional.</p>

          <p>Whether you're writing your first song or working on an EP, Cavallo gives you the tools to create confidently.</p>
        </Card>
      </div>
    </div>
  );
};

export default About;
