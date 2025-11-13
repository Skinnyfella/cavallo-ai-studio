import React from 'react';
import { Card } from '@/components/ui/card';

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 bg-black/40 text-white">
          <h1 className="text-2xl font-bold mb-4">Support</h1>
          <p className="mb-3">Need help?</p>
          <p className="mb-2">📧 Email: <a href="mailto:support@cavallo.ai" className="underline">support@cavallo.ai</a></p>
          <p className="mb-2">⏱ Response Time: 24–48 hours</p>

          <h2 className="text-lg font-semibold mt-4 mb-2">You can contact us for:</h2>
          <ul className="list-disc list-inside mb-3">
            <li>Technical issues</li>
            <li>Payment questions</li>
            <li>Songwriting or beat request concerns</li>
            <li>Account and login problems</li>
            <li>Reporting bugs</li>
          </ul>

          <p>More support tools (live chat, Discord, documentation) will be added as Cavallo grows.</p>
        </Card>
      </div>
    </div>
  );
};

export default Support;
