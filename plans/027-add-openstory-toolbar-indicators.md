# Plan 027: Add OpenStory Toolbar Indicators

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check for this repo (run first)**:
> `git diff --stat e268106b..HEAD -- src/preview.ts src/openstory/shadcnTheme.ts tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts package.json`
>
> **Drift check for the local OpenStory checkout (run first)**:
> `git -C /Volumes/Sync/Development/Bearing-Ward/openstory diff --stat 9ee81cd..HEAD -- packages/openstory/src/types.ts packages/openstory/src/shell/src/lib/types.ts packages/openstory/src/shell/src/components/top-bar.tsx packages/openstory/src/shell/src/components/ui/select.tsx packages/openstory/src/shell/src/index.css packages/openstory/dist/shell`
>
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/023-add-openstory-theme-and-mode-selectors.md, plans/024-expand-openstory-shadcn-theme-catalog.md
- **Category**: dx
- **Planned at**: foldkit-basic-cn-ui commit `e268106b`, OpenStory commit `9ee81cd`, 2026-06-22

## Why this matters

OpenStory now exposes compact toolbar dropdowns for shadcn theme and color mode.
Text-only dropdowns make the top bar harder to scan, especially when adjacent
controls all read as short labels such as `Light` or `Dark`. The desired
behavior is real UI metadata:
dropdown triggers and dropdown items should render an icon and/or color swatch
without changing the selected global value, accessible option names, or story
iframe behavior.

This cannot be solved cleanly by editing only `src/preview.ts`. The current
OpenStory shell type surface has a partial `ToolbarItem.icon` field, but the
shell renderer ignores item icons and has no item color field. This plan adds
the renderer support in the local OpenStory file dependency, then populates the
Foldkit CN toolbar globals with source-derived indicator metadata.

## Current state

Relevant files and roles:

- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/top-bar.tsx` - renders OpenStory's top toolbar dropdowns from `manifest.globalTypes`.
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/lib/types.ts` - shell-side manifest and toolbar item types.
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/types.ts` - package public manifest/preview type surface used by consumers.
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/ui/select.tsx` - shadcn/Radix select wrapper used by toolbar dropdowns.
- `src/openstory/shadcnTheme.ts` - derives the shadcn theme and mode globals from `registry/upstream/derived/shadcn-theme.json`.
- `src/preview.ts` - currently contains a literal preview object with the same toolbar globals; it is dirty in the current working tree, so preserve user changes and reconcile with `src/openstory/shadcnTheme.ts`.
- `tests/e2e/openstory-shadcn-theme.spec.ts` - existing Playwright coverage for theme and mode toolbar behavior.

OpenStory currently accepts item-shaped objects but only renders item titles:

```tsx
// /Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/top-bar.tsx:21
const isToolbarItem = (item: unknown): item is ToolbarItem =>
  typeof item === "object" && item !== null && "value" in item && "title" in item;

// /Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/top-bar.tsx:66
<SelectTrigger
  className="h-8 w-auto min-w-24 max-w-40 shrink-0 sm:min-w-36"
  aria-label={titleLabel}
>
  <span className="mr-1 hidden text-muted-foreground sm:inline">{titleLabel}:</span>
  <SelectValue />
</SelectTrigger>

// /Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/top-bar.tsx:73
<SelectContent>
  {items.map((item) => (
    <SelectItem key={String(item.value)} value={String(item.value)}>
      {item.title}
    </SelectItem>
  ))}
</SelectContent>
```

The shell type already has `icon?: string`, but no `color`/swatch field:

```ts
// /Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/lib/types.ts:17
export interface ToolbarItem {
  value: unknown;
  title: string;
  icon?: string;
}

export interface ToolbarOptions {
  title?: string;
  icon?: string;
  items: Array<ToolbarItem | unknown>;
  dynamicTitle?: boolean;
}
```

