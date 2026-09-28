import type { Metadata } from 'next';
import SmsOptInForm from "@/components/SmsOptInForm";

export const metadata: Metadata = {
  title: 'SMS Opt-In',
  description:
    'Opt in to text messages from Idaho Software Development. Marketing and project messages are separate choices.',
  alternates: { canonical: '/sms-signup' },
};

export default function SmsSignupPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto flex max-w-lg flex-col">
        <SmsOptInForm />
      </div>
    </div>
  );
}