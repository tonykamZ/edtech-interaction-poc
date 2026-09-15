# Prompt 002 — Google AI Studio initial build

## Objective

Generate the smallest accessible web version of Fraction Line Lab that demonstrates one complete learning loop without adding platform features or unnecessary infrastructure.

## Context

- **Date:** 2026-09-15
- **Stage:** Initial implementation
- **Target tool:** Google AI Studio
- **Status:** Prompt prepared; not yet run.

## Prompt

> Build a small responsive web PoC called **Fraction Line Lab** for upper-primary learners.
>
> **Learning objective:** Learners place unit and non-unit fractions from 0 to 1 on a number line by dividing the whole into equal intervals.
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

Pending execution in Google AI Studio.

## Human review

Confirm that the generated app implements the complete loop before requesting visual improvements. Reject any unnecessary backend, runtime AI, authentication, persistence, or platform features.

## Decision or change

Pending review of the generated app.

## Evidence or verification

After generation, verify all six items, both incorrect-feedback paths, retry behaviour, keyboard operation, narrow-screen layout, completion, and restart.
