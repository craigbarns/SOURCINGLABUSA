'use client';

import {
  Calculator,
  CheckCircle2,
  FileSearch,
  GitCompareArrows,
  Mail,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { AccessibleModal } from './AccessibleModal';

interface DemoVideoProps {
  isOpen: boolean;
  onClose: () => void;
  appHref: string;
}

const STEPS = [
  {
    time: 'Step 1 of 4',
    title: 'Validate and read the files',
    icon: FileSearch,
    description:
      'The server validates each document, extracts its contents, and keeps the analysis source clearly labeled.',
    signal: '3 supplier quotes accepted • PDF + image support',
  },
  {
    time: 'Step 2 of 4',
    title: 'Structure comparable terms',
    icon: GitCompareArrows,
    description:
      'Prices, quantities, Incoterms, payment terms, and lead times are normalized into one reviewable report.',
    signal: '2 comparable FOB offers • 1 EXW offer separated',
  },
  {
    time: 'Step 3 of 4',
    title: 'Check the math and assumptions',
    icon: Calculator,
    description:
      'Code-controlled checks recalculate totals and flag the missing inputs that still need human verification.',
    signal: 'Line totals match • AQL level missing',
  },
  {
    time: 'Step 4 of 4',
    title: 'Prepare the next supplier response',
    icon: Mail,
    description:
      'Turn the review into a focused RFQ follow-up, sample request, or counteroffer that remains yours to approve and send.',
    signal: 'Draft ready for review • Nothing sent automatically',
  },
];

export const DemoVideo: React.FC<DemoVideoProps> = ({
  isOpen,
  onClose,
  appHref,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      !isOpen ||
      !isPlaying ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentStep((previous) => (previous + 1) % STEPS.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isOpen, isPlaying]);

  const activeStep = STEPS[currentStep];
  const ActiveIcon = activeStep.icon;

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title="Sample supplier quote report"
      description="A guided preview of the SourcingLab quote-analysis workflow."
      labelledBy="sample-report-title"
      describedBy="sample-report-description"
      initialFocusRef={closeButtonRef}
      backdropClassName="backdrop-blur-xl"
      contentClassName="relative w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/10 bg-[#0d1210] shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0a0e0c] p-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#c7ff6b]/10 text-[#c7ff6b]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 id="sample-report-title" className="truncate text-sm font-bold text-white sm:text-base">
              Sample supplier quote report
            </h3>
            <p id="sample-report-description" className="truncate text-[11px] text-[#748179] sm:text-xs">
              See how raw documents become a decision-ready review.
            </p>
          </div>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close sample report"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#89958d] transition hover:bg-white/[0.06] hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid min-h-[470px] lg:grid-cols-[1fr_0.82fr]">
        <div className="flex flex-col justify-between border-b border-white/[0.08] p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-[#70e1b2]/20 bg-[#70e1b2]/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.13em] text-[#9ff0cf]">
                Guided sample
              </span>
              <span className="font-mono text-[10px] text-[#68756d]">{activeStep.time}</span>
            </div>

            <div className="mt-10 grid h-14 w-14 place-items-center rounded-2xl border border-[#c7ff6b]/15 bg-[#c7ff6b]/8 text-[#c7ff6b]">
              <ActiveIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h4 className="mt-6 text-2xl font-black tracking-[-0.035em] text-white">
              {activeStep.title}
            </h4>
            <p className="mt-4 text-sm leading-7 text-[#929f96]">
              {activeStep.description}
            </p>

            <div className="mt-7 rounded-2xl border border-white/[0.08] bg-[#070a09] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#647169]">
                Report signal
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#dce5df]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#70e1b2]" aria-hidden="true" />
                {activeStep.signal}
              </p>
            </div>
          </div>

          <div className="mt-9 flex items-center justify-between border-t border-white/[0.08] pt-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((playing) => !playing)}
                aria-label={isPlaying ? 'Pause sample report' : 'Play sample report'}
                aria-pressed={!isPlaying}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                aria-label="Return to the first step"
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[#9aa69f] transition hover:bg-white/[0.08] hover:text-white"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <a
              href={appHref}
              onClick={onClose}
              className="rounded-xl bg-[#c7ff6b] px-4 py-2.5 text-xs font-extrabold text-[#0a0d0b] transition hover:bg-[#d7ff94]"
            >
              Try it free
            </a>
          </div>
        </div>

        <div className="bg-[#0a0e0c] p-4 sm:p-6">
          <p className="px-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#69766e]">
            Workflow preview
          </p>
          <div className="mt-4 space-y-2">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;

              return (
                <button
                  type="button"
                  key={step.title}
                  onClick={() => setCurrentStep(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? 'border-[#c7ff6b]/25 bg-[#c7ff6b]/[0.055]'
                      : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.045]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                        isActive
                          ? 'bg-[#c7ff6b] text-[#0a0d0b]'
                          : 'bg-white/[0.05] text-[#75827a]'
                      }`}
                    >
                      <StepIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`truncate text-xs font-bold ${
                          isActive ? 'text-white' : 'text-[#8e9a92]'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.11em] text-[#5e6a63]">
                        {step.time}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div
            className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
            role="progressbar"
            aria-label="Sample report progress"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={currentStep + 1}
            aria-valuetext={`Step ${currentStep + 1} of ${STEPS.length}`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#c7ff6b] to-[#70e1b2] transition-[width] duration-500"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </AccessibleModal>
  );
};
