# EdTech Interaction PoC

A small, playable learning interaction to be designed and built within an 8–12 hour take-home timebox.

This repository will serve two purposes:

1. deliver one runnable EdTech interaction; and
2. show the reasoning, AI collaboration, decisions, and verification behind it.

## Current status

**Concept selected; initial build prompt prepared. No application has been implemented or verified yet.**

The selected concept is Fraction Line Lab for upper-primary learners. The current milestone is to generate and verify its smallest complete learning loop.

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
| [`docs/ai-log/`](docs/ai-log/README.md) | Indexed, one-file-per-prompt record of meaningful AI collaboration |

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

Not available yet. Setup instructions, environment variables, and the path through one complete interaction will be added after the concept and implementation approach are approved.
