import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IngestedEvent, StoreConfig } from '../../../server';
import { 
  Radio, 
  Send, 
  ShoppingBag, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Store, 
  ExternalLink,
  Code
} from 'lucide-react';

interface RealDataStreamPanelProps {
  storeConfig: StoreConfig | null;
  events: IngestedEvent[];
  isRealDataMode: boolean;
  onToggleRealDataMode: (enabled: boolean) => void;
  onOpenConnectModal: () => void;
  onTriggerTestEvent: (payload: any) => Promise<void>;
  onClearEvents: () => Promise<void>;
}

export const RealDataStreamPanel: React.FC<RealDataStreamPanelProps> = ({
  storeConfig,
  events,
  isRealDataMode,
  onToggleRealDataMode,
  onOpenConnectModal,
  onTriggerTestEvent,
  onClearEvents,
}) => {
  const [expandedPayloadId, setExpandedPayloadId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleQuickSend = async (type: 'order' | 'cart' | 'refund') => {
    setIsSending(true);
    try {
      if (type === 'order') {
        await onTriggerTestEvent({
          source: storeConfig?.platform || 'shopify',
          eventType: 'order_paid',
          orderId: `#${Math.floor(1000 + Math.random() * 9000)}`,
          amount: Math.round((60 + Math.random() * 160) * 100) / 100,
          currency: 'USD',
          customerName: ['Elena Rostova', 'Julian Thorne', 'Maya Patel', 'Liam Brooks'][Math.floor(Math.random() * 4)],
          customerEmail: 'shopper@live-store.io',
          items: [
            { name: 'All-Weather Field Parka', sku: 'AT-0912', quantity: 1, price: 142.50 }
          ],
          timestamp: new Date().toISOString()
        });
      } else if (type === 'cart') {
        await onTriggerTestEvent({
          source: storeConfig?.platform || 'shopify',
          eventType: 'cart_abandoned',
          amount: 89.00,
          currency: 'USD',
          customerName: 'Guest Shopper',
          customerEmail: 'abandoned@visitor.com',
          items: [
            { name: 'Merino Knit Crewneck', sku: 'MW-402', quantity: 1, price: 89.00 }
          ],
          status: 'abandoned',
          timestamp: new Date().toISOString()
        });
      } else {
        await onTriggerTestEvent({
          source: storeConfig?.platform || 'shopify',
          eventType: 'refund_issued',
          amount: 54.00,
          currency: 'USD',
          customerName: 'Return Request',
          orderId: `#${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'refunded',
          timestamp: new Date().toISOString()
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 space-y-4">
      {/* Top Banner: Real-World Store Data Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">Real-World Store Telemetry</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                {events.length} Ingested Events
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {storeConfig?.storeName || 'Connected Store'} ({storeConfig?.platform?.toUpperCase() || 'SHOPIFY'})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Real data vs Demo toggle */}
          <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => onToggleRealDataMode(false)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                !isRealDataMode
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Benchmark Demo
            </button>
            <button
              onClick={() => onToggleRealDataMode(true)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                isRealDataMode
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
              <span>Real Store Data</span>
            </button>
          </div>

          <button
            onClick={onOpenConnectModal}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700/60 transition-colors flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Quick Ingestion Event Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
        <span className="text-slate-400 font-mono text-[11px]">
          Simulate Store Actions:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleQuickSend('order')}
            disabled={isSending}
            className="px-2.5 py-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/50 rounded-lg transition-colors flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>+ Real Order ($142)</span>
          </button>
          <button
            onClick={() => handleQuickSend('cart')}
            disabled={isSending}
            className="px-2.5 py-1 text-[11px] font-medium text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/50 rounded-lg transition-colors flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            <span>+ Abandoned Cart ($89)</span>
          </button>
          <button
            onClick={() => handleQuickSend('refund')}
            disabled={isSending}
            className="px-2.5 py-1 text-[11px] font-medium text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/50 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>- Refund Issued ($54)</span>
          </button>
          <button
            onClick={onClearEvents}
            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-900"
            title="Clear Event Stream"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Events List Stream */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {events.length > 0 ? (
          events.map((evt) => {
            const isExpanded = expandedPayloadId === evt.id;
            const timeAgo = new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

            return (
              <div
                key={evt.id}
                className="bg-slate-950/40 hover:bg-slate-950/70 border border-slate-800/70 rounded-xl p-3 transition-colors text-xs"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        evt.eventType === 'order_paid'
                          ? 'bg-emerald-400'
                          : evt.eventType === 'cart_abandoned'
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                    />
                    <div className="truncate">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span>{evt.orderId || evt.id}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {evt.eventType.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 uppercase">
                          {evt.source}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {evt.customerName} ({evt.customerEmail})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right font-mono">
                      <div className="font-bold text-white tabular-nums">
                        ${evt.amount.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-500">{timeAgo}</div>
                    </div>

                    <button
                      onClick={() => setExpandedPayloadId(isExpanded ? null : evt.id)}
                      className="p-1 text-slate-500 hover:text-slate-300 rounded transition-colors"
                      title="Inspect Raw Webhook Payload"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Raw Payload Inspector */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2.5 pt-2 border-t border-slate-800/60"
                  >
                    <div className="text-[10px] font-mono text-slate-500 mb-1">
                      Raw Ingested JSON Payload:
                    </div>
                    <pre className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg text-[10px] font-mono text-emerald-300 overflow-x-auto max-h-36">
                      {JSON.stringify(evt.rawPayload || evt, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            No store events ingested yet. Use the buttons above or send a real webhook to start tracking.
          </div>
        )}
      </div>
    </div>
  );
};
