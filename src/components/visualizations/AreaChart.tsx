import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChartDataPoint } from '../../types/dashboard';

interface AreaChartProps {
  data: ChartDataPoint[];
  primarySeriesName: string;
  secondarySeriesName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  height?: number;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  primarySeriesName,
  secondarySeriesName,
  primaryColor = '#6366F1',
  secondaryColor = '#94A3B8',
  valuePrefix = '',
  valueSuffix = '',
  height = 280,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  // Calculate scales
  const allPrimaryValues = data.map((d) => d.primary);
  const allSecondaryValues = data.map((d) => d.secondary ?? 0);
  const allValues = [...allPrimaryValues, ...allSecondaryValues];
  
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const minVal = Math.max(0, Math.floor(rawMin * 0.85));
  const maxVal = Math.ceil(rawMax * 1.15) || 10;
  const range = maxVal - minVal;

  const width = 800; // SVG internal viewBox width
  const padLeft = 50;
  const padRight = 24;
  const padTop = 20;
  const padBottom = 35;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const pointsPrimary = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * chartW;
    const y = padTop + chartH - ((d.primary - minVal) / range) * chartH;
    return { x, y, data: d };
  });

  const pointsSecondary = data.map((d, i) => {
    const val = d.secondary ?? minVal;
    const x = padLeft + (i / (data.length - 1)) * chartW;
    const y = padTop + chartH - ((val - minVal) / range) * chartH;
    return { x, y };
  });

  // Build smooth bezier path
  const makeSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    return pts.reduce((acc, pt, idx) => {
      if (idx === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      const prev = pts[idx - 1];
      const cp1x = (prev.x + (pt.x - prev.x) / 2).toFixed(1);
      const cp1y = prev.y.toFixed(1);
      const cp2x = (prev.x + (pt.x - prev.x) / 2).toFixed(1);
      const cp2y = pt.y.toFixed(1);
      return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }, '');
  };

  const primaryPathD = makeSmoothPath(pointsPrimary);
  const primaryAreaD = `${primaryPathD} L ${pointsPrimary[pointsPrimary.length - 1].x} ${padTop + chartH} L ${pointsPrimary[0].x} ${padTop + chartH} Z`;

  const secondaryPathD = secondarySeriesName ? makeSmoothPath(pointsSecondary) : '';

  // Generate 4 horizontal gridlines
  const gridTicks = [0, 0.33, 0.66, 1].map((pct) => {
    const val = minVal + range * pct;
    const y = padTop + chartH - pct * chartH;
    return { val, y };
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const relX = (clientX / rect.width) * width;
    
    // Find closest data point
    let closestIdx = 0;
    let minDiff = Infinity;
    pointsPrimary.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - relX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setHoverIndex(closestIdx);
  };

  const activePoint = hoverIndex !== null ? pointsPrimary[hoverIndex] : null;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverIndex(null)}
      className="relative w-full select-none cursor-crosshair"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: `${height}px` }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
            <stop offset="70%" stopColor={primaryColor} stopOpacity="0.05" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines */}
        {gridTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={padLeft}
              y1={tick.y}
              x2={width - padRight}
              y2={tick.y}
              stroke="currentColor"
              className="text-slate-800"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <text
              x={padLeft - 10}
              y={tick.y + 3}
              textAnchor="end"
              className="fill-slate-500 text-[11px] font-mono tabular-nums"
            >
              {valuePrefix}
              {tick.val >= 1000 ? `${(tick.val / 1000).toFixed(0)}k` : tick.val.toFixed(tick.val < 10 && tick.val > 0 ? 1 : 0)}
              {valueSuffix}
            </text>
          </g>
        ))}

        {/* X Axis Labels */}
        {pointsPrimary.map((pt, i) => {
          // Show every label if <= 7, else skip some
          const show = data.length <= 8 || i % Math.ceil(data.length / 6) === 0 || i === data.length - 1;
          if (!show) return null;
          return (
            <text
              key={i}
              x={pt.x}
              y={height - 8}
              textAnchor="middle"
              className="fill-slate-400 text-[11px] font-mono"
            >
              {pt.data.date}
            </text>
          );
        })}

        {/* Primary Area Fill */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          d={primaryAreaD}
          fill="url(#areaGradient)"
        />

        {/* Secondary Line */}
        {secondarySeriesName && (
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            d={secondaryPathD}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}

        {/* Primary Line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          d={primaryPathD}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover Crosshair & Dots */}
        {activePoint && (
          <g>
            {/* Vertical crosshair line */}
            <line
              x1={activePoint.x}
              y1={padTop}
              x2={activePoint.x}
              y2={padTop + chartH}
              stroke={primaryColor}
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            {/* Primary active circle */}
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="5"
              fill={primaryColor}
              stroke="#0B132B"
              strokeWidth="2.5"
            />
            {/* Secondary active circle if available */}
            {secondarySeriesName && pointsSecondary[hoverIndex!] && (
              <circle
                cx={pointsSecondary[hoverIndex!].x}
                cy={pointsSecondary[hoverIndex!].y}
                r="4"
                fill={secondaryColor}
                stroke="#0B132B"
                strokeWidth="2"
              />
            )}
          </g>
        )}
      </svg>

      {/* Floating Hover Tooltip Card */}
      <AnimatePresence>
        {activePoint && hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2.5 shadow-xl shadow-black/40 text-xs min-w-[150px]"
            style={{
              left: `clamp(10px, ${(activePoint.x / width) * 100}%, calc(100% - 170px))`,
              top: `${Math.max(10, (activePoint.y / height) * 100 - 30)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="text-[11px] font-medium text-slate-400 border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between">
              <span>{activePoint.data.date}</span>
              <span className="text-[10px] text-indigo-400 font-mono">Live Sample</span>
            </div>
            
            <div className="flex items-center justify-between gap-3 text-slate-200 py-0.5">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
                <span className="truncate">{primarySeriesName}</span>
              </span>
              <span className="font-mono font-semibold text-white tabular-nums">
                {valuePrefix}{activePoint.data.primary.toLocaleString()}{valueSuffix}
              </span>
            </div>

            {secondarySeriesName && activePoint.data.secondary !== undefined && (
              <div className="flex items-center justify-between gap-3 text-slate-300 py-0.5">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: secondaryColor }} />
                  <span className="truncate">{secondarySeriesName}</span>
                </span>
                <span className="font-mono tabular-nums text-slate-400">
                  {valuePrefix}{activePoint.data.secondary.toLocaleString()}{valueSuffix}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Bottom Legend */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: primaryColor }} />
            <span className="text-slate-300 font-medium">{primarySeriesName}</span>
          </div>
          {secondarySeriesName && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 rounded border-b border-dashed" style={{ borderColor: secondaryColor }} />
              <span className="text-slate-400">{secondarySeriesName}</span>
            </div>
          )}
        </div>
        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
          Scrub across chart to inspect point telemetry
        </span>
      </div>
    </div>
  );
};
