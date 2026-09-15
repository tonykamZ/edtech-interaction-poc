# Prompt 001 — Three bounded activity concepts

## Objective

Generate three small, comparable EdTech activity concepts so the human owner can select one learning direction before product or implementation decisions are made.

## Context

- **Date:** 2026-09-15
- **Stage:** Idea exploration
- **Status:** Response recorded; human review completed.

## Prompt

> I need to build a small EdTech interaction in an 8–12 hour timebox.
>
> Propose three learning activities that satisfy all of the following:
>
> - one clear learning objective
> - learner input changes the next state
> - immediate feedback
> - retry or next item
> - primary or junior-secondary audience
> - backed by a named learning principle
>
> Keep each concept small enough for a web PoC.

## Output summary

Three concepts were developed and compared in [`docs/idea-exploration.md`](../idea-exploration.md):

1. **Fraction Line Lab** — an upper-primary number-line activity using specific formative feedback;
2. **Recall Quest** — a junior-secondary ecosystem vocabulary activity using retrieval practice and adaptive re-queuing; and
3. **Algebra Step Detective** — a junior-secondary worked-example activity using structured self-explanation.

The AI recommendation is Fraction Line Lab because it makes the learner-driven state change and feedback loop easy to observe, supports deterministic evaluation without an external model, and fits the timebox. The recommendation is not an accepted decision.

## Human review

The human owner approved Fraction Line Lab and requested a concise Google AI Studio prompt for its initial build.

## Decision or change

Fraction Line Lab was accepted as Decision D-004 in [`docs/decisions.md`](../decisions.md). Recall Quest and Algebra Step Detective were rejected for this timebox.

## Evidence or verification

The cited publications and curriculum standard were checked at their publisher or official source pages. Their application to these concepts remains a design inference requiring human review. No application behavior has been implemented or tested.
