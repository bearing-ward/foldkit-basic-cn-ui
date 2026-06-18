# Plan 010: Build the Foldkit-native LiveTrace component kit

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report;
> do not improvise. When done, update the status row for this plan in
> `plans/README.md`.
>
> **Drift check (run first)**:
> `git diff --stat 759aca29..HEAD -- registry/default/ui registry/default/examples registry/default/items.json src/openstory/generated src/openstory/wipSpace/livetrace src/styles.css scripts/check-registry-metadata.mjs scripts/check-example-tests.mjs scripts/generate-openstory-stories.mjs`
>
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts below against the live code before proceeding. On a
> mismatch that changes the target component API or registry contract, stop and
> report.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: Medium
- **Planned at**: `759aca29`
- **Status**: TODO

## Why this matters

The current LiveTrace work is a high-fidelity OpenStory WIP capture under
`src/openstory/wipSpace/livetrace/`. It is useful as a visual reference, but it
is monolithic and not installable as Foldkit CN registry source. The next step is
to turn the captured UI into a Foldkit-native component package that exposes
small reusable building blocks: log lines, status badges, progress bars, step
markers, trace cards, activity rows, code panels, execution panels, and agent
workflow panels.

This plan should produce the first installable `foldkit-livetrace` registry item
and examples that go deeper than the current full-page LiveTrace demos. The
examples should let OpenStory users inspect each primitive independently before
the team later decomposes or adapts the pieces for product use.

## Scope

In scope:

- New installable UI package:
  - `registry/default/ui/foldkit-livetrace/index.ts`
  - `registry/default/ui/foldkit-livetrace/view.ts`
  - `registry/default/ui/foldkit-livetrace/foldkit-livetrace.scene.test.ts`
  - Optional: `registry/default/ui/foldkit-livetrace/sample-data.ts` if examples
    would otherwise duplicate large fixture objects.
- New registry examples, each with `main.ts` and a `.scene.test.ts`:
  - `registry/default/examples/foldkit-livetrace-log-line/`
  - `registry/default/examples/foldkit-livetrace-progress-indicators/`
  - `registry/default/examples/foldkit-livetrace-trace-card/`
  - `registry/default/examples/foldkit-livetrace-activity-panel/`
  - `registry/default/examples/foldkit-livetrace-code-panel/`
  - `registry/default/examples/foldkit-livetrace-execution-panel/`
  - `registry/default/examples/foldkit-livetrace-agent-demo/`
  - `registry/default/examples/foldkit-livetrace-overview/`
- Registry metadata:
  - `registry/default/items.json`
- Generated OpenStory output:
  - expected generated story file: `src/openstory/generated/registry-livetrace.stories.ts`
    after `bun run openstory:generate`.

Out of scope:

- Do not delete or rewrite `src/openstory/wipSpace/livetrace/`; use it as the
  reference capture.
- Do not import from `src/openstory/wipSpace/livetrace/` in registry code.
  Registry source must stand alone under `registry/default/ui/foldkit-livetrace`.
- Do not modify `src/styles.css` unless a verification failure proves the
  registry component cannot consume existing shadcn/Tailwind variables.
- Do not add docs navigation/routes for LiveTrace in this plan. This plan is the
  component kit and examples only.
- Do not introduce non-Effect/Foldkit state management.

## Current state

The LiveTrace capture currently exposes multiple OpenStory surfaces but keeps
the component pieces private inside one WIP file:

```ts
// src/openstory/wipSpace/livetrace/main.ts:87-97
export const init = makeInit("full-page");
export const initStageGrid = makeInit("stage-grid");
export const initLiterate = makeInit("literate");
export const initHowStep = makeInit("how-step");
export const initAgentDemo = makeInit("agent-demo");
export const initQuickstart = makeInit("quickstart");
export const initStream = makeInit("stream", "running");
export const initLogs = makeInit("logs");
export const initActivity = makeInit("activity");
export const initCode = makeInit("code");
export const initTransports = makeInit("transports");
```

