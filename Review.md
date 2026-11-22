# Review

## What the AI produced
A Playwright Test (TypeScript) project: 5 spec files / 18 tests, `playwright.config.ts` with a CI branch, `merge.config.ts`, a GitHub Actions workflow with 4 shards and a report merge job, README with CI section, Description.md and Prompt.md.

## How I reviewed / modified
- Locators: `data-test` attributes (used by the Toolshop app) instead of CSS/XPath. **They must be verified against the live DOM.**
- Replaced fixed sleeps with `expect` auto-waiting and `waitForResponse` (registered before the action, to avoid a race) for sorting and cart quantity.
- Registration test uses a timestamp-based unique email so it is repeatable.
- Config and workflow follow the guide's templates; checked against the requirements table (1–6).

## Honest limitations
- **Nothing was executed**: the AI session had no network and no Node.js. Selectors and texts (error messages, "The cart is empty") are unverified and may need adjusting after the first run.
- `package-lock.json` does **not exist yet** — `npm ci` and `cache: npm` in CI fail without it.
- Runtime table, badge and run links in the README are placeholders until real runs exist.

## Student checklist (to finish the homework)
1. Install Node 20/22 LTS, then in this folder: `npm install` (creates `package-lock.json` — commit it).
2. `npx playwright install chromium`, `npx playwright test` — fix any failing selectors until green.
3. Local CI check: `CI=true npx playwright test`; put `test.only` in one test and confirm it fails; revert. Try shards + `merge-reports` (see README).
4. Create a public GitHub repo, `git init`, push to a feature branch, open a PR into `main` (gives one push run and one PR run; the second run shows "Cache restored" in setup-node).
5. Run once with `matrix shardIndex: [1]`, `shardTotal: [1]` (3× via Run workflow), then with 4 shards (3×); take medians, fill the README table with run links.
6. Replace `<owner>/<repo>` in README, merge the PR so the badge shows `main` status.
7. Put screenshots (run graph with 4 shards, artefacts list, trace on trace.playwright.dev) into `screenshots/`.
8. Submit before **Nov 22, 23:59**.
