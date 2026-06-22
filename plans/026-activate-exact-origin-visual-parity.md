# Plan 026: Activate exact origin visual parity across origin-backed components

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 06ce105b..HEAD -- tests/e2e/origin-visual-parity.spec.ts tests/e2e/origin-parity/fixtures.json tests/e2e/origin-parity/references scripts/capture-origin-visual-parity-fixtures.mjs scripts/check-origin-visual-parity-coverage.mjs docs/product/origin-content-parity-review.md docs/product/project-invariants-scorecard.md registry apps/docs/public package.json plans/026-activate-exact-origin-visual-parity.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/016-add-origin-visual-parity-regression-suite.md, plans/025-add-toggleable-openstory-ui-dev-hud.md
- **Category**: tests
- **Planned at**: commit `06ce105b`, 2026-06-22

## Why this matters

Manual side-by-side inspection caught that the shadcn Button Rounded example was
visually close but still 4px too large: local output used the recipe's
`size-9` icon class while the current origin example renders `size-8
rounded-full`. The project already has origin visual parity tooling, but most
origin-backed components are still inventory-only, so exact visual drift is
easy to miss.

This plan turns the Button Rounded failure into the repeatable standard:
origin-backed examples should not be marked complete until local code is traced
back to the same upstream source classes and numeric values, and an automated
fixture compares local OpenStory output against a captured origin reference for
DOM, class tokens where meaningful, computed styles, geometry, and screenshot
pixels.

## Current state

The project has these relevant commands in `package.json`:

```json
{
  "origin:parity:capture": "bun scripts/capture-origin-visual-parity-fixtures.mjs",
  "origin:parity:coverage": "bun scripts/check-origin-visual-parity-coverage.mjs",
  "origin:parity:test": "playwright test tests/e2e/origin-visual-parity.spec.ts",
  "check:registry": "bun scripts/build-registry.mjs --check && ... && bun scripts/check-origin-visual-parity-coverage.mjs && bun run check:invariants"
}
```

`tests/e2e/origin-parity/fixtures.json` already lists every public origin-backed
Base UI and shadcn item, but most entries have all comparisons disabled:

```json
"compare": {
  "dom": false,
  "classTokens": false,
  "computedStyle": [],
  "geometry": false,
  "screenshot": false
}
```

The active pilot currently proves the machinery for `base-ui-button--basic`:
it compares DOM, computed styles, geometry, and screenshots against stored
references. The coverage checker reports the distinction between active
examples and inventory-only examples; `check:registry` runs that checker.

The shadcn Button Rounded example now carries the origin-specific override:

```ts
Button.view<Message>({
  variant: "outline",
  size: "icon",
  className: "size-8 rounded-full",
  children: ["↑"],
})
```

At plan time, browser measurement of local OpenStory
`shadcn-button--rounded` reported `width: 32`, `height: 32`, `border: 1px`,
and final classes including `size-8 rounded-full`.

Important source distinction: shadcn visual output can come from both a
component recipe file and a docs/example file. For Button, the checked-in
`registry/upstream/snapshots/shadcn/button.tsx` recipe currently defines
`size.icon` as `size-9`, while the rounded example's live rendered source can
still contribute an example-level override such as `size-8 rounded-full`.
Do not "average" these or guess from screenshots. Record which source provided
each class token or numeric value before changing local code.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Capture a focused origin reference | `bun run origin:parity:capture -- --item shadcn-button --example rounded` | exit 0; reference JSON/PNG for Button Rounded updated |
| Run focused parity test | `bun run origin:parity:test -- --grep shadcn-button` | exit 0 |
| Run all active parity tests | `bun run origin:parity:test` | exit 0 |
| Coverage guard | `bun run origin:parity:coverage` | exit 0; reports active vs inventory-only counts |
| Registry gate | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Whitespace | `git diff --check` | exit 0 |

If the current capture script does not support `--example`, add that filter as
part of this plan. Do not recapture unrelated origin pages when working a single
component.

## Scope

**In scope**:

- `tests/e2e/origin-visual-parity.spec.ts`
- `tests/e2e/origin-parity/fixtures.json`
- `tests/e2e/origin-parity/references/**`
- `scripts/capture-origin-visual-parity-fixtures.mjs`
- `scripts/check-origin-visual-parity-coverage.mjs`
- `docs/product/origin-content-parity-review.md`
- `docs/product/project-invariants-scorecard.md`
- Component source, example source, focused scene tests, and generated registry
  JSON for components whose active parity fixture is enabled in this plan.

**Out of scope**:

- Rewriting OpenStory internals.
- Making live upstream websites part of CI. Live origin access is only for
  explicit local capture/update commands.
- Marking a component visually complete from manual screenshots alone.
- Bulk visual tweaks without an active origin fixture proving the change.

## Steps

### Step 1: Make shadcn Button Rounded the first exact shadcn fixture

Add an active fixture entry for `shadcn-button` / `rounded` that targets the
current origin Rounded example and local `shadcn-button--rounded` story.

Before changing any local Button code, capture source evidence for the exact
classes and numbers:

- Component recipe source: the shadcn Button implementation that defines base,
  variant, and size classes for the selected style.
