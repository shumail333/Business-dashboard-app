import { DashboardTemplate, QuizQuestion } from '../types/dashboard';

export const TEMPLATES_DATA: Record<string, DashboardTemplate> = {
  'b2b-saas': {
    id: 'b2b-saas',
    name: 'B2B Subscription & ARR Velocity',
    tagline: 'High-growth recurring revenue telemetry with net retention cohorts',
    industry: 'Enterprise Software & Micro-SaaS',
    badge: 'Recurring Revenue',
    description: 'Engineered for SaaS founders, CFOs, and revenue leaders tracking net revenue retention, CAC payback dynamics, expansion velocity, and subscription tiers.',
    accentColor: '#6366F1', // Indigo
    accentBorder: 'border-indigo-500/20',
    accentGradient: 'from-indigo-500/20 to-transparent',
    metrics: [
      {
        id: 'mrr',
        label: 'Monthly Recurring Revenue',
        value: '$148,250',
        rawValue: 148250,
        changePercent: 12.4,
        isPositive: true,
        timeframeComparison: 'vs. previous cycle',
        sparkline: [118, 122, 126, 131, 137, 142, 148],
        category: 'Revenue',
        drilldownDetails: {
          summary: 'MRR expanded by $16,400 this period driven by 24 enterprise upgrades and 18 net new starter subscriptions.',
          historicalData: [
            { label: 'Q1', value: 112000 },
            { label: 'Q2', value: 124500 },
            { label: 'Q3', value: 136200 },
            { label: 'Q4', value: 148250 },
          ],
          breakdown: [
            { name: 'Enterprise Tier', value: '$84,500', share: 57 },
            { name: 'Growth Tier', value: '$42,200', share: 28 },
            { name: 'Starter Tier', value: '$21,550', share: 15 },
          ],
          recentLogs: [
            { id: 'tx-1', title: 'Acme Cloud Corp', subtitle: 'Enterprise 50-Seat Upgrade', timestamp: '14 mins ago', amount: '+$4,200/mo', status: 'success' },
            { id: 'tx-2', title: 'Synthex Logistics', subtitle: 'New Annual Subscription', timestamp: '1 hr ago', amount: '+$2,100/mo', status: 'success' },
            { id: 'tx-3', title: 'Vanguard Media', subtitle: 'Seat Expansion (+12 seats)', timestamp: '3 hrs ago', amount: '+$840/mo', status: 'nominal' },
            { id: 'tx-4', title: 'Kinetix Labs', subtitle: 'Downgraded to Pro Tier', timestamp: 'Yesterday', amount: '-$350/mo', status: 'warning' },
          ]
        }
      },
      {
        id: 'arr',
        label: 'Annual Run Rate (ARR)',
        value: '$1.78M',
        rawValue: 1780000,
        changePercent: 16.8,
        isPositive: true,
        timeframeComparison: 'on-track for $2.1M FY goal',
        sparkline: [1.32, 1.41, 1.49, 1.58, 1.68, 1.74, 1.78],
        category: 'Revenue',
        drilldownDetails: {
          summary: 'Forward-looking annualized contract value has accelerated by 16.8% YoY with 92% multi-year commitments.',
          historicalData: [
            { label: 'Jan', value: 1400000 },
            { label: 'Apr', value: 1520000 },
            { label: 'Jul', value: 1650000 },
            { label: 'Oct', value: 1780000 },
          ],
          breakdown: [
            { name: 'North America', value: '$1.12M', share: 63 },
            { name: 'EMEA', value: '$440K', share: 25 },
            { name: 'APAC', value: '$220K', share: 12 },
          ],
          recentLogs: [
            { id: 'arr-1', title: 'OmniGlobal Systems', subtitle: '3-Year Enterprise Lock', timestamp: '2 days ago', amount: '$180,000 ARR', status: 'success' },
            { id: 'arr-2', title: 'Finscale Partners', subtitle: 'Standard Annual Renewal', timestamp: '3 days ago', amount: '$72,000 ARR', status: 'nominal' },
          ]
        }
      },
      {
        id: 'nrr',
        label: 'Net Revenue Retention (NRR)',
        value: '118.4%',
        rawValue: 118.4,
        changePercent: 2.1,
        isPositive: true,
        timeframeComparison: 'top decile benchmark (>115%)',
        sparkline: [111, 113, 114, 115, 116, 117.8, 118.4],
        category: 'Retention',
        drilldownDetails: {
          summary: 'Accounts older than 12 months expand spend at a 1.18x multiplier, outstripping gross churn by 4.2x.',
          historicalData: [
            { label: 'M-6', value: 112 },
            { label: 'M-4', value: 114 },
            { label: 'M-2', value: 116.5 },
            { label: 'Now', value: 118.4 },
          ],
          breakdown: [
            { name: 'Seat Additions', value: '+14.2%', share: 55 },
            { name: 'Module Add-ons', value: '+7.8%', share: 30 },
            { name: 'Usage Consumption', value: '+4.0%', share: 15 },
          ],
          recentLogs: [
            { id: 'nrr-1', title: 'Quantix Analytics', subtitle: 'Added Security Compliance Add-on', timestamp: '5 hrs ago', amount: '+$500/mo', status: 'success' }
          ]
        }
      },
      {
        id: 'cac-payback',
        label: 'CAC Payback Velocity',
        value: '7.2 mo',
        rawValue: 7.2,
        changePercent: -14.2,
        isPositive: true, // Lower is better for CAC payback!
        timeframeComparison: '1.2 months faster recovery',
        sparkline: [9.4, 9.0, 8.6, 8.2, 7.8, 7.4, 7.2],
        category: 'Efficiency',
        drilldownDetails: {
          summary: 'Blended Customer Acquisition Cost of $3,420 recovered within 7.2 months on average initial contract values.',
          historicalData: [
            { label: 'Q1', value: 9.2 },
            { label: 'Q2', value: 8.5 },
            { label: 'Q3', value: 7.9 },
            { label: 'Q4', value: 7.2 },
          ],
          breakdown: [
            { name: 'Product-Led Inbound', value: '4.1 mo', share: 48 },
            { name: 'Outbound SDR/AE', value: '9.8 mo', share: 38 },
            { name: 'Partner Referrals', value: '5.2 mo', share: 14 },
          ],
          recentLogs: [
            { id: 'cac-1', title: 'Self-serve Org Signup', subtitle: 'Zero-touch credit card activation', timestamp: '42 mins ago', amount: '$0 CAC', status: 'success' }
          ]
        }
      },
      {
        id: 'churn',
        label: 'Gross Logo Churn Rate',
        value: '0.84%',
        rawValue: 0.84,
        changePercent: -0.16,
        isPositive: true, // Lower is better
        timeframeComparison: 'industry median 1.5%',
        sparkline: [1.2, 1.15, 1.05, 0.98, 0.92, 0.88, 0.84],
        category: 'Retention',
        drilldownDetails: {
          summary: 'Monthly logo churn dropped below 0.9% following onboarding lifecycle revamps and automated customer health alarms.',
          historicalData: [
            { label: 'Q1', value: 1.2 },
            { label: 'Q2', value: 1.05 },
            { label: 'Q3', value: 0.95 },
            { label: 'Q4', value: 0.84 },
          ],
          breakdown: [
            { name: 'Starter Tier ($49)', value: '1.4%', share: 70 },
            { name: 'Growth Tier ($249)', value: '0.6%', share: 22 },
            { name: 'Enterprise ($999+)', value: '0.1%', share: 8 },
          ],
          recentLogs: [
            { id: 'ch-1', title: 'Northwind Travel', subtitle: 'Voluntary Cancellation (Business Closed)', timestamp: '3 days ago', amount: '-$149/mo', status: 'warning' }
          ]
        }
      },
      {
        id: 'quick-ratio',
        label: 'SaaS Growth Quick Ratio',
        value: '4.2x',
        rawValue: 4.2,
        changePercent: 8.5,
        isPositive: true,
        timeframeComparison: '(New + Expansion) / (Churn + Contraction)',
        sparkline: [3.1, 3.4, 3.6, 3.8, 3.9, 4.1, 4.2],
        category: 'Efficiency',
        drilldownDetails: {
          summary: 'For every $1.00 of lost revenue to churn or contraction, the business creates $4.20 in new pipeline and expansion.',
          historicalData: [
            { label: 'Jan', value: 3.2 },
            { label: 'Apr', value: 3.6 },
            { label: 'Jul', value: 3.9 },
            { label: 'Oct', value: 4.2 },
          ],
          breakdown: [
            { name: 'New Bookings', value: '+$14.2K', share: 55 },
            { name: 'Account Expansion', value: '+$8.6K', share: 33 },
            { name: 'Reactivations', value: '+$3.1K', share: 12 },
          ],
          recentLogs: [
            { id: 'qr-1', title: 'Pipeline Inflow', subtitle: 'Healthy pipeline coverage ratio', timestamp: '1 hr ago', amount: 'Strong', status: 'success' }
          ]
        }
      }
    ],
    primaryChartTitle: 'MRR Trajectory & Net Expansion Composition',
    primaryChartSubtitle: 'Breakdown of New Bookings, Account Expansion, and Contraction offsets over time',
    primarySeriesName: 'Net MRR ($K)',
    secondarySeriesName: 'Gross Bookings ($K)',
    chartValuePrefix: '$',
    chartValueSuffix: 'K',
    chartData: {
      '7d': [
        { date: 'Mon', primary: 141.2, secondary: 144.5 },
        { date: 'Tue', primary: 142.8, secondary: 145.1 },
        { date: 'Wed', primary: 143.9, secondary: 146.4 },
        { date: 'Thu', primary: 145.1, secondary: 147.8 },
        { date: 'Fri', primary: 146.5, secondary: 149.2 },
        { date: 'Sat', primary: 147.2, secondary: 149.8 },
        { date: 'Sun', primary: 148.2, secondary: 151.0 },
      ],
      '30d': [
        { date: 'Week 1', primary: 136.4, secondary: 139.8 },
        { date: 'Week 2', primary: 139.8, secondary: 143.1 },
        { date: 'Week 3', primary: 144.2, secondary: 147.5 },
        { date: 'Week 4', primary: 148.2, secondary: 151.2 },
      ],
      '90d': [
        { date: 'Month 1', primary: 128.5, secondary: 132.0 },
        { date: 'Month 2', primary: 138.1, secondary: 141.9 },
        { date: 'Month 3', primary: 148.2, secondary: 152.4 },
      ],
      '1y': [
        { date: 'Q1', primary: 114.2, secondary: 118.0 },
        { date: 'Q2', primary: 125.6, secondary: 129.8 },
        { date: 'Q3', primary: 137.4, secondary: 141.6 },
        { date: 'Q4', primary: 148.2, secondary: 153.2 },
      ]
    },
    secondaryChartType: 'matrix',
    secondaryChartTitle: '12-Month Customer Cohort Retention Matrix (%)',
    matrixHeaders: ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
    matrixData: [
      { row: 'May 2026', cols: [100, 96, 94, 93, 91, 91, 90] },
      { row: 'Jun 2026', cols: [100, 97, 95, 94, 93, 92, 0] },
      { row: 'Jul 2026', cols: [100, 98, 96, 95, 94, 0, 0] },
      { row: 'Aug 2026', cols: [100, 97, 96, 95, 0, 0, 0] },
      { row: 'Sep 2026', cols: [100, 98, 97, 0, 0, 0, 0] },
      { row: 'Oct 2026', cols: [100, 99, 0, 0, 0, 0, 0] },
    ],
    recentActivityTitle: 'High-Value Account Subscriptions & Seat Expansions',
    tableHeaders: ['Account Organization', 'Subscription Tier', 'Billing Term', 'Seat Count', 'Contract ARR', 'Health Status'],
    tableRows: [
      {
        id: 'acc-1',
        col1: 'Palantir Systems Inc',
        col2: 'Enterprise Dedicated',
        col3: 'Annual Prepaid',
        col4: '142 Seats',
        col5: '$148,000',
        statusBadge: { text: 'Healthy 98%', variant: 'success' },
        timestamp: '12m ago'
      },
      {
        id: 'acc-2',
        col1: 'Apex Data Labs',
        col2: 'Growth Scale',
        col3: 'Monthly Card',
        col4: '48 Seats',
        col5: '$34,500',
        statusBadge: { text: 'Expanding', variant: 'accent' },
        timestamp: '1h ago'
      },
      {
        id: 'acc-3',
        col1: 'Sentry Financial Group',
        col2: 'Enterprise Dedicated',
        col3: 'Annual Prepaid',
        col4: '85 Seats',
        col5: '$96,000',
        statusBadge: { text: 'Healthy 94%', variant: 'success' },
        timestamp: '4h ago'
      },
      {
        id: 'acc-4',
        col1: 'Krypton BioTech',
        col2: 'Starter Team',
        col3: 'Monthly Card',
        col4: '12 Seats',
        col5: '$8,400',
        statusBadge: { text: 'Attention', variant: 'warning' },
        timestamp: '1d ago'
      },
      {
        id: 'acc-5',
        col1: 'Nova Logistics HQ',
        col2: 'Growth Scale',
        col3: 'Annual Invoiced',
        col4: '36 Seats',
        col5: '$28,800',
        statusBadge: { text: 'Healthy 91%', variant: 'success' },
        timestamp: '2d ago'
      }
    ],
    recommendedFor: ['B2B SaaS companies', 'Subscription-based platforms', 'Micro-SaaS founders', 'Enterprise software sales']
  },

  'ecommerce': {
    id: 'ecommerce',
    name: 'E-Commerce & DTC Merchant Command',
    tagline: 'Omnichannel gross merchandise value, conversion funnels & SKU inventory velocity',
    industry: 'Direct-to-Consumer & Retail Commerce',
    badge: 'Direct-to-Consumer',
    description: 'Designed for brand founders, Shopify merchants, and catalog managers requiring instant clarity on order velocity, blended ROAS, checkout drop-offs, and stockout timelines.',
    accentColor: '#10B981', // Emerald
    accentBorder: 'border-emerald-500/20',
    accentGradient: 'from-emerald-500/20 to-transparent',
    metrics: [
      {
        id: 'gmv',
        label: 'Gross Merchandise Value (GMV)',
        value: '$482,910',
        rawValue: 482910,
        changePercent: 18.6,
        isPositive: true,
        timeframeComparison: 'vs. baseline period',
        sparkline: [380, 410, 425, 442, 458, 470, 482],
        category: 'Sales',
        drilldownDetails: {
          summary: 'GMV up 18.6% propelled by Weekend Flash Promotion and higher bundle basket additions.',
          historicalData: [
            { label: 'W1', value: 104000 },
            { label: 'W2', value: 118000 },
            { label: 'W3', value: 126500 },
            { label: 'W4', value: 134410 },
          ],
          breakdown: [
            { name: 'Apparel & Outerwear', value: '$264K', share: 55 },
            { name: 'Accessories & Leather', value: '$138K', share: 29 },
            { name: 'Care & Maintenance Kits', value: '$80K', share: 16 },
          ],
          recentLogs: [
            { id: 'ord-1', title: 'Order #94821 - Tokyo, JP', subtitle: 'All-Weather Trench + Silk Scarf', timestamp: '3m ago', amount: '$420.00', status: 'success' },
            { id: 'ord-2', title: 'Order #94820 - Austin, US', subtitle: 'Merino Wool Crewneck (x2)', timestamp: '7m ago', amount: '$260.00', status: 'success' },
          ]
        }
      },
      {
        id: 'aov',
        label: 'Average Order Value (AOV)',
        value: '$124.50',
        rawValue: 124.5,
        changePercent: 6.8,
        isPositive: true,
        timeframeComparison: '+$7.90 per completed cart',
        sparkline: [114, 116, 118, 120, 121, 123, 124.5],
        category: 'Basket',
        drilldownDetails: {
          summary: 'Free shipping threshold adjustment ($100 to $120) increased 2-item basket attachments by 22%.',
          historicalData: [
            { label: 'Q1', value: 112 },
            { label: 'Q2', value: 116 },
            { label: 'Q3', value: 121 },
            { label: 'Q4', value: 124.5 },
          ],
          breakdown: [
            { name: 'Bundle Tier (>2 items)', value: '$186.20', share: 44 },
            { name: 'Standard Single Item', value: '$84.10', share: 56 },
          ],
          recentLogs: [
            { id: 'aov-1', title: 'Cart Upsell Triggered', subtitle: 'Shoe tree added to cart', timestamp: '12m ago', amount: '+$34.00', status: 'success' }
          ]
        }
      },
      {
        id: 'roas',
        label: 'Blended Ad ROAS',
        value: '4.12x',
        rawValue: 4.12,
        changePercent: 14.2,
        isPositive: true,
        timeframeComparison: '$4.12 returned per $1 paid ad spend',
        sparkline: [3.4, 3.55, 3.7, 3.85, 3.98, 4.05, 4.12],
        category: 'Marketing',
        drilldownDetails: {
          summary: 'Paid acquisition efficiency boosted by Meta lookalike refreshing and search brand intent capture.',
          historicalData: [
            { label: 'Meta Ads', value: 4.4 },
            { label: 'Google Search/PMax', value: 4.1 },
            { label: 'TikTok UGC', value: 3.6 },
            { label: 'Klaviyo Email (Organic)', value: 12.8 },
          ],
          breakdown: [
            { name: 'Meta Campaign A', value: '4.4x', share: 50 },
            { name: 'Google Performance Max', value: '4.1x', share: 32 },
            { name: 'TikTok Creator Spark', value: '3.6x', share: 18 },
          ],
          recentLogs: [
            { id: 'ad-1', title: 'Meta Autumn Showcase', subtitle: 'Target CPA maintained at $28.40', timestamp: '20m ago', amount: 'Nominal', status: 'success' }
          ]
        }
      },
      {
        id: 'conversion',
        label: 'Storefront Conversion Rate',
        value: '3.82%',
        rawValue: 3.82,
        changePercent: 0.44,
        isPositive: true,
        timeframeComparison: 'top 5% industry benchmark',
        sparkline: [3.2, 3.35, 3.48, 3.6, 3.71, 3.78, 3.82],
        category: 'Funnel',
        drilldownDetails: {
          summary: 'Accelerated checkout with Shop Pay & Apple Pay lifted mobile checkout completions by 18%.',
          historicalData: [
            { label: 'Desktop', value: 4.6 },
            { label: 'Mobile Safari', value: 3.4 },
            { label: 'Mobile Chrome', value: 3.2 },
          ],
          breakdown: [
            { name: 'Returning Shoppers', value: '6.4%', share: 42 },
            { name: 'First-time Visitors', value: '2.4%', share: 58 },
          ],
          recentLogs: [
            { id: 'cv-1', title: 'Express Pay Completed', subtitle: '1-tap checkout via Apple Pay', timestamp: '5m ago', amount: '2.1s duration', status: 'success' }
          ]
        }
      },
      {
        id: 'cart-abandon',
        label: 'Checkout Abandonment',
        value: '58.4%',
        rawValue: 58.4,
        changePercent: -5.2,
        isPositive: true, // Lower abandonment is positive
        timeframeComparison: '63.6% standard industry baseline',
        sparkline: [66, 64.5, 63.1, 61.8, 60.2, 59.1, 58.4],
        category: 'Funnel',
        drilldownDetails: {
          summary: 'Triggered automated SMS/Email abandoned cart workflows successfully recovered $42,100 in pipeline.',
          historicalData: [
            { label: 'Cart Step', value: 68 },
            { label: 'Shipping Step', value: 62 },
            { label: 'Payment Step', value: 58.4 },
          ],
          breakdown: [
            { name: 'Shipping Cost Surprise', value: '42%', share: 42 },
            { name: 'Comparison Window Shopping', value: '38%', share: 38 },
            { name: 'Payment Decline/Retry', value: '20%', share: 20 },
          ],
          recentLogs: [
            { id: 'ca-1', title: 'Flow Recovery #184', subtitle: '10% incentive code applied within 30 min', timestamp: '18m ago', amount: '+$140 recovered', status: 'success' }
          ]
        }
      },
      {
        id: 'repeat-rate',
        label: 'Repeat Customer Purchase Rate',
        value: '42.6%',
        rawValue: 42.6,
        changePercent: 3.4,
        isPositive: true,
        timeframeComparison: 'driving 51% of gross revenue',
        sparkline: [37.2, 38.1, 39.4, 40.2, 41.1, 41.9, 42.6],
        category: 'Retention',
        drilldownDetails: {
          summary: 'VIP loyalty tier members order every 46 days compared to 110 days for casual purchasers.',
          historicalData: [
            { label: '0-30 Days', value: 18 },
            { label: '31-60 Days', value: 24 },
            { label: '61-90 Days', value: 36 },
            { label: '90+ Days', value: 42.6 },
          ],
          breakdown: [
            { name: 'Loyalty Tier Gold', value: '71% repeat', share: 35 },
            { name: 'Email Newsletter', value: '44% repeat', share: 45 },
            { name: 'Organic Direct', value: '32% repeat', share: 20 },
          ],
          recentLogs: [
            { id: 'rr-1', title: 'Loyalty Tier Milestone', subtitle: 'Customer reached 5th purchase order', timestamp: '1 hr ago', amount: 'Gold Status', status: 'success' }
          ]
        }
      }
    ],
    primaryChartTitle: 'Store Revenue Dynamics & Hourly Order Velocity',
    primaryChartSubtitle: 'Gross revenue compared against marketing spend across active channel campaigns',
    primarySeriesName: 'Gross Revenue ($K)',
    secondarySeriesName: 'Ad Spend ($K)',
    chartValuePrefix: '$',
    chartValueSuffix: 'K',
    chartData: {
      '7d': [
        { date: 'Mon', primary: 64.2, secondary: 15.4 },
        { date: 'Tue', primary: 68.1, secondary: 16.2 },
        { date: 'Wed', primary: 71.5, secondary: 17.0 },
        { date: 'Thu', primary: 74.8, secondary: 17.8 },
        { date: 'Fri', primary: 88.4, secondary: 21.2 },
        { date: 'Sat', primary: 96.2, secondary: 23.4 },
        { date: 'Sun', primary: 98.7, secondary: 24.1 },
      ],
      '30d': [
        { date: 'Wk 1', primary: 112.5, secondary: 27.2 },
        { date: 'Wk 2', primary: 119.8, secondary: 29.1 },
        { date: 'Wk 3', primary: 124.6, secondary: 30.5 },
        { date: 'Wk 4', primary: 138.2, secondary: 33.4 },
      ],
      '90d': [
        { date: 'Jul', primary: 380.0, secondary: 92.5 },
        { date: 'Aug', primary: 425.4, secondary: 104.2 },
        { date: 'Sep', primary: 482.9, secondary: 117.2 },
      ],
      '1y': [
        { date: 'Q1', primary: 320.5, secondary: 78.0 },
        { date: 'Q2', primary: 395.2, secondary: 96.4 },
        { date: 'Q3', primary: 440.8, secondary: 108.1 },
        { date: 'Q4', primary: 482.9, secondary: 117.2 },
      ]
    },
    secondaryChartType: 'funnel',
    secondaryChartTitle: 'Store Checkout Conversion Funnel & Drop-off Analysis',
    funnelData: [
      { label: 'Storefront Visitors', value: 126400, formatted: '126,400', conversionRate: 100, dropoffRate: 0 },
      { label: 'Product Page Views', value: 74800, formatted: '74,800', conversionRate: 59.2, dropoffRate: 40.8 },
      { label: 'Add to Cart Sessions', value: 16400, formatted: '16,400', conversionRate: 21.9, dropoffRate: 78.1 },
      { label: 'Checkout Initiated', value: 8900, formatted: '8,900', conversionRate: 54.3, dropoffRate: 45.7 },
      { label: 'Orders Completed', value: 4820, formatted: '4,820', conversionRate: 54.2, dropoffRate: 45.8 },
    ],
    recentActivityTitle: 'High-Demand SKU Inventory Velocity & Stock Out Forecasting',
    tableHeaders: ['SKU & Product Name', 'Category', 'Daily Units Sold', 'Inventory Remaining', 'Stockout Forecast', 'Fulfillment Velocity'],
    tableRows: [
      {
        id: 'sku-1',
        col1: 'AT-0912 All-Weather Field Parka (Obsidian)',
        col2: 'Outerwear',
        col3: '42 units/day',
        col4: '184 in stock',
        col5: '4.3 days left',
        statusBadge: { text: 'Low Stock Alert', variant: 'danger' },
        timestamp: 'Real-time'
      },
      {
        id: 'sku-2',
        col1: 'MW-402 Merino Knit Crewneck (Charcoal)',
        col2: 'Apparel',
        col3: '38 units/day',
        col4: '490 in stock',
        col5: '12.8 days left',
        statusBadge: { text: 'Reorder Triggered', variant: 'warning' },
        timestamp: 'Real-time'
      },
      {
        id: 'sku-3',
        col1: 'LB-104 Full-Grain Leather Commuter Tote',
        col2: 'Accessories',
        col3: '19 units/day',
        col4: '612 in stock',
        col5: '32 days left',
        statusBadge: { text: 'Nominal Stock', variant: 'success' },
        timestamp: 'Real-time'
      },
      {
        id: 'sku-4',
        col1: 'CK-501 Heavyweight Slub Cotton Tee (White)',
        col2: 'Basics',
        col3: '86 units/day',
        col4: '1,240 in stock',
        col5: '14.4 days left',
        statusBadge: { text: 'Nominal Stock', variant: 'success' },
        timestamp: 'Real-time'
      },
      {
        id: 'sku-5',
        col1: 'WC-200 Waterproof Wax Conditioner Tin',
        col2: 'Garment Care',
        col3: '24 units/day',
        col4: '82 in stock',
        col5: '3.4 days left',
        statusBadge: { text: 'Low Stock Alert', variant: 'danger' },
        timestamp: 'Real-time'
      }
    ],
    recommendedFor: ['Shopify & WooCommerce merchants', 'Direct-to-consumer fashion brands', 'Catalog retailers', 'Digital product marketplaces']
  },

  'fintech': {
    id: 'fintech',
    name: 'FinTech & Global Capital Ledger',
    tagline: 'Multi-currency settlement pipeline, net take rates & real-time fraud mitigation',
    industry: 'Financial Infrastructure & Payments',
    badge: 'Capital Ledger',
    description: 'Constructed for payment gateways, neobanks, cross-border treasury desks, and merchant acquirers managing multi-currency liquidity and settlement timelines.',
    accentColor: '#3B82F6', // Blue
    accentBorder: 'border-blue-500/20',
    accentGradient: 'from-blue-500/20 to-transparent',
    metrics: [
      {
        id: 'volume',
        label: 'Gross Processing Volume (GPV)',
        value: '$4.89M',
        rawValue: 4890000,
        changePercent: 21.4,
        isPositive: true,
        timeframeComparison: 'trailing settlement cycle',
        sparkline: [3.8, 4.0, 4.25, 4.4, 4.62, 4.75, 4.89],
        category: 'Volume',
        drilldownDetails: {
          summary: 'Processed 148,920 transactions with 99.98% gateway approval rate and $0 settlement default.',
          historicalData: [
            { label: 'Q1', value: 3600000 },
            { label: 'Q2', value: 4100000 },
            { label: 'Q3', value: 4500000 },
            { label: 'Q4', value: 4890000 },
          ],
          breakdown: [
            { name: 'Credit Cards (Visa/MC)', value: '$2.84M', share: 58 },
            { name: 'Instant Bank SEPA/ACH', value: '$1.42M', share: 29 },
            { name: 'Digital Wallets & Local', value: '$630K', share: 13 },
          ],
          recentLogs: [
            { id: 'tx-fin-1', title: 'Global Merchant Settlement #8210', subtitle: 'USD -> EUR Clearing Batch', timestamp: '1m ago', amount: '$420,000.00', status: 'success' },
            { id: 'tx-fin-2', title: 'Stripe Direct Cross-Rail', subtitle: 'Instant ACH Disbursement', timestamp: '8m ago', amount: '$84,500.00', status: 'success' },
          ]
        }
      },
      {
        id: 'take-rate',
        label: 'Net Take Rate',
        value: '2.35%',
        rawValue: 2.35,
        changePercent: 0.12,
        isPositive: true,
        timeframeComparison: 'net revenue yield on processed volume',
        sparkline: [2.18, 2.21, 2.25, 2.28, 2.31, 2.33, 2.35],
        category: 'Margin',
        drilldownDetails: {
          summary: 'Net revenue capture yielded $114,915 from gross processing volume after interchange and network fee pass-through.',
          historicalData: [
            { label: 'Domestic Interchange', value: 1.8 },
            { label: 'Cross-Border + FX', value: 3.1 },
            { label: 'Blended Yield', value: 2.35 },
          ],
          breakdown: [
            { name: 'Core Processing (2.1%)', value: '$102.6K', share: 89 },
            { name: 'FX Conversion Margin', value: '$12.3K', share: 11 },
          ],
          recentLogs: [
            { id: 'tr-1', title: 'FX Spread Captured', subtitle: 'EUR/USD Cross border conversion', timestamp: '14m ago', amount: '+$340 yield', status: 'success' }
          ]
        }
      },
      {
        id: 'settlement-pipeline',
        label: 'Clearing & Settlement Pipeline',
        value: '$1.12M',
        rawValue: 1120000,
        changePercent: -4.8,
        isPositive: true,
        timeframeComparison: 'T+1 payout clearing schedule',
        sparkline: [1.34, 1.28, 1.22, 1.18, 1.15, 1.14, 1.12],
        category: 'Liquidity',
        drilldownDetails: {
          summary: 'Next 24-hour liquidity queue is fully pre-funded across domestic correspondent banks with zero collateral calls.',
          historicalData: [
            { label: 'T+0 (Immediate)', value: 420000 },
            { label: 'T+1 (Tomorrow)', value: 540000 },
            { label: 'T+2 (Rolling Reserve)', value: 160000 },
          ],
          breakdown: [
            { name: 'US Fedwire / ACH', value: '$680K', share: 61 },
            { name: 'Eurozone SEPA Instant', value: '$340K', share: 30 },
            { name: 'UK Faster Payments', value: '$100K', share: 9 },
          ],
          recentLogs: [
            { id: 'sp-1', title: 'Federal Reserve Wire FedNow', subtitle: 'Batch window 04:00 EST cleared', timestamp: '22m ago', amount: 'Nominal', status: 'success' }
          ]
        }
      },
      {
        id: 'fraud-rate',
        label: 'Fraud & Chargeback Rate',
        value: '0.012%',
        rawValue: 0.012,
        changePercent: -0.004,
        isPositive: true, // Lower fraud rate is positive
        timeframeComparison: 'far below Visa 0.90% dispute ceiling',
        sparkline: [0.024, 0.021, 0.018, 0.016, 0.014, 0.013, 0.012],
        category: 'Risk',
        drilldownDetails: {
          summary: 'Machine learning device fingerprinting and 3D-Secure 2.2 rules intercepted 38 fraudulent authorization attempts without false positives.',
          historicalData: [
            { label: 'Card-Not-Present', value: 0.014 },
            { label: 'Card-Present / POS', value: 0.002 },
            { label: 'Blended Risk', value: 0.012 },
          ],
          breakdown: [
            { name: '3DS Frictionless Approval', value: '94.2%', share: 94 },
            { name: 'Step-up Biometric Challenge', value: '5.8%', share: 6 },
          ],
          recentLogs: [
            { id: 'fr-1', title: 'Stolen PAN Intercepted', subtitle: 'Blocked by Velocity Filter #04', timestamp: '34m ago', amount: '$1,850 blocked', status: 'success' }
          ]
        }
      },
      {
        id: 'active-wallets',
        label: 'Active Merchant Accounts',
        value: '1,842',
        rawValue: 1842,
        changePercent: 8.6,
        isPositive: true,
        timeframeComparison: '+146 newly verified KYB merchants',
        sparkline: [1610, 1650, 1690, 1740, 1780, 1812, 1842],
        category: 'Merchants',
        drilldownDetails: {
          summary: 'KYB verification turnaround compressed to 8.4 minutes average via automated corporate registry lookups.',
          historicalData: [
            { label: 'North America', value: 1120 },
            { label: 'European Union', value: 512 },
            { label: 'Asia Pacific', value: 210 },
          ],
          breakdown: [
            { name: 'B2B Marketplace Sellers', value: '44%', share: 44 },
            { name: 'Direct Acquirers', value: '38%', share: 38 },
            { name: 'Subscription Providers', value: '18%', share: 18 },
          ],
          recentLogs: [
            { id: 'aw-1', title: 'KYB Approved: Atlas Logistics', subtitle: 'Automated Tier 3 Verification', timestamp: '45m ago', amount: '$500K limit', status: 'success' }
          ]
        }
      },
      {
        id: 'fx-margin',
        label: 'FX Arbitrage / Conversion Yield',
        value: '0.42%',
        rawValue: 0.42,
        changePercent: 0.08,
        isPositive: true,
        timeframeComparison: 'blended multi-currency spread',
        sparkline: [0.32, 0.34, 0.36, 0.38, 0.39, 0.41, 0.42],
        category: 'Margin',
        drilldownDetails: {
          summary: 'Dynamic smart order routing across 4 liquidity providers captured optimal interbank exchange pricing.',
          historicalData: [
            { label: 'EUR/USD', value: 0.38 },
            { label: 'GBP/USD', value: 0.44 },
            { label: 'USD/JPY', value: 0.48 },
          ],
          breakdown: [
            { name: 'G10 Major Pairs', value: '72%', share: 72 },
            { name: 'Exotic & Emerging Corridors', value: '28%', share: 28 },
          ],
          recentLogs: [
            { id: 'fx-1', title: 'EUR Treasury Swap Executed', subtitle: 'Interbank spread locked at 0.38%', timestamp: '1h ago', amount: '€1.2M volume', status: 'success' }
          ]
        }
      }
    ],
    primaryChartTitle: 'Settlement Volume Trajectory & Rolling Liquidity',
    primaryChartSubtitle: 'Real-time multi-rail money movement across Visa, Mastercard, ACH, and SEPA',
    primarySeriesName: 'Settled Volume ($M)',
    secondarySeriesName: 'Pending Batch ($M)',
    chartValuePrefix: '$',
    chartValueSuffix: 'M',
    chartData: {
      '7d': [
        { date: 'Mon', primary: 4.2, secondary: 0.9 },
        { date: 'Tue', primary: 4.4, secondary: 1.0 },
        { date: 'Wed', primary: 4.5, secondary: 1.1 },
        { date: 'Thu', primary: 4.6, secondary: 1.0 },
        { date: 'Fri', primary: 4.8, secondary: 1.2 },
        { date: 'Sat', primary: 4.7, secondary: 0.8 },
        { date: 'Sun', primary: 4.89, secondary: 1.12 },
      ],
      '30d': [
        { date: 'Wk 1', primary: 3.9, secondary: 0.85 },
        { date: 'Wk 2', primary: 4.2, secondary: 0.95 },
        { date: 'Wk 3', primary: 4.5, secondary: 1.05 },
        { date: 'Wk 4', primary: 4.89, secondary: 1.12 },
      ],
      '90d': [
        { date: 'Aug', primary: 3.6, secondary: 0.78 },
        { date: 'Sep', primary: 4.2, secondary: 0.92 },
        { date: 'Oct', primary: 4.89, secondary: 1.12 },
      ],
      '1y': [
        { date: 'Q1', primary: 2.8, secondary: 0.65 },
        { date: 'Q2', primary: 3.4, secondary: 0.80 },
        { date: 'Q3', primary: 4.1, secondary: 0.95 },
        { date: 'Q4', primary: 4.89, secondary: 1.12 },
      ]
    },
    secondaryChartType: 'bar',
    secondaryChartTitle: 'Cross-Border Settlement Rails by Currency Distribution ($M)',
    barData: [
      { label: 'USD (Fedwire)', current: 2.84, previous: 2.32 },
      { label: 'EUR (SEPA)', current: 1.12, previous: 0.94 },
      { label: 'GBP (FPS)', current: 0.54, previous: 0.42 },
      { label: 'JPY (Zengin)', current: 0.28, previous: 0.21 },
      { label: 'SGD (FAST)', current: 0.11, previous: 0.08 },
    ],
    recentActivityTitle: 'High-Value Settlement Audit Trail & Rail Disbursements',
    tableHeaders: ['Transaction ID', 'Merchant Beneficiary', 'Settlement Rail', 'Risk Score', 'Net Settlement', 'Audit Status'],
    tableRows: [
      {
        id: 'settle-1',
        col1: 'TXN-90281-US',
        col2: 'Stripe Treasury Acquirer Group',
        col3: 'Fedwire Priority',
        col4: 'Risk: 0.02 (Minimal)',
        col5: '$840,000.00',
        statusBadge: { text: 'Settled', variant: 'success' },
        timestamp: '8m ago'
      },
      {
        id: 'settle-2',
        col1: 'TXN-90280-EU',
        col2: 'Adyen Amsterdam Processing BV',
        col3: 'SEPA Instant Credit',
        col4: 'Risk: 0.04 (Nominal)',
        col5: '€320,500.00',
        statusBadge: { text: 'Settled', variant: 'success' },
        timestamp: '19m ago'
      },
      {
        id: 'settle-3',
        col1: 'TXN-90279-GB',
        col2: 'Revolut Corporate Treasury',
        col3: 'UK Faster Payments',
        col4: 'Risk: 0.03 (Nominal)',
        col5: '£185,200.00',
        statusBadge: { text: 'Settled', variant: 'success' },
        timestamp: '42m ago'
      },
      {
        id: 'settle-4',
        col1: 'TXN-90278-SG',
        col2: 'GrabPay Regional Settlement',
        col3: 'FAST Real-Time',
        col4: 'Risk: 0.09 (Review)',
        col5: '$94,000.00',
        statusBadge: { text: 'Processing', variant: 'warning' },
        timestamp: '1h ago'
      },
      {
        id: 'settle-5',
        col1: 'TXN-90277-US',
        col2: 'Vanguard Capital Partners',
        col3: 'ACH Commercial Same-Day',
        col4: 'Risk: 0.01 (Pristine)',
        col5: '$210,000.00',
        statusBadge: { text: 'Settled', variant: 'success' },
        timestamp: '2h ago'
      }
    ],
    recommendedFor: ['FinTech startups', 'Payment service providers', 'Neobanks & crypto on-ramps', 'Treasury & foreign exchange teams']
  },

  'devops': {
    id: 'devops',
    name: 'Cloud Infrastructure & DevOps Telemetry',
    tagline: 'Distributed service mesh latency percentiles, error budgets & node health',
    industry: 'Cloud Infrastructure & Platform Engineering',
    badge: 'Platform Telemetry',
    description: 'Tuned for site reliability engineers, DevOps leads, and infrastructure architects monitoring p99 latency regressions, Kubernetes pod saturation, error budgets, and cloud spend.',
    accentColor: '#06B6D4', // Cyan
    accentBorder: 'border-cyan-500/20',
    accentGradient: 'from-cyan-500/20 to-transparent',
    metrics: [
      {
        id: 'latency',
        label: 'Global p99 Response Latency',
        value: '48.2 ms',
        rawValue: 48.2,
        changePercent: -12.4,
        isPositive: true, // Lower latency is positive
        timeframeComparison: '6.8 ms below SLA threshold (55ms)',
        sparkline: [58, 55, 53, 51, 49.5, 48.8, 48.2],
        category: 'Performance',
        drilldownDetails: {
          summary: 'Edge CDN cache routing updates shaved 8.4ms off US-East and EU-West ingress times.',
          historicalData: [
            { label: 'p50 (Median)', value: 14.2 },
            { label: 'p90', value: 28.5 },
            { label: 'p95', value: 36.1 },
            { label: 'p99', value: 48.2 },
          ],
          breakdown: [
            { name: 'Ingress & Gateway', value: '4.2ms', share: 9 },
            { name: 'Application Compute', value: '26.8ms', share: 55 },
            { name: 'Database Query / Cache', value: '17.2ms', share: 36 },
          ],
          recentLogs: [
            { id: 'lat-1', title: 'Edge Routing Rebalanced', subtitle: 'Cloudflare Tier 1 Anycast healthy', timestamp: '5m ago', amount: 'Nominal', status: 'success' }
          ]
        }
      },
      {
        id: 'uptime',
        label: 'SLA Availability & Uptime',
        value: '99.992%',
        rawValue: 99.992,
        changePercent: 0.008,
        isPositive: true,
        timeframeComparison: 'Four 9s SLA maintained (0.008% downtime allowance)',
        sparkline: [99.98, 99.985, 99.988, 99.99, 99.991, 99.992, 99.992],
        category: 'Reliability',
        drilldownDetails: {
          summary: 'Zero unplanned customer outages recorded across 14 multi-region cluster nodes over the last 90 days.',
          historicalData: [
            { label: 'US-East (Virginia)', value: 99.998 },
            { label: 'EU-Central (Frankfurt)', value: 99.994 },
            { label: 'AP-East (Tokyo)', value: 99.988 },
          ],
          breakdown: [
            { name: 'Remaining Error Budget', value: '88.4%', share: 88 },
            { name: 'Planned Maintenance Used', value: '11.6%', share: 12 },
          ],
          recentLogs: [
            { id: 'sla-1', title: 'Canary Healthcheck Nominal', subtitle: 'All 48 synthetic probes passed', timestamp: '1m ago', amount: '100% OK', status: 'success' }
          ]
        }
      },
      {
        id: 'throughput',
        label: 'API Request Throughput',
        value: '18,420 /s',
        rawValue: 18420,
        changePercent: 15.6,
        isPositive: true,
        timeframeComparison: 'peak load capacity 45,000 req/s',
        sparkline: [14200, 15100, 16000, 16800, 17400, 17900, 18420],
        category: 'Throughput',
        drilldownDetails: {
          summary: 'Aggregate gateway ingress handling 1.59 Billion requests per day across HTTP/3 and gRPC streams.',
          historicalData: [
            { label: '00:00 - 06:00', value: 9800 },
            { label: '06:00 - 12:00', value: 16400 },
            { label: '12:00 - 18:00', value: 18420 },
            { label: '18:00 - 24:00', value: 14200 },
          ],
          breakdown: [
            { name: 'Public GraphQL API', value: '9.2k req/s', share: 50 },
            { name: 'Internal Service Mesh gRPC', value: '7.1k req/s', share: 38 },
            { name: 'Webhook Ingestion', value: '2.1k req/s', share: 12 },
          ],
          recentLogs: [
            { id: 'tp-1', title: 'HPA Autoscaled +6 Pods', subtitle: 'Autoscaler triggered on 65% CPU threshold', timestamp: '12m ago', amount: 'Cluster 03', status: 'nominal' }
          ]
        }
      },
      {
        id: 'error-rate',
        label: 'HTTP 5xx Error Rate',
        value: '0.008%',
        rawValue: 0.008,
        changePercent: -0.005,
        isPositive: true, // Lower is better
        timeframeComparison: '8 per 100,000 requests',
        sparkline: [0.018, 0.015, 0.013, 0.011, 0.009, 0.008, 0.008],
        category: 'Reliability',
        drilldownDetails: {
          summary: 'Automated circuit breaker tripped and isolated a degraded upstream third-party geocoding API in 400ms.',
          historicalData: [
            { label: 'HTTP 2xx (Success)', value: 99.4 },
            { label: 'HTTP 4xx (Client)', value: 0.584 },
            { label: 'HTTP 5xx (Server)', value: 0.008 },
          ],
          breakdown: [
            { name: '504 Gateway Timeout', value: '0.005%', share: 62 },
            { name: '500 Internal Error', value: '0.002%', share: 25 },
            { name: '503 Service Unavailable', value: '0.001%', share: 13 },
          ],
          recentLogs: [
            { id: 'er-1', title: 'Upstream Circuit Closed', subtitle: 'External payment webhook recovered', timestamp: '22m ago', amount: 'Resolved', status: 'success' }
          ]
        }
      },
      {
        id: 'cloud-burn',
        label: 'Monthly Cloud Infrastructure Burn',
        value: '$24,850',
        rawValue: 24850,
        changePercent: -8.4,
        isPositive: true, // Reduced spend is positive
        timeframeComparison: '$2,280 saved via spot instance pool',
        sparkline: [28400, 27600, 26900, 26100, 25500, 25100, 24850],
        category: 'Cost',
        drilldownDetails: {
          summary: 'Karpenter spot instance migration and idle pod reaper saved $2,280/mo with zero disruption.',
          historicalData: [
            { label: 'Compute (EKS/GKE)', value: 14200 },
            { label: 'Databases (Postgres/Redis)', value: 6400 },
            { label: 'Network Egress & Storage', value: 4250 },
          ],
          breakdown: [
            { name: 'Worker Compute Nodes', value: '$14.2K', share: 57 },
            { name: 'Managed RDS & Storage', value: '$6.4K', share: 26 },
            { name: 'Egress Traffic & NAT', value: '$4.25K', share: 17 },
          ],
          recentLogs: [
            { id: 'cb-1', title: 'Spot Instance Rebalance', subtitle: 'Replaced 4 on-demand nodes with Graviton3 spot', timestamp: '1h ago', amount: '-$120/mo', status: 'success' }
          ]
        }
      },
      {
        id: 'mttr',
        label: 'Incident MTTR (Mean Time to Repair)',
        value: '11.4 min',
        rawValue: 11.4,
        changePercent: -28.6,
        isPositive: true, // Lower MTTR is better
        timeframeComparison: 'automated rollback via ArgoCD',
        sparkline: [18.2, 16.5, 15.0, 14.1, 12.8, 11.9, 11.4],
        category: 'Operations',
        drilldownDetails: {
          summary: 'ArgoCD automated canary analysis detects latency anomalies and initiates zero-touch rollbacks within 3 minutes.',
          historicalData: [
            { label: 'Triage / PagerDuty', value: 2.1 },
            { label: 'Automated Root Cause', value: 3.8 },
            { label: 'Rollback & Stabilization', value: 5.5 },
          ],
          breakdown: [
            { name: 'Automated Rollback', value: '78%', share: 78 },
            { name: 'Hotfix Deployment', value: '22%', share: 22 },
          ],
          recentLogs: [
            { id: 'mttr-1', title: 'Canary Rollback Executed', subtitle: 'v2.14.1 rolled back due to +15ms latency drift', timestamp: '4h ago', amount: 'Clean', status: 'success' }
          ]
        }
      }
    ],
    primaryChartTitle: 'Service Mesh Latency Distribution & Concurrent Request Load',
    primaryChartSubtitle: 'p50, p90, and p99 millisecond curves correlated with traffic ingress',
    primarySeriesName: 'p99 Latency (ms)',
    secondarySeriesName: 'Traffic Load (k req/s)',
    chartValueSuffix: 'ms',
    chartData: {
      '7d': [
        { date: 'Mon', primary: 46.2, secondary: 16.4 },
        { date: 'Tue', primary: 47.5, secondary: 17.1 },
        { date: 'Wed', primary: 48.1, secondary: 17.8 },
        { date: 'Thu', primary: 49.2, secondary: 18.2 },
        { date: 'Fri', primary: 51.0, secondary: 19.4 },
        { date: 'Sat', primary: 47.8, secondary: 16.9 },
        { date: 'Sun', primary: 48.2, secondary: 18.42 },
      ],
      '30d': [
        { date: 'Wk 1', primary: 52.4, secondary: 15.8 },
        { date: 'Wk 2', primary: 50.1, secondary: 16.9 },
        { date: 'Wk 3', primary: 49.3, secondary: 17.6 },
        { date: 'Wk 4', primary: 48.2, secondary: 18.4 },
      ],
      '90d': [
        { date: 'M-1', primary: 56.8, secondary: 14.5 },
        { date: 'M-2', primary: 51.4, secondary: 16.2 },
        { date: 'M-3', primary: 48.2, secondary: 18.4 },
      ],
      '1y': [
        { date: 'Q1', primary: 64.0, secondary: 11.2 },
        { date: 'Q2', primary: 58.2, secondary: 13.8 },
        { date: 'Q3', primary: 52.1, secondary: 16.0 },
        { date: 'Q4', primary: 48.2, secondary: 18.4 },
      ]
    },
    secondaryChartType: 'bar',
    secondaryChartTitle: 'Microservice Cluster CPU / Memory Saturation (%)',
    barData: [
      { label: 'Auth & Session (Go)', current: 42, previous: 38 },
      { label: 'Billing Gateway (Node)', current: 64, previous: 59 },
      { label: 'Search & Embeddings (Rust)', current: 71, previous: 68 },
      { label: 'Catalog Engine (Python)', current: 48, previous: 44 },
      { label: 'Notification Dispatch (Elixir)', current: 31, previous: 28 },
    ],
    recentActivityTitle: 'Cluster Nodes Health & Canary Deployment Timeline',
    tableHeaders: ['Microservice Component', 'Active Pods', 'Memory Footprint', 'Error Rate', 'Health State', 'Last Deployed'],
    tableRows: [
      {
        id: 'svc-1',
        col1: 'auth-service.prod-us-east',
        col2: '18 / 18 Replicas',
        col3: '1.4 GB / 4 GB',
        col4: '0.001%',
        col5: 'Nominal',
        statusBadge: { text: 'Healthy', variant: 'success' },
        timestamp: '18m ago'
      },
      {
        id: 'svc-2',
        col1: 'billing-engine.prod-us-east',
        col2: '12 / 12 Replicas',
        col3: '2.8 GB / 4 GB',
        col4: '0.004%',
        col5: 'Nominal',
        statusBadge: { text: 'Healthy', variant: 'success' },
        timestamp: '42m ago'
      },
      {
        id: 'svc-3',
        col1: 'vector-indexer.prod-eu-west',
        col2: '8 / 8 Replicas',
        col3: '7.2 GB / 8 GB',
        col4: '0.012%',
        col5: 'High Memory',
        statusBadge: { text: 'Scale Triggered', variant: 'warning' },
        timestamp: '1h ago'
      },
      {
        id: 'svc-4',
        col1: 'edge-proxy-envoy.global',
        col2: '64 / 64 Replicas',
        col3: '512 MB / 1 GB',
        col4: '0.000%',
        col5: 'Nominal',
        statusBadge: { text: 'Healthy', variant: 'success' },
        timestamp: '3h ago'
      },
      {
        id: 'svc-5',
        col1: 'async-worker-queue.celery',
        col2: '24 / 24 Replicas',
        col3: '3.1 GB / 6 GB',
        col4: '0.002%',
        col5: 'Nominal',
        statusBadge: { text: 'Healthy', variant: 'success' },
        timestamp: '5h ago'
      }
    ],
    recommendedFor: ['Site Reliability Engineers', 'DevOps & platform infrastructure', 'Cloud architecture teams', 'Kubernetes cluster managers']
  },

  'healthcare': {
    id: 'healthcare',
    name: 'Healthcare & Clinical Practice Hub',
    tagline: 'Patient encounter throughput, provider schedule utilization & claims reimbursement',
    industry: 'Healthcare, Telemedicine & Clinical Operations',
    badge: 'Clinical Hub',
    description: 'Constructed for clinical operations directors, telemedicine groups, and multi-specialty practices managing patient appointments, room turnover, and insurance claims aging.',
    accentColor: '#0EA5E9', // Sky
    accentBorder: 'border-sky-500/20',
    accentGradient: 'from-sky-500/20 to-transparent',
    metrics: [
      {
        id: 'encounters',
        label: 'Active Patient Encounters',
        value: '2,410',
        rawValue: 2410,
        changePercent: 14.8,
        isPositive: true,
        timeframeComparison: 'clinical volume this cycle',
        sparkline: [1980, 2050, 2120, 2240, 2310, 2380, 2410],
        category: 'Volume',
        drilldownDetails: {
          summary: 'Telemedicine consultations represent 64% of total volume with same-day booking availability.',
          historicalData: [
            { label: 'Telehealth Video', value: 1542 },
            { label: 'In-Clinic Physical', value: 684 },
            { label: 'Urgent Care Queue', value: 184 },
          ],
          breakdown: [
            { name: 'Telemedicine Encounters', value: '1,542', share: 64 },
            { name: 'In-Clinic Consultations', value: '684', share: 28 },
            { name: 'Specialty Referrals', value: '184', share: 8 },
          ],
          recentLogs: [
            { id: 'hc-1', title: 'Dr. Evelyn Reed, MD', subtitle: 'Cardiology Tele-consult Concluded', timestamp: '6m ago', amount: '22m duration', status: 'success' },
            { id: 'hc-2', title: 'Clinic Room #3', subtitle: 'Patient Intake Check-in Completed', timestamp: '14m ago', amount: 'On Schedule', status: 'nominal' },
          ]
        }
      },
      {
        id: 'utilization',
        label: 'Provider Schedule Utilization',
        value: '88.4%',
        rawValue: 88.4,
        changePercent: 4.2,
        isPositive: true,
        timeframeComparison: 'target optimal range 85-90%',
        sparkline: [82.1, 83.5, 84.8, 86.0, 87.2, 87.9, 88.4],
        category: 'Staffing',
        drilldownDetails: {
          summary: 'Balanced physician workload prevents burnout while maintaining less than 15% unfilled schedule capacity.',
          historicalData: [
            { label: 'Primary Care', value: 91.2 },
            { label: 'Specialty Clinics', value: 87.4 },
            { label: 'Mental Health / Therapy', value: 92.1 },
          ],
          breakdown: [
            { name: 'Direct Patient Time', value: '74%', share: 74 },
            { name: 'EHR Charting & Notes', value: '18%', share: 18 },
            { name: 'Peer Consults', value: '8%', share: 8 },
          ],
          recentLogs: [
            { id: 'ut-1', title: 'Schedule Optimization Run', subtitle: 'Reduced gaps between virtual appointments', timestamp: '30m ago', amount: '+4.2% lift', status: 'success' }
          ]
        }
      },
      {
        id: 'fill-rate',
        label: 'Appointment Fill Rate',
        value: '94.2%',
        rawValue: 94.2,
        changePercent: 3.1,
        isPositive: true,
        timeframeComparison: 'no-show rate suppressed to 3.8%',
        sparkline: [89.0, 90.2, 91.5, 92.4, 93.1, 93.8, 94.2],
        category: 'Efficiency',
        drilldownDetails: {
          summary: 'Two-way SMS confirmations and automatic waitlist backfill recovered 86 canceled time slots.',
          historicalData: [
            { label: 'Initial Bookings', value: 98.4 },
            { label: 'Cancellations Backfilled', value: 89.2 },
            { label: 'Net Fill Rate', value: 94.2 },
          ],
          breakdown: [
            { name: 'Completed Consultations', value: '94.2%', share: 94 },
            { name: 'Late Cancellations', value: '3.8%', share: 4 },
            { name: 'Unfilled Vacancies', value: '2.0%', share: 2 },
          ],
          recentLogs: [
            { id: 'fr-hc-1', title: 'Waitlist Instant Fill', subtitle: 'Slot filled via automated SMS within 4 min', timestamp: '18m ago', amount: 'Filled', status: 'success' }
          ]
        }
      },
      {
        id: 'wait-time',
        label: 'Average Patient Wait Time',
        value: '6.4 min',
        rawValue: 6.4,
        changePercent: -18.2,
        isPositive: true, // Lower wait time is positive
        timeframeComparison: 'national average is 18.2 minutes',
        sparkline: [9.8, 9.1, 8.4, 7.8, 7.2, 6.8, 6.4],
        category: 'Experience',
        drilldownDetails: {
          summary: 'Digital intake pre-checkin completed via smartphone prior to visit cut clinic lobby waiting by 65%.',
          historicalData: [
            { label: 'Telehealth Virtual Waiting', value: 2.1 },
            { label: 'In-Person Lobby Checkin', value: 8.4 },
            { label: 'Exam Room Waiting', value: 4.8 },
          ],
          breakdown: [
            { name: 'Under 5 Minutes', value: '62%', share: 62 },
            { name: '5-10 Minutes', value: '31%', share: 31 },
            { name: 'Over 10 Minutes', value: '7%', share: 7 },
          ],
          recentLogs: [
            { id: 'wt-1', title: 'Fast-Track Checkin Completed', subtitle: 'Insurance card scanned prior to arrival', timestamp: '8m ago', amount: '1.2m wait', status: 'success' }
          ]
        }
      },
      {
        id: 'clean-claims',
        label: 'First-Pass Clean Claims Rate',
        value: '96.8%',
        rawValue: 96.8,
        changePercent: 2.4,
        isPositive: true,
        timeframeComparison: 'medical billing revenue cycle metric',
        sparkline: [92.4, 93.1, 94.0, 94.8, 95.5, 96.2, 96.8],
        category: 'Billing',
        drilldownDetails: {
          summary: 'Automated ICD-10 and CPT code validation prevents claim denials from commercial payers before electronic submission.',
          historicalData: [
            { label: 'Medicare / Medicaid', value: 98.2 },
            { label: 'BlueCross / United', value: 96.4 },
            { label: 'Aetna / Cigna', value: 95.8 },
          ],
          breakdown: [
            { name: 'Approved on First Pass', value: '$412K', share: 97 },
            { name: 'Payer Request for Info', value: '$14K', share: 3 },
          ],
          recentLogs: [
            { id: 'cc-1', title: 'Electronic Remittance Advice', subtitle: 'ERA batch received from payer', timestamp: '1h ago', amount: '$38,400 paid', status: 'success' }
          ]
        }
      },
      {
        id: 'patient-nps',
        label: 'Patient Experience Net Promoter',
        value: '+84 NPS',
        rawValue: 84,
        changePercent: 6.0,
        isPositive: true,
        timeframeComparison: 'survey response rate 41%',
        sparkline: [74, 76, 78, 80, 81, 83, 84],
        category: 'Quality',
        drilldownDetails: {
          summary: '84% of post-visit surveyed patients gave top rating of 9 or 10, citing ease of telehealth and compassionate clinicians.',
          historicalData: [
            { label: 'Promoters (9-10)', value: 87 },
            { label: 'Passives (7-8)', value: 10 },
            { label: 'Detractors (1-6)', value: 3 },
          ],
          breakdown: [
            { name: 'Clinician Empathy & Clarity', value: '4.9 / 5.0', share: 50 },
            { name: 'App Ease of Use', value: '4.8 / 5.0', share: 30 },
            { name: 'Prescription Speed', value: '4.7 / 5.0', share: 20 },
          ],
          recentLogs: [
            { id: 'nps-1', title: '5-Star Patient Review', subtitle: '"Doctor listened attentively and prescription sent immediately."', timestamp: '12m ago', amount: 'NPS: 10', status: 'success' }
          ]
        }
      }
    ],
    primaryChartTitle: 'Patient Visit Trajectory & Telemedicine vs In-Clinic Distribution',
    primaryChartSubtitle: 'Daily completed appointments segmented by remote vs in-person clinical consultation',
    primarySeriesName: 'Telemedicine Visits',
    secondarySeriesName: 'In-Clinic Visits',
    chartValueSuffix: ' visits',
    chartData: {
      '7d': [
        { date: 'Mon', primary: 210, secondary: 94 },
        { date: 'Tue', primary: 224, secondary: 98 },
        { date: 'Wed', primary: 238, secondary: 102 },
        { date: 'Thu', primary: 245, secondary: 106 },
        { date: 'Fri', primary: 260, secondary: 110 },
        { date: 'Sat', primary: 180, secondary: 72 },
        { date: 'Sun', primary: 185, secondary: 78 },
      ],
      '30d': [
        { date: 'Wk 1', primary: 1350, secondary: 580 },
        { date: 'Wk 2', primary: 1420, secondary: 610 },
        { date: 'Wk 3', primary: 1490, secondary: 640 },
        { date: 'Wk 4', primary: 1542, secondary: 684 },
      ],
      '90d': [
        { date: 'Month 1', primary: 3900, secondary: 1720 },
        { date: 'Month 2', primary: 4200, secondary: 1840 },
        { date: 'Month 3', primary: 4620, secondary: 2050 },
      ],
      '1y': [
        { date: 'Q1', primary: 11200, secondary: 5100 },
        { date: 'Q2', primary: 12400, secondary: 5600 },
        { date: 'Q3', primary: 13800, secondary: 6100 },
        { date: 'Q4', primary: 15400, secondary: 6800 },
      ]
    },
    secondaryChartType: 'bar',
    secondaryChartTitle: 'Clinical Department Provider Utilization & Capacity (%)',
    barData: [
      { label: 'Family Medicine', current: 92, previous: 88 },
      { label: 'Telehealth Urgent Care', current: 94, previous: 89 },
      { label: 'Cardiology', current: 86, previous: 82 },
      { label: 'Pediatrics', current: 84, previous: 80 },
      { label: 'Dermatology', current: 89, previous: 85 },
    ],
    recentActivityTitle: 'Upcoming Clinical Schedule & Provider Encounter Queue',
    tableHeaders: ['Patient Reference', 'Assigned Clinician', 'Appointment Modality', 'Chief Concern', 'Room / Session', 'Schedule Status'],
    tableRows: [
      {
        id: 'pat-1',
        col1: 'Encounter #84920 (Jane D.)',
        col2: 'Dr. Evelyn Reed, MD',
        col3: 'Telehealth Video HD',
        col4: 'Cardiology Follow-up',
        col5: 'Virtual Room A',
        statusBadge: { text: 'In Progress', variant: 'accent' },
        timestamp: 'Now'
      },
      {
        id: 'pat-2',
        col1: 'Encounter #84921 (Robert M.)',
        col2: 'Dr. James Lin, DO',
        col3: 'In-Clinic Physical',
        col4: 'Annual Comprehensive Exam',
        col5: 'Exam Room 3',
        statusBadge: { text: 'Checked In', variant: 'success' },
        timestamp: '4m ago'
      },
      {
        id: 'pat-3',
        col1: 'Encounter #84922 (Sophia T.)',
        col2: 'Dr. Sarah Al-Mansoor, MD',
        col3: 'Telehealth Video HD',
        col4: 'Pediatric Asthma Check',
        col5: 'Virtual Room B',
        statusBadge: { text: 'Waiting Room', variant: 'warning' },
        timestamp: '8m ago'
      },
      {
        id: 'pat-4',
        col1: 'Encounter #84923 (David W.)',
        col2: 'Dr. Marcus Vance, MD',
        col3: 'In-Clinic Physical',
        col4: 'Dermatology Biopsy Review',
        col5: 'Exam Room 1',
        statusBadge: { text: 'Completed', variant: 'neutral' },
        timestamp: '22m ago'
      },
      {
        id: 'pat-5',
        col1: 'Encounter #84924 (Elena K.)',
        col2: 'Dr. Evelyn Reed, MD',
        col3: 'Telehealth Video HD',
        col4: 'Hypertension Medication Refill',
        col5: 'Virtual Room A',
        statusBadge: { text: 'Scheduled', variant: 'neutral' },
        timestamp: 'In 15m'
      }
    ],
    recommendedFor: ['Telehealth platforms', 'Outpatient clinics & urgent care', 'Medical practice management', 'Clinical healthcare operations']
  },

  'ai-ops': {
    id: 'ai-ops',
    name: 'AI Agent & LLMOps Engine',
    tagline: 'Token economy burn, prompt caching efficiency & time-to-first-token inference telemetry',
    industry: 'Generative AI & Autonomous Agent Platforms',
    badge: 'LLMOps & Agent Engine',
    description: 'Tailored for AI founders, machine learning engineers, and LLMOps teams tracking token budgets, model routing costs, inference latency curves, and agent task completion rates.',
    accentColor: '#A855F7', // Purple
    accentBorder: 'border-purple-500/20',
    accentGradient: 'from-purple-500/20 to-transparent',
    metrics: [
      {
        id: 'tokens',
        label: 'Total Processed Tokens',
        value: '142.8M',
        rawValue: 142800000,
        changePercent: 28.4,
        isPositive: true,
        timeframeComparison: 'daily token ingestion volume',
        sparkline: [98, 105, 114, 122, 131, 138, 142.8],
        category: 'Compute',
        drilldownDetails: {
          summary: '142.8M tokens processed across 84,200 agent workflows with 64.2% prompt caching reuse.',
          historicalData: [
            { label: 'Prompt Tokens (Input)', value: 104000000 },
            { label: 'Completion Tokens (Output)', value: 38800000 },
          ],
          breakdown: [
            { name: 'Gemini 2.5 Flash', value: '78.4M tokens', share: 55 },
            { name: 'Claude 3.7 Sonnet', value: '42.1M tokens', share: 29 },
            { name: 'GPT-4o Mini', value: '22.3M tokens', share: 16 },
          ],
          recentLogs: [
            { id: 'tok-1', title: 'Agent Run #48102 - Deep Research', subtitle: '64k token context compressed via RAG', timestamp: '2m ago', amount: '84k tokens', status: 'success' },
            { id: 'tok-2', title: 'Code Synthesis Agent #92', subtitle: 'Zero-shot function calling executed', timestamp: '5m ago', amount: '12k tokens', status: 'success' },
          ]
        }
      },
      {
        id: 'cost-per-1k',
        label: 'Blended Cost per 1k Inferences',
        value: '$0.0042',
        rawValue: 0.0042,
        changePercent: -34.8,
        isPositive: true, // Lower cost is positive
        timeframeComparison: 'reduced via dynamic model cascade router',
        sparkline: [0.0078, 0.0069, 0.0061, 0.0054, 0.0048, 0.0044, 0.0042],
        category: 'Efficiency',
        drilldownDetails: {
          summary: 'Model cascading router directs 72% of lightweight queries to Flash models, slashing blended query costs by 34.8%.',
          historicalData: [
            { label: 'Unoptimized Direct Routing', value: 0.0094 },
            { label: 'With Semantic Cache', value: 0.0062 },
            { label: 'With Dynamic Cascade', value: 0.0042 },
          ],
          breakdown: [
            { name: 'Lightweight Classifier Tier', value: '$0.0008 / 1k', share: 60 },
            { name: 'Complex Reasoning Tier', value: '$0.0084 / 1k', share: 40 },
          ],
          recentLogs: [
            { id: 'cst-1', title: 'Cascade Router Decision', subtitle: 'Downgraded 1.2k simple queries to Flash', timestamp: '11m ago', amount: '-$14.20 saved', status: 'success' }
          ]
        }
      },
      {
        id: 'ttft',
        label: 'Time to First Token (TTFT)',
        value: '185 ms',
        rawValue: 185,
        changePercent: -22.4,
        isPositive: true, // Lower TTFT is positive
        timeframeComparison: 'streaming latency to client viewport',
        sparkline: [260, 240, 225, 210, 198, 190, 185],
        category: 'Latency',
        drilldownDetails: {
          summary: 'Speculative decoding and global edge proxying brought TTFT under 200ms across all geographic regions.',
          historicalData: [
            { label: 'US-East', value: 162 },
            { label: 'EU-West', value: 184 },
            { label: 'Asia-South', value: 215 },
          ],
          breakdown: [
            { name: 'TTFT (Time to First Token)', value: '185ms', share: 25 },
            { name: 'Token Generation Speed', value: '88 tokens/sec', share: 75 },
          ],
          recentLogs: [
            { id: 'lat-llm-1', title: 'Streaming Connection Initiated', subtitle: 'Server-Sent Events active', timestamp: '1m ago', amount: '168ms TTFT', status: 'success' }
          ]
        }
      },
      {
        id: 'cache-rate',
        label: 'Prompt Cache Hit Rate',
        value: '64.2%',
        rawValue: 64.2,
        changePercent: 12.6,
        isPositive: true,
        timeframeComparison: 'prefix cache reuse rate',
        sparkline: [48, 51, 54, 57, 60, 62.5, 64.2],
        category: 'Cache',
        drilldownDetails: {
          summary: 'System instructions, knowledge base context, and schema prompts reused without paying full input pricing.',
          historicalData: [
            { label: 'System Persona Cache', value: 92.4 },
            { label: 'Domain Vector Embeddings', value: 68.1 },
            { label: 'Dynamic User Context', value: 32.1 },
          ],
          breakdown: [
            { name: 'Exact Prefix Match', value: '44%', share: 44 },
            { name: 'Semantic Embeddings Match', value: '20.2%', share: 20 },
            { name: 'Uncached Fresh Prompts', value: '35.8%', share: 36 },
          ],
          recentLogs: [
            { id: 'ch-llm-1', title: '128k Prefix Cache Read', subtitle: 'Zero input token fee incurred', timestamp: '4m ago', amount: '100% Hit', status: 'success' }
          ]
        }
      },
      {
        id: 'agent-sessions',
        label: 'Active Autonomous Agent Workflows',
        value: '8,420',
        rawValue: 8420,
        changePercent: 32.1,
        isPositive: true,
        timeframeComparison: '94.2% multi-step goal completion',
        sparkline: [6100, 6500, 6950, 7400, 7800, 8150, 8420],
        category: 'Agents',
        drilldownDetails: {
          summary: 'Autonomous workers executing complex multi-step pipelines (web search, code sandbox, database update).',
          historicalData: [
            { label: 'Single-Turn Direct Answers', value: 3400 },
            { label: 'Multi-Step Tool Workflows', value: 3820 },
            { label: 'Long-Running Research Agents', value: 1200 },
          ],
          breakdown: [
            { name: 'Data Extraction & Enrichment', value: '41%', share: 41 },
            { name: 'Code Generation & Review', value: '36%', share: 36 },
            { name: 'Customer Support Autonomous', value: '23%', share: 23 },
          ],
          recentLogs: [
            { id: 'ag-1', title: 'Agent #8401 Completed Goal', subtitle: '4 browser tool calls + CSV export', timestamp: '3m ago', amount: 'Completed', status: 'success' }
          ]
        }
      },
      {
        id: 'guardrail-flags',
        label: 'Safety Guardrail & Hallucination Flag',
        value: '0.18%',
        rawValue: 0.18,
        changePercent: -0.06,
        isPositive: true, // Lower flag rate is positive
        timeframeComparison: 'automated self-consistency validation',
        sparkline: [0.32, 0.28, 0.25, 0.23, 0.21, 0.19, 0.18],
        category: 'Quality',
        drilldownDetails: {
          summary: 'Faithfulness checks with grounded citation verification filter out unbacked claims before rendering.',
          historicalData: [
            { label: 'Source Grounding Score', value: 98.8 },
            { label: 'Toxicity / PII Intercepts', value: 0.08 },
            { label: 'Factual Inconsistency', value: 0.10 },
          ],
          breakdown: [
            { name: 'Unverified Numerical Claim', value: '62%', share: 62 },
            { name: 'PII Auto-Masked', value: '38%', share: 38 },
          ],
          recentLogs: [
            { id: 'gd-1', title: 'Self-Correction Triggered', subtitle: 'Re-prompted with citation constraint', timestamp: '15m ago', amount: 'Corrected', status: 'success' }
          ]
        }
      }
    ],
    primaryChartTitle: 'Inference Throughput & Token Economy Burn Curves',
    primaryChartSubtitle: 'Millions of tokens processed hourly correlated with blended model API spend',
    primarySeriesName: 'Tokens Processed (M)',
    secondarySeriesName: 'API Cost ($)',
    chartValueSuffix: 'M',
    chartData: {
      '7d': [
        { date: 'Mon', primary: 112.4, secondary: 472 },
        { date: 'Tue', primary: 118.6, secondary: 498 },
        { date: 'Wed', primary: 124.2, secondary: 521 },
        { date: 'Thu', primary: 131.5, secondary: 552 },
        { date: 'Fri', primary: 138.4, secondary: 581 },
        { date: 'Sat', primary: 129.0, secondary: 541 },
        { date: 'Sun', primary: 142.8, secondary: 600 },
      ],
      '30d': [
        { date: 'Wk 1', primary: 104.2, secondary: 438 },
        { date: 'Wk 2', primary: 116.8, secondary: 490 },
        { date: 'Wk 3', primary: 128.4, secondary: 539 },
        { date: 'Wk 4', primary: 142.8, secondary: 600 },
      ],
      '90d': [
        { date: 'Month 1', primary: 88.0, secondary: 370 },
        { date: 'Month 2', primary: 112.4, secondary: 472 },
        { date: 'Month 3', primary: 142.8, secondary: 600 },
      ],
      '1y': [
        { date: 'Q1', primary: 48.0, secondary: 202 },
        { date: 'Q2', primary: 74.5, secondary: 313 },
        { date: 'Q3', primary: 108.2, secondary: 454 },
        { date: 'Q4', primary: 142.8, secondary: 600 },
      ]
    },
    secondaryChartType: 'bar',
    secondaryChartTitle: 'Model Routing Split & Token Consumption by Engine',
    barData: [
      { label: 'Gemini 2.5 Flash', current: 78.4, previous: 58.2 },
      { label: 'Claude 3.7 Sonnet', current: 42.1, previous: 34.0 },
      { label: 'GPT-4o Mini', current: 22.3, previous: 18.5 },
      { label: 'DeepSeek R1 Distill', current: 14.8, previous: 9.2 },
      { label: 'Llama 3.3 70B Local', current: 8.6, previous: 6.4 },
    ],
    recentActivityTitle: 'Autonomous Agent Trace Log & Function Call Execution',
    tableHeaders: ['Workflow Execution ID', 'Agent Archetype', 'Model Engine', 'Context Tokens', 'Execution TTFT', 'Validation Status'],
    tableRows: [
      {
        id: 'trace-1',
        col1: 'EXEC-98214 (Research)',
        col2: 'Multi-Hop Synthesizer',
        col3: 'Gemini 2.5 Flash',
        col4: '64.2k tokens',
        col5: '162ms TTFT',
        statusBadge: { text: 'Verified Output', variant: 'success' },
        timestamp: '1m ago'
      },
      {
        id: 'trace-2',
        col1: 'EXEC-98213 (Coder)',
        col2: 'Refactoring Sandbox',
        col3: 'Claude 3.7 Sonnet',
        col4: '38.4k tokens',
        col5: '194ms TTFT',
        statusBadge: { text: 'Verified Output', variant: 'success' },
        timestamp: '3m ago'
      },
      {
        id: 'trace-3',
        col1: 'EXEC-98212 (Triage)',
        col2: 'Intent Classifier',
        col3: 'Flash 8B Edge',
        col4: '1.2k tokens',
        col5: '98ms TTFT',
        statusBadge: { text: 'Cached Result', variant: 'accent' },
        timestamp: '6m ago'
      },
      {
        id: 'trace-4',
        col1: 'EXEC-98211 (Auditor)',
        col2: 'Self-Consistency Checker',
        col3: 'DeepSeek R1 Distill',
        col4: '18.9k tokens',
        col5: '240ms TTFT',
        statusBadge: { text: 'Verified Output', variant: 'success' },
        timestamp: '12m ago'
      },
      {
        id: 'trace-5',
        col1: 'EXEC-98210 (Extractor)',
        col2: 'PDF Table Parser',
        col3: 'GPT-4o Mini',
        col4: '28.1k tokens',
        col5: '180ms TTFT',
        statusBadge: { text: 'Verified Output', variant: 'success' },
        timestamp: '18m ago'
      }
    ],
    recommendedFor: ['AI-native applications', 'LLM product engineers', 'Autonomous agent developers', 'AI infrastructure & ML teams']
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'business_type',
    title: 'What is the primary nature of your business operations?',
    subtitle: 'This determines your core visual hierarchy and data density model.',
    options: [
      {
        label: 'Subscription Software / Cloud Services',
        desc: 'Recurring contracts, customer lifetime value, churn rates, seat expansion.',
        recommendedTemplate: 'b2b-saas'
      },
      {
        label: 'E-Commerce / Physical & Digital Goods',
        desc: 'Product catalog, shopping cart conversions, gross merchandise volume, shipping.',
        recommendedTemplate: 'ecommerce'
      },
      {
        label: 'Payments, Banking or Financial Ledger',
        desc: 'Transaction volumes, settlement pipelines, fraud interception, take rates.',
        recommendedTemplate: 'fintech'
      },
      {
        label: 'Engineering Systems & Cloud Telemetry',
        desc: 'Server latency percentiles, error budgets, CPU clusters, cloud burn rates.',
        recommendedTemplate: 'devops'
      },
      {
        label: 'Healthcare, Telehealth or Clinical Care',
        desc: 'Patient encounters, appointment fill rates, clinician schedules, medical billing.',
        recommendedTemplate: 'healthcare'
      },
      {
        label: 'AI Agents, LLM Apps or Model Infrastructure',
        desc: 'Token economy, prompt caching rates, inference speed, model cascade routing.',
        recommendedTemplate: 'ai-ops'
      }
    ]
  },
  {
    id: 'primary_metric',
    title: 'What is your single most critical executive KPI right now?',
    subtitle: 'We will highlight this metric on your primary hero analytics chart.',
    options: [
      {
        label: 'ARR Velocity & Net Revenue Retention',
        desc: 'Focus on expanding existing accounts and minimizing customer churn.',
        recommendedTemplate: 'b2b-saas'
      },
      {
        label: 'Blended Ad ROAS & Cart Conversions',
        desc: 'Focus on marketing spend efficiency and optimizing checkout flow drop-offs.',
        recommendedTemplate: 'ecommerce'
      },
      {
        label: 'Processing Volume & Settlement Speed',
        desc: 'Focus on multi-currency flow, liquidity reserves, and chargeback prevention.',
        recommendedTemplate: 'fintech'
      },
      {
        label: 'Global p99 Latency & SLA Availability',
        desc: 'Focus on service uptime, zero-downtime deployments, and incident MTTR.',
        recommendedTemplate: 'devops'
      },
      {
        label: 'Schedule Utilization & Fast Patient Care',
        desc: 'Focus on reducing patient wait times and maximizing clinical billings.',
        recommendedTemplate: 'healthcare'
      },
      {
        label: 'Token Cost Optimization & TTFT Latency',
        desc: 'Focus on prompt caching efficiency and model routing cost-per-query.',
        recommendedTemplate: 'ai-ops'
      }
    ]
  },
  {
    id: 'user_persona',
    title: 'Who is the primary audience viewing this dashboard daily?',
    subtitle: 'Ensures proper balance between strategic executive summaries and technical operations.',
    options: [
      {
        label: 'Founders, CFOs & Board Members',
        desc: 'Clean financial velocity, capital recovery benchmarks, macro retention.',
        recommendedTemplate: 'b2b-saas'
      },
      {
        label: 'Growth Marketers & Merchandisers',
        desc: 'Funnel step analysis, SKU velocity alerts, ad return multipliers.',
        recommendedTemplate: 'ecommerce'
      },
      {
        label: 'Risk Officers, Treasurers & Compliance',
        desc: 'Multi-rail ledger audits, fraud verification status, liquidity forecasts.',
        recommendedTemplate: 'fintech'
      },
      {
        label: 'SREs, Platform Engineers & DevOps',
        desc: 'Live error rates, cluster pod saturation, canary rollback logs.',
        recommendedTemplate: 'devops'
      },
      {
        label: 'Clinical Directors & Practice Managers',
        desc: 'Provider scheduling heatmaps, clinical queues, claim clearance.',
        recommendedTemplate: 'healthcare'
      },
      {
        label: 'AI Engineers & LLMOps Architects',
        desc: 'Trace execution logs, token budgets, hallucination self-consistency checks.',
        recommendedTemplate: 'ai-ops'
      }
    ]
  }
];
