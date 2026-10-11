import React from 'react';
import { Sparkles, SlidersHorizontal, Share2, Play, Square } from 'lucide-react';
import { TemplateId } from '../../types/dashboard';

interface TopNavProps {
  currentTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onOpenQuiz: () => void;
  onOpenCustomize: () => void;
  onOpenExport: () => void;
  isSimulatingLive: boolean;
  onToggleSimulate: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTemplateId,
  onSelectTemplate,
  onOpenQuiz,
  onOpenCustomize,
  onOpenExport,
  isSimulatingLive,
  onToggleSimulate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 px-6 py-3.5 max-w-[1600px] mx-auto">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no subtitles/location tags attached) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-600/30">
            A
          </div>
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            Archetype Studio
          </span>
        </div>

        {/* Zone 2: Navigation Links & Template Discovery */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <button
            onClick={() => onSelectTemplate('b2b-saas')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTemplateId === 'b2b-saas'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            SaaS & ARR
          </button>

          <button
            onClick={() => onSelectTemplate('ecommerce')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTemplateId === 'ecommerce'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            E-Commerce
          </button>

          <button
            onClick={() => onSelectTemplate('fintech')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTemplateId === 'fintech'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            FinTech Ledger
          </button>

          <button
            onClick={() => onSelectTemplate('devops')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTemplateId === 'devops'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            DevOps & Cloud
          </button>

          <button
            onClick={() => onSelectTemplate('healthcare')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTemplateId === 'healthcare'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Healthcare
          </button>

          <button
            onClick={() => onSelectTemplate('ai-ops')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTemplateId === 'ai-ops'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            AI & LLMOps
          </button>
        </nav>

        {/* Zone 3: Functional Actions & Match Quiz Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live Data Simulation Toggle */}
          <button
            onClick={onToggleSimulate}
            title={isSimulatingLive ? 'Pause live metric simulation' : 'Start live telemetry simulation'}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              isSimulatingLive
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isSimulatingLive ? (
              <>
                <Square className="w-3 h-3 fill-emerald-400" />
                <span className="hidden sm:inline">Live Ticking</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-slate-400" />
                <span className="hidden sm:inline">Simulate Live</span>
              </>
            )}
          </button>

          {/* Customize Drawer Button */}
          <button
            onClick={onOpenCustomize}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors shrink-0"
            title="Customize Dashboard"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Export Report Button */}
          <button
            onClick={onOpenExport}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors shrink-0"
            title="Export Executive Report"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Primary Action: Business Fit Quiz */}
          <button
            onClick={onOpenQuiz}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-600/30 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find My Business Match</span>
          </button>
        </div>
      </div>
    </header>
  );
};
