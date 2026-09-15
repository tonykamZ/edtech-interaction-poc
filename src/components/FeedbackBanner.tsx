import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  AlertTriangle,
  Brain,
} from 'lucide-react';
import { FractionItem, CriterionEvaluation } from '../types.ts';

interface FeedbackBannerProps {
  evaluation: CriterionEvaluation | null;
  fraction: FractionItem;
  onNext: () => void;
  onRetryTick?: () => void;
  onConfirmThinkingCheck?: () => void;
  isLastQuestion: boolean;
  thinkingCheckActive?: boolean;
}

export function FeedbackBanner({
  evaluation,
  fraction,
  onNext,
  onRetryTick,
  onConfirmThinkingCheck,
  isLastQuestion,
  thinkingCheckActive = false,
}: FeedbackBannerProps) {
  if (!evaluation || evaluation.type === 'none') {
    return (
      <div
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-sm text-slate-700 flex items-center justify-center gap-2.5 shadow-2xs"
        id="feedback-placeholder"
      >
        <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" aria-hidden="true" />
        <span className="font-medium">
          Step 1: Choose how many equal parts divide the whole based on the denominator.
        </span>
      </div>
    );
  }

  // Handle repeated error or guessing pattern intervention (Shute 2008 Failure Check)
  const showIntervention =
    (evaluation.isRepeatedError || evaluation.isGuessingDetected) &&
    evaluation.failureObserved;

  // 1. Matched State (Partition Matched, awaiting mark placement)
  if (evaluation.type === 'partition_matched') {
    return (
      <div
        role="status"
        aria-live="polite"
        id="feedback-partition-success"
        className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5 text-emerald-950 flex items-start gap-3.5 shadow-2xs text-left"
      >
        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">
              Denominator Mapping Correct
            </span>
            <span className="text-xs text-emerald-800 font-mono font-bold">
              P = {fraction.denominator} equal parts of size 1/{fraction.denominator}
            </span>
          </div>
          <h3 className="font-extrabold text-base text-emerald-900">
            {evaluation.feedbackTitle}
          </h3>
          <p className="text-sm text-emerald-850 leading-relaxed">
            {evaluation.feedbackExplanation}
          </p>
          <div className="pt-1 text-xs font-bold text-emerald-950 flex items-center gap-1.5">
            <span>👉 Next Step:</span>
            <span>{evaluation.actionGuidance}</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Final Success State (Both criteria satisfied)
  if (evaluation.type === 'tick_matched') {
    return (
      <div
        role="status"
        aria-live="polite"
        id="feedback-tick-success"
        className="w-full bg-emerald-50 border-2 border-emerald-400 rounded-xl p-5 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs text-left"
      >
        <div className="flex items-start gap-3.5 flex-1">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">
                All Mapping Criteria Satisfied
              </span>
              <span className="text-xs text-emerald-800 font-mono font-bold">
                (P = {fraction.denominator}) ∧ (k = {fraction.numerator})
              </span>
            </div>
            <h3 className="font-extrabold text-base text-emerald-900">
              {evaluation.feedbackTitle}
            </h3>
            <p className="text-sm text-emerald-850 leading-relaxed">
              {evaluation.feedbackExplanation}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNext}
          id="next-fraction-btn"
          autoFocus
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-sm rounded-xl shadow-xs transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 cursor-pointer"
        >
          <span>{isLastQuestion ? 'View Summary & Diagnostics' : 'Next Fraction'}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  // 3. Error Feedback with Misunderstanding Categorization & Anti-Guessing Guard
  const isDenominatorError = evaluation.category === 'denominator_misunderstanding';

  return (
    <div
      role="alert"
      aria-live="polite"
      id="feedback-error-banner"
      className="w-full bg-amber-50/90 border-2 border-amber-400 rounded-xl p-5 text-amber-950 flex flex-col gap-4 shadow-2xs text-left"
    >
      {/* Top Diagnosis Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isDenominatorError
                    ? 'bg-amber-200 text-amber-950 border border-amber-300'
                    : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                }`}
              >
                {isDenominatorError
                  ? 'Denominator Misunderstanding (Partition Size)'
                  : 'Interval Count Misunderstanding (Numerator Distance)'}
              </span>

              {evaluation.isRepeatedError && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-rose-200 text-rose-950 border border-rose-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-700" />
                  Repeated Error
                </span>
              )}

              {evaluation.isGuessingDetected && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-amber-200 text-amber-950 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Brain className="w-3 h-3 text-amber-800" />
                  Anti-Guessing Guard
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-base text-amber-950">
              {evaluation.feedbackTitle}
            </h3>
            <p className="text-sm text-amber-900 leading-relaxed">
              {evaluation.feedbackExplanation}
            </p>
          </div>
        </div>

        {/* Retry Button for Tick placement */}
        {!isDenominatorError && onRetryTick && !thinkingCheckActive && (
          <button
            type="button"
            onClick={onRetryTick}
            id="retry-tick-btn"
            className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Clear Mark & Retry
          </button>
        )}
      </div>

      {/* Specific Formative Thinking Intervention (Shute 2008 Failure Check) */}
      {showIntervention && (
        <div
          className="mt-1 p-4 bg-white border border-amber-300 rounded-lg text-xs sm:text-sm text-slate-800 space-y-2.5"
          id="thinking-check-scaffold"
        >
          <div className="flex items-center gap-2 text-amber-900 font-extrabold">
            <Brain className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
            <span>Formative Thinking Check (Shute 2008 Research Protocol)</span>
          </div>

          <p className="text-slate-700 leading-relaxed">
            {evaluation.isRepeatedError
              ? `You selected the same value that previously triggered an error. To prevent trial-and-error guessing, confirm your conceptual mapping before retrying:`
              : `Multiple attempts detected. Take a moment to verify the equal interval rule before choosing:`}
          </p>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded font-mono text-xs text-slate-800">
            {isDenominatorError ? (
              <span>
                • Denominator <strong>D = {fraction.denominator}</strong> means the whole [0, 1] must be cut into exactly <strong>{fraction.denominator} equal parts</strong>, making each interval <strong>1/{fraction.denominator}</strong> long.
              </span>
            ) : (
              <span>
                • Each interval has width <strong>1/{fraction.denominator}</strong>. Target numerator <strong>N = {fraction.numerator}</strong> requires counting exactly <strong>{fraction.numerator} interval hop{fraction.numerator === 1 ? '' : 's'}</strong> starting from 0.
              </span>
            )}
          </div>

          {onConfirmThinkingCheck && thinkingCheckActive && (
            <button
              type="button"
              onClick={onConfirmThinkingCheck}
              id="confirm-thinking-check-btn"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-md shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              I Understand — Unlock Retry
            </button>
          )}
        </div>
      )}

      {/* Action Guidance Footnote */}
      <div className="pt-1 border-t border-amber-200/80 text-xs font-bold text-amber-950 flex items-center gap-1.5">
        <span className="text-amber-800 uppercase tracking-wide">Target Action:</span>
        <span>{evaluation.actionGuidance}</span>
      </div>
    </div>
  );
}
