# Prompt 006 — Record observed feedback and recovery issues

## Objective

Convert human-reported usability observations into traceable findings and a minimal, testable correction proposal without inventing participant details or silently changing the approved interaction.

## Context

- **Date:** 2026-09-16
- **Stage:** Usability findings
- **Status:** Completed; Decision D-008 implemented in Prompt 007

## Prompt

> observed issue:
>
> 1. 'try again' warning box is at bottom, user cannot see it right away, he need to scroll down.
> 2. follow up to 'try again', there is no clear visible block to show why the answer is locked and what action needed to unlock

## Output summary

The observations confirm that feedback placement is not sufficiently connected to the learner’s action on a narrow screen. They also identify a recovery failure: the interface can lock the affected control while the reason and unlock action remain outside the visible area.

The bounded proposal is to render feedback beside the step that caused it and keep the lock explanation plus recovery action inside that same step while locked. This changes presentation and focus management, not the learning objective or evaluation logic.

## Human review

The findings came from the human owner’s report. No participant identity, age, device, quotation, or session detail was supplied, so none is inferred. The proposed implementation remains subject to owner approval.

## Decision or change

**Findings accepted as observed evidence.** The proposal was subsequently accepted and implemented in Prompt 007. See Decision D-008.

## Evidence or verification

- [x] Original observations retained without personal data
- [x] Findings mapped to the current bottom-of-workspace feedback placement
- [x] Minimal correction and acceptance criteria documented
- [x] Human owner accepted the interaction goal for Decision D-008
- [x] Implemented and reverified the affected paths in Prompt 007
