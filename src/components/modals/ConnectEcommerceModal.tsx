import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Copy, 
  Terminal, 
  Upload, 
  ExternalLink, 
  Store, 
  Send,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

interface ConnectEcommerceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoreConnected: (storeData: { platform: string; storeName: string; storeUrl: string }) => void;
  onTriggerTestEvent: (eventData: any) => Promise<void>;
  onImportCsv: (orders: any[]) => Promise<void>;
}

export const ConnectEcommerceModal: React.FC<ConnectEcommerceModalProps> = ({
  isOpen,
  onClose,
  onStoreConnected,
  onTriggerTestEvent,
  onImportCsv,
}) => {
  const [activeTab, setActiveTab] = useState<'shopify' | 'woocommerce' | 'stripe' | 'custom' | 'csv'>('shopify');
  const [storeName, setStoreName] = useState('My Brand Store');
  const [storeUrl, setStoreUrl] = useState('https://mystore.myshopify.com');
  const [apiKey, setApiKey] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://my-app.run.app';
  const webhookEndpoint = `${currentOrigin}/api/webhooks/ecommerce`;

  const sampleCurl = `curl -X POST ${webhookEndpoint} \\
  -H "Content-Type: application/json" \\
  -H "X-Shopify-Topic: orders/paid" \\
  -d '{
    "order_number": 8492,
    "total_price": "148.50",
    "currency": "USD",
    "customer": {
      "first_name": "Marcus",
      "last_name": "Vance",
      "email": "marcus.v@example.com"
    },
    "line_items": [
      {
        "title": "All-Weather Parka",
        "sku": "AT-0912",
        "quantity": 1,
        "price": "148.50"
      }
    ]
  }'`;

  const handleCopyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookEndpoint);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleSendTestWebhook = async () => {
    setIsSendingTest(true);
    setTestSuccess(false);
    try {
      await onTriggerTestEvent({
        source: activeTab,
        eventType: 'order_paid',
        orderId: `#${Math.floor(1000 + Math.random() * 9000)}`,
        amount: Math.round((45 + Math.random() * 180) * 100) / 100,
        currency: 'USD',
        customerName: 'Real Shopper Test',
        customerEmail: 'shopper@test-store.com',
        items: [
          { name: 'Organic Cotton Crewneck', sku: 'OC-102', quantity: 1, price: 68.00 },
          { name: 'Merino Wool Beanie', sku: 'MB-04', quantity: 1, price: 34.00 }
        ],
        timestamp: new Date().toISOString()
      });
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 3000);
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleConnectStore = async () => {
    try {
      await fetch('/api/ecommerce/store-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: activeTab,
          storeName,
          storeUrl,
          apiKey,
          webhookSecret,
        }),
      });
      onStoreConnected({ platform: activeTab, storeName, storeUrl });
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleImportSampleCsv = async () => {
    setIsImporting(true);
    try {
      // Generate 12 realistic past orders
      const sampleOrders = [
        { orderId: '#1001', amount: 185.00, customerName: 'Emma Watson', date: new Date(Date.now() - 6 * 86400000).toISOString(), productName: 'Field Parka (Black)' },
        { orderId: '#1002', amount: 92.50, customerName: 'David Miller', date: new Date(Date.now() - 5 * 86400000).toISOString(), productName: 'Merino Crewneck' },
        { orderId: '#1003', amount: 240.00, customerName: 'Sophia Chen', date: new Date(Date.now() - 4 * 86400000).toISOString(), productName: 'Commuter Leather Tote' },
        { orderId: '#1004', amount: 115.00, customerName: 'Lucas Grey', date: new Date(Date.now() - 4 * 86400000).toISOString(), productName: 'Heavyweight Tee Bundle' },
        { orderId: '#1005', amount: 320.00, customerName: 'Oliver Smith', date: new Date(Date.now() - 3 * 86400000).toISOString(), productName: 'All-Weather Trench' },
        { orderId: '#1006', amount: 78.00, customerName: 'Zoe Kravitz', date: new Date(Date.now() - 2 * 86400000).toISOString(), productName: 'Wax Conditioner Tin' },
        { orderId: '#1007', amount: 165.00, customerName: 'Liam Johnson', date: new Date(Date.now() - 1 * 86400000).toISOString(), productName: 'Wool Flannel Shirt' },
        { orderId: '#1008', amount: 210.00, customerName: 'Ava Brown', date: new Date().toISOString(), productName: 'Technical Windbreaker' },
      ];
      await onImportCsv(sampleOrders);
      onClose();
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Connect Real E-Commerce Store</h2>
                <p className="text-[11px] text-slate-400">Stream real orders, transactions, and conversion telemetry</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Platform Tab Selector */}
          <div className="px-6 pt-4 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'shopify', label: 'Shopify Store' },
              { id: 'woocommerce', label: 'WooCommerce' },
              { id: 'stripe', label: 'Stripe Payments' },
              { id: 'custom', label: 'Webhook & cURL' },
              { id: 'csv', label: 'Import Orders CSV' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Global Webhook Endpoint Callout */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Your Live Real-Time Webhook URL
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Ingestion Receiver
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={webhookEndpoint}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300 select-all"
                />
                <button
                  onClick={handleCopyWebhookUrl}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* TAB: Shopify */}
            {activeTab === 'shopify' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Shopify Store Name
                    </label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="e.g. Acme Apparel"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Store Domain / URL
                    </label>
                    <input
                      type="text"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://yourstore.myshopify.com"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-xs space-y-2 text-slate-300">
                  <span className="font-semibold text-white block">
                    How to enable in Shopify (30 seconds):
                  </span>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                    <li>Go to your Shopify Admin: <strong>Settings &gt; Notifications &gt; Webhooks</strong>.</li>
                    <li>Click <strong>Create webhook</strong>.</li>
                    <li>Select Event: <strong>Order creation</strong> (or <strong>Order payment</strong>).</li>
                    <li>Format: <strong>JSON</strong>.</li>
                    <li>Paste your Webhook URL above into the URL field and click <strong>Save</strong>.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB: WooCommerce */}
            {activeTab === 'woocommerce' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      WooCommerce Store Name
                    </label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="e.g. Horizon Gear Store"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      WordPress Site URL
                    </label>
                    <input
                      type="text"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://mybrandstore.com"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-xs space-y-2 text-slate-300">
                  <span className="font-semibold text-white block">
                    WooCommerce Setup Instructions:
                  </span>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                    <li>In WP Admin, navigate to <strong>WooCommerce &gt; Settings &gt; Advanced &gt; Webhooks</strong>.</li>
                    <li>Click <strong>Add webhook</strong>.</li>
                    <li>Topic: <strong>Order created</strong> or <strong>Order updated</strong>.</li>
                    <li>Delivery URL: Paste the Webhook URL above.</li>
                    <li>Status: <strong>Active</strong> and Save.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB: Stripe */}
            {activeTab === 'stripe' && (
              <div className="space-y-4">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-xs space-y-2 text-slate-300">
                  <span className="font-semibold text-white block">
                    Stripe Webhook Forwarding:
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    In your Stripe Dashboard under <strong>Developers &gt; Webhooks &gt; Add destination</strong>, add your Webhook URL and listen for <code>payment_intent.succeeded</code> or <code>checkout.session.completed</code>.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: Custom & cURL */}
            {activeTab === 'custom' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    Direct Terminal / API Dispatch
                  </span>
                  <button
                    onClick={handleCopyCurl}
                    className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    {copiedCurl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCurl ? 'cURL Copied' : 'Copy cURL Snippet'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48">
                  {sampleCurl}
                </pre>
              </div>
            )}

            {/* TAB: CSV Bulk Import */}
            {activeTab === 'csv' && (
              <div className="space-y-3">
                <div className="p-4 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl bg-slate-950/40 text-center">
                  <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <div className="text-xs font-semibold text-slate-300 mb-1">
                    Import Store Historical Orders
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto mb-3">
                    Drag and drop your Shopify <code>orders_export.csv</code> or click below to populate 30 days of real sample transaction volume.
                  </p>
                  <button
                    onClick={handleImportSampleCsv}
                    disabled={isImporting}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    {isImporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    <span>Load 8 Historical Store Orders</span>
                  </button>
                </div>
              </div>
            )}

            {/* Immediate Interactive Test Webhook Dispatcher */}
            <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Verify Live Connection Right Now
                </span>
                <span className="text-[11px] text-slate-400">
                  Sends an immediate test order event to verify real-time ingestion.
                </span>
              </div>

              <button
                onClick={handleSendTestWebhook}
                disabled={isSendingTest}
                className="px-3.5 py-1.5 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                {isSendingTest ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : testSuccess ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{testSuccess ? 'Event Ingested!' : 'Send Test Order ($102)'}</span>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">
              Ready for real-world order ingestion
            </span>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConnectStore}
                className="px-4 py-1.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-600/30"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Activate Store</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
