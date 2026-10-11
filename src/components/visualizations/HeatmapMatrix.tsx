import React, { useState } from 'react';

interface HeatmapMatrixProps {
  headers: string[];
  data: { row: string; cols: number[] }[];
  color?: string;
}

export const HeatmapMatrix: React.FC<HeatmapMatrixProps> = ({
  headers,
  data,
}) => {
  const [activeCell, setActiveCell] = useState<{ row: string; col: string; val: number } | null>(null);

  if (!data || data.length === 0) return null;

  const getColorShade = (val: number) => {
    if (val === 0) return 'bg-slate-900/40 text-slate-700 border-dashed border border-slate-800/40';
    if (val >= 97) return 'bg-indigo-600 text-white font-semibold';
    if (val >= 94) return 'bg-indigo-700/80 text-white';
    if (val >= 90) return 'bg-indigo-800/60 text-indigo-100';
    if (val >= 85) return 'bg-indigo-900/50 text-indigo-200';
    return 'bg-slate-800/60 text-slate-300';
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            <th className="text-left font-normal text-slate-500 py-2 pr-3 text-[11px] whitespace-nowrap">
              Cohort Origin
            </th>
            {headers.map((h, i) => (
              <th key={i} className="text-center font-mono text-slate-400 py-2 px-1 text-[11px]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className="py-2 pr-3 font-medium text-slate-300 whitespace-nowrap text-[12px]">
                {row.row}
              </td>
              {row.cols.map((val, colIdx) => {
                const headerLabel = headers[colIdx] || `M${colIdx}`;
                return (
                  <td key={colIdx} className="p-1 text-center">
                    <div
                      onMouseEnter={() => val > 0 && setActiveCell({ row: row.row, col: headerLabel, val })}
                      onMouseLeave={() => setActiveCell(null)}
                      className={`h-8 min-w-[36px] flex items-center justify-center rounded transition-all cursor-default font-mono tabular-nums text-[11px] ${getColorShade(
                        val
                      )}`}
                    >
                      {val > 0 ? `${val}%` : '—'}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {activeCell && (
        <div className="mt-2 p-2 bg-slate-900/90 border border-slate-800 rounded text-xs text-slate-300 flex items-center justify-between">
          <span>
            Cohort <strong className="text-white">{activeCell.row}</strong> at <strong className="text-indigo-400">{activeCell.col}</strong>:
          </span>
          <span className="font-mono text-white font-semibold">{activeCell.val}% Retained Retention</span>
        </div>
      )}
    </div>
  );
};
