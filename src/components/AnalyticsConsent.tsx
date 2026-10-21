'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

import { ANALYTICS_CONSENT_EVENT } from '@/lib/analytics-bootstrap';
import type {} from '@/lib/analytics';

const copy = {
  en: {
    title: 'Your analytics choice',
    description: 'With your permission, Google Analytics helps us understand visits and improve our services. Your project brief is not sent to analytics. You can change your choice at any time.',
    allow: 'Allow analytics',
    decline: 'Decline analytics',
    settings: 'Analytics settings',
    privacy: 'Privacy notice',
    close: 'Keep current choice',
  },
  es: {
    title: 'Tu preferencia de analítica',
    description: 'Con tu permiso, Google Analytics nos ayuda a entender las visitas y mejorar nuestros servicios. No enviamos tu proyecto a la analítica. Puedes cambiar tu decisión cuando quieras.',
    allow: 'Permitir analítica',
    decline: 'Rechazar analítica',
    settings: 'Ajustes de analítica',
    privacy: 'Aviso de privacidad',
    close: 'Mantener mi elección',
  },
  zh: {
    title: '分析统计偏好',
    description: '经您同意，我们使用 Google Analytics 了解访问情况并改进服务。您的项目需求内容不会发送至分析服务。您可随时更改选择。',
    allow: '允许分析统计',
    decline: '拒绝分析统计',
    settings: '分析统计设置',
    privacy: '隐私声明',
    close: '保留当前选择',
  },
};

function subscribe(onChange: () => void) {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, onChange);
  return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onChange);
}

function snapshot() {
  return window.sourcingAnalyticsConsent ?? null;
}

function serverSnapshot() {
  return null;
}

export function AnalyticsConsent({ locale = 'en' }: { locale?: keyof typeof copy }) {
  const choice = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [editing, setEditing] = useState(false);
  const text = copy[locale];
  const open = choice === null || editing;

  function choose(granted: boolean) {
    window.sourcingSetAnalyticsConsent?.(granted);
    setEditing(false);
  }

  return (
    <aside aria-label={text.title} className={`fixed z-[90] ${open ? 'inset-x-3 bottom-3 sm:left-auto sm:right-5 sm:max-w-xl' : 'pointer-events-none right-3 bottom-24 md:bottom-3'}`}>
      {open ? (
        <div className="rounded-2xl border border-brand-line bg-brand-paper p-5 text-brand-ink shadow-xl">
          <p className="text-sm font-semibold">{text.title}</p>
          <p className="mt-2 text-sm leading-6 text-brand-muted">{text.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => choose(false)} className="rounded-lg border border-brand-ink px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
              {text.decline}
            </button>
            <button type="button" onClick={() => choose(true)} className="rounded-lg border border-brand-ink px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
              {text.allow}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link href="/privacy" className="underline underline-offset-4">{text.privacy}</Link>
            {choice !== null && <button type="button" onClick={() => setEditing(false)} className="underline underline-offset-4">{text.close}</button>}
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setEditing(true)} className="pointer-events-auto ml-auto block rounded-full border border-brand-line bg-brand-paper px-4 py-2 text-xs text-brand-ink shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
          {text.settings}
        </button>
      )}
    </aside>
  );
}
