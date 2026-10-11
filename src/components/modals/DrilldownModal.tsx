import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MetricItem } from '../../types/dashboard';
import { X, ArrowUpRight, ArrowDownRight, Download, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface DrilldownModalProps {
  metric: MetricItem | null;
  accentColor?: string;
  onClose: () => void;
}

export const DrilldownModal: React.FC<DrilldownModalProps> = ({
  metric,
  accentColor = '#6366F1',
  onClose,
}) => {
  if (!metric) return null;

  const details = metric.drilldownDetails;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Metric Telemetry</span>
                <span aria-hidden="true">·</span>
                <span>{metric.category}</span>
              </div>
              <h2 className="text-lg font-semibold text-white mt-0.5">{metric.label}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(metric, null, 2));
                  const dlAnchorElem = document.createElement('a');
                  dlAnchorElem.setAttribute("href", dataStr);
                  dlAnchorElem.setAttribute("download", `${metric.id}-telemetry.json`);
                  dlAnchorElem.click();
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Top Stat Banner */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Current Reading</span>
                <span className="text-3xl font-bold font-mono text-white tabular-nums">
                  {metric.value}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`inline-flex items-center font-mono font-medium ${
                    metric.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {metric.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 mr-0.5 inline" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-0.5 inline" />
                  )}
                  {metric.changePercent > 0 ? `+${metric.changePercent}%` : `${metric.changePercent}%`}
                </span>
                <span className="text-xs text-slate-400">({metric.timeframeComparison})</span>
              </div>
            </div>

            {/* Executive Summary Note */}
            {details?.summary && (
              <div className="text-sm text-slate-300 bg-slate-800/30 border border-slate-800 rounded-lg p-3.5 leading-relaxed">
                <span className="text-xs font-semibold text-slate-400 block mb-1">
                  Executive Analysis
                </span>
                {details.summary}
              </div>
            )}

            {/* Segment Breakdown */}
            {details?.breakdown && details.breakdown.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Contribution & Segment Share
                </h3>
                <div className="space-y-2.5">
                  {details.breakdown.map((item, idx) => (
                    <div key={idx} className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-slate-200">{item.name}</span>
                        <div className="flex items-center gap-2 font-mono tabular-nums">
                          <span className="text-white font-semibold">{item.value}</span>
                          <span className="text-slate-400">({item.share}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.share}%`,
                            backgroundColor: accentColor,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Audit / Transaction Logs */}
            {details?.recentLogs && details.recentLogs.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Granular Activity Trail
                </h3>
                <div className="divide-y divide-slate-800/60 border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/30">
                  {details.recentLogs.map((log) => (
                    <div key={log.id} className="p-3 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-start gap-2.5">
                        {log.status === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : log.status === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : log.status === 'critical' ? (
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-400 shrink-0 mt-1.5 ml-1" />
                        )}
                        <div>
                          <div className="font-medium text-slate-200">{log.title}</div>
                          <div className="text-[11px] text-slate-400">{log.subtitle}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {log.amount && (
                          <div className="font-mono font-semibold text-white tabular-nums">
                            {log.amount}
                          </div>
                        )}
                        <div className="text-[11px] text-slate-500">{log.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-500">
            <span>Real-time metric telemetry snapshot</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
