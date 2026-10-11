import React from 'react';
import { motion } from 'motion/react';
import { FunnelStep } from '../../types/dashboard';

interface FunnelChartProps {
  data: FunnelStep[];
  color?: string;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  color = '#10B981',
}) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {data.map((step, idx) => {
        const isLast = idx === data.length - 1;
        const widthPct = Math.max(18, step.conversionRate);

        return (
          <div key={idx} className="relative">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">{step.label}</span>
              <div className="flex items-center gap-2 font-mono tabular-nums">
                <span className="text-white font-semibold">{step.formatted}</span>
                <span className="text-slate-400 text-[11px]">({step.conversionRate}%)</span>
              </div>
            </div>

            {/* Funnel Step Bar */}
            <div className="h-7 w-full bg-slate-800/60 rounded-md overflow-hidden relative flex items-center px-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPct}%` }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 rounded-md opacity-25"
                style={{ backgroundColor: color }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPct}%` }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 border-r-2"
                style={{ borderColor: color }}
              />
              <span className="relative z-10 text-[11px] font-mono text-slate-300">
                Step 0{idx + 1}
              </span>
            </div>

            {/* Dropoff connector indicator */}
            {!isLast && (
              <div className="flex items-center gap-1.5 pl-4 py-0.5 text-[11px] font-mono text-rose-400/80">
                <span className="text-slate-600">↳</span>
                <span>-{step.dropoffRate.toFixed(1)}% drop-off</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
