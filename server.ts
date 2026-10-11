import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Enable JSON and URL-encoded bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

export interface IngestedEvent {
  id: string;
  source: 'shopify' | 'woocommerce' | 'stripe' | 'custom' | 'csv_import';
  eventType: 'order_created' | 'order_paid' | 'cart_abandoned' | 'checkout_started' | 'customer_created' | 'refund_issued' | 'inventory_updated';
  orderId?: string;
  amount: number;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  items?: { name: string; sku: string; quantity: number; price: number }[];
  status: 'completed' | 'processing' | 'refunded' | 'abandoned';
  timestamp: string;
  rawPayload?: any;
}

export interface StoreConfig {
  platform: 'shopify' | 'woocommerce' | 'stripe' | 'custom';
  storeName: string;
  storeUrl: string;
  apiKey?: string;
  webhookSecret?: string;
  isConnected: boolean;
  connectedAt?: string;
  lastPingAt?: string;
  totalEventsReceived: number;
}

// In-memory persistent data store
let storeConfig: StoreConfig = {
  platform: 'shopify',
  storeName: 'My Connected Store',
  storeUrl: 'https://mystore.myshopify.com',
  isConnected: false,
  totalEventsReceived: 0,
};

let ingestedEvents: IngestedEvent[] = [
  {
    id: 'evt-init-1',
    source: 'shopify',
    eventType: 'order_paid',
    orderId: '#1092',
    amount: 142.50,
    currency: 'USD',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    items: [
      { name: 'All-Weather Field Parka', sku: 'AT-0912', quantity: 1, price: 142.50 }
    ],
    status: 'completed',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt-init-2',
    source: 'shopify',
    eventType: 'order_paid',
    orderId: '#1091',
    amount: 88.00,
    currency: 'USD',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@example.com',
    items: [
      { name: 'Merino Knit Crewneck', sku: 'MW-402', quantity: 1, price: 88.00 }
    ],
    status: 'completed',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt-init-3',
    source: 'shopify',
    eventType: 'cart_abandoned',
    amount: 210.00,
    currency: 'USD',
    customerName: 'Alex Thorne',
    customerEmail: 'a.thorne@example.com',
    items: [
      { name: 'Full-Grain Leather Tote', sku: 'LB-104', quantity: 1, price: 210.00 }
    ],
    status: 'abandoned',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  }
];

// Helper to calculate real-world metrics from events
function computeAggregatedMetrics() {
  const paidOrders = ingestedEvents.filter(e => e.eventType === 'order_paid' || e.eventType === 'order_created');
  const refunds = ingestedEvents.filter(e => e.eventType === 'refund_issued');
  const carts = ingestedEvents.filter(e => e.eventType === 'cart_abandoned');
  const checkouts = ingestedEvents.filter(e => e.eventType === 'checkout_started' || e.eventType === 'order_paid');

  const grossRevenue = paidOrders.reduce((sum, e) => sum + (e.amount || 0), 0);
  const refundAmount = refunds.reduce((sum, e) => sum + (e.amount || 0), 0);
  const netRevenue = Math.max(0, grossRevenue - refundAmount);

  const orderCount = paidOrders.length;
  const aov = orderCount > 0 ? (grossRevenue / orderCount) : 0;

  // SKU velocity aggregation
  const skuMap: Record<string, { name: string; sku: string; unitsSold: number; revenue: number }> = {};
  paidOrders.forEach(ord => {
    (ord.items || []).forEach(it => {
      const key = it.sku || it.name;
      if (!skuMap[key]) {
        skuMap[key] = { name: it.name, sku: it.sku, unitsSold: 0, revenue: 0 };
      }
      skuMap[key].unitsSold += it.quantity || 1;
      skuMap[key].revenue += (it.price || 0) * (it.quantity || 1);
    });
  });

  const topSkus = Object.values(skuMap)
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5);

  // Time-series breakdown (7 days)
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyBuckets: { date: string; primary: number; secondary: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const targetDate = new Date(now - i * dayMs);
    const dayLabel = days[targetDate.getDay()];
    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
    const endOfDay = startOfDay + dayMs;

    const dayOrders = paidOrders.filter(e => {
      const t = new Date(e.timestamp).getTime();
      return t >= startOfDay && t < endOfDay;
    });

    const dayRev = dayOrders.reduce((s, e) => s + e.amount, 0);
    // Ad spend estimated at 24% for realistic blended ROAS modeling
    const estAdSpend = Math.round(dayRev * 0.24);

    dailyBuckets.push({
      date: dayLabel,
      primary: Math.round(dayRev * 100) / 100,
      secondary: estAdSpend,
    });
  }

  return {
    netRevenue,
    grossRevenue,
    orderCount,
    aov,
    abandonedCartCount: carts.length,
    totalEvents: ingestedEvents.length,
    dailyBuckets,
    topSkus,
  };
}

