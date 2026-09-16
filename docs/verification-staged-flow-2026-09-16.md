# Staged-flow verification — 2026-09-16

## Scope

Technical verification of Decision D-008 at a 375 × 812 viewport. This checks the reported flow and recovery failures; it does not replace participant confirmation.

## Results

| Check | Observed result |
| --- | --- |
| Initial information | Only the target and Step 1 are present; Step 2 is absent |
| Wrong partition | Blocking feedback appears inside the current viewport with a focused retry action |
| Modal blocking | Background sections are inert and Tab remains on the required modal action |
| Repeated partition error | Lock reason, hint, and “I’m ready to try again” are visible together |
| Unlock | Step 1 becomes available and focus returns to an answer |
| Correct partition | Step 1 is replaced by Step 2 |
| Wrong position | Blocking feedback appears inside the current viewport with a focused retry action |
| Next question | Opens at `scrollY = 0`; target heading receives focus; only Step 1 is present |
| Keyboard path | Enter activates partition, position, and next-question actions |
| Completion | All six items reach the summary |
| Mobile width | `scrollWidth` 360 remains within `innerWidth` 375 |
| Browser console | No warnings or errors reported |

## Screenshots

### Only Step 1 is initially visible

![Step 1 only](evidence/2026-09-16-staged-flow/01-step-1-only.jpg)

### Feedback appears in the current viewport

![Partition feedback modal](evidence/2026-09-16-staged-flow/02-partition-feedback-modal.jpg)

### Lock explanation and recovery action stay together

![Visible lock recovery](evidence/2026-09-16-staged-flow/03-visible-lock-recovery.jpg)

### Step 2 replaces Step 1

![Step 2 only](evidence/2026-09-16-staged-flow/04-step-2-only.jpg)

### Next question starts at the top

![Next question at top](evidence/2026-09-16-staged-flow/05-next-question-at-top.jpg)

### Completion still succeeds

![Mobile completion](evidence/2026-09-16-staged-flow/06-mobile-completion.jpg)

## Recommendation

**Continue participant review.** The reported failures are technically corrected. Ask the same participant or a comparable learner or teacher to confirm that the current action, feedback, and recovery are now immediately clear.
