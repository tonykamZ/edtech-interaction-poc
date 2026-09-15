# Implementation Plan

## Status

**Ready for the initial vertical slice.** Fraction Line Lab, its learning foundation, and the minimum acceptance criteria are approved. No generated application has been reviewed or verified yet.

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

### Approved learning foundation

- **Learning objective:** Place unit and non-unit fractions from 0 to 1 on a number line by dividing the whole into equal intervals.
- **Research source:** Shute (2008), ["Focus on Formative Feedback"](https://doi.org/10.3102/0034654307313795).
- **Curriculum alignment:** Common Core Mathematics [3.NF.A.2](https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf).
- **One-line mapping:** The learner partitions a 0–1 number line and places a fraction; after an error, the app identifies whether the denominator or interval count was misunderstood and allows an immediate retry.
- **Failure criterion:** The idea is failing if learners repeat the same error after targeted feedback or can finish mainly through guessing rather than understanding equal intervals.

## Phase 3 — Define the smallest playable version

- Write observable acceptance criteria for the full loop.
- Choose the minimum technology and content needed.
- Decide how to handle incorrect, empty, and off-task input where relevant.
- Identify accessibility, privacy, browser, permission, and demo risks.
- Allocate the timebox and mark explicit non-goals.

**Gate:** Human owner approves material behavior, architecture, data, and external-service choices.

### Initial vertical-slice acceptance criteria

- Use only the six fixed local items: 1/2, 1/3, 2/3, 1/4, 3/4, and 5/6.
- Ask the learner to choose the number of equal parts before selecting a position.
- Support mouse, touch, and keyboard operation without requiring drag-and-drop.
- Distinguish a wrong partition from a wrong interval count and give specific feedback for each.
- Keep the current item available for immediate retry after an error.
- Advance only after a correct response, show progress, and finish with a summary and restart.
- Remain usable on a narrow screen with visible focus and readable contrast.
- Use local deterministic logic with no backend, account, persistence, analytics, voice, or runtime AI.

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

Run [Prompt 002](ai-log/002-google-ai-studio-initial-build.md) in Google AI Studio to generate the smallest Fraction Line Lab vertical slice. Review the result against the stated learning loop before requesting visual improvements or additional features.
