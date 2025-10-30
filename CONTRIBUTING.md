# Contributing

Thanks for your interest in improving the site!

## Getting Started
- Clone the repo and create a feature branch off `main`.
- Run locally by opening `index.html` or using a static server:
  - `python3 -m http.server 8080` then open `http://localhost:8080/`

## Guidelines
- Keep it static (HTML/CSS/JS only). Do not commit secrets or API keys.
- Use relative paths for all assets (no absolute `/` paths on Pages).
- Accessibility: ensure sufficient color contrast and meaningful alt text.
- Performance: optimize images/SVGs, avoid unused fonts or large libraries.
- Security: no third‑party scripts without SRI and a clear need.

## Pull Requests
- Small, focused PRs with a clear description.
- Include screenshots for visual changes.
- Ensure links open safely (`rel="noopener noreferrer"` when `target="_blank"`).
- Pass CODEOWNERS review.

## Reporting Issues
Please use responsible disclosure for security (see `SECURITY.md`). For content or styling issues, open a GitHub issue with details and screenshots.
