import React from 'react';
import { 
  BarChart3, 
  ShoppingCart, 
  Wallet, 
  Server, 
  HeartPulse, 
  Cpu, 
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { TemplateId } from '../../types/dashboard';
import { TEMPLATES_DATA } from '../../data/templatesData';

interface SidebarProps {
  currentTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

const TEMPLATE_ICONS: Record<TemplateId, React.FC<{ className?: string }>> = {
  'b2b-saas': BarChart3,
  'ecommerce': ShoppingCart,
  'fintech': Wallet,
  'devops': Server,
  'healthcare': HeartPulse,
  'ai-ops': Cpu,
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTemplateId,
  onSelectTemplate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const templates = Object.values(TEMPLATES_DATA);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-[57px] bottom-0 left-0 z-40 w-64 bg-slate-950/95 lg:bg-slate-950/60 border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Active Workspace Info */}
          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">Acme Horizon Ltd</div>
                <div className="text-[11px] text-slate-400 truncate">Enterprise Multi-Tenancy</div>
              </div>
            </div>
          </div>

          {/* Template Catalog Section */}
          <div>
            <div className="px-2 mb-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>BUSINESS TEMPLATES</span>
              <span>06 MODELS</span>
            </div>

            <div className="space-y-1">
              {templates.map((tpl) => {
                const Icon = TEMPLATE_ICONS[tpl.id] || BarChart3;
                const isSelected = currentTemplateId === tpl.id;

                return (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      onSelectTemplate(tpl.id);
                      onCloseMobile();
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500/40 text-white shadow-xs'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600/20 text-indigo-400'
                            : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div
                          className={`text-xs font-medium truncate ${
                            isSelected ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {tpl.name.split(' & ')[0]}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {tpl.badge}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isSelected
                          ? 'text-indigo-400 translate-x-0.5'
                          : 'text-slate-600 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template Features Note */}
          <div className="px-2 py-3 rounded-xl border border-slate-800/60 bg-slate-900/30 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Analytics Interactivity</span>
            </div>
            <p className="leading-snug text-slate-500">
              Every template is pre-configured with real telemetry mathematics, timeframes, and instant metric drilldowns.
            </p>
          </div>
        </div>

        {/* Footer info (quiet copyright/version only, as per design rules) */}
        <div className="pt-3 border-t border-slate-800/60 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Archetype Suite</span>
          <span className="font-mono">v3.2</span>
        </div>
      </aside>
    </>
  );
};
