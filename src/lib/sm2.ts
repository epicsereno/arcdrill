/** SuperMemo-2 spaced-repetition algorithm. */

export const GRADES = ["again", "hard", "good", "easy"] as const;
export type Grade = (typeof GRADES)[number];

/** Quality scores. Again fails; Hard / Good / Easy pass. */
const QUALITY: Record<Grade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

export type Sm2State = {
  easiness: number;
  intervalDays: number;
  repetitions: number;
};

export type Sm2Result = Sm2State & { dueAt: Date };

/**
 * Classic SM-2. Quality < 3 resets the card; otherwise the interval grows
 * by the easiness factor. EF never drops below 1.3.
 */
export function applySm2(
  state: Sm2State,
  grade: Grade,
  now = new Date(),
): Sm2Result {
  const q = QUALITY[grade];
  const easiness = Math.max(
    1.3,
    state.easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
  );

  let intervalDays: number;
  let repetitions: number;

  if (q < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (state.repetitions === 0) intervalDays = 1;
    else if (state.repetitions === 1) intervalDays = 6;
    else intervalDays = Math.max(1, Math.round(state.intervalDays * easiness));
    repetitions = state.repetitions + 1;
  }

  return {
    easiness,
    intervalDays,
    repetitions,
    dueAt: new Date(now.getTime() + intervalDays * 86_400_000),
  };
}
