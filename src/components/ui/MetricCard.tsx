import React from 'react';
import { motion } from 'motion/react';
import { Sparkline } from '../visualizations/Sparkline';
import { MetricItem } from '../../types/dashboard';
import { ArrowUpRight, ArrowDownRight, Maximize2 } from 'lucide-react';

interface MetricCardProps {
  metric: MetricItem;
  accentColor?: string;
  onClickDrilldown?: () => void;
  isSimulatingLive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  accentColor = '#6366F1',
  onClickDrilldown,
  isSimulatingLive = false,
}) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={onClickDrilldown}
      className="group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:shadow-black/20"
    >
      {/* Top row: Label & Category metadata, plus expand icon */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-1.5 truncate">
          <span className="font-medium text-slate-300 truncate">{metric.label}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-500">{metric.category}</span>
        </div>
        
        <div className="flex items-center gap-1 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0">
          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-mono">Drilldown</span>
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Metric Value & Sparkline */}
      <div className="flex items-baseline justify-between gap-2 mt-1">
        <div className="space-y-1">
          <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums flex items-center gap-1.5">
            {metric.value}
            {isSimulatingLive && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            )}
          </div>

          {/* Change Delta & comparison note (Unboxed text with separator) */}
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`inline-flex items-center font-mono tabular-nums font-medium ${
                metric.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {metric.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 inline" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 inline" />
              )}
              {metric.changePercent > 0 ? `+${metric.changePercent}%` : `${metric.changePercent}%`}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
              {metric.timeframeComparison}
            </span>
          </div>
        </div>

        {/* Sparkline Visualizer */}
        <div className="shrink-0 pt-1">
          <Sparkline
            data={metric.sparkline}
            color={accentColor}
            isPositive={metric.isPositive}
            height={32}
            width={94}
          />
        </div>
      </div>
    </motion.div>
  );
};
