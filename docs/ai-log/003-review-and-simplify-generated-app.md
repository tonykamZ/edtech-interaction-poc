# Prompt 003 — Review and simplify the generated app

## Objective

Review the Google AI Studio build against the approved Fraction Line Lab concept, learning loop, evidence boundaries, and take-home scope, then implement the smallest accepted corrections.

## Context

- **Date:** 2026-09-15
- **Stage:** Review and verification
- **Status:** Completed; informal human usability review pending

## Prompt

> Check my current commit. What next
>
> Proceed

## Output summary

The review found that the core interaction worked, but the generated app exposed answer-like fraction guidance before the learner acted, displayed research and assessment language to learners, made stronger completion claims than the session evidence supported, and retained unused presentation code and a motion dependency. Some documentation also described checks or rejected ideas that were not supported by the recorded work.

The accepted revision kept the six-item local activity and its prompt → action → feedback → retry or next-item loop, while simplifying the learner experience and correcting the evidence trail.

## Human review

The human owner reviewed the findings and authorized the focused revision with “Proceed.” The later instruction to add this log and push to `main` explicitly authorized the commit and push. The learning objective, activity, and source mapping were not changed.

## Decision or change

**Accepted and implemented.** The revision:

- removed fraction anatomy, labels, and other pre-answer cues from the learner screen;
- removed the learner-facing behavioural-criteria dashboard and research jargon;
- simplified partition, number-line, feedback, and completion wording;
- changed completion reporting to neutral session observations rather than claims of mastery or comprehension;
- removed unused types, criteria data, component code, and the motion dependency; and
- updated project documentation to distinguish completed local checks from pending usability evidence.

This change is recorded as Decision D-007 in `docs/decisions.md`.

## Evidence or verification

Observed locally on 2026-09-15:

- [x] Lint and type-check pass
- [x] Production build passes
- [x] Start screen does not reveal the target answer
- [x] Wrong-partition and wrong-tick feedback preserve a retry on the same item
- [x] Repeated errors show the pause-and-check recovery step
- [x] All six items can be completed and restarted
- [x] Partition, tick, and next-item controls work with keyboard activation
- [x] Independently observe the layout at a 375 px viewport (see Prompt 004)
- [ ] Conduct informal usability review with an upper-primary learner or teacher