The useful data shapes are plain TypeScript types inside the view section:

```ts
// src/openstory/wipSpace/livetrace/main.ts:121-142
type TraceStep = Readonly<{
  name: string;
  meta: string;
  duration: string;
  progress: string;
  state: StepState;
}>;

type Trace = Readonly<{
  title: string;
  id: string;
  elapsed: string;
  status: Mode;
  steps: readonly TraceStep[];
}>;

type LogLine = Readonly<{
  timestamp: string;
  level: "info" | "warn" | "error";
  source: string;
  message: string;
}>;
```

The WIP capture has a reference LiveTrace dark palette bridged to Tailwind v4
and shadcn variables:

```ts
// src/openstory/wipSpace/livetrace/main.ts:247-259
const shellClassName =
  "dark min-h-screen bg-background text-foreground ... [--color-ring:hsl(190_100%_50%)]";
const panelClassName =
  "rounded-[10px] border border-border bg-card text-card-foreground";
const subtlePanelClassName =
  "rounded-[6px] border border-border bg-muted/35 text-card-foreground";
const pillClassName =
  "inline-flex h-7 items-center gap-2 rounded-[4px] border border-border bg-muted px-3 font-mono text-[11px] text-muted-foreground";
```

The key pieces to extract include:

```ts
// src/openstory/wipSpace/livetrace/main.ts:462-488
const statusChipClassName = (status: Mode): string => ...
const stepStateClassName = (state: StepState): string => ...
const logLineClassName = (level: LogLine["level"]): string => ...

// src/openstory/wipSpace/livetrace/main.ts:1284-1375
const embeddedLogConsoleView = (...) => ...
const traceCardView = (...) => ...

// src/openstory/wipSpace/livetrace/main.ts:1479-1559
const activityPanelView = (...) => ...

// src/openstory/wipSpace/livetrace/main.ts:1776-1824
const agentStepCardView = (...) => ...

// src/openstory/wipSpace/livetrace/main.ts:2318-2395
const quickstartStepView = (...) => ...
```

Existing registry UI components expose generic parent-message view helpers from
`index.ts` and keep reusable class constants in `view.ts`. Match this shape:

```ts
// registry/default/ui/badge/index.ts:39-58
export const contentView = <ParentMessage>({
  children,
  variant = "Default",
  className,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span([h.Class(classNamesForVariant(variant, className))], children);
};

export const view = <ParentMessage>({
  label,
  variant = "Default",
  className,
}: ViewConfig): Html =>
  contentView<ParentMessage>({
    children: [label],
    variant,
    ...(className === undefined ? {} : { className }),
  });
```

Existing component tests use `Scene.scene` around tiny test-only views:

```ts
// registry/default/ui/badge/badge.scene.test.ts:22-34
describe("Badge registry view", () => {
  test("renders every documented variant", () => {
    Scene.scene(
      {
        update: (model: undefined): readonly [undefined, []] => [model, []],
        view,
      },
      Scene.with(undefined),
      Scene.expect(Scene.text("Default")).toExist(),
      Scene.expect(Scene.text("Secondary")).toExist(),
      Scene.expect(Scene.text("Destructive")).toExist(),
      Scene.expect(Scene.text("Outline")).toExist()
    );
  });
});
```

Example apps must follow the Foldkit app shape and use `Submodel.defineView`:

```ts
// registry/default/examples/shadcn-progress-basic/main.ts:11-23
// MODEL
export const Model = S.Struct({ value: S.Number });
export type Model = typeof Model.Type;

// MESSAGE
export const ClickedAdvanceProgress = m("ClickedAdvanceProgress");
export const Message = S.Union([ClickedAdvanceProgress]);
export type Message = typeof Message.Type;
```

## Commands you will need

