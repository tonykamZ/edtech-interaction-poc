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
| U-02 | High | At 375 px, Step 2 begins below the initial fold. After a correct partition, the learner may not notice that the active task has moved lower on the page. | Add an explicit “Continue to the number line” action or move focus to a concise Step 2 heading after success. Avoid an unexpected automatic jump. | Test before implementing |
| U-03 | Medium | Feedback alternates among “numerator,” “top number,” “interval,” “mark,” and “hop.” The concepts are correct, but the vocabulary load may slow an upper-primary learner. | Introduce “top number (numerator)” and “bottom number (denominator)” once, then use one consistent pair of plain-language terms. Shorten each feedback message to one explanation and one next action. | Test before implementing |
| U-04 | Low | The summary labels “total choices” and “used feedback” are neutral but may not be immediately meaningful to a child. | Try “choices made” and “items retried,” or omit the counts if participants ignore them. | Test before implementing |
| U-05 | Evaluation limit | The fixed item order and answer-revealing feedback do not show whether a correct retry transfers to a new fraction. | Keep transfer measurement outside this PoC for now; ask one verbal or paper transfer question during the study and record it as research evidence, not app telemetry. | Defer product change |

## Strengths retained

- Large partition and number-line controls are usable at the verified mobile width.
- Incorrect choices remain visually distinct without blocking recovery.
- The learner stays on the same item after an error.
- The completion screen avoids claiming mastery or long-term learning.
- No account, personal data, analytics, or recording is required.

## Recommended order

1. Run one participant session on the unchanged baseline.
2. Mark U-01 through U-04 as confirmed, contradicted, or inconclusive.
3. Implement only confirmed high- or medium-priority changes that fit the PoC.
4. Repeat the affected task path and mobile verification.

## Current recommendation

**Revise only after participant evidence.** The app is ready for an informal usability session, but the proxy review is not sufficient evidence for learner acceptance or classroom release.
