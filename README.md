# angel-georgiev.github.io

Angel Georgiev's personal site (future daskal.ai). Built with Astro from `PRD.md`.

- **All copy lives in `content/*.yml`.** Edit there; never in components. A typo in a key fails the build.
- Unfinished strings (`TBD`, `VERIFY`, `PLACEHOLDER`, `[АНГЕЛ ПИШЕ]`) render visibly and are listed in `OPEN_ITEMS.md`, which updates on every build.
- Photos: originals in `src/assets/photos/`, registered in `content/photos.yml`.

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # preview build
npm run check
```

Deploy: every push to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).