| Purpose                    | Command                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Expected on success                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Typecheck                  | `bun run typecheck`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | exit 0, no TypeScript errors                                                 |
| Focused tests              | `bun run test -- foldkit-livetrace`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | exit 0; new component and example scene tests pass                           |
| Generate OpenStory         | `bun run openstory:generate`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | exit 0; generated story file for registry LiveTrace exists                   |
| OpenStory inventory check  | `bun run openstory:check`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | exit 0; reports checked generated stories                                    |
| Registry order             | `bun scripts/check-registry-order.mjs`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | exit 0; registry items sorted                                                |
| Registry metadata          | `bun scripts/check-registry-metadata.mjs`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | exit 0; no metadata failures                                                 |
| Example behavior guardrail | `bun scripts/check-example-tests.mjs`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | exit 0; all example items have scene tests with behavior or inert assertions |
| Focused lint/format        | `bunx ultracite check registry/default/ui/foldkit-livetrace registry/default/examples/foldkit-livetrace-log-line registry/default/examples/foldkit-livetrace-progress-indicators registry/default/examples/foldkit-livetrace-trace-card registry/default/examples/foldkit-livetrace-activity-panel registry/default/examples/foldkit-livetrace-code-panel registry/default/examples/foldkit-livetrace-execution-panel registry/default/examples/foldkit-livetrace-agent-demo registry/default/examples/foldkit-livetrace-overview registry/default/items.json src/openstory/generated/registry-livetrace.stories.ts` | exit 0                                                                       |
| Registry aggregate         | `bun run check:registry`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | exit 0                                                                       |

## Suggested executor toolkit

- Use the `componentize` or `extract` skill if available to keep the UI API
  coherent while extracting from the WIP reference.
- Use the `polish` skill only after the registry components and tests exist; do
  not polish before the component API is stable.

## Git hygiene

- Work on a branch named `codex/foldkit-livetrace-components` or equivalent.
- Do not commit unless the operator explicitly asks.
- Do not stage unrelated files. At plan time, `plans/README.md`, `src/styles.css`,
  and `src/openstory/wipSpace/` were already dirty or untracked from the capture
  work; treat those as existing user/session work.

## Steps

### Step 1: Create the `foldkit-livetrace` UI module shell

Create:

- `registry/default/ui/foldkit-livetrace/view.ts`
- `registry/default/ui/foldkit-livetrace/index.ts`

Use `view.ts` for class constants and small pure helpers. Use `index.ts` for
exported view functions and public config types.

Define these public types in `index.ts`:

- `LogLevel = "Info" | "Warning" | "Error"`
- `TraceStepState = "Complete" | "Running" | "Pending" | "Failed"`
- `TraceStatus = "Completed" | "Running" | "Failed" | "Concurrent"`
- `ActivityStatus = "Running" | "Completed" | "Failed"`
- `MetricTone = "Default" | "Accent" | "Ok" | "Warning" | "Error"`
- config types for each exported view function.

Export these granular view functions:

- `themeView<ParentMessage>({ children, className? })`
- `windowDotsView<ParentMessage>()`
- `controlButtonView<ParentMessage>({ label, active?, onClick?, className? })`
- `statusBadgeView<ParentMessage>({ status, label?, className? })`
- `progressTrackView<ParentMessage>({ value, tone?, className? })`
- `stepMarkerView<ParentMessage>({ state, label?, className? })`
- `traceStepView<ParentMessage>({ name, meta, duration, progress, state })`
- `logLineView<ParentMessage>({ timestamp, level, source, message })`
- `logConsoleView<ParentMessage>({ title, status, lines })`
- `traceCardView<ParentMessage>({ title, traceId, elapsed, status, steps, logLines })`
- `activityRowView<ParentMessage>({ documentName, duration, status })`
- `activityPanelView<ParentMessage>({ rows, eventsPerSecond })`
- `metricView<ParentMessage>({ label, value, tone? })`
- `agentStepCardView<ParentMessage>({ name, duration, chips, rows, state? })`
- `codeLineView<ParentMessage>({ text, active?, tone?, indent? })`
- `codePanelView<ParentMessage>({ path, lineLabel, lines })`
- `executionStepView<ParentMessage>({ number, name, tag, value, progress, state })`
- `executionPanelView<ParentMessage>({ documentName, documentMeta, badgeLabel, steps, embeddings? })`

