# Implementation Plan

## Status

**Draft framework only.** The activity, learning source, acceptance criteria, and technology stack have not been selected. This file defines the gates for later planning; it does not authorize application implementation.

## Guiding approach

`Intent → Context → Plan → Implement → Review → Verify → Human decision`

Work should proceed in the smallest reviewable slices that produce evidence for the take-home requirements.

## Phase 1 — Choose the learning interaction

- Generate three bounded concepts using [Prompt 001](ai-log/001-three-bounded-activity-concepts.md).
- Compare them using the criteria in `docs/idea-exploration.md`.
- Select one specific learner, learning objective, and interaction loop.
- Record the selection and rejected alternatives in `docs/decisions.md`.

**Gate:** Human owner approves one concept.

## Phase 2 — Ground the concept

- Identify one authoritative published learning or curriculum source.
- State the learning claim in plain language.
- Map each part of the interaction to the claim.
- Define what observable result would suggest that the idea is failing.
- Record source provenance and any evidence gap.

**Gate:** Human owner approves the source and product mapping.

## Phase 3 — Define the smallest playable version

- Write observable acceptance criteria for the full loop.
- Choose the minimum technology and content needed.
- Decide how to handle incorrect, empty, and off-task input where relevant.
- Identify accessibility, privacy, browser, permission, and demo risks.
- Allocate the timebox and mark explicit non-goals.

**Gate:** Human owner approves material behavior, architecture, data, and external-service choices.

## Phase 4 — Implement one vertical slice

- Build the prompt, learner action, state transition, feedback, and retry/next behavior as one end-to-end slice.
- Add only the setup and content needed to run that slice.
- Update the AI log and decision record when a model contribution or rejection materially affects the result.
- Record any deviation from the approved plan.

**Gate:** The diff is bounded and traceable to the approved criteria.

## Phase 5 — Review and verify

- Review the implementation against every acceptance criterion.
- Exercise the happy path and relevant incorrect, empty, off-task, retry, permission, and recovery states.
- Run the smallest useful automated checks.
- Complete human usability and browser checks that automation cannot establish.
- Record observed evidence, unverified paths, and limits at class scale.

**Gate:** Blocking findings are fixed or explicitly rejected by the human owner.

## Phase 6 — Package the submission

- Complete README setup, environment-variable, privacy, and interaction instructions.
- Produce the one-page technical note.
- Capture a 3–5 minute demonstration of one full interaction.
- Return a release-readiness recommendation: release, revise, or block.

**Gate:** Human owner accepts the submission and separately authorizes commit, push, and release actions.

## Current next action

Run [Prompt 001](ai-log/001-three-bounded-activity-concepts.md), review the three concepts, and make Decision D-004. No app code should be created before that review.
