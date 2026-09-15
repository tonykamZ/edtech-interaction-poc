import { useState } from 'react';
import { FIXED_FRACTION_SET } from './data/fractions.ts';
import { FractionDisplay } from './components/FractionDisplay.tsx';
import { NumberLine } from './components/NumberLine.tsx';
import { PartitionSelector } from './components/PartitionSelector.tsx';
import { FeedbackBanner } from './components/FeedbackBanner.tsx';
import { CompletionSummary } from './components/CompletionSummary.tsx';
import { BehavioralCriteriaGuide } from './components/BehavioralCriteriaGuide.tsx';
import { evaluatePartition, evaluateTick } from './utils/criteriaEvaluation.ts';
import { CriterionEvaluation, ItemAttemptRecord } from './types.ts';
import { Compass } from 'lucide-react';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedParts, setSelectedParts] = useState<number | null>(null);
  const [selectedTick, setSelectedTick] = useState<number | null>(null);
  const [evaluation, setEvaluation] = useState<CriterionEvaluation | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Formative Tracking State (Shute 2008 failure check & anti-guessing)
  const [partitionAttempts, setPartitionAttempts] = useState<number[]>([]);
  const [tickAttempts, setTickAttempts] = useState<number[]>([]);
  const [repeatedErrorsThisItem, setRepeatedErrorsThisItem] = useState<number>(0);
  const [thinkingCheckActive, setThinkingCheckActive] = useState(false);
  const [attemptRecords, setAttemptRecords] = useState<ItemAttemptRecord[]>([]);

  const currentFraction = FIXED_FRACTION_SET[currentIndex];
  const isPartitionCorrect = selectedParts === currentFraction?.denominator;
  const isTickCorrect = selectedTick === currentFraction?.numerator;

  // Handle partition choice (Behavioral Requirement: P = D)
  const handleSelectPartition = (parts: number) => {
    if (thinkingCheckActive) return;

    setSelectedParts(parts);
    setSelectedTick(null);

    const result = evaluatePartition(parts, currentFraction, partitionAttempts);
    setEvaluation(result);

    setPartitionAttempts((prev) => [...prev, parts]);

    if (result.isRepeatedError) {
      setRepeatedErrorsThisItem((prev) => prev + 1);
      setThinkingCheckActive(true);
    } else if (result.isGuessingDetected) {
      setThinkingCheckActive(true);
    }
  };

  // Handle tick mark selection (Behavioral Requirement: k = N)
  const handleSelectTick = (tickIndex: number) => {
    if (!isPartitionCorrect || thinkingCheckActive) return;

    setSelectedTick(tickIndex);

    const result = evaluateTick(tickIndex, currentFraction, tickAttempts);
    setEvaluation(result);

    setTickAttempts((prev) => [...prev, tickIndex]);

    if (result.isRepeatedError) {
      setRepeatedErrorsThisItem((prev) => prev + 1);
      setThinkingCheckActive(true);
    } else if (result.isGuessingDetected) {
      setThinkingCheckActive(true);
    }
  };

  // Confirm thinking check reflection to unlock retry
  const handleConfirmThinkingCheck = () => {
    setThinkingCheckActive(false);
  };

  // Advance only when both behavioral criteria are met: (P = D) ∧ (k = N)
  const handleNext = () => {
    if (!isPartitionCorrect || !isTickCorrect) return;

    // Record diagnostics for this fraction
    const record: ItemAttemptRecord = {
      fractionId: currentFraction.id,
      label: currentFraction.label,
      firstTryPartitionSuccess:
        partitionAttempts.length === 1 && partitionAttempts[0] === currentFraction.denominator,
      firstTryTickSuccess:
        tickAttempts.length === 1 && tickAttempts[0] === currentFraction.numerator,
      partitionAttempts,
      tickAttempts,
      repeatedErrors: repeatedErrorsThisItem,
      guessingTriggered: partitionAttempts.length >= 3 || tickAttempts.length >= 3,
      thinkingCheckRequired: repeatedErrorsThisItem > 0 || partitionAttempts.length >= 3 || tickAttempts.length >= 3,
      mastered: true,
    };

    setAttemptRecords((prev) => [...prev, record]);

    if (currentIndex < FIXED_FRACTION_SET.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedParts(null);
      setSelectedTick(null);
      setEvaluation(null);
      setPartitionAttempts([]);
      setTickAttempts([]);
      setRepeatedErrorsThisItem(0);
      setThinkingCheckActive(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Retry tick selection for the same item
  const handleRetryTick = () => {
    setSelectedTick(null);
    setThinkingCheckActive(false);
    // Reset back to partition matched state
    const result = evaluatePartition(currentFraction.denominator, currentFraction);
    setEvaluation(result);
  };

  // Restart the whole lab
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedParts(null);
    setSelectedTick(null);
    setEvaluation(null);
    setPartitionAttempts([]);
    setTickAttempts([]);
    setRepeatedErrorsThisItem(0);
    setThinkingCheckActive(false);
    setAttemptRecords([]);
    setIsCompleted(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-20 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Fraction Line Lab
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Upper-Primary Fractions • Equal Interval Mapping
              </p>
            </div>
          </div>

          {!isCompleted && (
            <div className="flex items-center gap-3" aria-label="Progress">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider hidden sm:inline">
                Item {currentIndex + 1} of {FIXED_FRACTION_SET.length}
              </span>
              <div className="flex items-center gap-1.5" role="list" aria-label="Questions progress">
                {FIXED_FRACTION_SET.map((_, idx) => {
                  const isDone = idx < currentIndex;
                  const isCurrent = idx === currentIndex;
                  return (
                    <div
                      key={`prog-${idx}`}
                      role="listitem"
                      aria-current={isCurrent ? 'step' : undefined}
                      title={`Fraction ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-200 ${
                        isDone
                          ? 'w-6 bg-emerald-600'
                          : isCurrent
                          ? 'w-8 bg-indigo-600 ring-2 ring-indigo-300'
                          : 'w-2.5 bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-start">
        {isCompleted ? (
          <CompletionSummary onRestart={handleRestart} attemptRecords={attemptRecords} />
        ) : (
          <div className="flex flex-col gap-6" id="lab-workspace">
            {/* Behavioral Criteria & Mapping Specification Guide */}
            <BehavioralCriteriaGuide
              currentFraction={currentFraction}
              selectedParts={selectedParts}
              selectedTick={selectedTick}
              isPartitionCorrect={isPartitionCorrect}
              isTickCorrect={isTickCorrect}
            />

            {/* Target Fraction Challenge Card */}
            <section
              aria-labelledby="target-fraction-heading"
              className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs text-left"
              id="target-fraction-card"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold rounded-full mb-3">
                    <span>Target Fraction</span>
                    <span>•</span>
                    <span>
                      {currentFraction.isUnitFraction ? 'Unit Fraction' : 'Non-Unit Fraction'}
                    </span>
                  </div>
                  <h2
                    id="target-fraction-heading"
                    className="text-xl sm:text-2xl font-extrabold text-slate-900"
                  >
                    Place <span className="text-indigo-600">{currentFraction.label}</span> on the line
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 max-w-md">
                    Word name: <strong className="text-slate-800 capitalize">{currentFraction.wordName}</strong>
                  </p>
                </div>

                {/* Visual Fraction Card with Explanatory Anatomy */}
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 shadow-2xs">
                  <FractionDisplay
                    numerator={currentFraction.numerator}
                    denominator={currentFraction.denominator}
                    highlightDenominator={evaluation?.category === 'denominator_misunderstanding'}
                    highlightNumerator={evaluation?.category === 'interval_count_misunderstanding'}
                    size="lg"
                  />
                  <div className="border-l border-slate-200 pl-4 text-xs flex flex-col gap-2 font-medium">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-slate-700">
                        Numerator <strong>N = {currentFraction.numerator}</strong> (intervals to count)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                      <span className="text-slate-700">
                        Denominator <strong>D = {currentFraction.denominator}</strong> (equal parts in 1 whole)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 1: Partition Selector (Denominator Mapping) */}
            <PartitionSelector
              currentPartition={selectedParts}
              targetDenominator={currentFraction.denominator}
              onSelectPartition={handleSelectPartition}
              disabled={evaluation?.type === 'tick_matched'}
              disabledDueToThinkingCheck={thinkingCheckActive}
            />

            {/* Step 2: Interactive 0-1 Number Line (Numerator Mapping & Failure Highlights) */}
            <section
              aria-label="Interactive Number Line"
              className="w-full flex flex-col gap-2"
            >
              <NumberLine
                partitions={selectedParts}
                selectedTick={selectedTick}
                onSelectTick={handleSelectTick}
                interactive={isPartitionCorrect && evaluation?.type !== 'tick_matched'}
                targetNumerator={currentFraction.numerator}
                targetDenominator={currentFraction.denominator}
                isEvaluated={
                  evaluation?.type === 'tick_undercount' ||
                  evaluation?.type === 'tick_overcount' ||
                  evaluation?.type === 'tick_zero' ||
                  evaluation?.type === 'tick_whole' ||
                  evaluation?.type === 'tick_matched'
                }
                isCorrect={isTickCorrect}
                isPartitionCorrect={isPartitionCorrect}
                disabledDueToThinkingCheck={thinkingCheckActive}
              />
            </section>

            {/* Feedback & Failure Criterion Guidance Banner */}
            <FeedbackBanner
              evaluation={evaluation}
              fraction={currentFraction}
              onNext={handleNext}
              onRetryTick={handleRetryTick}
              onConfirmThinkingCheck={handleConfirmThinkingCheck}
              isLastQuestion={currentIndex === FIXED_FRACTION_SET.length - 1}
              thinkingCheckActive={thinkingCheckActive}
            />
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <p>Fraction Line Lab • Formative Feedback & Equal Interval Verification (Shute, 2008)</p>
      </footer>
    </div>
  );
}
