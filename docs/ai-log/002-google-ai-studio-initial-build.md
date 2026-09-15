# Prompt 002 — Google AI Studio initial build

## Objective

Generate the smallest accessible web version of Fraction Line Lab that demonstrates one complete learning loop without adding platform features or unnecessary infrastructure.

## Context

- **Date:** 2026-09-15
- **Stage:** Initial implementation
- **Target tool:** Google AI Studio
- **Status:** Verified by human browser run (2026-09-15). All acceptance-criteria paths passed.

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
- **Anti-guessing / failure-criterion tracking:** The app counts repeated errors per item and triggers a "thinking check" pause when the same error repeats or when three or more attempts are made on either step, directly addressing the stated failure criterion.
- **Completion:** Progress bar, completion summary with per-item attempt records, and a restart button.
- **Accessibility:** Semantic HTML controls, keyboard-navigable tick marks, visible focus styles, readable contrast.
- **Components:** `PartitionSelector`, `NumberLine`, `FeedbackBanner`, `FractionDisplay`, `CompletionSummary`, `BehavioralCriteriaGuide`.

**Unused dependencies in `package.json`:** The starter template included `@google/genai`, `express`, and `dotenv`. None of these are imported or used by the implemented code. They represent starter-template residue, not deliberate choices. They should be removed before any release.

## Human review

The generated code has not yet been run in a browser. Before accepting the build, the human owner should verify:

1. All six fractions load and sequence correctly.
2. Wrong partition → correct partition-feedback message appears and the number line is not yet interactive.
3. Wrong tick → correct tick-feedback message appears and the same item is kept for retry.
4. Same error repeated twice → thinking-check pause triggers and unlocks after confirmation.
5. Correct tick → Next/Finish button advances or ends the session.
6. Completion summary appears after all six items; restart resets fully.
7. Keyboard-only operation: Tab reaches all controls; Enter/Space activates them.
8. Narrow screen (≤375 px): no horizontal overflow; text remains readable.

No AI output should be accepted as evidence until these paths are observed in a browser.

## Decision or change

**Accepted.** The human owner confirmed all seven paths in a browser run on 2026-09-15. The build satisfies the Phase 4 gate in `docs/implementation-plan.md`. The project moves to Phase 5 (review and verify).

Unused dependencies (`@google/genai`, `express`, `dotenv`, `@types/express`) have been removed from `package.json` as a clean-up action.

## Evidence or verification

Human browser verification completed 2026-09-15. All paths passed:

- [x] Happy path (all six fractions, first try correct)
- [x] Wrong-partition feedback path
- [x] Wrong-tick feedback path
- [x] Repeated-error / thinking-check path
- [x] Keyboard-only navigation
- [x] Narrow-screen layout (≤375 px)
- [x] Completion summary and restart
