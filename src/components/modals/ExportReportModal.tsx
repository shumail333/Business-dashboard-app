import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardTemplate } from '../../types/dashboard';
import { X, Copy, Check, Printer, FileText } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: DashboardTemplate;
  currencyPrefix: string;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  template,
  currencyPrefix,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const generateMarkdownReport = () => {
    return `# EXECUTIVE INTELLIGENCE BRIEFING: ${template.name.toUpperCase()}
Generated on: ${timestamp}
Industry Archetype: ${template.industry}

## 1. PRIMARY EXECUTIVE KPIS
${template.metrics.map(m => `- ${m.label}: ${m.value.replace('$', currencyPrefix)} (${m.isPositive ? '+' : ''}${m.changePercent}%, ${m.timeframeComparison})`).join('\n')}

## 2. RECENT ACTIVITY & TELEMETRY
${template.tableHeaders.join(' | ')}
${template.tableHeaders.map(() => '---').join(' | ')}
${template.tableRows.map(r => `${r.col1} | ${r.col2} | ${r.col3} | ${r.col4} | ${r.col5}`).join('\n')}

Report generated via Archetype SaaS Dashboard Suite.
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-white">Executive Report & Export</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Report Header Preview */}
            <div className="border border-slate-800 rounded-xl p-5 bg-slate-950/60 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                    Executive Summary Sheet
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">{template.name}</h3>
                  <p className="text-xs text-slate-400">{template.industry}</p>
                </div>
                <div className="text-right text-[11px] font-mono text-slate-500">
                  {timestamp}
                </div>
              </div>

              {/* Metrics Grid Preview */}
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  Key Metric Snapshots
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {template.metrics.slice(0, 6).map((m) => (
                    <div key={m.id} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="text-[11px] text-slate-400 truncate">{m.label}</div>
                      <div className="text-base font-bold font-mono text-white mt-0.5 tabular-nums">
                        {m.value.replace('$', currencyPrefix)}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        {m.isPositive ? '+' : ''}{m.changePercent}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Markdown Code view */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-300">
                  Formatted Markdown Output
                </span>
                <span className="text-[11px] font-mono text-slate-500">Ready to paste into Notion/Slack</span>
              </div>
              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto max-h-40 selection:bg-indigo-600">
                {generateMarkdownReport()}
              </pre>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-1.5 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Markdown'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