The select item wrapper already renders the selected check indicator on the
right. New leading indicators must not collide with that right-side check:

```tsx
// /Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/ui/select.tsx:63
<SelectPrimitive.Item
  ref={ref}
  className={cn(
    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className,
  )}
  {...props}
>
  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
    <SelectPrimitive.ItemIndicator>
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </span>
  <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
</SelectPrimitive.Item>
```

Foldkit CN's shadcn theme globals are derived from checked-in theme data:

```ts
// src/openstory/shadcnTheme.ts:71
export const shadcnThemeGlobalTypes = {
  [shadcnThemeGlobalKey]: {
    name: "shadcn theme",
    description: "Source-derived shadcn style and base color.",
    defaultValue: defaultShadcnThemeKey,
    toolbar: {
      title: "shadcn",
      icon: "circlehollow",
      dynamicTitle: true,
      items: uniqueThemeEntriesByKey.map((theme) => ({
        value: themeKey(theme),
        title: `${toTitle(theme.style)} ${toTitle(theme.baseColor)}`,
      })),
    },
  },
```

Repo conventions that apply:

- This Foldkit repo uses Bun. `package.json` declares `bun@1.3.14` and scripts
  such as `bun run typecheck`, `bun run test`, `bun run test:e2e`, and
  `bun run check:registry`.
- OpenStory is a local file dependency: `package.json` uses
  `"openstory": "file:../openstory/packages/openstory"`. In this checkout the
  real package path resolves to
  `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory`.
- Do not edit generated OpenStory shell bundle files directly. Change
  OpenStory source under `packages/openstory/src/shell/src/**`, then rebuild
  the shell so `packages/openstory/dist/shell/**` is generated by OpenStory.
- Preserve accessible names. Indicator swatches/icons must be `aria-hidden` or
  otherwise excluded from the option label so Playwright locators such as
  `page.getByRole("option", { name: "Rhea Amber" })` keep working.

## Invariant Impact For Future Plans

| Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal |
| --- | --- | --- | --- | --- |
| `P4_SOURCE_PARITY` | shadcn theme item colors must be derived from `registry/upstream/derived/shadcn-theme.json`, not invented ad hoc. | No grade change expected. | Existing theme contract and manifest/e2e checks. | This plan does not refresh upstream shadcn theme snapshots. |
| `P7_ACCESSIBILITY` | Toolbar indicators must not alter combobox labels, option names, focus behavior, or selected state announcements. | No grade change expected; preserve current behavior while adding visual affordance. | New Playwright assertions for trigger and option indicators plus existing role locators. | This plan does not audit every component's accessibility. |
| `P9_GENERATED_ARTIFACTS` | OpenStory shell source changes require rebuilt `dist/shell/**` output so the local file dependency serves the new UI. | No grade change expected. | OpenStory shell build plus Foldkit CN e2e checks. | This plan does not regenerate registry JSON unless an existing verification command requires it. |
| `P11_PROGRESS_LEDGER` | Adds a tracked implementation plan with scope, dependencies, evidence, non-goals, and STOP conditions. | No grade change expected. | `plans/027-add-openstory-toolbar-indicators.md` and `plans/README.md`. | This plan does not change the invariant scorecard itself. |

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Foldkit typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Foldkit unit/story tests | `bun run test` | exit 0, all Vitest projects pass |
| Focused OpenStory theme e2e | `bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts` | exit 0, all focused Playwright tests pass |
| Registry gate | `bun run check:registry` | exit 0, registry checks pass |
| OpenStory typecheck | `cd /Volumes/Sync/Development/Bearing-Ward/openstory && pnpm --dir packages/openstory run typecheck` | exit 0, no TypeScript errors |
| OpenStory shell build | `cd /Volumes/Sync/Development/Bearing-Ward/openstory && pnpm --dir packages/openstory run build:shell` | exit 0, `packages/openstory/dist/shell/**` regenerated |

## Scope

