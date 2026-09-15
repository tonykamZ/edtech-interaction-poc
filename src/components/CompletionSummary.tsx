import { RotateCcw, CheckCircle2, Award, ClipboardList } from 'lucide-react';
import { FIXED_FRACTION_SET } from '../data/fractions.ts';
import { ItemAttemptRecord } from '../types.ts';

interface CompletionSummaryProps {
  onRestart: () => void;
  attemptRecords?: ItemAttemptRecord[];
}

export function CompletionSummary({ onRestart, attemptRecords = [] }: CompletionSummaryProps) {
  const sortedFractions = [...FIXED_FRACTION_SET].sort(
    (a, b) => a.numerator / a.denominator - b.numerator / b.denominator
  );
  const totalChoices = attemptRecords.reduce(
    (total, record) => total + record.partitionAttempts.length + record.tickAttempts.length,
    0
  );
  const feedbackGuidedItems = attemptRecords.filter(
    (record) => !record.firstTryPartitionSuccess || !record.firstTryTickSuccess
  ).length;

  return (
    <div
      className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col items-center text-center"
      id="completion-summary"
    >
      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-4 shadow-2xs">
        <Award className="w-8 h-8" aria-hidden="true" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Activity completed!
      </h2>
      <p className="text-slate-600 text-base max-w-lg mt-2 leading-relaxed">
        You found a correct place for all six fractions on the number line.
      </p>

      <div className="w-full max-w-2xl bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 my-6 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ClipboardList className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="text-sm font-bold text-indigo-950">This session</h3>
            <p className="text-xs text-indigo-900 mt-0.5 leading-relaxed">
              These results describe your choices today. They are not a test of long-term learning.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-xs font-bold">
          <span className="bg-white border border-indigo-200 text-indigo-900 px-3 py-1.5 rounded-lg">
            {totalChoices} total choices
          </span>
          <span className="bg-indigo-100 border border-indigo-300 text-indigo-900 px-3 py-1.5 rounded-lg">
            {feedbackGuidedItems} used feedback
          </span>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-8 text-center">
          Fractions placed from 0 to 1
        </h3>
        <div className="relative h-2 bg-slate-300 rounded-full my-8 mx-4">
          <div className="absolute left-0 -translate-x-1/2 -top-8 text-sm font-extrabold text-slate-900 font-mono">0</div>
          <div className="absolute left-full -translate-x-1/2 -top-8 text-sm font-extrabold text-slate-900 font-mono">1</div>
          <div className="absolute -left-3 w-3 h-3 border-t-2 border-l-2 border-slate-500 -rotate-45" />
          <div className="absolute -right-3 w-3 h-3 border-t-2 border-r-2 border-slate-500 rotate-45" />
          {sortedFractions.map((fraction, index) => (
            <div
              key={fraction.id}
              className="absolute -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${(fraction.numerator / fraction.denominator) * 100}%` }}
            >
              <div className="w-0.5 h-5 bg-indigo-600 rounded-full" />
              <div className={`absolute font-mono text-xs font-bold px-2 py-0.5 rounded border shadow-2xs whitespace-nowrap bg-indigo-50 border-indigo-300 text-indigo-900 ${index % 2 === 0 ? '-top-8' : 'top-6'}`}>
                {fraction.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
        {attemptRecords.map((record) => {
          const usedFeedback = !record.firstTryPartitionSuccess || !record.firstTryTickSuccess;
          return (
            <div key={record.fractionId} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="font-extrabold text-slate-900">{record.label}</span>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${usedFeedback ? 'text-indigo-700 bg-indigo-100' : 'text-emerald-700 bg-emerald-100'}`}>
                {usedFeedback ? 'After feedback' : 'First try'}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onRestart}
        id="restart-lab-btn"
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base rounded-xl shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 cursor-pointer"
      >
        <RotateCcw className="w-5 h-5" aria-hidden="true" />
        Try Again
      </button>
    </div>
  );
}
