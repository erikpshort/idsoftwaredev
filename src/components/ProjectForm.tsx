'use client';

import { useState } from 'react';
import { sendProjectInquiry } from '@/server/sendProjectInquiry';

const NEEDS = ['Custom software', 'A website', 'Not sure yet'] as const;

type FieldName = 'name' | 'email' | 'company' | 'need' | 'message';

const FIELD_LABELS: Record<FieldName, string> = {
  name: 'Name',
  email: 'Email',
  company: 'Company',
  need: 'What do you need',
  message: 'Message',
};

function emailHasDomain(email: string) {
  const at = email.indexOf('@');
  if (at < 1) return false;
  const domain = email.slice(at + 1);
  const dot = domain.indexOf('.');
  return dot > 0 && dot < domain.length - 1;
}

const fieldClass =
  'w-full border border-[#1d343b] bg-[#102023] px-3 py-3 text-[17px] text-[#e8f3f5] placeholder:text-[#5f7c82]';

export default function ProjectForm() {
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');
  const [pending, setPending] = useState(false);

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const errors: Partial<Record<FieldName, string>> = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const need = String(data.get('need') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name) errors.name = `${FIELD_LABELS.name} is required.`;
    if (!email) errors.email = `${FIELD_LABELS.email} is required.`;
    else if (!emailHasDomain(email)) errors.email = `${FIELD_LABELS.email} needs a domain.`;
    if (!company) errors.company = `${FIELD_LABELS.company} is required.`;
    if (!NEEDS.includes(need as (typeof NEEDS)[number])) {
      errors.need = `${FIELD_LABELS.need} is required.`;
    }
    if (!message) errors.message = `${FIELD_LABELS.message} is required.`;
    return errors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = String(new FormData(form).get('company_website') ?? '');
    if (honeypot.length > 0) {
      setFieldErrors({});
      setStatus('idle');
    } else {
      const errors = validate(form);
      setFieldErrors(errors);
      setStatus('idle');
      if (Object.keys(errors).length > 0) return;
    }

    setPending(true);
    try {
      const result = await sendProjectInquiry(new FormData(form));
      if (result.ok) {
        setStatus('success');
        form.reset();
        return;
      }
      if ('fieldErrors' in result) {
        setFieldErrors(result.fieldErrors);
        return;
      }
      setStatus('failure');
    } catch (error) {
      console.error(error);
      setStatus('failure');
    } finally {
      setPending(false);
    }
  }

  function renderError(name: FieldName) {
    const message = fieldErrors[name];
    if (!message) return null;
    return (
      <p id={`${name}-error`} className="mt-2 text-[15px] text-[#f0b4b4]">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative mt-10 max-w-[62ch] space-y-6">
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-[15px]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Name"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          className={fieldClass}
        />
        {renderError('name')}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-[15px]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          className={fieldClass}
        />
        {renderError('email')}
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-[15px]">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Company"
          aria-invalid={fieldErrors.company ? true : undefined}
          aria-describedby={fieldErrors.company ? 'company-error' : undefined}
          className={fieldClass}
        />
        {renderError('company')}
      </div>

      <div>
        <label htmlFor="need" className="mb-2 block text-[15px]">
          What do you need
        </label>
        <select
          id="need"
          name="need"
          required
          defaultValue=""
          aria-invalid={fieldErrors.need ? true : undefined}
          aria-describedby={fieldErrors.need ? 'need-error' : undefined}
          className={fieldClass}
        >
          <option value="" disabled>
            What do you need
          </option>
          {NEEDS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {renderError('need')}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-[15px]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Message"
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          className={fieldClass}
        />
        {renderError('message')}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="font-mono border border-[#4890A0] bg-transparent px-6 py-3.5 text-[0.78rem] tracking-[0.14em] text-[#e8f3f5] uppercase hover:border-[#9ed7e2] disabled:opacity-60"
      >
        Send the brief
      </button>

      {status === 'success' ? (
        <p className="text-[17px]">Received. We&apos;ll reply at the email you gave us.</p>
      ) : null}
      {status === 'failure' ? (
        <p className="text-[17px]">
          Send it directly to{' '}
          <a href="mailto:admin@idsoftwaredev.com" className="underline">
            admin@idsoftwaredev.com
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
