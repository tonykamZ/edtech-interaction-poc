import {
  FractionItem,
  CriterionEvaluation,
  BehavioralRequirementSpec,
} from '../types.ts';

export const BEHAVIORAL_REQUIREMENTS: BehavioralRequirementSpec[] = [
  {
    id: 'req-partition-mapping',
    title: 'Denominator Partition Mapping (Equal Interval Size)',
    mappingDefinition:
      'The number of equal intervals P between 0 and 1 must map 1:1 to the target fraction denominator D (P = D).',
    failureCriterion:
      'If P ≠ D, identify a Denominator Misunderstanding (e.g. numerator/denominator role confusion or incorrect interval count). Prevent tick placement until equal intervals match D.',
    retryBehavior:
      'Immediate in-place retry with diagnostic feedback. If repeated error or guessing occurs, trigger a Formative Thinking Check.',
  },
  {
    id: 'req-numerator-mapping',
    title: 'Numerator Interval-Count Mapping (Distance from 0)',
    mappingDefinition:
      'The mark position k corresponds to counting k intervals of size 1/D from 0 (k = N).',
    failureCriterion:
      'If k ≠ N, identify an Interval Count Misunderstanding (under-count, over-count, or endpoint confusion).',
    retryBehavior:
      'Immediate in-place retry: visually highlight counted vs. remaining intervals without resetting partitions.',
  },
  {
    id: 'req-advancement',
    title: 'Advancement & Anti-Guessing Guard (Shute 2008)',
    mappingDefinition:
      'Advance to next fraction only when both mapping criteria (P = D) ∧ (k = N) are satisfied through understanding equal intervals.',
    failureCriterion:
      'Learners must not advance via blind guessing or uncorrected repeated errors.',
    retryBehavior:
      'Targeted formative feedback scaffolds reasoning before unlocking progress.',
  },
];

export function evaluatePartition(
  selectedParts: number,
  fraction: FractionItem,
  previousPartitionAttempts: number[] = []
): CriterionEvaluation {
  const isRepeated = previousPartitionAttempts.includes(selectedParts);
  const isGuessing = previousPartitionAttempts.length >= 2; // on 3rd attempt

  if (selectedParts === fraction.denominator) {
    return {
      type: 'partition_matched',
      category: 'none',
      criterionTitle: `Denominator Criterion Met: P = D (${fraction.denominator} equal parts)`,
      mappingRule: `Denominator Mapping: Denominator ${fraction.denominator} divides 1 whole into ${fraction.denominator} equal intervals of size 1/${fraction.denominator}.`,
      failureObserved: false,
      feedbackTitle: `Correct Partition: Divided into ${fraction.denominator} Equal Intervals`,
      feedbackExplanation: `Each interval between marks has a unit length of 1/${fraction.denominator}.`,
      actionGuidance: `Now proceed to Step 2: count and select mark ${fraction.numerator} to place ${fraction.label}.`,
    };
  }

  // Check for inverted fraction misunderstanding (chose numerator instead of denominator)
  if (selectedParts === fraction.numerator && fraction.numerator !== fraction.denominator) {
    return {
      type: 'partition_inverted',
      category: 'denominator_misunderstanding',
      criterionTitle: `Denominator Misunderstanding: Inverted Numerator and Denominator`,
      mappingRule: `Denominator Mapping: The bottom number (denominator D = ${fraction.denominator}) determines how many equal parts divide the whole, NOT the top number (numerator N = ${fraction.numerator}).`,
      failureObserved: true,
      feedbackTitle: `Misunderstanding: You chose the numerator (${fraction.numerator}) instead of the denominator (${fraction.denominator})`,
      feedbackExplanation: `You divided the line into ${selectedParts} parts because the numerator is ${fraction.numerator}. Remember: the denominator (${fraction.denominator}) tells us how many equal parts make the whole. The numerator (${fraction.numerator}) will tell us how many of those parts to count in Step 2.`,
      actionGuidance: `Select ${fraction.denominator} equal parts to divide the whole according to the denominator.`,
      difference: Math.abs(selectedParts - fraction.denominator),
      isRepeatedError: isRepeated,
      isGuessingDetected: isGuessing,
    };
  }

  // General denominator mismatch
  return {
    type: 'partition_mismatch',
    category: 'denominator_misunderstanding',
    criterionTitle: `Denominator Misunderstanding: Partition Count P = ${selectedParts} ≠ Denominator D = ${fraction.denominator}`,
    mappingRule: `Denominator Mapping: The denominator defines the total equal intervals in 1 whole. Target fraction ${fraction.label} requires D = ${fraction.denominator} equal parts.`,
    failureObserved: true,
    feedbackTitle: `Denominator Misunderstanding: ${selectedParts} parts makes intervals of 1/${selectedParts}`,
    feedbackExplanation: `Dividing the whole into ${selectedParts} parts creates intervals that are ${
      selectedParts < fraction.denominator ? 'too large' : 'too small'
    } (each is 1/${selectedParts}). Target fraction ${fraction.label} requires ${fraction.denominator} equal parts so each interval is 1/${fraction.denominator}.`,
    actionGuidance: `Select ${fraction.denominator} equal parts to create the correct interval size of 1/${fraction.denominator}.`,
    difference: Math.abs(selectedParts - fraction.denominator),
    isRepeatedError: isRepeated,
    isGuessingDetected: isGuessing,
  };
}

