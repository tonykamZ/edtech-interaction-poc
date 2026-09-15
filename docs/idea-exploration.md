# Idea Exploration

## Purpose

Explore three small learning activities before choosing a product direction. The goal is not to pick the most impressive idea; it is to find the clearest research-backed interaction that can be built, tested, and demonstrated within the timebox.

The first exploration prompt is recorded in [`ai-log/001-three-bounded-activity-concepts.md`](ai-log/001-three-bounded-activity-concepts.md).

## Evaluation criteria

Each concept will be assessed against the same questions:

1. What single learning objective does it support?
2. Who is the specific primary or junior-secondary learner?
3. What does the learner do?
4. How does that input change the next state?
5. What immediate feedback is given?
6. How does retry or the next item work?
7. Which named learning principle could support it?
8. Can the smallest useful version be built and verified within 8–12 hours?
9. What accessibility, privacy, browser, or demo risks does it introduce?
10. What would count as the idea failing?

## Candidate concepts

These concepts were generated from Prompt 001. None has been approved.

### Concept 1 — Fraction Line Lab

- **Learning objective:** Place unit and non-unit fractions between 0 and 1 on a number line by partitioning the whole into equal intervals.
- **Audience:** Upper-primary learners beginning to treat fractions as numbers rather than only parts of shapes.
- **Learner action:** Select a fraction, partition a number line, and place a marker on the matching position. Tapping or keyboard controls should be available instead of requiring drag-and-drop.
- **State change:** A correct placement advances to a less scaffolded item. An incorrect denominator reveals equal partitions; an incorrect numerator highlights the intervals counted and keeps the same item available for retry.
- **Feedback and retry loop:** Give immediate, specific feedback about the partition or count, then let the learner correct the same number line before advancing.
- **Learning principle and sources:** Formative feedback. Shute recommends feedback that is timely and specific enough to help a learner modify their thinking or behaviour. The curriculum objective is grounded in the Common Core Grade 3 standard to represent fractions on a number-line diagram.
- **Smallest playable version:** Six fixed fraction items, a segmented 0–1 number line, two feedback paths, retry, next item, and a short completion summary. No backend or model call.
- **Main risks:** Dragging may be inaccessible; visual proximity can reveal the answer; the feedback must diagnose partitioning versus counting rather than merely say "incorrect."
- **Failure signal:** Learners can succeed by guessing positions without understanding equal intervals, or feedback does not help them correct the same item.

### Concept 2 — Recall Quest: Ecosystem Vocabulary

- **Learning objective:** Recall and distinguish six junior-secondary ecosystem terms from brief definitions and examples.
- **Audience:** Junior-secondary science learners reviewing a small vocabulary set.
- **Learner action:** Type or select the term that matches a prompt, then optionally identify an example.
- **State change:** A correct response moves the term to a completed set. An incorrect response reveals a concise cue and returns the term later in the same session.
- **Feedback and retry loop:** Show the expected term and the discriminating feature immediately; retry missed terms after one or two intervening items.
- **Learning principle and source:** Retrieval practice. Roediger and Karpicke found that retrieving studied material can improve later retention more than repeated study, particularly on delayed tests.
- **Smallest playable version:** One study screen, six local prompt cards, tolerant answer matching, immediate feedback, a retry queue, and a final recalled/missed summary.
- **Main risks:** Free-text matching may reject valid synonyms; a five-minute demo cannot establish delayed retention; the interaction can feel like a generic quiz unless the adaptive retry is visible.
- **Failure signal:** Performance depends more on exact spelling than recall, or missed terms do not become easier to retrieve after feedback and re-queuing.

### Concept 3 — Algebra Step Detective

- **Learning objective:** Identify and justify the next valid step when solving a one-step linear equation.
- **Audience:** Early junior-secondary mathematics learners.
- **Learner action:** Choose the next transformation for a worked equation and select the reason it preserves equality.
- **State change:** A correct step advances the equation. An incorrect operation keeps the equation in place and contrasts the chosen step with the balance principle before retry.
- **Feedback and retry loop:** Give immediate step-specific feedback, show a balance visual, and ask the learner to retry the same transformation before receiving a new equation.
- **Learning principle and source:** Self-explanation. Chi and colleagues associated learners' explanations of worked examples with stronger, more principle-based problem solving.
- **Smallest playable version:** Four fixed equations, structured step and reason choices, a simple balance visual, retry, and next equation. No free-text grading or model call.
- **Main risks:** Multiple-choice reasons can cue the answer; animation may consume the timebox; the original study concerned worked mechanics examples rather than this exact algebra interaction.
- **Failure signal:** Learners choose operations by surface pattern without connecting them to preserving equality.

## Comparison

| Criterion | Fraction Line Lab | Recall Quest | Algebra Step Detective |
| --- | --- | --- | --- |
| Learning loop clarity | High | High | High |
| Deterministic feedback | High | Medium | High |
| Accessibility effort | Medium | Low | Medium |
| Evidence visible in a short demo | High | Medium | High |
| Implementation risk | Low | Low–medium | Medium |
| Risk of becoming a generic quiz | Low | High | Medium |

## AI recommendation

Start with **Fraction Line Lab**. It has the clearest visible state change, deterministic feedback, direct curriculum alignment, and a credible no-backend implementation inside the timebox. Prefer tap and keyboard placement over drag-only interaction.

## Sources

- Valerie J. Shute, ["Focus on Formative Feedback"](https://doi.org/10.3102/0034654307313795), *Review of Educational Research* 78(1), 2008.
- Common Core State Standards Initiative, [Grade 3 Number and Operations—Fractions, 3.NF.A.2](https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf).
- Henry L. Roediger III and Jeffrey D. Karpicke, ["Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention"](https://doi.org/10.1111/j.1467-9280.2006.01693.x), *Psychological Science* 17(3), 2006.
- Michelene T. H. Chi et al., ["Self-Explanations: How Students Study and Use Examples in Learning to Solve Problems"](https://doi.org/10.1207/s15516709cog1302_1), *Cognitive Science* 13(2), 1989.

## Human decision

The human owner approved Fraction Line Lab on 2026-09-15. The selection and rejected alternatives are recorded as Decision D-004 in [`decisions.md`](decisions.md).
