'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, X, Sparkles, CheckCircle2, FileText, ShieldAlert, Calculator, Mail } from 'lucide-react';
import { AccessibleModal } from './AccessibleModal';

interface DemoVideoProps {
  isOpen: boolean;
  onClose: () => void;
  appHref: string;
}

export const DemoVideo: React.FC<DemoVideoProps> = ({
  isOpen,
  onClose,
  appHref,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const steps = [
    {
      time: "0:00 - 0:15",
      title: "1. Prompt & Cahier des charges",
      icon: FileText,
      desc: "L'acheteur décrit son produit. Le système prépare des matériaux, dimensions, tests et exigences potentielles qui restent à vérifier pour le marché visé.",
      codeSnippet: `Prompt: "Gourde inox 750ml isotherme pour marché US"`
    },
    {
      time: "0:15 - 0:30",
      title: "2. Audit Flash de Devis PDF",
      icon: ShieldAlert,
      desc: "Le serveur transmet le document à Mistral OCR, structure les lignes et signale les clauses absentes ainsi que les écarts mathématiques.",
      codeSnippet: `Contrôle: total déclaré ≠ somme des lignes`
    },
    {
      time: "0:30 - 0:45",
      title: "3. Calculateur du Coût Rendu Net",
      icon: Calculator,
      desc: "Calcul instantané: Prix Usine + Fret + Douanes (HS Code) + Port = Coût rendu unitaire & simulation de marge nette.",
      codeSnippet: `Landed Cost: $5.85 / unit | Marge Estimée: 72%`
    },
    {
      time: "0:45 - 1:00",
      title: "4. Négociation & RFQ en 1 Clic",
      icon: Mail,
      desc: "Préparation d'un modèle d'e-mail dans la langue choisie, à relire et valider avant tout envoi manuel.",
      codeSnippet: `Modèle à vérifier: RFQ & contre-offre FOB`
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, steps.length]);

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title="Démo Vidéo Interactive (60 Seconds)"
      description="Comment SourcingLab transforme 3 heures de travail en 60 secondes."
      labelledBy="demo-video-title"
      describedBy="demo-video-description"
      initialFocusRef={closeButtonRef}
      backdropClassName="backdrop-blur-xl"
      contentClassName="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-gray-800 shadow-2xl overflow-hidden"
    >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="demo-video-title" className="text-base font-bold text-white">Démo Vidéo Interactive (60 Seconds)</h3>
              <p id="demo-video-description" className="text-xs text-gray-400">Comment SourcingLab transforme 3 heures de travail en 60 secondes.</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer la démo"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative bg-slate-950 p-6 md:p-8 min-h-[380px] flex flex-col justify-between">
          {/* Active Step Showcase Card */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Temps : {steps[currentStep].time}
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" aria-hidden="true" />
                <span className="text-xs text-emerald-400 font-semibold uppercase">Simulation en direct</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {React.createElement(steps[currentStep].icon, {
                    className: "w-8 h-8 text-blue-400",
                    'aria-hidden': true,
                  })}
                  <h4 className="text-xl font-bold text-white">{steps[currentStep].title}</h4>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {steps[currentStep].desc}
                </p>
                <div className="p-3 rounded-lg bg-slate-900 border border-gray-800 text-xs font-mono text-emerald-300">
                  ⚡ {steps[currentStep].codeSnippet}
                </div>
              </div>

              {/* Graphical Visualizer */}
              <div className="p-5 rounded-xl bg-slate-900 border border-gray-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Modèle IA Sourcing Engine</span>
                  <span className="text-emerald-400 font-mono">DÉMONSTRATION</span>
                </div>
                <div
                  className="h-2 w-full bg-gray-800 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Progression de la démonstration"
                  aria-valuemin={1}
                  aria-valuemax={steps.length}
                  aria-valuenow={currentStep + 1}
                  aria-valuetext={`Étape ${currentStep + 1} sur ${steps.length}`}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  {steps.map((step, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      aria-current={idx === currentStep ? 'step' : undefined}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        idx === currentStep
                          ? 'border-blue-500/50 bg-blue-500/10 text-white font-semibold'
                          : 'border-gray-800/50 bg-slate-950 text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {idx === currentStep ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" /> : <span className="w-3.5 h-3.5" aria-hidden="true" />}
                        {step.title}
                      </span>
                      <span className="font-mono text-[10px]">{step.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="mt-8 pt-4 border-t border-gray-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Mettre la démo en pause' : 'Lire la démo'}
                aria-pressed={!isPlaying}
                className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {isPlaying ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                aria-label="Revenir à la première étape"
                className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <a
              href={appHref}
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-sm hover:opacity-95 transition-all shadow-md shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Tester l&apos;Application Directement →
            </a>
          </div>
        </div>
    </AccessibleModal>
  );
};
