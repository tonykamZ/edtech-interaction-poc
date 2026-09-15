# EdTech Interaction PoC

A small, playable learning interaction to be designed and built within an 8–12 hour take-home timebox.

This repository will serve two purposes:

1. deliver one runnable EdTech interaction; and
2. show the reasoning, AI collaboration, decisions, and verification behind it.

## Current status

**Planning only. No application has been implemented yet.**

The current milestone is to understand the brief, explore three bounded activity concepts, choose one with explicit reasons, and identify the learning source that will support it.

## Required learning loop

`prompt → learner action → feedback → retry or next item`

The learner's input must change what happens next. The finished activity must be usable by a primary or junior-secondary learner, or by their teacher.

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
