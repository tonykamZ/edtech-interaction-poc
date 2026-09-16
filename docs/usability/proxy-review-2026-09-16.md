# Proxy usability review — 2026-09-16

## Status and evidence boundary

This is an expert cognitive walkthrough performed without a learner or teacher participant. It can identify plausible usability risks, but it cannot establish what the target audience actually understands or prefers. Every proposed improvement below remains a hypothesis until observed in the participant session.

## Method

The review used the complete interaction path and the 375 × 812 evidence set. Each stage was considered using four questions:

1. Will a first-time learner know what to do next?
2. Can they find and operate the relevant control?
3. Will they connect the feedback with their previous choice?
4. Can they recover without facilitator instruction?

## Findings and proposed improvements

| ID | Priority | Evidence from the current build | Improvement hypothesis | Status |
| --- | --- | --- | --- | --- |
| U-01 | High | On the first wrong partition or position, feedback states the exact correct part count or mark. A learner can copy the answer without demonstrating the equal-interval idea. | Use graduated feedback: the first error gives a conceptual cue; a repeated error may reveal the exact count or mark. | Test before implementing |
| U-02 | High | At 375 px, the feedback area fell below the current viewport. A human-reported observation confirmed that the participant did not see the “Try again” warning until scrolling. | Present required feedback in a blocking modal within the current viewport and move focus to its action. | Implemented; locally verified |
| U-03 | Medium | Feedback alternates among “numerator,” “top number,” “interval,” “mark,” and “hop.” The concepts are correct, but the vocabulary load may slow an upper-primary learner. | Introduce “top number (numerator)” and “bottom number (denominator)” once, then use one consistent pair of plain-language terms. Shorten each feedback message to one explanation and one next action. | Test before implementing |
| U-04 | Low | The summary labels “total choices” and “used feedback” are neutral but may not be immediately meaningful to a child. | Try “choices made” and “items retried,” or omit the counts if participants ignore them. | Test before implementing |
| U-05 | Evaluation limit | The fixed item order and answer-revealing feedback do not show whether a correct retry transfers to a new fraction. | Keep transfer measurement outside this PoC for now; ask one verbal or paper transfer question during the study and record it as research evidence, not app telemetry. | Defer product change |
| U-06 | High | After “Try again,” the affected answer could be locked while the reason and unlock action remained in the distant feedback area. The participant could not see why the answer was locked or what action would unlock it. | Keep the lock explanation, hint, and unlock action together in the blocking feedback modal. | Implemented; locally verified |
| U-07 | High | Selecting “Next Fraction” retained the previous bottom-of-page scroll position, so the next question opened away from its target and first action. | Reset scroll to the top and move focus to the new target heading whenever the question advances or restarts. | Implemented; locally verified |
| U-08 | High | Step 2 was visible before Step 1 was complete, increasing information density and making the current action less obvious. | Render only the active step: Step 1 first, then replace it with Step 2 after the correct partition. | Implemented; locally verified |

## Strengths retained

- Large partition and number-line controls are usable at the verified mobile width.
- Incorrect choices remain visually distinct without blocking recovery.
- The learner stays on the same item after an error.
- The completion screen avoids claiming mastery or long-term learning.
- No account, personal data, analytics, or recording is required.

## Recommended order

1. Continue the participant session on the revised flow.
2. Confirm that U-02, U-06, U-07, and U-08 are resolved for a learner or teacher.
3. Test U-01, U-03, and U-04 without expanding the activity scope.
4. Implement only additional findings accepted by the human owner.

## Current recommendation

**Continue usability review.** The confirmed flow and recovery issues were corrected and locally verified; human confirmation of the revised interaction remains.
