'use server';

import { Resend } from 'resend';
import { PROJECT_NEEDS } from '@/lib/projectNeeds';

const RECIPIENT = 'admin@idsoftwaredev.com';

function emailHasDomain(email: string) {
  const at = email.indexOf('@');
  if (at < 1) return false;
  const domain = email.slice(at + 1);
  const dot = domain.indexOf('.');
  return dot > 0 && dot < domain.length - 1;
}

export async function sendProjectInquiry(formData: FormData): Promise<
  | { ok: true }
  | { ok: false; error: 'send' }
  | { ok: false; fieldErrors: Record<string, string> }
> {
  const honeypot = formData.get('company_website');
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return { ok: true };
  }

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim();
  const need = String(formData.get('need') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Name is required.';
  if (!email) fieldErrors.email = 'Email is required.';
  else if (!emailHasDomain(email)) fieldErrors.email = 'Email needs a domain.';
  if (!company) fieldErrors.company = 'Company is required.';
  if (!PROJECT_NEEDS.includes(need as (typeof PROJECT_NEEDS)[number])) {
    fieldErrors.need = 'What do you need is required.';
  }
  if (!message) fieldErrors.message = 'Message is required.';
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM?.trim();
  if (!apiKey || !from) {
    return { ok: false, error: 'send' };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: RECIPIENT,
      replyTo: email,
      subject: `Project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Need: ${need}`,
        '',
        message,
      ].join('\n'),
    });

    if (result.error) {
      console.error(result.error);
      return { ok: false, error: 'send' };
    }

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'send' };
  }
}
