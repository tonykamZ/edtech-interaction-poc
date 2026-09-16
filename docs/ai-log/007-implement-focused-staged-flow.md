# Prompt 007 — Implement a focused staged flow

## Objective

Implement the owner-approved goal of showing one immediate action at a time, keeping required feedback in the current viewport, visibly explaining any lock, and resetting each new question to its beginning.

## Context

- **Date:** 2026-09-16
- **Stage:** Usability revision
- **Status:** Implemented and locally verified

## Prompt

> observed issue:
>
> 1. on next question clicked, user still position at bottom of the page, producing bad UX
> 2. user need to scroll to see step is somehow bad UX, making too much information and unwanted info for now (say seeing step 2 when step 1 not yet finished)
>
> main goal is clear visiual feedback to user right now what he needed to act, and feedback directly in current screen, maybe blocking whole page when something needed to action before continue

## Output summary

The page now renders only Step 1 until the partition is correct, then replaces it with Step 2. Required feedback appears in a centered blocking modal rather than below the activity. A repeated-error pause shows its reason, hint, and unlock action together. The background is inert while the modal is open. Advancing or restarting resets the viewport to the top and focuses the target heading.

## Human review

The human owner supplied the observed failures and the interaction goal. This was treated as acceptance of the staged, blocking-feedback direction recorded in Decision D-008. Human confirmation of the revised experience remains pending.

## Decision or change

**Accepted and implemented.** Decision D-008 now covers the four connected usability findings O-01 through O-04.

## Evidence or verification

- [x] Type-check passes
- [x] Production build passes
- [x] Step 2 is absent before Step 1 is complete
- [x] Wrong-partition feedback is visible in the current 375 × 812 viewport
- [x] Modal background is inert and Tab remains on the required modal action
- [x] Repeated-error modal contains the lock reason and unlock action
- [x] Unlock returns focus to an available Step 1 answer
- [x] Step 2 replaces Step 1 after a correct partition
- [x] Wrong-position feedback is visible in the current viewport
- [x] Next-question scroll position is zero and focus is on the target heading
- [x] Keyboard activation advances through partition, position, and next question
- [x] All six items reach completion with no console warnings or errors
- [x] No horizontal overflow at the verified mobile width
- [ ] Human participant confirms the revised flow resolves the observations

See [`docs/verification-staged-flow-2026-09-16.md`](../verification-staged-flow-2026-09-16.md).
