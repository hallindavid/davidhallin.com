# Agent Instructions: Hugo/Go Project

## Project Overview
- **Stack:** Hugo Static Site Generator (Go)
- **Type** Personal/Tech Blog

## Development Environment
- Run `hugo server -D` for local development (includes drafts).
- Run `hugo` to build production files.
- Always check `.github/workflows` for CI/CD pipelines before editing layouts.

## Directory Structure
- `/content`: Markdown files (posts, pages).
- `/layouts`: Hugo templates and shortcodes (HTML/Go templates).
- `/static`: Static files (images, root-level files) that go directly to `/public`.

## Commands
- **Serve:** `hugo server -D --fastRender`
- **Lint/Check:** `./check.sh` (if available) or `npx prettier --check`
- **Tidy:** `go mod tidy` (if using Go modules in themes).

## Boundaries
- Do not modify files in `/public`.
- Never commit secrets or api keys.
- Do not remove existing `front-matter` fields.
