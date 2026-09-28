'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SmsOptInForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [nonMarketingConsent, setNonMarketingConsent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketingConsent && !nonMarketingConsent) {
      setMessage('Please consent to at least one option to subscribe.');
      return;
    }
    // In a real app, you would send this to your backend (e.g., a Next.js API route)
    // which would then use the Twilio API to add the subscriber.
    console.log(`Subscribing ${phoneNumber} (marketing=${marketingConsent}, nonMarketing=${nonMarketingConsent})`);
    setMessage(`Thank you! A confirmation text will be sent to ${phoneNumber}.`);
    setPhoneNumber('');
    setMarketingConsent(false);
    setNonMarketingConsent(false);
  };

  return (
    <div className="w-full max-w-lg border border-[#cfc6b8] bg-[#f3efe6] p-8">
      <h3 className="mb-4 text-center text-2xl font-bold text-[#141614]">SMS Opt-In</h3>
      <p className="mb-6 text-center text-[17px] text-[#141614]">Enter your phone number to receive important updates and alerts about your project status from Idaho Software Development.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Your phone number"
            className="w-full border border-[#cfc6b8] bg-[#f3efe6] p-3 text-[#141614]"
            required
          />
        </div>
        <div className="flex items-start space-x-3">
          <input
            id="consent-marketing"
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-1 h-5 w-5 border border-[#141614] bg-[#f3efe6] accent-[#245E6C]"
          />
          <label htmlFor="consent-marketing" className="text-[15px] text-[#141614]">
            I consent to receive marketing text messages from Idaho Software Development at the phone number provided. Frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
          </label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            id="consent-nonmarketing"
            type="checkbox"
            checked={nonMarketingConsent}
            onChange={(e) => setNonMarketingConsent(e.target.checked)}
            className="mt-1 h-5 w-5 border border-[#141614] bg-[#f3efe6] accent-[#245E6C]"
          />
          <label htmlFor="consent-nonmarketing" className="text-[15px] text-[#141614]">
            I consent to receive non-marketing text messages from Idaho Software Development about my order updates, appointment reminders etc. Message &amp; data rates may apply.
          </label>
        </div>
        <div className="text-center">


          <p className="text-[15px] text-[#141614]">
            <Link href="/terms-of-service" className="font-semibold text-[#141614] underline">Terms of Service</Link>
            {" "}&amp;{" "}
            <Link href="/privacy-policy" className="font-semibold text-[#141614] underline">Privacy Policy</Link>
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-[#245E6C] px-6 py-3 font-bold text-white hover:bg-[#1c4c57] active:bg-[#163e48] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!marketingConsent && !nonMarketingConsent}
        >
          Subscribe
        </button>
        <div className="text-center">

          <a
            href="mailto:support@idsoftwaredev.com"
            className="text-center text-[15px] font-semibold text-[#141614] underline"
          >
            support@idsoftwaredev.com
          </a>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-[17px] text-[#141614]">{message}</p>}
    </div>
  );
}
