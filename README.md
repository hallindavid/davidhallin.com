# davidhallin.com

Personal blog and portfolio. Built with Hugo + TailwindCSS v4, deployed on Netlify.

## Local Development

```bash
npm install
npm run watch
```

This builds CSS and starts the Hugo dev server at `localhost:1313` with drafts enabled.

## Deployment

Pushes to `main` auto-deploy via Netlify. The build runs `npm run deploy` which does a production PostCSS build followed by `hugo --gc --minify`.

## Writing Articles

Blog posts live in `content/blog/` as markdown files. Scaffold a new one with:

```bash
hugo new blog/my-post-slug.md
```

This generates front matter from the archetype:

```yaml
title: "My Post Slug"
date: 2026-02-11
description: ""
tags: []
draft: true
```

Set `draft: false` when ready to publish. Other content directories: `content/projects/`, `content/worklog/`.

## Scripts

| Command | What it does |
|---|---|
| `npm run watch` | Build CSS + Hugo dev server with drafts |
| `npm run build` | Build CSS (dev) |
| `npm run prod` | Build CSS (production, minified) |
| `npm run deploy` | Production CSS build + Hugo minify |
