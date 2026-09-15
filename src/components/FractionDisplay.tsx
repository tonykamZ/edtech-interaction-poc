interface FractionDisplayProps {
  numerator: number;
  denominator: number;
  highlightDenominator?: boolean;
  highlightNumerator?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function FractionDisplay({
  numerator,
  denominator,
  highlightDenominator = false,
  highlightNumerator = false,
  size = 'md',
}: FractionDisplayProps) {
  const sizeClasses = {
    sm: {
      num: 'text-lg font-bold',
      den: 'text-lg font-bold',
      bar: 'w-6 border-b-2',
      container: 'text-sm',
    },
    md: {
      num: 'text-3xl font-bold',
      den: 'text-3xl font-bold',
      bar: 'w-10 border-b-2',
      container: 'text-base',
    },
    lg: {
      num: 'text-4xl font-extrabold',
      den: 'text-4xl font-extrabold',
      bar: 'w-14 border-b-[3px]',
      container: 'text-lg',
    },
  }[size];

  return (
    <div
      className="inline-flex flex-col items-center justify-center font-mono leading-none select-none"
      aria-label={`${numerator} over ${denominator}`}
    >
      <span
        className={`transition-colors duration-200 ${sizeClasses.num} ${
          highlightNumerator
            ? 'text-amber-600 underline decoration-amber-400 decoration-2 underline-offset-4'
            : 'text-slate-900'
        }`}
      >
        {numerator}
      </span>
      <div
        className={`${sizeClasses.bar} border-slate-800 my-1`}
        aria-hidden="true"
      />
      <span
        className={`transition-colors duration-200 ${sizeClasses.den} ${
          highlightDenominator
            ? 'text-indigo-600 underline decoration-indigo-400 decoration-2 underline-offset-4'
            : 'text-slate-900'
        }`}
      >
        {denominator}
      </span>
    </div>
  );
}
