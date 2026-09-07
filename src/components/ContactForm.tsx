'use client';

import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ContactForm({
  locale = 'en',
  appearance = 'dark',
}: {
  locale?: 'en' | 'es';
  appearance?: 'dark' | 'editorial';
}) {
  const es = locale === 'es';
  const editorial = appearance === 'editorial';
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);
  const fieldClass =
    'w-full rounded-xl border border-white/10 bg-[#0a0e0c] px-4 py-3.5 text-sm text-white placeholder-[#87948b] focus:outline-2 focus:outline-[#c7ff6b]';
  const labelClass = editorial ? '' : 'mb-2 block text-xs text-[#a0aca5]';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus('submitting');
    try {
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Array.from(data.entries()).map(([key, value]) => [
            key,
            String(value),
          ]),
        ).toString(),
      });
      if (!response.ok) throw new Error('Form submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success')
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={
          editorial
            ? 'contact-success'
            : 'rounded-2xl border border-[#70e1b2]/20 bg-[#70e1b2]/10 p-8 text-center'
        }
      >
        <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
        <h3>{es ? 'Proyecto recibido.' : 'Brief received.'}</h3>
        <p>
          {es
            ? 'Gracias por compartir tu proyecto. Revisaremos los detalles y te responderemos.'
            : 'Thank you for sharing your project. We’ll review the details and get back to you.'}
        </p>
      </div>
    );

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={editorial ? 'contact-form' : ''}
      aria-busy={status === 'submitting'}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label className="honeypot-label">
          Don&apos;t fill this out if you&apos;re human:{' '}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset
        disabled={status === 'submitting'}
        className="grid min-w-0 gap-4"
      >
        <legend className="sr-only">
          {es ? 'Comparte tu proyecto' : 'Share your project brief'}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              {es ? 'Tu nombre' : 'Your name'}
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder={es ? 'Nombre y apellido' : 'First & last name'}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              {es ? 'Correo electrónico' : 'Email address'}
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="you@brand.com"
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="projectType" className={labelClass}>
            {es ? '¿Qué quieres desarrollar?' : 'What are you creating?'}
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              {es
                ? 'Selecciona el tipo de proyecto'
                : 'Select your project type'}
            </option>
            <option value="Packaging">
              {es ? 'Empaques personalizados' : 'Custom packaging'}
            </option>
            <option value="Textile">
              {es ? 'Textiles personalizados' : 'Custom textiles'}
            </option>
            <option value="Both">
              {es ? 'Empaques y textiles' : 'Packaging & textiles'}
            </option>
            <option value="Other">
              {es ? 'Aún explorando' : 'Still exploring'}
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            {es ? 'Cuéntanos tu idea' : 'A little about your idea'}
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            placeholder={
              es
                ? 'Producto, cantidades, materiales, destino y fechas previstas…'
                : 'Product, quantities, materials, destination and target timing…'
            }
            className={fieldClass}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="contact-submit inline-flex min-h-12 items-center justify-between gap-3 rounded-xl bg-[#c7ff6b] px-5 py-3 text-sm font-bold text-[#0a0d0b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting'
            ? es
              ? 'Enviando…'
              : 'Sending…'
            : es
              ? 'Envíanos tu proyecto'
              : 'Send your project brief'}
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </fieldset>
      {status === 'error' && (
        <p
          role="alert"
          className="contact-error mt-3 text-sm leading-6 text-red-400"
        >
          {es
            ? 'No se pudo enviar. Inténtalo de nuevo o escríbenos a '
            : 'Your brief could not be sent. Please try again or email '}
          <a className="underline" href="mailto:contact@sourcinglabusa.com">
            contact@sourcinglabusa.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
