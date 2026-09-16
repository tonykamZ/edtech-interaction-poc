# Task Brief

## Goal

Build a small, playable learning interaction—not a slide deck or static content page. A learner or teacher must be able to act, receive a useful response in the same session, and try again or continue.

## Required outcome

- One interactive activity for a primary or junior-secondary learner, or their teacher.
- A clear loop: **prompt → learner action → feedback → retry or next item**.
- Learner input changes what happens next.
- One named published learning source—a paper, textbook chapter, or curriculum source—with a concise explanation of how the interaction applies it.
- A reviewer can start the app and complete a full interaction in about five minutes without the author present.

Text, taps, voice, or a mixture are acceptable. Voice is an optional example, not a requirement.

## What a good submission demonstrates

### Research fit

The interaction genuinely reflects the claim made about the selected learning principle, such as retrieval practice, immediate feedback, self-explanation, or oral rehearsal. The final explanation should also identify what evidence would suggest that the idea is failing.

### A real interaction

The learner's input affects the next state. Where relevant, empty or off-task input is handled by steering the learner back or clearly declining to proceed. A general chatbot without a bounded learning goal is insufficient.

### Independent use

The deliverable is runnable, and a reviewer can complete one full learning loop without guidance from the author.

### Transparent AI use

The final technical note must state:

- the learning source;
- what was built;
- what the model drafted;
- one AI suggestion the human rejected and why; and
- one sensible next step.

### Sensible limits

- Setup and any required environment variables are documented.
- Learner audio or personal data is not uploaded silently.
- The project is described honestly as a timeboxed PoC, not a classroom-ready product.
- Likely limits at full-class scale can be explained.

## Constraints

- Timebox: about 8–12 hours over five calendar days.
- One scene or activity is enough.
- Do not build a content studio or full LMS.
- Visual polish is secondary to a clear, working learning loop.
- A clean web app, mobile web experience, or desktop window is acceptable.
- AI coding tools are allowed and expected; human review and changes must be explainable.

## Voice-specific requirements

These apply only if voice is selected:

- spoken input becomes usable text in the happy path;
- the reply is spoken aloud;
- microphone denial may fall back to typed input;
- keys and data handling are documented; and
- a simple face or avatar is optional.

## Final submission evidence

- A GitHub repository or runnable zip.
- A README covering setup, environment variables, and how to complete one interaction.
- A 3–5 minute demonstration of one full interaction.
- A one-page technical note covering the AI-use points above.

## Current completion boundary

The repository now contains the selected Fraction Line Lab activity, its source mapping, a runnable staged interaction, a curated AI and decision trail, usability observations, and local verification evidence. The engineering acceptance paths are complete for the PoC. Remaining submission work is limited to human confirmation of the latest usability corrections, the required 3–5 minute demonstration, final owner acceptance, and any separately authorized commit or release action.
