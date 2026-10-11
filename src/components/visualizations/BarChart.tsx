import React, { useState } from 'react';
import { motion } from 'motion/react';

interface BarDataPoint {
  label: string;
  current: number;
  previous: number;
}

interface BarChartProps {
  data: BarDataPoint[];
  title?: string;
  currentLabel?: string;
  previousLabel?: string;
  currentColor?: string;
  previousColor?: string;
  valueSuffix?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  currentLabel = 'Active Cycle',
  previousLabel = 'Prior Benchmark',
  currentColor = '#6366F1',
  previousColor = '#334155',
  valueSuffix = '%',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.flatMap((d) => [d.current, d.previous])) * 1.15 || 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: currentColor }} />
            <span className="text-slate-300 font-medium">{currentLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: previousColor }} />
            <span className="text-slate-400">{previousLabel}</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">Relative comparison</span>
      </div>

      <div className="space-y-3.5">
        {data.map((item, idx) => {
          const currentPct = (item.current / maxVal) * 100;
          const previousPct = (item.previous / maxVal) * 100;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`p-2 rounded-lg transition-colors duration-150 ${
                isHovered ? 'bg-slate-800/40' : 'bg-transparent'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-200 truncate">{item.label}</span>
                <div className="flex items-center gap-3 font-mono tabular-nums text-right shrink-0">
                  <span className="font-semibold text-white">
                    {item.current}
                    {valueSuffix}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    prev: {item.previous}
                    {valueSuffix}
                  </span>
                </div>
              </div>

              {/* Bars track */}
              <div className="space-y-1">
                {/* Current cycle bar */}
                <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentPct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>
                {/* Previous benchmark bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${previousPct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full opacity-60"
                    style={{ backgroundColor: previousColor }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
