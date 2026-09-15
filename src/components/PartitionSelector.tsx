import { PARTITION_CHOICES } from '../data/fractions.ts';
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';

interface PartitionSelectorProps {
  currentPartition: number | null;
  targetDenominator: number;
  onSelectPartition: (parts: number) => void;
  disabled?: boolean;
  disabledDueToThinkingCheck?: boolean;
}

export function PartitionSelector({
  currentPartition,
  targetDenominator,
  onSelectPartition,
  disabled = false,
  disabledDueToThinkingCheck = false,
}: PartitionSelectorProps) {
  const isSelectedCorrect = currentPartition === targetDenominator;
  const isSelectedIncorrect = currentPartition !== null && !isSelectedCorrect;
  const isInteractionLocked = disabled || disabledDueToThinkingCheck;

  return (
    <div
      className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left"
      id="partition-selector"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center">
              1
            </span>
            <h2 className="text-base font-extrabold text-slate-900">
              Step 1: Divide the Whole (Denominator Mapping)
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            How many equal parts does 1 whole need to represent this fraction?
          </p>
        </div>

        {/* Dynamic Mapping Guide Badge */}
        <div className="flex items-center gap-2">
          {disabledDueToThinkingCheck && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              Thinking Check Active
            </span>
          )}
          {isSelectedCorrect && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Partition Matched (P = {targetDenominator})
            </span>
          )}
          {isSelectedIncorrect && !disabledDueToThinkingCheck && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Mismatch (Selected {currentPartition} ≠ D)
            </span>
          )}
        </div>
      </div>

      <div
        className="grid grid-cols-3 sm:grid-cols-6 gap-3"
        role="radiogroup"
        aria-label="Select number of equal parts (denominator mapping)"
      >
        {PARTITION_CHOICES.map((parts) => {
          const isSelected = currentPartition === parts;
          const isCorrect = parts === targetDenominator;

          let btnStyles =
            'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800';
          if (isSelected) {
            if (isCorrect) {
              btnStyles =
                'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300 shadow-xs';
            } else {
              btnStyles =
                'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-300 shadow-xs';
            }
          }

          return (
            <button
              key={`part-${parts}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isInteractionLocked}
              id={`partition-btn-${parts}`}
              onClick={() => onSelectPartition(parts)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 ${btnStyles} ${
                isInteractionLocked
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer active:scale-98'
              }`}
            >
              <span className="text-2xl font-black">{parts}</span>
              <span className="text-xs mt-0.5 text-slate-600 font-medium">
                {parts === 2
                  ? '2 halves'
                  : parts === 3
                  ? '3 thirds'
                  : parts === 4
                  ? '4 fourths'
                  : parts === 5
                  ? '5 fifths'
                  : parts === 6
                  ? '6 sixths'
                  : '8 eighths'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                1/{parts} each
              </span>
              {isSelected && (
                <span
                  className={`mt-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isCorrect
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {isCorrect ? 'Matched' : 'Mismatch'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
