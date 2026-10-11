import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardTemplate } from '../../types/dashboard';
import { X, Check, SlidersHorizontal, Eye, EyeOff } from 'lucide-react';

interface CustomizeTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  template: DashboardTemplate;
  visibleMetricIds: string[];
  onToggleMetric: (metricId: string) => void;
  currencyPrefix: string;
  onChangeCurrency: (prefix: string) => void;
  isCompactDensity: boolean;
  onToggleDensity: () => void;
}

export const CustomizeTemplateDrawer: React.FC<CustomizeTemplateDrawerProps> = ({
  isOpen,
  onClose,
  template,
  visibleMetricIds,
  onToggleMetric,
  currencyPrefix,
  onChangeCurrency,
  isCompactDensity,
  onToggleDensity,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">Customize Workspace</h3>
                <p className="text-[11px] text-slate-400">Tailor metrics and presentation density</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-5 flex-1 overflow-y-auto space-y-6">
            {/* Currency / Unit Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Currency & Financial Unit Symbol
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['$', '€', '£', '¥'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onChangeCurrency(curr)}
                    className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                      currencyPrefix === curr
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-xs'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Density */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Grid Display Density
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => isCompactDensity && onToggleDensity()}
                  className={`p-2.5 text-left rounded-lg border text-xs transition-all ${
                    !isCompactDensity
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white mb-0.5">Spacious</div>
                  <div className="text-[11px] text-slate-400">Standard executive breathing room</div>
                </button>
                <button
                  onClick={() => !isCompactDensity && onToggleDensity()}
                  className={`p-2.5 text-left rounded-lg border text-xs transition-all ${
                    isCompactDensity
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white mb-0.5">Compact</div>
                  <div className="text-[11px] text-slate-400">Higher density operational view</div>
                </button>
              </div>
            </div>

            {/* Visible Metric Cards Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Visible KPI Metric Cards
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  {visibleMetricIds.length} of {template.metrics.length} visible
                </span>
              </div>

              <div className="space-y-2">
                {template.metrics.map((metric) => {
                  const isVisible = visibleMetricIds.includes(metric.id);
                  return (
                    <button
                      key={metric.id}
                      onClick={() => onToggleMetric(metric.id)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                        isVisible
                          ? 'bg-slate-800/60 border-slate-700/80 text-white'
                          : 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {isVisible ? (
                          <Eye className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                        <span className="truncate font-medium">{metric.label}</span>
                      </div>
                      <span className="font-mono text-[11px] shrink-0 text-slate-400">
                        {metric.value}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom KPI threshold advisory note */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-1">
                Custom Threshold Notice
              </span>
              Telemetry calculations and percentile distributions update dynamically across all active session views.
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