**In scope**:

- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/types.ts`
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/lib/types.ts`
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/top-bar.tsx`
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/ui/select.tsx` only if needed for layout/classes
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/index.css` only if needed for reusable shell indicator classes
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/dist/shell/**` generated by `pnpm run build:shell`
- `src/openstory/shadcnTheme.ts`
- `src/preview.ts`
- `tests/e2e/openstory-shadcn-theme.spec.ts`
- `tests/e2e/openstory-toolbar-indicators.spec.ts` (create)
- `plans/README.md` status update after execution

**Out of scope**:

- Installable registry component source under `registry/**`.
- Base UI/shadcn component recipe, size, geometry, or visual parity changes.
- UI dev HUD globals, toolbar controls, or iframe overlay implementation.
- Replacing OpenStory's select implementation or moving away from Radix Select.
- Encoding indicators by prefixing option titles with text symbols. The
  indicator must be structured UI, not part of the option title string.
- Adding a general host-pluggable OpenStory shell API beyond toolbar indicator
  metadata.

## Git workflow

- Branch for Foldkit CN work: `codex/027-openstory-toolbar-indicators`.
- If the OpenStory checkout needs its own branch, use
  `codex/toolbar-indicators` inside `/Volumes/Sync/Development/Bearing-Ward/openstory`.
- Commit messages should follow the existing imperative style, for example:
  `Add OpenStory toolbar indicators`.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Confirm the editable OpenStory dependency boundary

Verify that `node_modules/openstory` resolves to the local OpenStory checkout
and that the OpenStory package is not carrying unrelated dirty source changes.

Run:

```sh
realpath node_modules/openstory/src/shell/src/components/top-bar.tsx
git -C /Volumes/Sync/Development/Bearing-Ward/openstory status --short --branch
```

Expected:

- `realpath` points under `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/...`.
- OpenStory status is clean or only contains changes already known to be part of
  this plan. If unrelated dirty OpenStory changes exist, STOP and report.

**Verify**: the commands above match the expected results.

### Step 2: Extend the toolbar metadata contract

In both OpenStory type files, extend toolbar item metadata to support an
optional visual swatch color while preserving the existing `icon` field:

- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/types.ts`
- `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/lib/types.ts`

Target shape:

```ts
export interface ToolbarItem {
  value: unknown;
  title: string;
  icon?: string;
  color?: string;
}

export interface ToolbarOptions {
  title?: string;
  icon?: string;
  color?: string;
  items: Array<ToolbarItem | unknown>;
  dynamicTitle?: boolean;
}
```

Keep the current permissive `items: Array<ToolbarItem | unknown>` shape so older
preview metadata continues to load.

**Verify**:

```sh
cd /Volumes/Sync/Development/Bearing-Ward/openstory && pnpm --dir packages/openstory run typecheck
```

Expected: exit 0.

### Step 3: Render toolbar indicators in the OpenStory top bar

Update
`/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/src/shell/src/components/top-bar.tsx`.

Add a small renderer for toolbar item labels that can show:

- a leading icon when `item.icon` is present and recognized by a local icon map;
- a leading color swatch when `item.color` is present;
- the item title as the accessible text.

Use `lucide-react` icons already available to the OpenStory shell. Keep the icon
map intentionally small and explicit. It must cover the existing toolbar strings
used by this repo:

- `circlehollow`
- `circle`
- `eye`
- `square`
- `markup`
- `bolt`

It should also cover the mode item icons introduced in Step 5:

- `sun`
- `moon`
- `monitor`

Recommended component shape:

```tsx
const ToolbarIndicator = ({ item }: { item: ToolbarItem }) => {
  // render color swatch and icon with aria-hidden="true"
};

