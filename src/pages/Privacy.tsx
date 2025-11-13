import React from 'react';
import { Card } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 bg-black/40 text-white">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-3">Cavallo collects basic information to operate our platform, including:</p>
          <ul className="list-disc list-inside mb-3">
            <li>Account details (email, name)</li>
            <li>Uploaded audio, lyrics, files</li>
            <li>Usage data (for improvement and security)</li>
            <li>Payment details through third-party processors</li>
          </ul>

          <p className="mb-3">We use this data to:</p>
          <ul className="list-disc list-inside mb-3">
            <li>Provide AI and human services</li>
            <li>Improve performance</li>
            <li>Communicate with you</li>
            <li>Prevent misuse</li>
          </ul>

          <p className="mb-3">We do NOT sell user data or share content without your permission. You may request data deletion, export, or correction. For privacy questions: <a href="mailto:support@cavallo.ai" className="underline">support@cavallo.ai</a>.</p>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
