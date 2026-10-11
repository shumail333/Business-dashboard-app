export type TemplateId = 
  | 'b2b-saas' 
  | 'ecommerce' 
  | 'fintech' 
  | 'devops' 
  | 'healthcare' 
  | 'ai-ops';

export type Timeframe = '7d' | '30d' | '90d' | '1y';

export type ThemeMode = 'dark' | 'light' | 'obsidian';

export type DensityMode = 'comfortable' | 'compact';

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  changePercent: number;
  isPositive: boolean;
  timeframeComparison: string;
  sparkline: number[];
  category: string;
  unit?: string;
  drilldownDetails?: {
    summary: string;
    historicalData: { label: string; value: number }[];
    breakdown: { name: string; value: string; share: number }[];
    recentLogs: { id: string; title: string; subtitle: string; timestamp: string; amount?: string; status: 'nominal' | 'warning' | 'critical' | 'success' }[];
  };
}

export interface ChartDataPoint {
  date: string;
  primary: number;
  secondary?: number;
  tertiary?: number;
  label?: string;
}

export interface FunnelStep {
  label: string;
  value: number;
  formatted: string;
  conversionRate: number;
  dropoffRate: number;
}

export interface TableRowItem {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  statusBadge?: {
    text: string;
    variant: 'success' | 'warning' | 'danger' | 'neutral' | 'accent';
  };
  timestamp?: string;
}

export interface DashboardTemplate {
  id: TemplateId;
  name: string;
  tagline: string;
  industry: string;
  badge: string;
  description: string;
  accentColor: string;
  accentBorder: string;
  accentGradient: string;
  metrics: MetricItem[];
  primaryChartTitle: string;
  primaryChartSubtitle: string;
  primarySeriesName: string;
  secondarySeriesName?: string;
  chartData: Record<Timeframe, ChartDataPoint[]>;
  chartValuePrefix?: string;
  chartValueSuffix?: string;
  funnelData?: FunnelStep[];
  secondaryChartType: 'bar' | 'gauge' | 'funnel' | 'matrix';
  secondaryChartTitle: string;
  barData?: { label: string; current: number; previous: number }[];
  matrixData?: { row: string; cols: number[] }[];
  matrixHeaders?: string[];
  recentActivityTitle: string;
  tableHeaders: string[];
  tableRows: TableRowItem[];
  recommendedFor: string[];
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    desc: string;
    recommendedTemplate: TemplateId;
  }[];
}
