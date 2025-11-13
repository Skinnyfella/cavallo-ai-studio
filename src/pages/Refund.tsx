import React from 'react';
import { Card } from '@/components/ui/card';

const Refund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 bg-black/40 text-white">
          <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
          <p className="mb-3">Refunds may be issued only when:</p>
          <ul className="list-disc list-inside mb-3">
            <li>You purchased a subscription or tokens and have not used any</li>
            <li>A technical issue prevented the tool from working</li>
          </ul>

          <p className="mb-3">Not eligible for refund:</p>
          <ul className="list-disc list-inside mb-3">
            <li>Used tokens</li>
            <li>Completed AI generations</li>
            <li>Human collaborations that have already started</li>
          </ul>

          <p className="mb-3">To request a refund, contact: <a href="mailto:support@cavallo.ai" className="underline">support@cavallo.ai</a></p>
        </Card>
      </div>
    </div>
  );
};

export default Refund;
