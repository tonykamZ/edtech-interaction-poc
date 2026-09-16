# Prompt 010 — Align the rejected-flow rationale

## Objective

Replace the unrelated concept-selection example in the technical note with a rejected AI-generated interaction flow that is directly traceable to the Fraction Line Lab implementation and usability evidence.

## Context

- **Date:** 2026-09-16
- **Stage:** Submission packaging
- **Status:** Completed; human review pending

## Prompt

> align the rejected flow rationale in the technical note to the staged flow instead of the current recall quest example

> go ahead update current project as well

## Output summary

Replaced Recall Quest as the technical note’s rejected-AI example. The note now explains that the initial AI-generated flow showed Step 1 and Step 2 together, why the human rejected that presentation after usability observation, and how the accepted staged flow changed the interaction.

## Human review

The owner selected the staged-flow decision as the more relevant and defensible rejection example.

## Decision or change

Updated the technical note and Decision D-008 documentation only. Application code and behaviour were not changed.

## Evidence

- Prompt 007 records the human-requested staged-flow correction and its local verification.
- Decision D-008 records the rejected simultaneous-step layout, distant feedback, and auto-scroll alternative.
- The participant observation records inactive Step 2, hidden feedback, unclear recovery, and retained scroll position as observed problems.