export function evaluateTick(
  selectedTick: number,
  fraction: FractionItem,
  previousTickAttempts: number[] = []
): CriterionEvaluation {
  const isRepeated = previousTickAttempts.includes(selectedTick);
  const isGuessing = previousTickAttempts.length >= 2;

  if (selectedTick === fraction.numerator) {
    return {
      type: 'tick_matched',
      category: 'none',
      criterionTitle: `Position Criterion Met: k = N (${fraction.numerator} interval${fraction.numerator === 1 ? '' : 's'})`,
      mappingRule: `Numerator Mapping: Count ${fraction.numerator} interval${fraction.numerator === 1 ? '' : 's'} of size 1/${fraction.denominator} from 0.`,
      failureObserved: false,
      feedbackTitle: `Interval Count Correct: Placed ${fraction.label}!`,
      feedbackExplanation: `You accurately counted ${fraction.numerator} interval${fraction.numerator === 1 ? '' : 's'} of size 1/${fraction.denominator} from 0. Mark ${fraction.numerator} represents ${fraction.label} (${fraction.wordName}).`,
      actionGuidance: `Both behavioral criteria satisfied! Click "Next Fraction" to advance.`,
    };
  }

  if (selectedTick === 0) {
    return {
      type: 'tick_zero',
      category: 'interval_count_misunderstanding',
      criterionTitle: `Interval Count Misunderstanding: Mark 0 = 0 intervals counted`,
      mappingRule: `Numerator Mapping: Mark 0 represents 0/${fraction.denominator} (the starting point, 0 intervals counted).`,
      failureObserved: true,
      feedbackTitle: `Interval Count Misunderstanding: Mark 0 represents 0/${fraction.denominator}`,
      feedbackExplanation: `Selecting mark 0 counts 0 intervals. The numerator is ${fraction.numerator}, which requires counting ${fraction.numerator} interval hop${fraction.numerator === 1 ? '' : 's'} to the right of 0.`,
      actionGuidance: `Count forward ${fraction.numerator} interval${fraction.numerator === 1 ? '' : 's'} from 0 and select mark ${fraction.numerator}.`,
      difference: fraction.numerator,
      isRepeatedError: isRepeated,
      isGuessingDetected: isGuessing,
    };
  }

  if (selectedTick === fraction.denominator) {
    return {
      type: 'tick_whole',
      category: 'interval_count_misunderstanding',
      criterionTitle: `Interval Count Misunderstanding: Mark ${fraction.denominator} represents 1 Whole (${fraction.denominator}/${fraction.denominator})`,
      mappingRule: `Numerator Mapping: Mark ${fraction.denominator} is 1 whole (${fraction.denominator}/${fraction.denominator}).`,
      failureObserved: true,
      feedbackTitle: `Interval Count Misunderstanding: 1 Whole is too far`,
      feedbackExplanation: `You selected 1 whole (${fraction.denominator}/${fraction.denominator}), which counts all ${fraction.denominator} intervals. The fraction ${fraction.label} requires only ${fraction.numerator} interval${fraction.numerator === 1 ? '' : 's'}.`,
      actionGuidance: `Count only ${fraction.numerator} interval${fraction.numerator === 1 ? '' : 's'} from 0 and select mark ${fraction.numerator}.`,
      difference: fraction.denominator - fraction.numerator,
      isRepeatedError: isRepeated,
      isGuessingDetected: isGuessing,
    };
  }

  if (selectedTick < fraction.numerator) {
    const diff = fraction.numerator - selectedTick;
    return {
      type: 'tick_undercount',
      category: 'interval_count_misunderstanding',
      criterionTitle: `Interval Count Misunderstanding: Under-count (counted ${selectedTick} of ${fraction.numerator} intervals)`,
      mappingRule: `Numerator Mapping: Counted ${selectedTick} interval${selectedTick === 1 ? '' : 's'} (${selectedTick}/${fraction.denominator}), but target fraction ${fraction.label} requires ${fraction.numerator} intervals.`,
      failureObserved: true,
      feedbackTitle: `Interval Count Misunderstanding: Under-counted by ${diff} interval${diff === 1 ? '' : 's'}`,
      feedbackExplanation: `You counted ${selectedTick} interval${selectedTick === 1 ? '' : 's'} of size 1/${fraction.denominator} (${selectedTick}/${fraction.denominator}). To reach ${fraction.label}, you need ${diff} more interval${diff === 1 ? '' : 's'}.`,
      actionGuidance: `Count forward ${diff} more interval${diff === 1 ? '' : 's'} from mark ${selectedTick} to reach mark ${fraction.numerator}.`,
      difference: diff,
      isRepeatedError: isRepeated,
      isGuessingDetected: isGuessing,
    };
  }

  // selectedTick > fraction.numerator
  const diff = selectedTick - fraction.numerator;
  return {
    type: 'tick_overcount',
    category: 'interval_count_misunderstanding',
    criterionTitle: `Interval Count Misunderstanding: Over-count (counted ${selectedTick} instead of ${fraction.numerator} intervals)`,
    mappingRule: `Numerator Mapping: Counted ${selectedTick} interval${selectedTick === 1 ? '' : 's'} (${selectedTick}/${fraction.denominator}), exceeding the ${fraction.numerator} required by ${diff}.`,
    failureObserved: true,
    feedbackTitle: `Interval Count Misunderstanding: Over-counted by ${diff} interval${diff === 1 ? '' : 's'}`,
    feedbackExplanation: `You counted ${selectedTick} interval${selectedTick === 1 ? '' : 's'} (${selectedTick}/${fraction.denominator}). This overshot the target fraction ${fraction.label} by ${diff} interval${diff === 1 ? '' : 's'}.`,
    actionGuidance: `Step backward ${diff} interval${diff === 1 ? '' : 's'} to select mark ${fraction.numerator}.`,
    difference: diff,
    isRepeatedError: isRepeated,
    isGuessingDetected: isGuessing,
  };
}
