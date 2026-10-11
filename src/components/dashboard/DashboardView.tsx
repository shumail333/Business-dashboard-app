import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DashboardTemplate, Timeframe, MetricItem } from '../../types/dashboard';
import { MetricCard } from '../ui/MetricCard';
import { AreaChart } from '../visualizations/AreaChart';
import { BarChart } from '../visualizations/BarChart';
import { FunnelChart } from '../visualizations/FunnelChart';
import { HeatmapMatrix } from '../visualizations/HeatmapMatrix';
import { RealDataStreamPanel } from '../ecommerce/RealDataStreamPanel';
import { IngestedEvent, StoreConfig } from '../../../server';
import { 
  Search, 
  TrendingUp, 
  Info,
  Clock,
  Sparkles,
  Store,
  Radio
} from 'lucide-react';

interface DashboardViewProps {
  template: DashboardTemplate;
  visibleMetricIds: string[];
  currencyPrefix: string;
  isCompactDensity: boolean;
  isSimulatingLive: boolean;
  onOpenDrilldown: (metric: MetricItem) => void;
  onOpenQuiz: () => void;
  // Real E-commerce Integration Props
  realStoreEvents?: IngestedEvent[];
  realStoreMetrics?: any;
  storeConfig?: StoreConfig | null;
  isRealDataMode?: boolean;
  onToggleRealDataMode?: (enabled: boolean) => void;
  onOpenConnectModal?: () => void;
  onTriggerTestEvent?: (payload: any) => Promise<void>;
  onClearEvents?: () => Promise<void>;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  template,
  visibleMetricIds,
  currencyPrefix,
  isCompactDensity,
  isSimulatingLive,
  onOpenDrilldown,
  onOpenQuiz,
  realStoreEvents = [],
  realStoreMetrics = null,
  storeConfig = null,
  isRealDataMode = false,
  onToggleRealDataMode = () => {},
  onOpenConnectModal = () => {},
  onTriggerTestEvent = async () => {},
  onClearEvents = async () => {},
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('30d');
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Compute metrics depending on whether Real Data Mode is active for E-Commerce
  const isEcommerce = template.id === 'ecommerce';
  const shouldUseRealData = isEcommerce && isRealDataMode && realStoreMetrics;

  let activeMetrics = template.metrics;
  let activeChartData = template.chartData[timeframe] || template.chartData['30d'];
  let activeTableRows = template.tableRows;