const ToolbarItemLabel = ({ item }: { item: ToolbarItem }) => (
  <span className="flex min-w-0 items-center gap-2">
    <ToolbarIndicator item={item} />
    <span className="truncate">{item.title}</span>
  </span>
);
```

Do not render arbitrary icon strings as text. Unknown icon names should simply
fall back to no icon. Color strings come from trusted local preview metadata,
but still render through the `style={{ backgroundColor: item.color }}` property
rather than by assembling class names.

Change the trigger so the selected value also shows the selected item's
indicator. Because `SelectValue` only renders text, derive
`selectedItem = items.find((item) => String(item.value) === currentValue)` and
render `ToolbarItemLabel` for that selected item inside the trigger. Preserve
`aria-label={titleLabel}` on `SelectTrigger`.

The dropdown content should render the same `ToolbarItemLabel` inside each
`SelectItem`. The existing selected checkmark on the right should remain.

**Verify**:

```sh
cd /Volumes/Sync/Development/Bearing-Ward/openstory && pnpm --dir packages/openstory run typecheck
```

Expected: exit 0.

### Step 4: Rebuild the OpenStory shell bundle

Run the OpenStory shell build from the package directory:

```sh
cd /Volumes/Sync/Development/Bearing-Ward/openstory && pnpm --dir packages/openstory run build:shell
```

Expected: exit 0 and generated changes under
`/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory/dist/shell/**`.

Do not hand-edit generated `dist/shell` assets. If the build fails because
dependencies are missing in the OpenStory checkout, STOP and report rather than
installing new dependencies without operator approval.

**Verify**:

```sh
git -C /Volumes/Sync/Development/Bearing-Ward/openstory diff --stat -- packages/openstory/src packages/openstory/dist/shell
```

Expected: source changes plus generated shell output; no unrelated OpenStory
files.

### Step 5: Populate Foldkit CN toolbar indicator metadata

Update `src/openstory/shadcnTheme.ts` so the derived globals include indicators:

- Theme dropdown trigger and items:
  - keep `toolbar.title: "shadcn"` and `dynamicTitle: true`;
  - keep current values and titles;
  - add `icon: "circlehollow"` to theme items if no better source-derived icon
    exists;
  - add `color` from the checked-in shadcn theme contract. Prefer the item's
    light-mode `primary` token for a stable hue swatch. If the light-mode entry
    for a selected `style-baseColor` key is missing, use the first matching
    entry's `primary`; if `primary` is missing, fall back to `background`.
- Mode dropdown:
  - `light`: `{ icon: "sun", color: "oklch(0.985 0 0)" }`
  - `dark`: `{ icon: "moon", color: "oklch(0.145 0 0)" }`
  - `system`: `{ icon: "monitor", color: "oklch(0.556 0 0)" }`

Keep the item `title` strings unchanged. Do not make the shell infer theme
colors from other globals; this plan should use explicit metadata emitted in
the manifest.

Then reconcile `src/preview.ts` with the same source of truth. If `src/preview.ts`
still contains hand-authored duplicate theme or mode `globalTypes`, replace that
duplicate with imports from `src/openstory/shadcnTheme.ts`.

Avoid moving component-specific configuration into the OpenStory shell. The
shell renders generic metadata; this repo owns the concrete metadata values.

**Verify**:

```sh
bun run typecheck
```

Expected: exit 0.

### Step 6: Add focused Playwright coverage

Create `tests/e2e/openstory-toolbar-indicators.spec.ts`.

Test cases:

1. The manifest exposes indicator metadata:
   - `globalTypes.shadcnTheme.toolbar.items` contains a `Rhea Amber` item with
     `value: "rhea-amber"`, unchanged `title: "Rhea Amber"`, and a non-empty
     string `color`.
   - `globalTypes.shadcnMode.toolbar.items` contains `Light`, `Dark`, and
     `System` with unchanged titles plus expected `icon` strings.
2. The top-bar trigger renders an indicator for the selected theme and mode:
   - open `/?id=shadcn-button--default`;
   - assert `page.getByLabel("shadcn")` and `page.getByLabel("mode")` remain
     visible;
   - assert each trigger contains a child with a stable test id or data
     attribute such as `data-openstory-toolbar-indicator`.
3. Dropdown items render indicators while preserving accessible option names:
   - click the shadcn dropdown;
   - assert `page.getByRole("option", { name: "Rhea Amber" })` is visible;
   - assert the `Rhea Amber` option contains a swatch/icon indicator;
   - select `Rhea Amber` and assert the trigger indicator remains visible.
Prefer stable `data-*` selectors for indicators over brittle CSS-class
selectors. If you add a `data-openstory-toolbar-indicator` attribute in
OpenStory, keep it generic and harmless.

**Verify**:

```sh
bunx playwright test tests/e2e/openstory-toolbar-indicators.spec.ts
```

Expected: exit 0.

### Step 7: Run focused and broad verification

Run:

```sh
bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts
bun run typecheck
bun run test
bun run check:registry
```

Expected:

- focused Playwright tests exit 0;
- typecheck exits 0;
- Vitest exits 0;
- registry check exits 0.

If broad registry checks fail only because of pre-existing generated artifact
drift unrelated to this plan, capture the exact failing command and STOP for
review. Do not "fix" unrelated registry output as part of this plan.

## Test plan

- Add `tests/e2e/openstory-toolbar-indicators.spec.ts` for the new shell
  behavior and manifest metadata.
- Extend `tests/e2e/openstory-shadcn-theme.spec.ts` only if needed to assert
  that theme/mode selection still changes iframe theme tokens after indicator
  rendering.
- Run the OpenStory package typecheck and shell build because shell source lives
  in the local OpenStory file dependency.

## Done criteria

All must hold:

- [ ] OpenStory `ToolbarItem` supports optional `icon` and `color` metadata in
      both public and shell type files.
- [ ] OpenStory top-bar dropdown triggers render the selected item's indicator
      when metadata exists.
- [ ] OpenStory dropdown options render item indicators while keeping option
      accessible names unchanged.
- [ ] Foldkit CN shadcn theme items expose source-derived color metadata from
      `registry/upstream/derived/shadcn-theme.json`.
- [ ] Foldkit CN mode items expose deterministic icon/color metadata.
- [ ] `cd /Volumes/Sync/Development/Bearing-Ward/openstory && pnpm --dir packages/openstory run typecheck` exits 0.
- [ ] `cd /Volumes/Sync/Development/Bearing-Ward/openstory && pnpm --dir packages/openstory run build:shell` exits 0 and generated shell output is included.
- [ ] `bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] No installable registry component files under `registry/**` are modified.
- [ ] `plans/README.md` status row for plan 027 is updated.

## STOP conditions

Stop and report back if:

- The OpenStory package is not available at
  `/Volumes/Sync/Development/Bearing-Ward/openstory/packages/openstory`.
- OpenStory has unrelated dirty source or generated shell changes before this
  plan starts.
- The current OpenStory top-bar code no longer matches the excerpted structure
  and already has a different indicator API.
- Rendering indicators requires replacing Radix Select instead of extending the
  existing shell components.
- Accessible option names change, for example `getByRole("option", { name:
  "Rhea Amber" })` stops working.
- The implementation appears to require editing installable component source in
  `registry/**`.
- A verification command fails twice after a reasonable local fix attempt.

## Maintenance notes

- Future OpenStory toolbar metadata should use the same `icon`/`color` fields
  rather than embedding symbols into `title`.
- Reviewers should inspect the top bar on narrow widths. Indicator additions
  must not cause controls to overflow worse than the current `overflow-x-auto`
  top-bar behavior.
- If OpenStory later ships an upstream toolbar indicator API, migrate this local
  shape to that API and remove any compatibility glue.
- If shadcn theme contract generation changes token names, revisit the
  theme-item color derivation rather than hard-coding fallback colors.
