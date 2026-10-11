import React, { useState, useEffect, useCallback } from 'react';
import { TopNav } from './components/layout/TopNav';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { DrilldownModal } from './components/modals/DrilldownModal';
import { BusinessMatchQuizModal } from './components/modals/BusinessMatchQuizModal';
import { CustomizeTemplateDrawer } from './components/modals/CustomizeTemplateDrawer';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { ConnectEcommerceModal } from './components/modals/ConnectEcommerceModal';
import { TEMPLATES_DATA } from './data/templatesData';
import { TemplateId, MetricItem } from './types/dashboard';
import { IngestedEvent, StoreConfig } from '../server';
import { Menu, Sparkles, CheckCircle2, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTemplateId, setCurrentTemplateId] = useState<TemplateId>('b2b-saas');
  const [selectedMetric, setSelectedMetric] = useState<MetricItem | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Customization state
  const [currencyPrefix, setCurrencyPrefix] = useState('$');
  const [isCompactDensity, setIsCompactDensity] = useState(false);
  const [visibleMetricIdsMap, setVisibleMetricIdsMap] = useState<Record<TemplateId, string[]>>({
    'b2b-saas': TEMPLATES_DATA['b2b-saas'].metrics.map((m) => m.id),
    'ecommerce': TEMPLATES_DATA['ecommerce'].metrics.map((m) => m.id),
    'fintech': TEMPLATES_DATA['fintech'].metrics.map((m) => m.id),
    'devops': TEMPLATES_DATA['devops'].metrics.map((m) => m.id),
    'healthcare': TEMPLATES_DATA['healthcare'].metrics.map((m) => m.id),
    'ai-ops': TEMPLATES_DATA['ai-ops'].metrics.map((m) => m.id),
  });

  // Real-world E-Commerce store integration state
  const [storeConfig, setStoreConfig] = useState<StoreConfig | null>(null);
  const [realStoreEvents, setRealStoreEvents] = useState<IngestedEvent[]>([]);
  const [realStoreMetrics, setRealStoreMetrics] = useState<any>(null);
  const [isRealDataMode, setIsRealDataMode] = useState<boolean>(false);

  // Live telemetry simulation state
  const [isSimulatingLive, setIsSimulatingLive] = useState(false);
  const [liveToast, setLiveToast] = useState<string | null>(null);

  const currentTemplate = TEMPLATES_DATA[currentTemplateId] || TEMPLATES_DATA['b2b-saas'];
  const visibleMetricIds = visibleMetricIdsMap[currentTemplateId] || currentTemplate.metrics.map((m) => m.id);

  // Fetch real-world store data from the server
  const fetchStoreData = useCallback(async () => {
    try {
      const res = await fetch('/api/ecommerce/events');
      if (res.ok) {
        const data = await res.json();
        setRealStoreEvents(data.events || []);
        setRealStoreMetrics(data.metrics || null);
      }

      const cfgRes = await fetch('/api/ecommerce/store-config');
      if (cfgRes.ok) {
        const cfgData = await cfgRes.json();
        setStoreConfig(cfgData.config || null);
      }
    } catch (e) {
      // Backend polling error silently caught
    }
  }, []);

  useEffect(() => {
    fetchStoreData();
    // Poll every 5s if user is tracking real data or simulating
    const interval = setInterval(fetchStoreData, 4000);
    return () => clearInterval(interval);
  }, [fetchStoreData]);

  const handleToggleMetric = (metricId: string) => {
    setVisibleMetricIdsMap((prev) => {
      const currentList = prev[currentTemplateId] || [];
      const updated = currentList.includes(metricId)
        ? currentList.filter((id) => id !== metricId)
        : [...currentList, metricId];
      return { ...prev, [currentTemplateId]: updated };
    });
  };

  const handleSelectTemplate = (id: TemplateId) => {
    setCurrentTemplateId(id);
    const target = TEMPLATES_DATA[id];
    setLiveToast(`Loaded ${target.name}`);
    setTimeout(() => setLiveToast(null), 2500);
  };

  const handleStoreConnected = (storeData: { platform: string; storeName: string; storeUrl: string }) => {
    setIsRealDataMode(true);
    setLiveToast(`Connected ${storeData.storeName} (${storeData.platform.toUpperCase()})! Tracking live events.`);
    setTimeout(() => setLiveToast(null), 3500);
    fetchStoreData();
  };

  const handleTriggerTestEvent = async (payload: any) => {
    try {
      const res = await fetch('/api/webhooks/ecommerce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setLiveToast(`Order event ingested: $${payload.amount || 0}`);
        setTimeout(() => setLiveToast(null), 2500);
        await fetchStoreData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImportCsv = async (orders: any[]) => {
    try {
      const res = await fetch('/api/ecommerce/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders }),
      });
      if (res.ok) {
        setIsRealDataMode(true);
        setLiveToast(`Successfully imported ${orders.length} historical store orders!`);
        setTimeout(() => setLiveToast(null), 3000);
        await fetchStoreData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearEvents = async () => {
    try {
      await fetch('/api/ecommerce/events', { method: 'DELETE' });
      setLiveToast('Event stream cleared.');
      setTimeout(() => setLiveToast(null), 2000);
      await fetchStoreData();
    } catch (err) {
      console.error(err);
    }
  };

  // Live simulation tick effect
  useEffect(() => {
    if (!isSimulatingLive) return;

    const interval = setInterval(() => {
      const msgs = [
        `Incoming transaction processed`,
        `Telemetry probe verified nominal SLA`,
        `New subscriber account provisioned`,
        `Cache prefix hit rate elevated`,
        `Encounter intake queue updated`,
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setLiveToast(randomMsg);
      setTimeout(() => setLiveToast(null), 2000);
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulatingLive]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <TopNav
        currentTemplateId={currentTemplateId}
        onSelectTemplate={handleSelectTemplate}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isSimulatingLive={isSimulatingLive}
        onToggleSimulate={() => setIsSimulatingLive((prev) => !prev)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto relative">
        {/* Sidebar Navigation */}
        <Sidebar
          currentTemplateId={currentTemplateId}
          onSelectTemplate={handleSelectTemplate}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 lg:pl-64 p-4 lg:p-8 min-w-0">
          {/* Mobile top trigger banner */}
          <div className="lg:hidden mb-4 flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white"
            >
              <Menu className="w-4 h-4 text-indigo-400" />
              <span>Switch Template ({currentTemplate.badge})</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsConnectModalOpen(true)}
                className="text-xs font-semibold text-emerald-400 flex items-center gap-1"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="text-xs font-semibold text-indigo-400 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quiz</span>
              </button>
            </div>
          </div>

          {/* Active Dashboard View */}
          <DashboardView
            template={currentTemplate}
            visibleMetricIds={visibleMetricIds}
            currencyPrefix={currencyPrefix}
            isCompactDensity={isCompactDensity}
            isSimulatingLive={isSimulatingLive}
            onOpenDrilldown={(m) => setSelectedMetric(m)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            // Real E-commerce Integration Props
            realStoreEvents={realStoreEvents}
            realStoreMetrics={realStoreMetrics}
            storeConfig={storeConfig}
            isRealDataMode={isRealDataMode}
            onToggleRealDataMode={setIsRealDataMode}
            onOpenConnectModal={() => setIsConnectModalOpen(true)}
            onTriggerTestEvent={handleTriggerTestEvent}
            onClearEvents={handleClearEvents}
          />
        </main>
      </div>

      {/* Live Toast Notification */}
      <AnimatePresence>
        {liveToast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-indigo-500/40 text-white text-xs px-3.5 py-2.5 rounded-xl shadow-xl shadow-black/40 flex items-center gap-2 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{liveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drilldown Modal */}
      <DrilldownModal
        metric={selectedMetric}
        accentColor={currentTemplate.accentColor}
        onClose={() => setSelectedMetric(null)}
      />

      {/* Business Match Quiz Modal */}
      <BusinessMatchQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Customize Drawer */}
      <CustomizeTemplateDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        template={currentTemplate}
        visibleMetricIds={visibleMetricIds}
        onToggleMetric={handleToggleMetric}
        currencyPrefix={currencyPrefix}
        onChangeCurrency={setCurrencyPrefix}
        isCompactDensity={isCompactDensity}
        onToggleDensity={() => setIsCompactDensity((prev) => !prev)}
      />

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        template={currentTemplate}
        currencyPrefix={currencyPrefix}
      />

      {/* Connect Real E-Commerce Store Modal */}
      <ConnectEcommerceModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onStoreConnected={handleStoreConnected}
        onTriggerTestEvent={handleTriggerTestEvent}
        onImportCsv={handleImportCsv}
      />
    </div>
  );
}
