import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  Brain,
} from 'lucide-react';
import { FractionItem, CriterionEvaluation } from '../types.ts';

interface FeedbackBannerProps {
  evaluation: CriterionEvaluation | null;
  fraction: FractionItem;
  onNext: () => void;
  onRetryPartition?: () => void;
  onRetryTick?: () => void;
  onConfirmThinkingCheck?: () => void;
  isLastQuestion: boolean;
  thinkingCheckActive?: boolean;
}

export function FeedbackBanner({
  evaluation,
  fraction,
  onNext,
  onRetryPartition,
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
          Choose how many equal parts should make the whole.
        </span>
      </div>
    );
  }

  const showIntervention =
    (evaluation.isRepeatedError || evaluation.isGuessingDetected) &&
    evaluation.failureObserved;

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
          <h3 className="font-extrabold text-base text-emerald-900">{evaluation.feedbackTitle}</h3>
          <p className="text-sm text-emerald-900 leading-relaxed">{evaluation.feedbackExplanation}</p>
          <p className="text-sm font-bold text-emerald-950">Next: {evaluation.actionGuidance}</p>
        </div>
      </div>
    );
  }

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
            <h3 className="font-extrabold text-base text-emerald-900">{evaluation.feedbackTitle}</h3>
            <p className="text-sm text-emerald-900 leading-relaxed">{evaluation.feedbackExplanation}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onNext}
          id="next-fraction-btn"
          autoFocus
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-sm rounded-xl shadow-xs transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 cursor-pointer"
        >
          <span>{isLastQuestion ? 'View Summary' : 'Next Fraction'}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  const isDenominatorError = evaluation.category === 'denominator_misunderstanding';

  return (
    <div
      role="alert"
      aria-live="polite"
      id="feedback-error-banner"
      className="w-full bg-amber-50/90 border-2 border-amber-400 rounded-xl p-5 text-amber-950 flex flex-col gap-4 shadow-2xs text-left"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-base text-amber-950">{evaluation.feedbackTitle}</h3>
            <p className="text-sm text-amber-900 leading-relaxed">{evaluation.feedbackExplanation}</p>
          </div>
        </div>
        {isDenominatorError && onRetryPartition && !thinkingCheckActive && (
          <button
            type="button"
            onClick={onRetryPartition}
            id="retry-partition-btn"
            autoFocus
            className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Try another answer
          </button>
        )}
        {!isDenominatorError && onRetryTick && !thinkingCheckActive && (
          <button
            type="button"
            onClick={onRetryTick}
            id="retry-tick-btn"
            autoFocus
            className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Clear Mark & Retry
          </button>
        )}
      </div>

      {showIntervention && (
        <div
          className="mt-1 p-4 bg-white border border-amber-300 rounded-lg text-sm text-slate-800 space-y-2.5"
          id="thinking-check-scaffold"
        >
          <div className="flex items-center gap-2 text-amber-900 font-extrabold">
            <Brain className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
            <span>Pause and check</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {isDenominatorError
              ? `Look at the bottom number in ${fraction.label}. It tells how many equal parts make the whole.`
              : `Look at the top number in ${fraction.label}. Count that many equal intervals from 0.`}
          </p>
          {onConfirmThinkingCheck && thinkingCheckActive && (
            <button
              type="button"
              onClick={onConfirmThinkingCheck}
              id="confirm-thinking-check-btn"
              autoFocus
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-md shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              I’m ready to try again
            </button>
          )}
        </div>
      )}

      <p className="pt-1 border-t border-amber-200/80 text-sm font-bold text-amber-950">
        Try this: {evaluation.actionGuidance}
      </p>
    </div>
  );
}
