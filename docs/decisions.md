# Decisions

This file records decisions that materially shape the product or its evidence. AI may suggest options; the human owner makes and approves the decisions.

## Decision record format

Each new decision should include:

- **Status:** proposed, accepted, superseded, or rejected
- **Context:** the requirement or uncertainty being resolved
- **Options considered:** including relevant AI suggestions
- **Decision:** the chosen direction
- **Reasoning:** why it best fits the task and timebox
- **Consequences:** trade-offs, risks, or follow-up work
- **Evidence:** sources or observed results that support the choice

## D-001 — Use the repository as both deliverable and decision trail

- **Status:** Accepted
- **Context:** The take-home requires a runnable interaction and an explanation of how AI tools were used.
- **Decision:** Keep the application and a curated record of task interpretation, prompts, decisions, rejected suggestions, plans, and verification in the same public repository.
- **Reasoning:** This makes the product result and the human judgment behind it inspectable without publishing an unfiltered transcript.
- **Consequences:** Public notes must be concise and must exclude secrets, personal data, and private source content.

## D-002 — Start with documentation, not application code

- **Status:** Accepted
- **Context:** The learning objective, activity, research source, and implementation approach are not yet approved.
- **Decision:** Create the documentation structure and stop before implementation.
- **Reasoning:** Freezing the learning loop and its evidence first reduces scope drift and makes later implementation reviewable against explicit criteria.
- **Consequences:** The repository is intentionally not runnable at this milestone.

## D-003 — Keep the activity bounded to one complete learning loop

- **Status:** Accepted
- **Context:** The brief allows one scene or activity and limits the work to approximately 8–12 hours.
- **Decision:** Optimize for one independently usable loop: prompt → learner action → feedback → retry or next item.
- **Reasoning:** Depth, clarity, and reliability are more valuable here than broad feature coverage.
- **Consequences:** A content studio, LMS, general chatbot, accounts, analytics, and other platform features are out of scope unless the human owner explicitly revises this decision.

## D-004 — Select the learning activity

- **Status:** Proposed
- **Context:** Three small activity concepts have been generated and compared; one direction now needs human approval.
- **Options considered:** Fraction Line Lab, Recall Quest: Ecosystem Vocabulary, and Algebra Step Detective. See `docs/idea-exploration.md`.
- **Decision:** Pending human review.
- **Reasoning:** AI recommends Fraction Line Lab for its visible state change, deterministic feedback, curriculum alignment, and low implementation risk. The human owner has not accepted that recommendation.
- **Consequences:** Application implementation remains blocked until this decision is accepted.

## Commit and release gate

The current documentation changes must be reviewed by the human owner before any commit. A later commit, if approved, must use the requested `tonykamZ` Git identity. Commit, push, deployment, and release remain separate human-authorized actions.