API requirements:

- Every view function must be generic over `<ParentMessage>` and call
  `const h = html<ParentMessage>()` inside the function.
- Use readonly config objects and `readonly Html[]` / `readonly (Html | string)[]`.
- Optional behavior must be represented as optional parent messages, for example
  `onClick?: ParentMessage`. If `onClick` is absent, do not add an `h.OnClick`
  attribute.
- Use shadcn/Tailwind variables in classes: `bg-background`, `bg-card`,
  `bg-muted`, `text-foreground`, `text-card-foreground`,
  `text-muted-foreground`, `text-primary`, `border-border`, `ring-ring`.
- Do not hard-code the WIP shell's `--color-*` values into every component.
  If the reference dark palette is needed for examples, expose one optional
  `liveTraceThemeClassName` constant and have `themeView` apply it.

**Verify**:
`bun run typecheck` exits 0. Any error inside
`registry/default/ui/foldkit-livetrace` must be fixed before moving on.

### Step 2: Add component-level scene tests

Create `registry/default/ui/foldkit-livetrace/foldkit-livetrace.scene.test.ts`.

Cover these cases:

- `statusBadgeView` renders all statuses and writes a status-specific class or
  `data-status` attribute.
- `progressTrackView` renders `style.width` or equivalent progress state for
  `0`, `42`, and `100`.
- `stepMarkerView` renders complete/running/pending/failed states with stable
  text or `data-state`.
- `logLineView` renders info/warning/error rows, including timestamp, level,
  source, and message.
- `traceCardView` composes trace steps and an embedded log console.
- `activityPanelView` renders a row and events/sec value.
- `codePanelView` and `executionPanelView` render enough structure to verify
  their headings, active line/step, and progress values.

Match the existing test shape from `registry/default/ui/badge/badge.scene.test.ts`:
use a test-only `view = (): Html => ...`, an update function returning
`readonly [undefined, []]`, and `Scene.expect(...)`.

**Verify**:
`bun run test -- registry/default/ui/foldkit-livetrace/foldkit-livetrace.scene.test.ts`
exits 0.

### Step 3: Build focused registry examples for individual pieces

Create the example directories listed in Scope. Each example needs:

- `main.ts`
- `<slug>.scene.test.ts`

Each `main.ts` must use the Foldkit file pattern:

- `// MODEL`
- `// MESSAGE`
- `// INIT`
- `// UPDATE`
- `// VIEW`

Use `Schema` model fields, `m()` messages, `M.tagsExhaustive`, and `evo()` for
updates when an example has interaction. Do not use `NoOp`.

Example responsibilities:

- `foldkit-livetrace-log-line`: show `logLineView` for info, warning, and error
  rows plus one long truncated message.
- `foldkit-livetrace-progress-indicators`: show status badges, step markers,
  and progress tracks for pending/current/complete/failed.
- `foldkit-livetrace-trace-card`: show a completed trace card and controls to
  switch to running and failed modes.
- `foldkit-livetrace-activity-panel`: show running, completed, and failed
  activity rows plus the events/sec meter.
- `foldkit-livetrace-code-panel`: show a `src/process.ts` style code panel with
  one active line.
- `foldkit-livetrace-execution-panel`: show completed and quickstart/active
  execution panel modes.
- `foldkit-livetrace-agent-demo`: show metrics, agent step cards, answer panel,
  and log console.
- `foldkit-livetrace-overview`: compose the stage trace card and activity panel
  into the larger reference layout.

Every example scene test must satisfy `scripts/check-example-tests.mjs`: it must
either exercise an interaction (`Scene.click`, `Scene.change`, etc.) or assert
an inert/disabled control with `not.toHaveHandler`, `toBeDisabled`, or an
equivalent listed in that script.

**Verify**:
`bun run test -- foldkit-livetrace` exits 0 and includes the new component and
example scene tests.

### Step 4: Register the UI item and examples in `items.json`

