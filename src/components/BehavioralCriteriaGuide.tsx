import { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Brain,
} from 'lucide-react';
import { FractionItem } from '../types.ts';

interface BehavioralCriteriaGuideProps {
  currentFraction: FractionItem;
  selectedParts: number | null;
  selectedTick: number | null;
  isPartitionCorrect: boolean;
  isTickCorrect: boolean;
}

export function BehavioralCriteriaGuide({
  currentFraction,
  selectedParts,
  selectedTick,
  isPartitionCorrect,
  isTickCorrect,
}: BehavioralCriteriaGuideProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Status computation for live criteria verification
  const partitionStatus =
    selectedParts === null
      ? 'pending'
      : isPartitionCorrect
      ? 'satisfied'
      : 'failed';

  const tickStatus =
    selectedParts === null || !isPartitionCorrect
      ? 'locked'
      : selectedTick === null
      ? 'pending'
      : isTickCorrect
      ? 'satisfied'
      : 'failed';

  return (
    <div
      className="w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition-all text-left"
      id="behavioral-criteria-panel"
    >
      {/* Header bar that toggles explanation */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls="criteria-details"
        id="criteria-toggle-btn"
        className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors border-b border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Formative Feedback & Failure Check Specification (Shute, 2008)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Status Indicators */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span
              className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                partitionStatus === 'satisfied'
                  ? 'bg-emerald-100 text-emerald-800'
                  : partitionStatus === 'failed'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Denominator: {partitionStatus.toUpperCase()}
            </span>
            <span
              className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                tickStatus === 'satisfied'
                  ? 'bg-emerald-100 text-emerald-800'
                  : tickStatus === 'failed'
                  ? 'bg-amber-100 text-amber-800'
                  : tickStatus === 'locked'
                  ? 'bg-slate-100 text-slate-400'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Interval Count: {tickStatus.toUpperCase()}
            </span>
          </div>

          <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
            {isExpanded ? (
              <>
                Hide Specification <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View Research Basis <ChevronDown className="w-4 h-4" />
              </>
            )}
          </span>
        </div>
      </button>

      {/* Expanded Content Details */}
      {isExpanded && (
        <div id="criteria-details" className="p-4 sm:p-5 space-y-4 bg-slate-50 text-xs sm:text-sm">
          {/* Research Basis Banner */}
          <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-950 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-extrabold text-indigo-950">
                Research Basis: Shute (2008), <em>Focus on Formative Feedback</em>
              </p>
              <p className="text-xs text-indigo-900 leading-relaxed">
                Feedback should be timely and specific enough to help learners correct their thinking. The system diagnoses whether the <strong>denominator</strong> (equal interval size) or <strong>interval count</strong> (numerator distance from 0) was misunderstood, enabling targeted in-place retry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Requirement 1 Card: Denominator */}
            <div
              className={`p-4 rounded-xl border-2 transition-all ${
                partitionStatus === 'satisfied'
                  ? 'bg-white border-emerald-300 shadow-2xs'
                  : partitionStatus === 'failed'
                  ? 'bg-amber-50/60 border-amber-300 shadow-2xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900">
                  1. Denominator (P = D)
                </span>
                {partitionStatus === 'satisfied' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Satisfied
                  </span>
                ) : partitionStatus === 'failed' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3.5 h-3.5" /> Failure
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Pending
                  </span>
                )}
              </div>

              <dl className="space-y-1.5 text-xs">
                <div>
                  <dt className="font-semibold text-slate-700">Design Mapping:</dt>
                  <dd className="text-slate-600">
                    Denominator D ({currentFraction.denominator}) specifies {currentFraction.denominator} equal intervals of length 1/{currentFraction.denominator} in 1 whole.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-amber-900">Misunderstanding Flag:</dt>
                  <dd className="text-amber-800">
                    P ≠ {currentFraction.denominator}. Identifies whether learner inverted N and D or chose improper interval count.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Requirement 2 Card: Numerator */}
            <div
              className={`p-4 rounded-xl border-2 transition-all ${
                tickStatus === 'satisfied'
                  ? 'bg-white border-emerald-300 shadow-2xs'
                  : tickStatus === 'failed'
                  ? 'bg-amber-50/60 border-amber-300 shadow-2xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900">
                  2. Interval Count (k = N)
                </span>
                {tickStatus === 'satisfied' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Satisfied
                  </span>
                ) : tickStatus === 'failed' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3.5 h-3.5" /> Failure
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {tickStatus === 'locked' ? 'Awaiting Step 1' : 'Awaiting Mark'}
                  </span>
                )}
              </div>

              <dl className="space-y-1.5 text-xs">
                <div>
                  <dt className="font-semibold text-slate-700">Design Mapping:</dt>
                  <dd className="text-slate-600">
                    Numerator N ({currentFraction.numerator}) specifies accumulating {currentFraction.numerator} unit intervals of 1/{currentFraction.denominator} from 0.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-amber-900">Misunderstanding Flag:</dt>
                  <dd className="text-amber-800">
                    k ≠ {currentFraction.numerator}. Diagnoses under-counting, over-shooting, or mark-counting confusion.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Requirement 3 Card: Failure Check & Anti-Guessing */}
            <div className="p-4 rounded-xl border-2 bg-white border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  3. Failure Check Guard
                </span>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Anti-Guessing
                </span>
              </div>

              <dl className="space-y-1.5 text-xs">
                <div>
                  <dt className="font-semibold text-slate-700">Failure Check Criteria:</dt>
                  <dd className="text-slate-600">
                    Flagged if learners repeat the same error after targeted feedback or finish through guessing rather than equal intervals.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-900">Intervention:</dt>
                  <dd className="text-indigo-800">
                    Activates Formative Thinking Check on repeated errors or 3+ misses, surfacing physical interval blocks.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
