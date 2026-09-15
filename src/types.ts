export interface FractionItem {
  id: string;
  numerator: number;
  denominator: number;
  label: string; // e.g. "1/2"
  isUnitFraction: boolean;
  wordName: string; // e.g. "one half", "two thirds"
}

export type MisunderstandingCategory =
  | 'none'
  | 'denominator_misunderstanding'
  | 'interval_count_misunderstanding';

export type FailureCriterionType =
  | 'none'
  | 'partition_mismatch'
  | 'partition_inverted' // picked numerator as denominator
  | 'partition_matched'
  | 'tick_undercount'
  | 'tick_overcount'
  | 'tick_zero'
  | 'tick_whole'
  | 'tick_matched';

export interface CriterionEvaluation {
  type: FailureCriterionType;
  category: MisunderstandingCategory;
  criterionTitle: string;
  mappingRule: string;
  failureObserved: boolean;
  feedbackTitle: string;
  feedbackExplanation: string;
  actionGuidance: string;
  difference?: number; // e.g. how many intervals away
  isRepeatedError?: boolean;
  isGuessingDetected?: boolean;
}

export interface BehavioralRequirementSpec {
  id: string;
  title: string;
  mappingDefinition: string;
  failureCriterion: string;
  retryBehavior: string;
}

export interface ItemAttemptRecord {
  fractionId: string;
  label: string;
  firstTryPartitionSuccess: boolean;
  firstTryTickSuccess: boolean;
  partitionAttempts: number[];
  tickAttempts: number[];
  repeatedErrors: number;
  guessingTriggered: boolean;
  thinkingCheckRequired: boolean;
  mastered: boolean;
}
