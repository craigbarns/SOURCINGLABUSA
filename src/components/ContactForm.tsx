'use client';

import { CheckCircle2, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-ignore
        body: new URLSearchParams(formData).toString(),
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#70e1b2]/20 bg-[#70e1b2]/10 p-8 text-center sm:p-12">
        <CheckCircle2 className="h-12 w-12 text-[#70e1b2]" />
        <h3 className="mt-4 text-xl font-bold text-white">Brief received.</h3>
        <p className="mt-2 text-sm leading-6 text-[#94a198]">
          Thank you for reaching out. We will review your project requirements and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="w-full rounded-xl border border-white/10 bg-[#0a0e0c] px-4 py-3.5 text-sm text-white placeholder-[#5d6962] transition focus:border-[#c7ff6b] focus:outline-none focus:ring-1 focus:ring-[#c7ff6b]"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-white/10 bg-[#0a0e0c] px-4 py-3.5 text-sm text-white placeholder-[#5d6962] transition focus:border-[#c7ff6b] focus:outline-none focus:ring-1 focus:ring-[#c7ff6b]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="sr-only">Project Type</label>
        <select
          id="projectType"
          name="projectType"
          required
          defaultValue=""
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#0a0e0c] px-4 py-3.5 text-sm text-white transition focus:border-[#c7ff6b] focus:outline-none focus:ring-1 focus:ring-[#c7ff6b]"
        >
          <option value="" disabled>Select project type...</option>
          <option value="Packaging">Custom Packaging</option>
          <option value="Textile">Custom Textile</option>
          <option value="Both">Both Packaging & Textile</option>
          <option value="Other">Other / Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Project brief</label>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your product, quantity, target timing..."
          className="w-full resize-none rounded-xl border border-white/10 bg-[#0a0e0c] px-4 py-3.5 text-sm text-white placeholder-[#5d6962] transition focus:border-[#c7ff6b] focus:outline-none focus:ring-1 focus:ring-[#c7ff6b]"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#c7ff6b] px-6 py-3.5 text-sm font-extrabold text-[#0a0d0b] transition hover:bg-[#d7ff94] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:justify-self-start"
      >
        {status === 'submitting' ? 'Sending...' : 'Send project brief'}
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      {status === 'error' && (
        <p className="text-sm font-medium text-red-400">
          Something went wrong. Please try again or use the email link.
        </p>
      )}
    </form>
  );
}
