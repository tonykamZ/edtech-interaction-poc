import { FractionItem, CriterionEvaluation } from '../types.ts';

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
      feedbackTitle: `Correct — ${fraction.denominator} equal parts`,
      feedbackExplanation: `Each interval between marks has a unit length of 1/${fraction.denominator}.`,
      actionGuidance: `Now count from 0 using the top number of ${fraction.label}.`,
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
      feedbackTitle: `Use the bottom number`,
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
    feedbackTitle: `Try a different number of equal parts`,
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
      feedbackTitle: `Correct — you placed ${fraction.label}!`,
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
      feedbackTitle: `Start counting after 0`,
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
      feedbackTitle: `That position is one whole`,
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
      feedbackTitle: `Count ${diff} more interval${diff === 1 ? '' : 's'}`,
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
    feedbackTitle: `Move back ${diff} interval${diff === 1 ? '' : 's'}`,
    feedbackExplanation: `You counted ${selectedTick} interval${selectedTick === 1 ? '' : 's'} (${selectedTick}/${fraction.denominator}). This overshot the target fraction ${fraction.label} by ${diff} interval${diff === 1 ? '' : 's'}.`,
    actionGuidance: `Step backward ${diff} interval${diff === 1 ? '' : 's'} to select mark ${fraction.numerator}.`,
    difference: diff,
    isRepeatedError: isRepeated,
    isGuessingDetected: isGuessing,
  };
}
