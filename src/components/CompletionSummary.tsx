import { RotateCcw, CheckCircle2, Award, ShieldCheck, Brain } from 'lucide-react';
import { FIXED_FRACTION_SET } from '../data/fractions.ts';
import { ItemAttemptRecord } from '../types.ts';

interface CompletionSummaryProps {
  onRestart: () => void;
  attemptRecords?: ItemAttemptRecord[];
}

export function CompletionSummary({ onRestart, attemptRecords = [] }: CompletionSummaryProps) {
  // Sort fractions by numeric value for the visual master number line
  const sortedFractions = [...FIXED_FRACTION_SET].sort(
    (a, b) => a.numerator / a.denominator - b.numerator / b.denominator
  );

  const totalRepeatedErrors = attemptRecords.reduce(
    (acc, curr) => acc + curr.repeatedErrors,
    0
  );
  const totalThinkingChecks = attemptRecords.filter(
    (r) => r.thinkingCheckRequired
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
        Fraction Line Lab Completed!
      </h2>
      <p className="text-slate-600 text-base max-w-lg mt-2 leading-relaxed">
        You partitioned the 0–1 whole into equal intervals, interpreted the denominator and numerator, and placed all 6 fractions accurately on the number line.
      </p>

      {/* Formative Feedback & Failure Check Assessment Banner */}
      <div className="w-full max-w-2xl bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 my-6 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-indigo-950">
              Shute (2008) Formative Failure Check: Passed
            </h3>
            <p className="text-xs text-indigo-850 mt-0.5 leading-relaxed">
              All misconceptions were resolved through targeted, formative feedback. Equal interval comprehension was maintained without blind guessing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs font-bold">
          <span className="bg-white border border-indigo-200 text-indigo-900 px-3 py-1.5 rounded-lg">
            {totalRepeatedErrors === 0 ? '0 Repeated Errors' : `${totalRepeatedErrors} Errors Corrected`}
          </span>
          <span className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Intervals Verified
          </span>
        </div>
      </div>

      {/* Comparative Master Number Line */}
      <div className="w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-8 text-center">
          All 6 Fractions Placed on the 0 to 1 Continuum
        </h3>

        {/* Scaled Number Line */}
        <div className="relative h-2 bg-slate-300 rounded-full my-8 mx-4">
          <div className="absolute left-0 -translate-x-1/2 -top-8 text-sm font-extrabold text-slate-900 font-mono">
            0
          </div>
          <div className="absolute left-full -translate-x-1/2 -top-8 text-sm font-extrabold text-slate-900 font-mono">
            1
          </div>

          {/* Left Arrow Endpoint */}
          <div className="absolute -left-3 w-3 h-3 border-t-2 border-l-2 border-slate-500 -rotate-45" />
          {/* Right Arrow Endpoint */}
          <div className="absolute -right-3 w-3 h-3 border-t-2 border-r-2 border-slate-500 rotate-45" />

          {/* Placed fraction pins */}
          {sortedFractions.map((f, idx) => {
            const percent = (f.numerator / f.denominator) * 100;
            // Alternating pin heights to avoid overlapping labels
            const isTop = idx % 2 === 0;

            return (
              <div
                key={`placed-${f.id}`}
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${percent}%` }}
              >
                {/* Marker line */}
                <div className="w-0.5 h-5 bg-indigo-600 rounded-full" />

                {/* Badge */}
                <div
                  className={`absolute font-mono text-xs font-bold px-2 py-0.5 rounded border shadow-2xs whitespace-nowrap bg-indigo-50 border-indigo-300 text-indigo-900 ${
                    isTop ? '-top-8' : 'top-6'
                  }`}
                >
                  {f.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Diagnostic Items */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
        {attemptRecords.length > 0 ? (
          attemptRecords.map((rec) => {
            const fraction = FIXED_FRACTION_SET.find((f) => f.id === rec.fractionId);
            const isFirstTryBoth = rec.firstTryPartitionSuccess && rec.firstTryTickSuccess;

            return (
              <div
                key={rec.fractionId}
                className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">
                      {rec.label}
                    </div>
                    <div className="text-xs text-slate-500">
                      {fraction ? `${fraction.denominator} parts • ${fraction.numerator} counted` : ''}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {isFirstTryBoth ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Direct Placement
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                      Feedback Guided
                    </span>
                  )}
                  {rec.repeatedErrors > 0 && (
                    <div className="text-[10px] text-amber-700 font-medium mt-1">
                      Thinking check applied
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          FIXED_FRACTION_SET.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
              <div>
                <div className="font-bold text-slate-900 text-base">{f.label}</div>
                <div className="text-xs text-slate-500">
                  {f.denominator} parts • {f.numerator} {f.numerator === 1 ? 'hop' : 'hops'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Restart Button */}
      <button
        type="button"
        onClick={onRestart}
        id="restart-lab-btn"
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base rounded-xl shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 cursor-pointer"
      >
        <RotateCcw className="w-5 h-5" aria-hidden="true" />
        Restart Lab
      </button>
    </div>
  );
}