// API Routes

// 1. Get Store Configuration
app.get('/api/ecommerce/store-config', (_req: Request, res: Response) => {
  res.json({
    config: storeConfig,
    metrics: computeAggregatedMetrics(),
  });
});

// 2. Update Store Configuration (Connect Store)
app.post('/api/ecommerce/store-config', (req: Request, res: Response) => {
  const { platform, storeName, storeUrl, apiKey, webhookSecret } = req.body;
  storeConfig = {
    ...storeConfig,
    platform: platform || storeConfig.platform,
    storeName: storeName || storeConfig.storeName,
    storeUrl: storeUrl || storeConfig.storeUrl,
    apiKey: apiKey || storeConfig.apiKey,
    webhookSecret: webhookSecret || storeConfig.webhookSecret,
    isConnected: true,
    connectedAt: storeConfig.connectedAt || new Date().toISOString(),
    lastPingAt: new Date().toISOString(),
  };

  res.json({ success: true, config: storeConfig });
});

// 3. Ingest Real Webhook from Shopify, WooCommerce, Stripe, or Custom API
app.post('/api/webhooks/ecommerce', (req: Request, res: Response) => {
  try {
    const rawPayload = req.body;
    const shopifyTopic = req.headers['x-shopify-topic'] as string;
    const wcTopic = req.headers['x-wc-webhook-topic'] as string;
    const stripeSig = req.headers['stripe-signature'] as string;

    let source: IngestedEvent['source'] = 'custom';
    let eventType: IngestedEvent['eventType'] = 'order_paid';
    let orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    let amount = 0;
    let currency = 'USD';
    let customerName = 'Guest Customer';
    let customerEmail = 'customer@example.com';
    let items: IngestedEvent['items'] = [];
    let status: IngestedEvent['status'] = 'completed';

    // Parse Shopify Webhook payload
    if (shopifyTopic || rawPayload?.order_number || rawPayload?.total_price) {
      source = 'shopify';
      orderId = rawPayload?.name || rawPayload?.order_number ? `#${rawPayload.order_number}` : orderId;
      amount = parseFloat(rawPayload?.total_price || rawPayload?.total_price_usd || rawPayload?.amount || '0');
      currency = rawPayload?.currency || 'USD';
      if (rawPayload?.customer) {
        customerName = `${rawPayload.customer.first_name || ''} ${rawPayload.customer.last_name || ''}`.trim() || customerName;
        customerEmail = rawPayload.customer.email || customerEmail;
      }
      if (Array.isArray(rawPayload?.line_items)) {
        items = rawPayload.line_items.map((li: any) => ({
          name: li.title || li.name || 'Product Item',
          sku: li.sku || 'SKU-001',
          quantity: li.quantity || 1,
          price: parseFloat(li.price || '0'),
        }));
      }
      if (shopifyTopic?.includes('refund')) {
        eventType = 'refund_issued';
        status = 'refunded';
      } else if (shopifyTopic?.includes('checkout')) {
        eventType = 'checkout_started';
        status = 'processing';
      }
    } 
    // Parse WooCommerce Webhook payload
    else if (wcTopic || rawPayload?.total || rawPayload?.billing) {
      source = 'woocommerce';
      orderId = rawPayload?.id ? `#${rawPayload.id}` : orderId;
      amount = parseFloat(rawPayload?.total || '0');
      currency = rawPayload?.currency || 'USD';
      if (rawPayload?.billing) {
        customerName = `${rawPayload.billing.first_name || ''} ${rawPayload.billing.last_name || ''}`.trim() || customerName;
        customerEmail = rawPayload.billing.email || customerEmail;
      }
      if (Array.isArray(rawPayload?.line_items)) {
        items = rawPayload.line_items.map((li: any) => ({
          name: li.name || 'Product Item',
          sku: li.sku || 'SKU-WC',
          quantity: li.quantity || 1,
          price: parseFloat(li.total || '0') / (li.quantity || 1),
        }));
      }
    }
    // Parse Stripe Webhook payload
    else if (stripeSig || rawPayload?.object === 'event' || rawPayload?.type?.startsWith('payment_intent')) {
      source = 'stripe';
      const obj = rawPayload?.data?.object || rawPayload;
      amount = (obj?.amount || 0) / 100;
      currency = (obj?.currency || 'USD').toUpperCase();
      customerEmail = obj?.receipt_email || obj?.billing_details?.email || customerEmail;
      customerName = obj?.billing_details?.name || customerName;
      orderId = `ch_${(obj?.id || '').slice(-6) || Math.floor(1000 + Math.random() * 9000)}`;
      items = [{ name: 'Stripe Direct Purchase', sku: 'ST-DIRECT', quantity: 1, price: amount }];
    }
    // Custom JSON payload fallback
    else {
      source = 'custom';
      amount = parseFloat(rawPayload?.amount || rawPayload?.total || '75.00');
      currency = rawPayload?.currency || 'USD';
      customerName = rawPayload?.customerName || customerName;
      customerEmail = rawPayload?.customerEmail || customerEmail;
      orderId = rawPayload?.orderId || orderId;
      if (Array.isArray(rawPayload?.items)) {
        items = rawPayload.items;
      } else {
        items = [{ name: 'Storefront Purchase', sku: 'SKU-CUSTOM', quantity: 1, price: amount }];
      }
      if (rawPayload?.eventType) {
        eventType = rawPayload.eventType;
      }
    }

    // Default item if none parsed
    if (!items || items.length === 0) {
      items = [{ name: 'Storefront Item', sku: 'SKU-DEFAULT', quantity: 1, price: amount }];
    }

    const newEvent: IngestedEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      source,
      eventType,
      orderId,
      amount,
      currency,
      customerName,
      customerEmail,
      items,
      status,
      timestamp: new Date().toISOString(),
      rawPayload,
    };

    ingestedEvents.unshift(newEvent);
    storeConfig.totalEventsReceived += 1;
    storeConfig.lastPingAt = new Date().toISOString();
    storeConfig.isConnected = true;

    // Retain up to 250 recent events
    if (ingestedEvents.length > 250) {
      ingestedEvents = ingestedEvents.slice(0, 250);
    }

    res.status(200).json({
      success: true,
      message: 'Event successfully ingested and aggregated into real-world dashboard.',
      event: newEvent,
      metrics: computeAggregatedMetrics(),
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 4. Get Stream of Real Ingested Events
app.get('/api/ecommerce/events', (_req: Request, res: Response) => {
  res.json({
    events: ingestedEvents,
    count: ingestedEvents.length,
    metrics: computeAggregatedMetrics(),
  });
});

// 5. Bulk CSV / JSON Order History Import
app.post('/api/ecommerce/import', (req: Request, res: Response) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or empty orders array.' });
    }

    const imported: IngestedEvent[] = orders.map((ord: any, idx: number) => ({
      id: `evt-import-${Date.now()}-${idx}`,
      source: 'csv_import',
      eventType: ord.amount < 0 ? 'refund_issued' : 'order_paid',
      orderId: ord.orderId || `#${2000 + idx}`,
      amount: Math.abs(parseFloat(ord.amount || ord.total || '50')),
      currency: ord.currency || 'USD',
      customerName: ord.customerName || `Customer ${idx + 1}`,
      customerEmail: ord.customerEmail || `customer${idx + 1}@example.com`,
      items: ord.items || [{ name: ord.productName || 'Imported SKU', sku: ord.sku || 'SKU-IMP', quantity: 1, price: Math.abs(parseFloat(ord.amount || '50')) }],
      status: ord.amount < 0 ? 'refunded' : 'completed',
      timestamp: ord.date ? new Date(ord.date).toISOString() : new Date(Date.now() - idx * 3600 * 1000).toISOString(),
    }));

    ingestedEvents = [...imported, ...ingestedEvents].slice(0, 500);
    storeConfig.totalEventsReceived += imported.length;
    storeConfig.isConnected = true;
    storeConfig.lastPingAt = new Date().toISOString();

    res.json({
      success: true,
      importedCount: imported.length,
      metrics: computeAggregatedMetrics(),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Reset / Clear Real Data
app.delete('/api/ecommerce/events', (_req: Request, res: Response) => {
  ingestedEvents = [];
  storeConfig.totalEventsReceived = 0;
  res.json({ success: true, message: 'Events cleared successfully.' });
});

// Vite & Static file serving setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Archetype Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
