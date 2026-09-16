# Participant observation — feedback visibility and recovery

## Evidence boundary

This record contains only the observations reported by the human owner. Participant identity, age, role, device, session duration, and direct quotations were not provided and are not inferred.

## Observed issues

### O-01 — Feedback was below the visible area

After an incorrect answer, the “Try again” warning appeared at the bottom of the page. The participant did not see it immediately and needed to scroll down.

- **Impact:** The participant could not promptly connect the warning with the answer that caused it.
- **Related proxy finding:** U-02, now confirmed.
- **Severity:** High for the mobile interaction.

### O-02 — Locked state lacked visible recovery guidance

After the retry sequence, the affected answer was locked, but there was no clearly visible block explaining why it was locked or what action would unlock it.

- **Impact:** The participant could not independently determine the next recovery action from the visible interface.
- **Related finding:** U-06, newly confirmed.
- **Severity:** High because it interrupts the core prompt → action → feedback → retry loop.

### O-03 — Next question retained the old scroll position

After selecting the next-question action, the participant remained at the bottom of the page instead of arriving at the new target and first step.

- **Impact:** The new task appeared to begin in the wrong place and required recovery scrolling.
- **Related finding:** U-07, confirmed.
- **Severity:** High because it affects every question transition.

### O-04 — Inactive steps added unwanted information

Step 2 was visible before Step 1 was complete. The participant had to scroll through information that was not yet actionable.

- **Impact:** The page did not clearly communicate one immediate action.
- **Related finding:** U-08, confirmed.
- **Severity:** High for first-time use on a narrow screen.

## Implemented correction

1. Render only the active step: Step 1 before a correct partition, then Step 2.
2. Present required feedback in a blocking modal within the current viewport.
3. While a repeated-error pause locks either step, keep the modal open with:
   - why the answer is temporarily locked;
   - the relevant hint; and
   - the action “I’m ready to try again.”
4. Move keyboard focus to the required feedback action and make the background inert.
5. On next question or restart, reset to the top and focus the new target heading.
6. Remove the distant bottom feedback banner.

## Acceptance criteria for the correction

- At a 375 × 812 viewport, the feedback title and next action are visible without manual scrolling after a wrong choice.
- A locked state always has a visible explanation and unlock action in the same modal.
- Activating “I’m ready to try again” unlocks the correct step and returns focus to an appropriate answer control.
- Screen readers receive the feedback through an alert or polite status announcement without duplicate messages.
- Step 2 is absent until Step 1 is complete.
- Every next-question action opens at scroll position zero with focus on the new target.
- Wrong partition, wrong position, repeated error, keyboard, successful retry, and no-horizontal-overflow checks pass.

## Recommendation

**Implemented and locally verified.** Continue usability review with the revised staged flow and record whether the participant can now identify each required action without scrolling for context.
