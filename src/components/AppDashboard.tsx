'use client';

import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowLeft,
  Calculator,
  FileText,
  Mail,
  Search,
  ShieldAlert,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

import { HsCodeAnalyzer } from './tools/HsCodeAnalyzer';
import { LandedCostCalculator } from './tools/LandedCostCalculator';
import { ProductSpecGenerator } from './tools/ProductSpecGenerator';
import { QuoteAnalyzer } from './tools/QuoteAnalyzer';
import { SupplierEmailGenerator } from './tools/SupplierEmailGenerator';

type ToolId = 'quote' | 'specs' | 'cost' | 'hscode' | 'email';

interface ToolTab {
  id: ToolId;
  label: string;
  icon: LucideIcon;
  activeClassName: string;
  stepClassName: string;
}

const TOOL_TABS: readonly ToolTab[] = [
  {
    id: 'quote',
    label: 'Quote Audit',
    icon: ShieldAlert,
    activeClassName:
      'bg-brand-warning/10 border-brand-warning/40 text-brand-ink',
    stepClassName: 'bg-brand-warning/12 text-brand-warning',
  },
  {
    id: 'specs',
    label: 'Product Specifications',
    icon: FileText,
    activeClassName: 'bg-brand-info/10 border-brand-info/40 text-brand-ink',
    stepClassName: 'bg-brand-info/12 text-brand-info',
  },
  {
    id: 'cost',
    label: 'Landed Cost',
    icon: Calculator,
    activeClassName: 'bg-brand-green/8 border-brand-green/35 text-brand-ink',
    stepClassName: 'bg-brand-green/10 text-brand-green',
  },
  {
    id: 'hscode',
    label: 'HS Codes & Customs',
    icon: Search,
    activeClassName: 'bg-brand-green/9 border-brand-green/35 text-brand-ink',
    stepClassName: 'bg-brand-green/10 text-brand-green',
  },
  {
    id: 'email',
    label: 'Supplier Emails',
    icon: Mail,
    activeClassName: 'bg-brand-plum/9 border-brand-plum/35 text-brand-ink',
    stepClassName: 'bg-brand-plum/10 text-brand-plum',
  },
];

interface AppDashboardProps {
  marketingHref?: string;
}

function tabId(toolId: ToolId) {
  return `sourcing-tool-tab-${toolId}`;
}

function panelId(toolId: ToolId) {
  return `sourcing-tool-panel-${toolId}`;
}

export function AppDashboard({ marketingHref = '/' }: AppDashboardProps) {
  const [activeTool, setActiveTool] = useState<ToolId>('quote');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % TOOL_TABS.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + TOOL_TABS.length) % TOOL_TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = TOOL_TABS.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    const nextTool = TOOL_TABS[nextIndex];
    setActiveTool(nextTool.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="workspace-page min-h-screen pb-20 text-brand-ink">
      <section
        aria-labelledby="sourcing-workspace-title"
        className="border-b border-brand-line bg-brand-paper py-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={marketingHref}
            className="inline-flex items-center gap-1.5 rounded-md text-xs font-semibold text-brand-muted transition-colors hover:text-brand-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to SourcingLab USA
          </Link>

          <div className="mt-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-brand-green/20 bg-brand-green/8 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-brand-green">
                Sourcing workspace
              </span>
            </div>
            <h1
              id="sourcing-workspace-title"
              className="mt-6 flex items-center gap-2.5 text-3xl font-medium tracking-[-0.045em] text-brand-ink sm:text-5xl"
            >
              Supplier Sourcing Workspace
              <Sparkles
                className="h-5 w-5 text-brand-green"
                aria-hidden="true"
              />
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-muted">
              Audit supplier quotes, build product specifications, estimate
              landed costs, review customs classifications, and prepare supplier
              outreach.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Sourcing tools"
            aria-orientation="horizontal"
            className="tab-scroll mt-8 flex flex-nowrap gap-2 overflow-x-auto pb-1"
          >
            {TOOL_TABS.map((tool, index) => {
              const isActive = activeTool === tool.id;
              const Icon = tool.icon;

              return (
                <button
                  key={tool.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  id={tabId(tool.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId(tool.id)}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTool(tool.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`flex shrink-0 items-center gap-2 rounded-[4px] border px-4 py-3 text-xs font-bold transition-all duration-200 focus-visible:outline-none sm:text-sm ${
                    isActive
                      ? tool.activeClassName
                      : 'border-brand-line bg-brand-surface text-brand-muted hover:bg-brand-surface hover:text-brand-ink'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${tool.stepClassName}`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <main
        aria-label="Sourcing tool workspace"
        className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
      >
        <section
          id={panelId('quote')}
          role="tabpanel"
          aria-labelledby={tabId('quote')}
          tabIndex={0}
          hidden={activeTool !== 'quote'}
        >
          <QuoteAnalyzer />
        </section>

        <section
          id={panelId('specs')}
          role="tabpanel"
          aria-labelledby={tabId('specs')}
          tabIndex={0}
          hidden={activeTool !== 'specs'}
        >
          <ProductSpecGenerator />
        </section>

        <section
          id={panelId('cost')}
          role="tabpanel"
          aria-labelledby={tabId('cost')}
          tabIndex={0}
          hidden={activeTool !== 'cost'}
        >
          <LandedCostCalculator />
        </section>

        <section
          id={panelId('hscode')}
          role="tabpanel"
          aria-labelledby={tabId('hscode')}
          tabIndex={0}
          hidden={activeTool !== 'hscode'}
        >
          <HsCodeAnalyzer />
        </section>

        <section
          id={panelId('email')}
          role="tabpanel"
          aria-labelledby={tabId('email')}
          tabIndex={0}
          hidden={activeTool !== 'email'}
        >
          <SupplierEmailGenerator />
        </section>
      </main>
    </div>
  );
}
