# Development

```bash
npm install
npm run typecheck      # vue-tsc
npm run test:unit      # Vitest — codec, expression, mock source, query state, routing
npm run test:e2e       # Playwright in Chromium, against the real stories
npm run test           # both
npm run storybook      # http://localhost:6011
npm run build          # dist/ + declarations
```

Two test layers:

- **Vitest** covers the logic — URL round-trips, the expression evaluator,
  facet filtering and sorting, query-state mutations — plus a few component
  mounts, in jsdom.
- **Playwright** drives the real Storybook stories in Chromium, for what only
  exists in a browser: focus return, stacking and click interception,
  container queries, computed styles, and the address bar across reload, Back
  and Forward.

The **No Build** stories load `dist/` over HTTP, so they test the built
artifacts. Run `npm run build` first, or they test the previous build.

Storybook runs on **6011**, not 6006, to avoid colliding with other projects.

## Releasing

Consumers install a tag of this repository and get the committed `dist/`, so a
release is a tag:

```bash
git commit -m 'What changed'   # the work, without dist/
npm version minor              # lint, typecheck, build, test, commit, tag
npm run release                # git push origin main --follow-tags
```

`npm version` refuses a dirty tree, so the work lands as its own commit and
the version commit (`0.70.0`) holds only the bump and `dist/`.

| Hook | Does |
| --- | --- |
| `preversion` | lint, typecheck, `build`, then `test` — building first so the No Build stories cover this build |
| `version` | builds again and stages `dist/` into the version commit |

Anything red stops it before the version is written. The push is not a hook
because it is the one step that cannot be undone locally (`git reset`,
`git tag -d`); consumers can only use the tag once it is pushed.

Versions are pre-1.0: `minor` for anything breaking (the usual case), `patch`
for a fix that changes nothing a host relies on.

CI runs the same checks on every push, and fails if the committed `dist/`
differs from a fresh build.
