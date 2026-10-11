import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS, TEMPLATES_DATA } from '../../data/templatesData';
import { TemplateId } from '../../types/dashboard';
import { X, Check, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface BusinessMatchQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const BusinessMatchQuizModal: React.FC<BusinessMatchQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, TemplateId>>({});
  const [resultTemplate, setResultTemplate] = useState<TemplateId | null>(null);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (templateId: TemplateId) => {
    const updated = { ...answers, [currentQ.id]: templateId };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate most frequent template in answers
      const counts: Record<string, number> = {};
      Object.values(updated).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
      let best = 'b2b-saas' as TemplateId;
      let maxCount = 0;
      Object.entries(counts).forEach(([t, cnt]) => {
        if (cnt > maxCount) {
          maxCount = cnt;
          best = t as TemplateId;
        }
      });
      setResultTemplate(best);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResultTemplate(null);
  };

  const matchedTemplateInfo = resultTemplate ? TEMPLATES_DATA[resultTemplate] : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-white">Find Your Business Template Match</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {!resultTemplate ? (
              <div>
                {/* Step indicators */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono text-slate-400">
                    Question 0{currentStep + 1} of 0{QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {QUIZ_QUESTIONS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentStep
                            ? 'w-6 bg-indigo-500'
                            : idx < currentStep
                            ? 'w-3 bg-indigo-400/60'
                            : 'w-3 bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-base font-semibold text-white mb-1">{currentQ.title}</h3>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">{currentQ.subtitle}</p>

                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(opt.recommendedTemplate)}
                        className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-indigo-500/40 transition-all duration-150 flex items-start justify-between group"
                      >
                        <div className="pr-4">
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-white mb-0.5">
                            {opt.label}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-snug">
                            {opt.desc}
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                          <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Results view */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="text-center py-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
                  <Check className="w-6 h-6" />
                </div>

                <div className="text-xs uppercase font-mono tracking-wider text-indigo-400 mb-1">
                  100% Architecture Match
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {matchedTemplateInfo?.name}
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                  {matchedTemplateInfo?.description}
                </p>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-left mb-6 max-w-md mx-auto">
                  <span className="text-[11px] font-mono text-slate-400 block mb-2">
                    Key Telemetry Included:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {matchedTemplateInfo?.metrics.slice(0, 4).map((m) => (
                      <div key={m.id} className="text-slate-300 flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span className="truncate">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    onClick={() => {
                      if (resultTemplate) {
                        onSelectTemplate(resultTemplate);
                        onClose();
                      }
                    }}
                    className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/30"
                  >
                    <span>Launch Template Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
