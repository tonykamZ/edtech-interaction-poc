import { useRef, type KeyboardEvent } from 'react';
import { AlertTriangle, CheckCircle2, Layers } from 'lucide-react';

interface NumberLineProps {
  partitions: number | null;
  selectedTick: number | null;
  onSelectTick: (tickIndex: number) => void;
  interactive: boolean;
  targetNumerator: number;
  targetDenominator: number;
  isEvaluated: boolean;
  isCorrect: boolean;
  isPartitionCorrect: boolean;
  disabledDueToThinkingCheck?: boolean;
}

export function NumberLine({
  partitions,
  selectedTick,
  onSelectTick,
  interactive,
  targetNumerator,
  targetDenominator,
  isEvaluated,
  isCorrect,
  isPartitionCorrect,
  disabledDueToThinkingCheck = false,
}: NumberLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation when user is focusing the number line
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!interactive || partitions === null || disabledDueToThinkingCheck) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(partitions, index + 1);
      onSelectTick(next);
      focusTick(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prev = Math.max(0, index - 1);
      onSelectTick(prev);
      focusTick(prev);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSelectTick(0);
      focusTick(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSelectTick(partitions);
      focusTick(partitions);
    }
  };

  const focusTick = (index: number) => {
    const btn = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-tick-index="${index}"]`
    );
    btn?.focus();
  };

  const tickCount = partitions !== null ? partitions + 1 : 2;

  // Arc hop color scheme based on evaluation state
  const hopColor = isEvaluated
    ? isCorrect
      ? { stroke: '#059669', badge: 'bg-emerald-600', text: 'text-emerald-900' }
      : { stroke: '#d97706', badge: 'bg-amber-600', text: 'text-amber-900' }
    : { stroke: '#4f46e5', badge: 'bg-indigo-600', text: 'text-indigo-900' };

  return (
    <div
      ref={containerRef}
      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 select-none shadow-2xs text-left"
      id="number-line-card"
    >
      {/* Header Status & Mapping Requirements */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center">
              2
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Step 2: Choose the fraction position
            </span>
          </div>
          <div className="text-sm font-semibold text-slate-800 mt-1">
            {partitions === null ? (
              <span className="text-slate-500">
                Whole is undivided (0 to 1). Select equal parts in Step 1 to partition the line.
              </span>
            ) : !isPartitionCorrect ? (
              <span className="text-amber-800 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                These parts do not match the target fraction yet.
              </span>
            ) : (
              <span className="text-emerald-900 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Divided into {partitions} equal intervals. Each interval unit is 1/{partitions}.
              </span>
            )}
          </div>
        </div>

        {partitions !== null && isPartitionCorrect && (
          <div className="flex items-center gap-2">
            {selectedTick !== null && (
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold border ${
                  isEvaluated
                    ? isCorrect
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-indigo-100 border-indigo-300 text-indigo-800'
                }`}
              >
                {selectedTick} {selectedTick === 1 ? 'interval' : 'intervals'} counted ({selectedTick}/{partitions})
              </span>
            )}
            <span className="text-xs bg-slate-200 text-slate-800 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {partitions} equal parts
            </span>
          </div>
        )}
      </div>

      {/* Main Track with Interval Strip, Hops, and Ticks */}
      <div className="relative pt-16 pb-16 px-4 sm:px-10">
        {/* Hop Arcs Container when partitioned correctly and a tick is selected */}
        {partitions !== null && isPartitionCorrect && selectedTick !== null && (
          <div
            className="absolute inset-x-4 sm:inset-x-10 top-0 h-20 pointer-events-none"
            aria-hidden="true"
          >
            {/* 1. Counted intervals from 0 to selectedTick */}
            {selectedTick > 0 &&
              Array.from({ length: selectedTick }).map((_, i) => {
                const startPercent = (i / partitions) * 100;
                const widthPercent = (1 / partitions) * 100;
                const isOvershoot = isEvaluated && !isCorrect && i >= targetNumerator;

                return (
                  <div
                    key={`hop-seg-${i}`}
                    className="absolute bottom-0 h-16 flex flex-col items-center justify-end"
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center shadow-xs -mb-1 z-10 ${
                        isOvershoot ? 'bg-rose-600' : hopColor.badge
                      }`}
                    >
                      {i + 1}
                    </div>
                    <svg
                      className="w-full h-12 overflow-visible"
                      viewBox="0 0 100 48"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 48 Q 50 2 100 48"
                        fill="none"
                        stroke={isOvershoot ? '#e11d48' : hopColor.stroke}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray={isOvershoot ? '4 3' : 'none'}
                      />
                    </svg>
                  </div>
                );
              })}

            {/* 2. Ghost Arcs for undercount showing missing hops to target */}
            {isEvaluated &&
              !isCorrect &&
              selectedTick < targetNumerator &&
              Array.from({ length: targetNumerator - selectedTick }).map((_, j) => {
                const i = selectedTick + j;
                const startPercent = (i / partitions) * 100;
                const widthPercent = (1 / partitions) * 100;

                return (
                  <div
                    key={`missing-hop-${i}`}
                    className="absolute bottom-0 h-16 flex flex-col items-center justify-end opacity-75"
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-300 border border-slate-400 text-slate-700 text-[10px] font-bold flex items-center justify-center shadow-xs -mb-1 z-10">
                      +{j + 1}
                    </div>
                    <svg
                      className="w-full h-12 overflow-visible"
                      viewBox="0 0 100 48"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 48 Q 50 2 100 48"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                );
              })}
          </div>
        )}

        {/* Physical Equal Interval Strip (Addresses "understanding equal intervals") */}
        {partitions !== null && (
          <div
            className="absolute inset-x-4 sm:inset-x-10 -top-2 h-7 flex rounded-md overflow-hidden border border-slate-300 bg-slate-200/50"
            aria-hidden="true"
          >
            {Array.from({ length: partitions }).map((_, i) => {
              const isIncluded =
                isPartitionCorrect &&
                selectedTick !== null &&
                i < selectedTick;

              const isTargetSegment =
                isPartitionCorrect &&
                i < targetNumerator;

              let segmentBg = 'bg-white/80 border-r border-slate-300 text-slate-600';
              if (isIncluded) {
                if (isEvaluated && !isCorrect && i >= targetNumerator) {
                  segmentBg = 'bg-rose-100 border-r border-rose-300 text-rose-800 font-bold';
                } else if (isEvaluated && isCorrect) {
                  segmentBg = 'bg-emerald-100 border-r border-emerald-300 text-emerald-900 font-bold';
                } else if (isEvaluated && !isCorrect) {
                  segmentBg = 'bg-amber-100 border-r border-amber-300 text-amber-900 font-bold';
                } else {
                  segmentBg = 'bg-indigo-100 border-r border-indigo-300 text-indigo-900 font-bold';
                }
              }

              return (
                <div
                  key={`interval-block-${i}`}
                  className={`flex-1 flex items-center justify-center text-[10px] font-mono transition-colors ${segmentBg}`}
                  title={`Interval ${i + 1} of ${partitions} (size 1/${partitions})`}
                >
                  <span className="hidden sm:inline">1/{partitions}</span>
                  <span className="sm:hidden">⅟{partitions}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Horizontal Number Line Bar */}
        <div className="relative h-2.5 bg-slate-300 rounded-full my-4 flex items-center">
          {/* Highlighted segment from 0 to selectedTick */}
          {partitions !== null && isPartitionCorrect && selectedTick !== null && selectedTick > 0 && (
            <div
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-200 ${
                isEvaluated
                  ? isCorrect
                    ? 'bg-emerald-500'
                    : 'bg-amber-500'
                  : 'bg-indigo-500'
              }`}
              style={{ width: `${(selectedTick / partitions) * 100}%` }}
            />
          )}

          {/* Left Arrow Tip */}
          <div
            className="absolute -left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-slate-700 -rotate-45"
            aria-hidden="true"
          />

          {/* Right Arrow Tip */}
          <div
            className="absolute -right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-slate-700 rotate-45"
            aria-hidden="true"
          />

          {/* Ticks and interactive targets */}
          {partitions !== null ? (
            Array.from({ length: tickCount }).map((_, i) => {
              const leftPercent = (i / partitions) * 100;
              const isSelected = selectedTick === i;

              // Visual styling for tick pin
              let pinBg = 'bg-white border-slate-400 text-slate-700';
              if (isSelected) {
                if (isEvaluated) {
                  pinBg = isCorrect
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-md ring-4 ring-emerald-200'
                    : 'bg-amber-600 border-amber-700 text-white shadow-md ring-4 ring-amber-200';
                } else {
                  pinBg = 'bg-indigo-600 border-indigo-700 text-white shadow-md ring-4 ring-indigo-200';
                }
              }

              const tickAriaLabel =
                i === 0
                  ? '0 (zero)'
                  : i === partitions
                  ? `1 whole (${partitions}/${partitions})`
                  : `Mark ${i}: fraction ${i}/${partitions}`;

              return (
                <div
                  key={`tick-mark-${i}`}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${leftPercent}%` }}
                >
                  {/* Vertical line through track */}
                  <div
                    className={`w-1 rounded-full transition-all ${
                      i === 0 || i === partitions ? 'h-8 bg-slate-800' : 'h-6 bg-slate-500'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Interactive Button Pin with >= 44px hit area */}
                  <button
                    type="button"
                    data-tick-index={i}
                    onClick={() =>
                      interactive &&
                      !disabledDueToThinkingCheck &&
                      onSelectTick(i)
                    }
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    disabled={!interactive || disabledDueToThinkingCheck}
                    aria-label={tickAriaLabel}
                    aria-pressed={isSelected}
                    id={`tick-btn-${i}`}
                    className={`group absolute -top-11 w-12 h-12 flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                      interactive && !disabledDueToThinkingCheck
                        ? 'cursor-pointer hover:scale-110 active:scale-95'
                        : 'cursor-not-allowed opacity-60'
                    }`}
                  >
                    {/* Circle Pin Marker */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${pinBg}`}
                    >
                      {i}
                    </div>
                  </button>

                  {/* Fractional Label Underneath */}
                  <div
                    className="mt-4 flex flex-col items-center text-center font-mono leading-tight select-none"
                    aria-hidden="true"
                  >
                    {i === 0 ? (
                      <span className="text-base font-extrabold text-slate-900">0</span>
                    ) : i === partitions ? (
                      <div className="flex flex-col items-center">
                        <span className="text-base font-extrabold text-slate-900">1</span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {partitions}/{partitions}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span
                          className={`text-sm font-bold ${
                            isSelected ? 'text-indigo-900 font-black' : 'text-slate-800'
                          }`}
                        >
                          {i}
                        </span>
                        <span className="w-4 border-b border-slate-700 my-0.5" />
                        <span
                          className={`text-sm font-bold ${
                            isSelected ? 'text-indigo-900 font-black' : 'text-slate-800'
                          }`}
                        >
                          {partitions}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* Unpartitioned State: 0 and 1 only */
            <>
              <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1 h-8 bg-slate-800 rounded-full" />
                <span className="mt-4 text-base font-extrabold text-slate-900 font-mono">0</span>
              </div>
              <div className="absolute left-full -translate-x-1/2 flex flex-col items-center">
                <div className="w-1 h-8 bg-slate-800 rounded-full" />
                <span className="mt-4 text-base font-extrabold text-slate-900 font-mono">1</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Guidance footnote explaining equal intervals & retry experience */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
        <span>
          {partitions === null ? (
            'Awaiting Step 1: Select the number of equal parts above.'
          ) : !isPartitionCorrect ? (
            <strong className="text-amber-800 font-semibold">
              ⚠️ Try Step 1 again before choosing a position.
            </strong>
          ) : interactive ? (
            '💡 Click or tap a mark, or use keyboard ← → arrow keys. The colored bar shows your accumulated equal intervals.'
          ) : (
            'Mark verified! Click "Next Fraction" below to advance.'
          )}
        </span>
        {partitions !== null && isPartitionCorrect && (
          <span className="font-mono text-slate-700 font-medium">
            Each interval block = 1/{partitions}
          </span>
        )}
      </div>
    </div>
  );
}