  if (shouldUseRealData) {
    const realNetRev = realStoreMetrics.netRevenue || 0;
    const realOrderCount = realStoreMetrics.orderCount || 0;
    const realAov = realStoreMetrics.aov || 0;
    const realCarts = realStoreMetrics.abandonedCartCount || 0;

    activeMetrics = template.metrics.map((m) => {
      if (m.id === 'gmv') {
        return {
          ...m,
          value: `$${realNetRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          rawValue: realNetRev,
          timeframeComparison: `${realOrderCount} live orders ingested`,
        };
      }
      if (m.id === 'aov') {
        return {
          ...m,
          value: `$${realAov.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          rawValue: realAov,
          timeframeComparison: `across ${realOrderCount} orders`,
        };
      }
      if (m.id === 'cart-abandon') {
        const totalSessions = realOrderCount + realCarts;
        const rate = totalSessions > 0 ? (realCarts / totalSessions) * 100 : 0;
        return {
          ...m,
          value: `${rate.toFixed(1)}%`,
          rawValue: rate,
          timeframeComparison: `${realCarts} carts recorded`,
        };
      }
      return m;
    });

    if (realStoreMetrics.dailyBuckets && realStoreMetrics.dailyBuckets.length > 0) {
      activeChartData = realStoreMetrics.dailyBuckets;
    }

    if (realStoreEvents.length > 0) {
      activeTableRows = realStoreEvents.map((evt, idx) => ({
        id: evt.id,
        col1: evt.items?.[0]?.name ? `${evt.items[0].name} (${evt.items[0].sku || 'SKU'})` : `Order ${evt.orderId}`,
        col2: evt.source.toUpperCase(),
        col3: `${evt.customerName || 'Shopper'}`,
        col4: `${evt.items?.length || 1} items`,
        col5: `$${evt.amount.toFixed(2)}`,
        statusBadge: {
          text: evt.status === 'completed' ? 'Paid' : evt.status === 'abandoned' ? 'Abandoned' : 'Refunded',
          variant: evt.status === 'completed' ? 'success' : evt.status === 'abandoned' ? 'warning' : 'danger',
        },
        timestamp: new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
    }
  }

  // Filter visible metrics
  const displayedMetrics = activeMetrics
    .filter((m) => visibleMetricIds.includes(m.id))
    .map((m) => ({
      ...m,
      value: m.value.replace('$', currencyPrefix),
    }));

  // Filter table rows by search and status
  const filteredRows = activeTableRows.filter((row) => {
    const matchesSearch = 
      row.col1.toLowerCase().includes(tableSearch.toLowerCase()) ||
      row.col2.toLowerCase().includes(tableSearch.toLowerCase()) ||
      row.col3.toLowerCase().includes(tableSearch.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    if (!row.statusBadge) return matchesSearch;
    return matchesSearch && row.statusBadge.variant === statusFilter;
  });

  return (
    <motion.div
      key={template.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Template Header Hero Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 lg:p-6 backdrop-blur-xs relative overflow-hidden">
        {/* Subtle accent glow */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: template.accentColor }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="max-w-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-indigo-400 font-mono uppercase tracking-wider">
                {template.industry}
              </span>
              <span aria-hidden="true">·</span>
              <span>{template.badge}</span>
              {isEcommerce && isRealDataMode && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" />
                    Real-World Store Live
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white text-balance">
              {template.name}
            </h1>

            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
              {template.description}
            </p>

            {/* Recommended For clean unboxed metadata */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-500 font-mono">Tailored for:</span>
              {template.recommendedFor.map((rec, i) => (
                <React.Fragment key={i}>
                  <span className="text-slate-300">{rec}</span>
                  {i < template.recommendedFor.length - 1 && (
                    <span aria-hidden="true" className="text-slate-600">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action toolbar */}
          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {isEcommerce && (
              <button
                onClick={onOpenConnectModal}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 whitespace-nowrap"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Connect E-Commerce Store</span>
              </button>
            )}

            <div className="flex items-center p-1 bg-slate-950/70 border border-slate-800 rounded-xl">
              {(['7d', '30d', '90d', '1y'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-150 ${
                    timeframe === tf
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenQuiz}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Change Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-World E-Commerce Ingestion Telemetry Stream Panel (Visible in E-Commerce Template) */}
      {isEcommerce && (
        <RealDataStreamPanel
          storeConfig={storeConfig}
          events={realStoreEvents}
          isRealDataMode={isRealDataMode}
          onToggleRealDataMode={onToggleRealDataMode}
          onOpenConnectModal={onOpenConnectModal}
          onTriggerTestEvent={onTriggerTestEvent}
          onClearEvents={onClearEvents}
        />
      )}

      {/* KPI Stat Cards Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
          isCompactDensity ? 'gap-3' : 'gap-4'
        }`}
      >
        {displayedMetrics.map((metric, idx) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
          >
            <MetricCard
              metric={metric}
              accentColor={template.accentColor}
              onClickDrilldown={() => onOpenDrilldown(metric)}
              isSimulatingLive={isSimulatingLive}
            />
          </motion.div>
        ))}
      </div>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Primary Interactive Area Chart (Span 2 columns) */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  {shouldUseRealData ? 'Real-World Store Sales Velocity' : 'Primary Performance Trajectory'}
                </span>
              </div>
              <h2 className="text-base font-semibold text-white mt-0.5">
                {shouldUseRealData ? 'Live Store Revenue Trajectory ($)' : template.primaryChartTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {shouldUseRealData ? 'Real-time sales revenue plotted by event transaction timestamp' : template.primaryChartSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className={`w-2 h-2 rounded-full ${shouldUseRealData ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400'}`} />
              <span>Interval: {timeframe.toUpperCase()}</span>
            </div>
          </div>

          <div className="pt-2">
            <AreaChart
              data={activeChartData}
              primarySeriesName={shouldUseRealData ? 'Store Revenue ($)' : template.primarySeriesName}
              secondarySeriesName={shouldUseRealData ? 'Ad Spend Est ($)' : template.secondarySeriesName}
              primaryColor={template.accentColor}
              valuePrefix={template.chartValuePrefix}
              valueSuffix={shouldUseRealData ? '' : template.chartValueSuffix}
              height={270}
            />
          </div>
        </div>

        {/* Secondary Specialized Visualization (Span 1 column) */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Specialized Metric Dimension</span>
            </div>
            <h2 className="text-base font-semibold text-white mb-1">
              {template.secondaryChartTitle}
            </h2>
          </div>

          <div className="my-auto py-3">
            {template.secondaryChartType === 'bar' && template.barData && (
              <BarChart
                data={template.barData}
                currentColor={template.accentColor}
                valueSuffix={template.id === 'devops' ? '%' : template.id === 'fintech' ? 'M' : ''}
              />
            )}

            {template.secondaryChartType === 'funnel' && template.funnelData && (
              <FunnelChart
                data={template.funnelData}
                color={template.accentColor}
              />
            )}

            {template.secondaryChartType === 'matrix' && template.matrixData && template.matrixHeaders && (
              <HeatmapMatrix
                headers={template.matrixHeaders}
                data={template.matrixData}
              />
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Model Dimension</span>
            <span>Real-time aggregation</span>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry & Transaction Activity Table */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 overflow-hidden">
        {/* Table Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Audit & Event Feed</span>
            </div>
            <h2 className="text-base font-semibold text-white mt-0.5">
              {shouldUseRealData ? 'Live Store Order & Webhook Events Feed' : template.recentActivityTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-950/70 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500/80 transition-colors w-44 sm:w-56"
              />
            </div>

            {/* Filter segmented buttons */}
            <div className="flex items-center p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('success')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === 'success'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Paid / Healthy
              </button>
              <button
                onClick={() => setStatusFilter('warning')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === 'warning'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alerts
              </button>
            </div>
          </div>
        </div>

        {/* High-Density Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                {template.tableHeaders.map((head, i) => (
                  <th key={i} className="py-2.5 px-3 font-normal whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-3 px-3 font-medium text-slate-200 max-w-[240px] truncate">
                      {row.col1}
                    </td>
                    <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                      {row.col2}
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono whitespace-nowrap">
                      {row.col3}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-mono whitespace-nowrap tabular-nums">
                      {row.col4}
                    </td>
                    <td className="py-3 px-3 font-semibold text-white font-mono tabular-nums whitespace-nowrap">
                      {row.col5.replace('$', currencyPrefix)}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-right">
                      {row.statusBadge && (
                        <span
                          className={`inline-flex items-center text-[11px] font-medium font-mono px-2 py-0.5 rounded ${
                            row.statusBadge.variant === 'success'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                              : row.statusBadge.variant === 'warning'
                              ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                              : row.statusBadge.variant === 'danger'
                              ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                              : row.statusBadge.variant === 'accent'
                              ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/40'
                              : 'bg-slate-800 text-slate-300 border border-slate-700/40'
                          }`}
                        >
                          {row.statusBadge.text}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={template.tableHeaders.length} className="py-8 text-center text-slate-500 text-xs">
                    No matching audit rows found for "{tableSearch}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
