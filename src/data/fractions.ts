import { FractionItem } from '../types.ts';

export const FIXED_FRACTION_SET: FractionItem[] = [
  {
    id: 'f1',
    numerator: 1,
    denominator: 2,
    label: '1/2',
    isUnitFraction: true,
    wordName: 'one half',
  },
  {
    id: 'f2',
    numerator: 1,
    denominator: 3,
    label: '1/3',
    isUnitFraction: true,
    wordName: 'one third',
  },
  {
    id: 'f3',
    numerator: 2,
    denominator: 3,
    label: '2/3',
    isUnitFraction: false,
    wordName: 'two thirds',
  },
  {
    id: 'f4',
    numerator: 1,
    denominator: 4,
    label: '1/4',
    isUnitFraction: true,
    wordName: 'one fourth',
  },
  {
    id: 'f5',
    numerator: 3,
    denominator: 4,
    label: '3/4',
    isUnitFraction: false,
    wordName: 'three fourths',
  },
  {
    id: 'f6',
    numerator: 5,
    denominator: 6,
    label: '5/6',
    isUnitFraction: false,
    wordName: 'five sixths',
  },
];

export const PARTITION_CHOICES = [2, 3, 4, 5, 6, 8];
