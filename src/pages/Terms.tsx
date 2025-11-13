import React from 'react';
import { Card } from '@/components/ui/card';

import { useParams, useLocation } from 'react-router-dom';

type Plan = 'basic' | 'pro' | 'proplus' | undefined;

const planToGradient: Record<Plan, string> = {
  basic: 'from-emerald-900 to-teal-900',
  pro: 'from-blue-900 to-cyan-900',
  proplus: 'from-purple-900 to-fuchsia-900',
  undefined: 'from-gray-900 to-gray-800'
};

const Terms = () => {
  const location = useLocation();
  // detect plan from query param ?plan=pro or from path (not implemented) - fallback to undefined
  const params = new URLSearchParams(location.search);
  const planParam = (params.get('plan') as Plan) || undefined;

  const termsText = `Terms & Conditions
1. Overview

Cavallo is a creative platform that allows users to:

Generate AI-assisted lyrics, melodies, and vocals (Basic & Pro)

Request human-created services like songwriting, beat production, and collaborations (Pro+)

Manage creative projects and access exports, guides, and tools

These Terms govern your use of all features, including AI-based tools and human-based collaboration features.

2. Eligibility

You must be:

At least 13 years old

Legally allowed to use online creative tools in your region

Using Cavallo for lawful and appropriate purposes

If you create an account, you must provide accurate information.

3. User Content & Ownership
3.1 Content You Upload

You may upload files such as:

Voice recordings

Audio samples

Lyrics

References

Visual or text material for moodboards

You confirm that:

You own the uploaded content or have permission

Your content doesn’t violate copyrights

Cavallo is not responsible for ownership disputes between collaborators

3.2 AI-Generated Content

For AI-generated songs, vocals, lyrics, or melodies:

If you are on a paid plan (Basic, Pro, or Pro+), you own the final AI-generated output.

Cavallo may store generation metadata temporarily to improve performance and security.

We do not claim ownership of your songs.

3.3 Human Collaboration (Pro+)

For beatmaker, songwriter, and collaboration requests:

Cavallo only provides the connection

Ownership and percentage splits must be agreed between you and the human collaborator

Cavallo is not liable for disputes

For MVP: All collaborations are work-for-hire unless you and the collaborator privately agree otherwise

4. Acceptable Use

You agree NOT to use Cavallo for:

Hateful, violent, or explicit content

Harassment or impersonation

Training external AI models using Cavallo output

Reverse engineering, copying, or exploiting the platform

Uploading harmful files

Violations may result in suspension or permanent removal.

5. Payment, Tokens, and Refunds

Cavallo uses a token + subscription model.

5.1 Tokens

Tokens are consumed per generation or request

Used tokens are non-refundable

5.2 Subscriptions

Basic, Pro, and Pro+ may offer:

Monthly tokens

Feature access

Priority tools

Subscriptions renew automatically unless cancelled.

5.3 Refunds

Refunds may be given only if:

You purchased tokens/subscription but did NOT use any

A technical error prevented service usage

Refunds are NOT given for:

Used tokens

Completed AI generations

Human collaboration fees once started

6. Service Availability

We aim for high uptime but cannot guarantee:

100% availability

Zero bugs

Immediate human collaboration delivery

Features may change as the platform evolves.

7. AI Limitations & Disclaimer

AI may:

Misinterpret lyrics

Produce unexpected results

Deliver imperfect vocals or melodies

You agree Cavallo is not responsible for creative, emotional, or financial losses.

8. Termination

We may suspend or delete your account if:

You violate these Terms

Commit fraud

Abuse systems

You may delete your account at any time.

9. Third-Party Tools

Cavallo integrates with:

EmailJS

Google Sheets

Stripe / Flutterwave

Using Cavallo means accepting these tools' policies.

10. Liability Limit

To the fullest extent allowed by law:

Cavallo is not liable for lost profits, songs, data, or opportunities

Maximum liability is the amount you paid in the last 30 days

11. Changes to Terms

We may update these Terms.
Continued use means acceptance.

12. Contact Us

📧 support@cavallo.ai
`;

  const gradient = planToGradient[planParam];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} py-8 px-6`}>
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 bg-black/40 text-white">
          <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
          <pre className="whitespace-pre-wrap text-sm">{termsText}</pre>
          <p className="text-xs text-gray-400 mt-4">Displaying terms for: <strong>{planParam ?? 'default'}</strong></p>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