- Example source: the Rounded example code block or registry source that defines
  example-level props/classes such as `variant`, `size`, and `className`.
- Rendered origin evidence: DevTools/Playwright output for the concrete element,
  including final class list, computed width/height, padding, border widths, and
  border radius.

Record this evidence in the fixture JSON `notes` or in
`docs/product/origin-content-parity-review.md`. A reviewer should be able to
answer "where did `size-8` come from?" without looking at the screenshot from
this conversation.

Compare at least:

- DOM tag/text/stable attributes.
- Class tokens, because this component is expected to preserve shadcn utility
  class vocabulary after `cn` conflict resolution.
- Computed styles for `box-sizing`, `width`, `height`, horizontal/vertical
  padding, border widths/styles/colors, border radius, background color,
  foreground color, display, align-items, justify-content, font-size, font
  weight, line-height, gap, and white-space.
- Geometry width and height with a tolerance of at most 1px.
- Screenshot with a strict enough threshold to catch the prior 36px-vs-32px
  drift.

Capture or refresh the origin reference with:

```sh
bun run origin:parity:capture -- --item shadcn-button --example rounded
```

Then verify:

```sh
bun run origin:parity:test -- --grep shadcn-button
```

Expected result: both commands exit 0.

### Step 2: Tighten the fixture model for exact comparisons

If the existing fixture shape cannot express exactness clearly, extend it
without breaking inventory-only rows:

- Add optional `notes` explaining intentional local constraints.
- Keep per-property computed style tolerances.
- Keep per-example geometry/screenshot tolerances.
- Make active fixture rows fail if required reference JSON or PNG files are
  missing.
- Keep class token comparison optional, because Base UI CSS module hashes and
  shadcn utility classes have different parity expectations.

Verify:

```sh
bun run origin:parity:coverage
bun run origin:parity:test -- --grep shadcn-button
```

Expected result: both commands exit 0.

### Step 3: Roll out active fixtures by component lane

Convert inventory-only rows to active fixtures in small batches. Recommended
order:

1. shadcn components with simple, static examples: Button, Badge, Skeleton,
   Separator, Typography.
2. Base UI components with stable closed-state visuals: Button, Checkbox,
   Switch, Tabs, Accordion.
3. Interactive overlays and popups only after their deterministic open state is
   easy to drive in Playwright.

For each component:

- Pick one stable origin example and one matching local OpenStory story.
- Identify the upstream component recipe source and the upstream example source.
- Copy or derive class tokens and numeric values from those sources first; use
  rendered geometry only to verify that Tailwind/CSS resolution matches.
- Capture origin JSON/PNG.
- Enable comparisons that are meaningful for that lane.
- Fix local source only when the fixture proves real drift.
- Update focused scene tests for the component-local API or example contract
  that caused the visual drift.
- Regenerate affected `apps/docs/public/*.json` artifacts.

After each batch, run:

```sh
bun run origin:parity:test -- --grep <component-name>
bun run check:registry
git diff --check
```

Expected result: all commands exit 0.

### Step 4: Update the ledgers and invariants

Update `docs/product/origin-content-parity-review.md` so rows distinguish:

- inventory-only visual coverage;
- active automated visual coverage;
- exact class/computed/geometry/screenshot coverage;
- documented Foldkit constraints.

Update `docs/product/project-invariants-scorecard.md` evidence for:

- `P5_EXAMPLE_PARITY`
- `P6_VISUAL_PARITY`
- `P10_ORIGIN_API_PARITY`

Verify:

```sh
bun run check:invariants
bun run check:registry
```

Expected result: both commands exit 0.

## Done criteria

All must hold:

- [ ] `shadcn-button--rounded` has an active origin visual parity fixture that
  catches 36px-vs-32px drift.
- [ ] The capture workflow can refresh one example without recapturing unrelated
  components.
- [ ] At least one small shadcn batch beyond Button has active visual fixtures,
  or the executor reports a blocker with exact origin selector evidence.
- [ ] `bun run origin:parity:test -- --grep shadcn-button` exits 0.
- [ ] `bun run origin:parity:test` exits 0 for all active fixtures.
- [ ] `bun run origin:parity:coverage` exits 0 and reports current active vs
  inventory-only counts.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `git diff --check` exits 0.
- [ ] Parity ledger and invariant evidence describe the new exactness standard.

## STOP conditions

Stop and report back instead of improvising if:

- The live origin page cannot expose a stable selector for an example.
- Exact matching requires importing React, shadcn, Base UI, or upstream app code
  into local Foldkit source.
- A component has a documented Foldkit constraint that makes exact geometry
  impossible; record the constraint in the ledger instead of masking it with a
  wide tolerance.
- The capture script would need to hit live origin pages in CI.
- Broad rollout starts producing unrelated style churn outside the component
  under active fixture review.

## Maintenance notes

- Exact visual parity is a ratchet: once a row has an active fixture, do not
  turn comparisons off to make a local change pass.
- Prefer small component batches and focused `--grep` runs. Broad visual
  rollout is reviewable only when each component has its own evidence trail.
- When upstream changes visually, refresh fixtures intentionally with
  `origin:parity:capture`, then review the generated reference diffs before
  changing local source.