Update `registry/default/items.json` in sorted order. `registry:ui` items must
come before `registry:example` items, and items within each type are sorted by
`name`.

Add one UI item:

```json
{
  "name": "foldkit-livetrace",
  "type": "registry:ui",
  "title": "Foldkit LiveTrace",
  "description": "A Foldkit-native LiveTrace component kit for trace cards, log rows, progress indicators, activity panels, code panels, and agent workflow views.",
  "dependencies": ["effect", "foldkit"],
  "devDependencies": ["vitest"],
  "registryDependencies": [],
  "files": [
    {
      "path": "registry/default/ui/foldkit-livetrace/index.ts",
      "target": "src/ui/foldkit-livetrace/index.ts",
      "type": "registry:ui"
    },
    {
      "path": "registry/default/ui/foldkit-livetrace/view.ts",
      "target": "src/ui/foldkit-livetrace/view.ts",
      "type": "registry:ui"
    },
    {
      "path": "registry/default/ui/foldkit-livetrace/foldkit-livetrace.scene.test.ts",
      "target": "src/ui/foldkit-livetrace/foldkit-livetrace.scene.test.ts",
      "type": "registry:ui"
    }
  ],
  "meta": {
    "foldkit": {
      "component": "LiveTrace",
      "origin": "https://foldkit.dev/ui/livetrace",
      "artifact": "component",
      "stateful": false
    }
  }
}
```

If you added `sample-data.ts`, include it in `files` with target
`src/ui/foldkit-livetrace/sample-data.ts`.

Add one `registry:example` item per example directory. Each example item should:

- use the directory slug as `name`;
- set `type` to `registry:example`;
- set `registryDependencies` to `["foldkit-livetrace"]`;
- set `dependencies` to `["effect", "foldkit"]`;
- set `devDependencies` to `["vitest"]`;
- list its `main.ts` and `.scene.test.ts` in `files`;
- set `meta.foldkit.component` to `"LiveTrace"`;
- set `meta.foldkit.example` to the human story name, such as `"Log Line"`,
  `"Progress Indicators"`, `"Trace Card"`, `"Activity Panel"`, `"Code Panel"`,
  `"Execution Panel"`, `"Agent Demo"`, or `"Overview"`.

Expected OpenStory grouping after generation: `registry/LiveTrace`.

**Verify**:

- `bun scripts/check-registry-order.mjs` exits 0.
- `bun scripts/check-registry-metadata.mjs` exits 0.
- `bun scripts/check-example-tests.mjs` exits 0.

### Step 5: Generate and inspect OpenStory coverage

Run:

```sh
bun run openstory:generate
```

Expected result:

- `src/openstory/generated/registry-livetrace.stories.ts` exists.
- It imports all new `registry/default/examples/foldkit-livetrace-*/main` files.
- It exports stories named:
  - `Log Line`
  - `Progress Indicators`
  - `Trace Card`
  - `Activity Panel`
  - `Code Panel`
  - `Execution Panel`
  - `Agent Demo`
  - `Overview`

Then run:

```sh
bun run openstory:check
```

Expected result: exit 0.

### Step 6: Run final verification

Run:

```sh
bun run typecheck
bun run test -- foldkit-livetrace
bun scripts/check-registry-order.mjs
bun scripts/check-registry-metadata.mjs
bun scripts/check-example-tests.mjs
bun run openstory:check
bun run check:registry
```

All commands must exit 0.

Run the focused Ultracite check from the command table. It must exit 0. If it
reports formatting issues, run `bunx ultracite fix` on only the files created or
modified by this plan, then rerun the focused check.

### Step 7: Manual visual smoke in OpenStory

Start OpenStory if it is not already running:

```sh
bun run openstory
```

Open the generated `registry/LiveTrace` stories and visually compare them
against the WIP reference stories under `wipSpace/LiveTrace`. The goal is not to
replace the full WIP captures; the goal is to make each primitive recognizable
and close enough that the full captures can later be rebuilt from the primitives.

Check:

