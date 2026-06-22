# Component-Owned Registry Hierarchy

This project is piloting a component-owned source hierarchy for registry
source. The approved pilot is `shadcn-button`.

## Why This Is Attractive

The current split layout keeps component implementation under
`registry/{lane}/ui/{name}` and examples under
`registry/{lane}/examples/{example}`. That works for generation, but it makes a
component review jump between implementation, examples, tests, OpenStory output,
public JSON, source snapshots, and parity ledgers. A component-owned hierarchy
puts the Button slice together:

```text
registry/shadcn/button/
  ui/
    index.ts
    view.ts
    shadcn-button.scene.test.ts
  examples/
    basic/
      main.ts
      shadcn-button-basic.scene.test.ts
    secondary/
      main.ts
      shadcn-button-secondary.scene.test.ts
```

The local folder names may be shorter than public registry item names. Public
item names such as `shadcn-button` and `shadcn-button-basic` remain stable in
registry metadata and generated public JSON.

## Why We Might Not Want This

The cost is path churn. A full migration would move hundreds of files and would
make review history harder to follow. Some examples compose more than one
component, so folder location cannot be the only ownership signal. Tooling also
used to assume `registry/{lane}/ui` and `registry/{lane}/examples`; those checks
must read registry metadata before any broad migration.

The hierarchy must not change install targets. Source may live under
`registry/shadcn/button/**`, but generated registry files still install into
consumer-owned `src/ui/**`, `src/lib/**`, and `src/examples/**` targets.

Generated artifacts must remain generated artifacts. Do not make
`apps/docs/public/**` or `src/openstory/generated/**` hand-owned component-local
source.

## Showstopper Verdict

There is no showstopper for a component-owned source hierarchy when registry
metadata remains authoritative for source paths, install targets, dependencies,
origins, and generated output. There is a showstopper if the hierarchy requires
consumer install targets outside `src/**`, or if generated artifacts become
manual component source.

## OpenStory-Only Browsing

OpenStory is the only supported component docs and example browsing surface.
Registry example programs, standalone example `entry.ts` and `index.html`
files, public JSON, and source snapshots remain source/public contracts.

The old hand-rolled docs app is being retired as a runtime surface.
`src/docsView.ts` may remain temporarily as reference-only material while
documentation references are extracted into OpenStory. It must not be imported
by runtime entrypoints, active navigation, TypeScript/Vite aliases, guard
scripts, active tests, or generated build output.

The first known extraction gap is `shadcn-button`: Button documentation,
installation/usage/API material, source mapping, and Button/Button Group
cross-links still live in `src/docsView.ts`. That gap is acceptable only because
`src/docsView.ts` is disconnected from active runtime and verification
contracts.
