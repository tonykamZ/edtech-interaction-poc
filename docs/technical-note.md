# Technical Note — Fraction Line Lab

**Project:** EdTech Interaction PoC  
**Date:** 2026-09-15  
**Status:** Phase 5 — verified; pending Phase 6 release decision  

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

1. The app shows a target fraction (one of six fixed local items: 1/2, 1/3, 2/3, 1/4, 3/4, 5/6).
2. The learner selects how many equal parts the 0–1 number line needs (partition step, maps to the denominator).
3. The learner selects a tick mark on the partitioned line (placement step, maps to the numerator).
4. The app gives immediate, specific feedback — it distinguishes a wrong partition ("the denominator tells you how many equal parts") from a wrong interval count ("count the intervals, not the tick marks") and keeps the same item available for retry.
5. Advance is allowed only after both steps are correct. A progress bar tracks items; a summary and restart button appear on completion.

**Anti-guessing guard (failure-criterion implementation):** If the same error is repeated, or if three or more attempts are made on either step, a "thinking check" pause activates. The learner must confirm they are ready to try again before the controls unlock.

**Stack:** React 19 + Vite 6 + TypeScript + Tailwind CSS v4. Fully local — no backend, no database, no accounts, no analytics, no runtime AI, no network requests.

**Verified paths (human browser run, 2026-09-15):** happy path, wrong-partition feedback, wrong-tick feedback, repeated-error thinking-check, keyboard-only navigation, narrow-screen layout (≤375 px), completion summary, restart.

---

## 3. What the model drafted

The initial build was generated from a single prompt submitted to Google AI Studio (see [`docs/ai-log/002`](ai-log/002-google-ai-studio-initial-build.md)). The model produced:

- the complete React component structure (`App.tsx`, `NumberLine.tsx`, `PartitionSelector.tsx`, `FeedbackBanner.tsx`, `FractionDisplay.tsx`, `CompletionSummary.tsx`, `BehavioralCriteriaGuide.tsx`);
- the deterministic evaluation logic (`utils/criteriaEvaluation.ts`);
- the six-item local fraction dataset (`src/data/fractions.ts`);
- the two-category feedback system distinguishing denominator and interval-count errors; and
- the repeated-error tracking and thinking-check pause that implements the stated failure criterion.

The documentation scaffold — `README.md`, `docs/task-brief.md`, `docs/idea-exploration.md`, `docs/decisions.md`, `docs/implementation-plan.md`, and the AI log — was drafted by AI and reviewed and accepted by the human owner at each gate.

---

## 4. One AI suggestion the human rejected, and why

**Suggestion:** During the idea-exploration phase (Prompt 001), the AI recommended including a "confidence rating" step after each fraction placement — asking the learner to rate how sure they were before seeing feedback.

**Rejected because:** Adding a confidence step would lengthen the interaction, introduce a second learner-input variable that needs its own feedback logic, and risk confusion for the upper-primary audience. The brief prioritises a clear, minimal loop over richer instrumentation. A confidence rating would be appropriate scope for a research study but not for an 8–12 hour PoC. Recorded as a rejected option in `docs/decisions.md`.

---

## 5. One sensible next step

**Run the loop with two or three real upper-primary learners or their teachers** — a brief informal usability session, not a formal study. The failure criterion (repeated same error after targeted feedback, or completion mainly by guessing) cannot be assessed from code inspection alone. Even two observed sessions would show whether the partition-step prompt is clear, whether the tick-mark selection is discoverable without drag, and whether the thinking-check pause helps or frustrates. Findings should be recorded in a new `docs/ai-log/` entry and used to inform a revise-or-release decision.

---

## Limits

This is a **timeboxed PoC**, not a classroom-ready product. It has not been evaluated for learning effectiveness. The Shute (2008) source supports the design rationale; it does not prove this specific interaction improves fraction understanding. Likely limits at class scale: the fixed six-item set will become familiar quickly; there is no adaptive sequencing, teacher dashboard, or progress persistence across sessions.
