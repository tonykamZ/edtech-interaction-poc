# EdTech Interaction PoC

A small, playable learning interaction to be designed and built within an 8–12 hour take-home timebox.

This repository will serve two purposes:

1. deliver one runnable EdTech interaction; and
2. show the reasoning, AI collaboration, decisions, and verification behind it.

## Current status

**Playable staged vertical slice implemented and locally verified. Human confirmation of the latest usability corrections and the final demonstration remain.**

The selected concept is Fraction Line Lab for upper-primary learners. An initial build was generated via Google AI Studio ([Prompt 002](docs/ai-log/002-google-ai-studio-initial-build.md)), then simplified after review. Human-reported usability observations identified hidden feedback, unclear lock recovery, stale scroll position, and excessive simultaneous information. The current revision shows one active step at a time, keeps required feedback in the current viewport, and resets each new question to the top. See [Prompt 007](docs/ai-log/007-implement-focused-staged-flow.md) and the [staged-flow verification record](docs/verification-staged-flow-2026-09-16.md).

## Required learning loop

`prompt → learner action → feedback → retry or next item`

The learner's input must change what happens next. The finished activity must be usable by a primary or junior-secondary learner, or by their teacher.

## Selected activity and research fit

- **Learning objective:** Place unit and non-unit fractions from 0 to 1 on a number line by dividing the whole into equal intervals.
- **Research source:** Valerie J. Shute, ["Focus on Formative Feedback"](https://doi.org/10.3102/0034654307313795), *Review of Educational Research* 78(1), 2008.
- **Curriculum alignment:** Common Core Mathematics [3.NF.A.2](https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf), representing fractions as numbers on a number line.
- **One-line mapping:** The learner partitions a 0–1 number line and places a fraction; after an error, the app identifies whether the denominator or interval count was misunderstood and allows an immediate retry.
- **Failure criterion:** The idea is failing if learners repeat the same error after targeted feedback or can finish mainly through guessing rather than understanding equal intervals.

## Documentation

| File | Purpose |
| --- | --- |
| [`docs/task-brief.md`](docs/task-brief.md) | Interpreted requirements, constraints, and completion evidence |
| [`docs/idea-exploration.md`](docs/idea-exploration.md) | Three candidate activities and the criteria used to compare them |
| [`docs/decisions.md`](docs/decisions.md) | Human-owned product and engineering decisions, including rejected options |
| [`docs/implementation-plan.md`](docs/implementation-plan.md) | Bounded path from approved concept to verified PoC |
| [`docs/technical-note.md`](docs/technical-note.md) | One-page technical note: source, what was built, AI use, one rejection, next step |
| [`docs/ai-log/`](docs/ai-log/README.md) | Indexed, one-file-per-prompt record of meaningful AI collaboration |
| [`docs/usability/participant-observation-2026-09-16.md`](docs/usability/participant-observation-2026-09-16.md) | Human-reported usability findings and the implemented correction |
| [`docs/verification-staged-flow-2026-09-16.md`](docs/verification-staged-flow-2026-09-16.md) | Mobile, keyboard, recovery, transition, and completion evidence for the revised flow |

## Working approach

The project adapts the human-gated workflow from [`tonykamZ/ai-engineering-system`](https://github.com/tonykamZ/ai-engineering-system):

`Intent → Context → Plan → Implement → Review → Verify → Human decision`

AI may draft and review work, but the human owner chooses the learning activity, approves material product decisions, accepts the result, and decides what is committed or released. Claims will be tied to observed evidence, and the public documentation will preserve decisions rather than publish an unfiltered transcript.

## Scope boundaries

- One scene or activity is enough.
- A clean web, mobile-web, or desktop experience is acceptable.
- This is not a content studio, LMS, general chatbot, or classroom-ready product.
- Voice is optional. If it is chosen, its happy path and fallback must be documented and demonstrated.
- Learner audio or personal data must not be uploaded silently.
- Secrets and private source material must never be committed.

## Running the app

No environment variables or backend are required. The app uses local static data only.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser. To complete one full interaction:

1. Read the target fraction shown on screen.
2. Complete Step 1 by choosing how many equal parts the whole needs. Step 2 is intentionally hidden until this is correct.
3. Complete Step 2 by selecting the fraction position on the partitioned number line.
4. Respond to the in-view feedback dialog after each attempt. On an error, use its retry or unlock action to continue the same item.
5. Use “Next Fraction” after a correct position. The following question starts at its target and Step 1.
6. Advance through all six fractions (1/2, 1/3, 2/3, 1/4, 3/4, 5/6) to reach the completion summary, then use “Try Again” to restart.

Mouse, touch, and keyboard (Tab + Enter/Space) are all supported. No account, login, or network connection is needed.

## Readiness

The engineering acceptance paths pass locally, including the 375 px staged mobile flow. This remains a timeboxed PoC, not evidence of learning effectiveness or classroom readiness. Before final submission, confirm the revised flow with a learner or teacher and record the required 3–5 minute demonstration.
