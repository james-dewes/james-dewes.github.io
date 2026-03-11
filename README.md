# james-dewes.github.io

Personal website built with Jekyll, featuring a terminal theme with an optional retro "eighties" style.

## Prerequisites

- **Node.js** v18+
- **Ruby** + **Bundler** (for Jekyll builds)

## Setup

```bash
npm install
bundle install
```

## Development

Start the development server with live reload:

```bash
npx gulp serve
```

This builds all assets, runs Jekyll, and launches BrowserSync at http://localhost:3000.

Alternatively, use Jekyll directly:

```bash
bundle exec jekyll serve
```

Then visit http://localhost:4000.

## Build

```bash
npx gulp build
```

## Deployment

Push to the `main` branch — GitHub Pages builds and deploys automatically.

## Project Structure

```
├── _assets/       # Source assets (SCSS, JS, images)
├── _includes/     # Jekyll includes
├── _layouts/      # Jekyll layouts
├── _posts/        # Blog posts
├── assets/        # Built assets (generated)
├── _config.yml    # Jekyll configuration
├── gulpfile.mjs   # Gulp build config
├── package.json   # Node.js dependencies
└── Gemfile        # Ruby dependencies
```
