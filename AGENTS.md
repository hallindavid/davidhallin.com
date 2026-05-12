# Agent Instructions: Hugo Project

## Project Overview
- **Stack:** Hugo static site with PostCSS/Tailwind.
- **Type:** Personal/tech blog.
- Deployment is configured through `netlify.toml`.

## Development
- Serve locally with `npm run watch`.
- Production build/deploy command is `npm run deploy`.
- Run checks with `npm run lint`.
- Use `npm run format` for layouts/assets/config files.
- Use `npm run format:content` only when intentionally formatting Markdown content.

## Directory Structure
- `/content`: Markdown posts and pages.
- `/layouts`: Hugo templates and shortcodes.
- `/resources/styles`: source CSS.
- `/static`: static files copied directly to the generated site.
- `/public`: generated output; do not edit.

## Coding Preferences
- Prefer the smallest useful change that achieves the goal.
- Keep edits focused on the requested task; avoid opportunistic refactors.
- Brevity is valuable in code, comments, docs, and explanations.
- Follow existing project patterns before introducing new abstractions.
- Add dependencies only when they clearly reduce complexity or risk.
- When changing behavior, prefer one clear change over several bundled improvements.


## Boundaries
- Do not modify files in `/public`.
- Do not remove existing front matter fields.
- Never commit secrets or API keys.
- Never auto-commit or push.