- dark LiveTrace reference theme applies through shadcn/Tailwind variables;
- log line spacing and warning/error color treatments are recognizable;
- progress indicators use the same compact dimensions and rounded ends;
- step markers and status badges preserve the captured sizing;
- trace card, activity panel, code panel, execution panel, and agent demo do not
  clip text at the default OpenStory viewport.

If visual issues are found, fix only files in this plan's scope and rerun the
focused verification commands.

## Test plan

New tests to write:

- `registry/default/ui/foldkit-livetrace/foldkit-livetrace.scene.test.ts`
  - renders status badge variants;
  - renders progress values and step marker states;
  - renders log line levels;
  - composes trace card/log console;
  - composes activity/code/execution/agent panels.
- One `.scene.test.ts` per new example directory.
  - examples with controls should use `Scene.click` to switch modes;
  - static primitive examples should include an inert visual control and assert
    `.not.toHaveHandler("click")`, or add a real variant toggle and click it.

Existing tests to model:

- `registry/default/ui/badge/badge.scene.test.ts`
- `registry/default/examples/shadcn-progress-basic/main.ts`
- `registry/default/examples/alert-action/alert-action.scene.test.ts`

Verification:

- `bun run test -- foldkit-livetrace` exits 0.
- `bun scripts/check-example-tests.mjs` exits 0.

## Done criteria

All must hold:

- [ ] `registry/default/ui/foldkit-livetrace/index.ts` and `view.ts` exist and
      export granular native Foldkit view helpers for log lines, progress
      indicators, trace cards, activity panels, code panels, execution panels,
      and agent workflow panels.
- [ ] `registry/default/ui/foldkit-livetrace/foldkit-livetrace.scene.test.ts`
      exists and passes.
- [ ] The eight `registry/default/examples/foldkit-livetrace-*` directories
      listed in Scope exist, each with `main.ts` and `.scene.test.ts`.
- [ ] `registry/default/items.json` contains one `registry:ui` item named
      `foldkit-livetrace` and one `registry:example` item per new example, all
      sorted according to `scripts/check-registry-order.mjs`.
- [ ] `src/openstory/generated/registry-livetrace.stories.ts` exists after
      generation and groups the examples under `registry/LiveTrace`.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test -- foldkit-livetrace` exits 0.
- [ ] `bun scripts/check-registry-order.mjs` exits 0.
- [ ] `bun scripts/check-registry-metadata.mjs` exits 0.
- [ ] `bun scripts/check-example-tests.mjs` exits 0.
- [ ] `bun run openstory:check` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] No files outside the Scope list are modified, except generated OpenStory
      files produced by `bun run openstory:generate`.
- [ ] `plans/README.md` status row for plan 010 is updated.

## STOP conditions

Stop and report back instead of improvising if:

- `src/openstory/wipSpace/livetrace/main.ts` no longer contains the referenced
  WIP shapes and view helpers, or has moved to a different source of truth.
- `scripts/check-registry-metadata.mjs` rejects a public Foldkit-origin
  `foldkit-livetrace` item in a way that would require adding docs routes or
  changing registry policy.
- The component API appears to require raw DOM access, mutable state, or
  non-Foldkit event handlers.
- The examples require importing from `src/openstory/wipSpace/livetrace/` to
  pass; registry code must be independent.
- `bun run check:registry` fails for unrelated pre-existing reasons after all
  focused checks pass. Capture the failing command and error, then stop for a
  reviewer decision.
- Any verification command fails twice after a reasonable fix attempt.

## Maintenance notes

- The WIP OpenStory captures remain the visual reference until a later plan
  rebuilds them from the registry primitives.
- Reviewers should scrutinize API granularity: primitives should be small enough
  to reconstruct larger LiveTrace panels without forcing consumers into one
  monolithic trace card.
- Reviewers should also check that classes consume shadcn/Tailwind variables
  rather than baking in the reference dark palette everywhere.
- A follow-up plan should add docs pages and installation guidance for
  `foldkit-livetrace` after the component API stabilizes.
