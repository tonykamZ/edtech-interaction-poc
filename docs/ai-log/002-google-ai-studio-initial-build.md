# Prompt 002 — Google AI Studio initial build

## Objective

Generate the smallest accessible web version of Fraction Line Lab that demonstrates one complete learning loop without adding platform features or unnecessary infrastructure.

## Context

- **Date:** 2026-09-15
- **Stage:** Initial implementation
- **Target tool:** Google AI Studio
- **Status:** Generated build reviewed and simplified; informal human usability review pending.

## Prompt

> Build a small responsive web PoC called **Fraction Line Lab** for upper-primary learners.
>
> **Learning objective:** Learners place unit and non-unit fractions from 0 to 1 on a number line by dividing the whole into equal intervals.
>
> **Research basis:** Shute (2008), *Focus on Formative Feedback*: feedback should be timely and specific enough to help learners correct their thinking.
>
> **Design mapping:** The learner partitions a 0–1 number line and places a fraction; after an error, the app identifies whether the denominator or interval count was misunderstood and allows an immediate retry.
>
> **Failure check:** The idea is failing if learners repeat the same error after targeted feedback or can finish mainly through guessing rather than understanding equal intervals.
>
> Create one simple screen and one complete loop:
>
> 1. Show a target fraction from this fixed local set: 1/2, 1/3, 2/3, 1/4, 3/4, 5/6.
> 2. Ask the learner to choose how many equal parts the line needs.
> 3. Draw the partitioned 0–1 number line and let the learner select a tick using mouse, touch, or keyboard.
> 4. Give immediate specific feedback. For a wrong partition, explain that the denominator is the number of equal parts. For a wrong tick, highlight the counted intervals and let the learner retry the same item.
> 5. Advance only after a correct answer, show progress, then show a small completion summary with a restart button.
>
> Keep the implementation minimal: use the simplest React setup available, local static data, and deterministic logic. Make it accessible with semantic controls, visible keyboard focus, readable contrast, and no drag-only interaction. Make it friendly and polished enough for a five-minute demo.
>
> Do not add a backend, database, login, analytics, content editor, voice, Gemini/API calls, persistence, or extra packages unless the existing starter already requires them. Do not build features outside this learning loop.

## Output summary

A complete React + Vite + TypeScript application was generated. The implementation covers the full learning loop as specified:

- **Data:** Six fixed local fractions (`1/2`, `1/3`, `2/3`, `1/4`, `3/4`, `5/6`) in `src/data/fractions.ts`. No backend or runtime AI.
- **Interaction flow:** Partition selector → number-line tick selection → feedback → retry or advance.
- **Feedback specificity:** Two diagnostic categories are implemented (`denominator_misunderstanding`, `interval_count_misunderstanding`). Wrong-partition errors explain equal parts; wrong-tick errors highlight the counted intervals.
- **Repeated-error tracking:** The app counts repeated attempts and shows a short pause-and-check scaffold. This supports retry but does not prove that guessing was prevented.
- **Completion:** Progress bar, completion summary with per-item attempt records, and a restart button.
- **Accessibility:** Semantic HTML controls, keyboard-navigable tick marks, visible focus styles, readable contrast.
- **Components:** `PartitionSelector`, `NumberLine`, `FeedbackBanner`, `FractionDisplay`, and `CompletionSummary`.

Unused starter-template dependencies were removed during review. The final app has no backend or runtime AI dependency.

## Human review

Codex reviewed the generated code and browser behaviour. The human owner approved a focused simplification pass to remove answer-revealing guidance, learner-facing research jargon, and unsupported completion claims. Informal review with learners or teachers remains.

- [x] All six fractions load and sequence correctly.
- [x] Wrong partition shows specific feedback and keeps number-line selection locked.
- [x] Wrong tick shows specific feedback and keeps the same item available for retry.
- [x] Repeating the same error shows the pause-and-check scaffold and unlocks after confirmation.
- [x] A correct tick enables the next-item or summary action.
- [x] Completion appears after all six items and restart resets the activity.
- [x] Keyboard activation advances the partition, tick, and next-item controls.
- [ ] Independently observe the layout at 375 px or narrower.

The remaining accessibility checks and informal usability review must not be reported as complete until observed.

## Decision or change

**Revised.** The core Fraction Line Lab interaction was retained. The generated diagnostic dashboard was removed from the learner experience, feedback language was simplified, completion claims were limited to observed session results, and unused dependencies were removed. See Decisions D-006 and D-007.

## Evidence or verification

Local verification completed 2026-09-15:

- [x] Clean dependency installation with no reported vulnerabilities
- [x] Type-check (`npm run lint`)
- [x] Production build (`npm run build`)
- [x] Happy path through all six fractions
- [x] Wrong-partition feedback path
- [x] Wrong-tick feedback path
- [x] Repeated-error pause and unlock
- [x] Completion summary and restart
- [ ] Informal upper-primary learner or teacher usability review
