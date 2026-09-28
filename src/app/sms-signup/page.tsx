import SmsOptInForm from "@/components/SmsOptInForm";

export default function SmsSignupPage() {
  return (
    <div className="bg-[#f3efe6] px-6 py-16">
      <div className="mx-auto flex max-w-lg flex-col">
        <SmsOptInForm />
      </div>
    </div>
  );
}