# Technical Note — Fraction Line Lab

- **Project:** EdTech Interaction PoC
- **Date:** 2026-09-16
- **Status:** Phase 5 — revised interaction locally verified; human confirmation and final demonstration pending

---

## 1. Learning source

**Valerie J. Shute, "Focus on Formative Feedback,"** *Review of Educational Research* 78(1), 2008.  
DOI: [10.3102/0034654307313795](https://doi.org/10.3102/0034654307313795)

The relevant claim: formative feedback should be **timely and specific enough** to help learners modify their thinking or behaviour. Generic right/wrong responses are less effective than targeted guidance that identifies the specific misconception.

**Curriculum alignment:** Common Core Mathematics [3.NF.A.2](https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf) — represent a fraction on a number-line diagram by defining the interval from 0 to 1 as the whole, partitioning it into equal parts, and locating the fraction at its correct position.

---

## 2. What was built

A small responsive web app — **Fraction Line Lab** — for upper-primary learners.

**One complete learning loop:**

1. The app shows a target fraction (one of six fixed local items: 1/2, 1/3, 2/3, 1/4, 3/4, 5/6) with Step 1 as the only active task.
2. The learner selects how many equal parts the whole needs (partition step, maps to the denominator).
3. A correct partition replaces Step 1 with Step 2, where the learner selects a position on the number line (maps to the numerator).
4. Required feedback appears in a blocking dialog within the current viewport. It distinguishes a wrong partition from a wrong interval count and keeps retry or unlock guidance beside the explanation.
5. Advance is allowed only after both steps are correct. Each next question resets to its target and Step 1; a summary and restart button appear after all six items.

**Repeated-error pause:** If the same error is repeated, or if three or more attempts are made on either step, a blocking “pause and check” dialog explains the lock and provides the action required to retry. This is a scaffold, not proof that guessing has been prevented.

**Stack:** React 19 + Vite 6 + TypeScript + Tailwind CSS v4. Fully local — no backend, database, account, analytics, runtime AI, or network request.

**Locally verified paths (2026-09-15 to 2026-09-16):** clean dependency installation, type-check, production build, six-item completion, wrong-partition and wrong-position feedback, repeated-error lock and recovery, keyboard activation and modal focus containment, next-question top reset, completion, restart, and a 375 × 812 staged mobile flow without horizontal overflow or console errors.

---

## 3. What the model drafted

The initial build was generated from a single prompt submitted to Google AI Studio (see [`docs/ai-log/002`](ai-log/002-google-ai-studio-initial-build.md)). The model produced:

- the React component structure (`App.tsx`, `NumberLine.tsx`, `PartitionSelector.tsx`, `FeedbackBanner.tsx`, `FractionDisplay.tsx`, and `CompletionSummary.tsx`);
- the deterministic evaluation logic (`utils/criteriaEvaluation.ts`);
- the six-item local fraction dataset (`src/data/fractions.ts`);
- the two-category feedback system distinguishing denominator and interval-count errors; and
- the repeated-error tracking and thinking-check pause that implements the stated failure criterion.

The documentation scaffold — `README.md`, `docs/task-brief.md`, `docs/idea-exploration.md`, `docs/decisions.md`, `docs/implementation-plan.md`, and the AI log — was drafted by AI and reviewed by the human owner. Human-reported observations then drove Decision D-008 and the staged-flow revision recorded in Prompt 007.

---

## 4. One AI suggestion the human rejected, and why

**Suggestion:** During idea exploration, AI proposed Recall Quest, an adaptive ecosystem-vocabulary retrieval activity.

**Rejected because:** Free-text answer matching could reject valid synonyms, and the activity risked becoming a generic quiz whose learning value would be difficult to demonstrate in five minutes. Fraction Line Lab provides a more visible state change and deterministic feedback within the timebox. This rejection is recorded in Decision D-004.

---

## 5. One sensible next step

**Run one brief confirmation session on the revised flow with an upper-primary learner or teacher.** Confirm that only the current step is visible, feedback and recovery require no search or manual scrolling, and each next question starts at its target. Continue to observe whether the feedback supports reasoning rather than answer copying. Record the result, then capture the required 3–5 minute demonstration and make the final human release decision.

---

## Limits

This is a **timeboxed PoC**, not a classroom-ready product. It has not been evaluated for learning effectiveness. The Shute (2008) source supports the design rationale; it does not prove this specific interaction improves fraction understanding. Likely limits at class scale: the fixed six-item set will become familiar quickly; there is no adaptive sequencing, teacher dashboard, or progress persistence across sessions.
