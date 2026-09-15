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

- **Status:** Accepted
- **Context:** Three small activity concepts were generated and compared for learning-loop clarity, feedback, accessibility, evidence, and implementation risk.
- **Options considered:** Fraction Line Lab, Recall Quest: Ecosystem Vocabulary, and Algebra Step Detective. See `docs/idea-exploration.md`.
- **Decision:** Build Fraction Line Lab for upper-primary learners.
- **Reasoning:** It offers a visible learner-driven state change, targeted deterministic feedback, direct curriculum alignment, and low implementation risk without a backend or runtime AI dependency.
- **Rejected alternatives:** Recall Quest risks becoming a generic quiz and introduces answer-matching ambiguity. Algebra Step Detective adds explanation and animation complexity that is less suitable for the timebox.
- **Consequences:** The first implementation should cover only one complete fraction-number-line loop with local content. Broader content authoring, accounts, persistence, analytics, voice, and runtime AI are out of scope.

## D-005 — Ground the selected interaction

- **Status:** Accepted
- **Context:** The selected activity needs a real source, a direct mapping from its learning claim to app behaviour, and a falsifiable failure criterion.
- **Research source:** Valerie J. Shute, ["Focus on Formative Feedback"](https://doi.org/10.3102/0034654307313795), *Review of Educational Research* 78(1), 2008. The relevant claim is that formative feedback should be timely and specific enough to help learners modify their thinking or behaviour.
- **Curriculum alignment:** Common Core Mathematics [3.NF.A.2](https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf) asks learners to understand and represent fractions as numbers on a number line.
- **One-line mapping:** The learner partitions a 0–1 number line and places a fraction; after an error, the app identifies whether the denominator or interval count was misunderstood and allows an immediate retry.
- **Failure criterion:** The idea is failing if learners repeat the same error after targeted feedback or can finish mainly through guessing rather than understanding equal intervals.
- **Evidence gap:** These sources support the design rationale, but they do not prove this PoC is effective. Usability observations can show whether the loop works as intended; a learning-effect claim would require a more suitable evaluation.
- **Consequences:** Feedback must diagnose the learner's step rather than only mark an answer right or wrong. The first build needs no runtime AI.

## D-006 — Technology stack and dependency clean-up

- **Status:** Accepted
- **Context:** The initial build was generated from a Google AI Studio starter template. The template included dependencies (`@google/genai`, `express`, `dotenv`, `@types/express`) that were not used by the implemented code.
- **Decision:** Adopt the React 19 + Vite 6 + TypeScript stack that the generated code uses. Remove the four unused starter-template dependencies from `package.json`.
- **Reasoning:** The implemented code requires only React, Vite, TypeScript, Tailwind CSS v4, `lucide-react`, and `motion`. Keeping unused packages adds installation cost and creates a misleading implication that a backend or Gemini API integration is part of the PoC.
- **Rejected alternatives:** Keeping the unused packages was rejected because it would misrepresent the architecture in a public repository.
- **Consequences:** The app remains fully local and static. No backend, no Gemini API calls, no server process. Any future decision to add a backend or model call requires a new decision record and human approval.
- **Evidence:** Human-verified browser run (2026-09-15) confirmed the app works without any of the removed packages.

## Commit and release gate

The current documentation changes must be reviewed by the human owner before any commit. A later commit, if approved, must use the requested `tonykamZ` Git identity. Commit, push, deployment, and release remain separate human-authorized actions.
