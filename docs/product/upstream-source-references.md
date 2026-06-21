# Upstream Source References

This project treats Base UI and shadcn as development contract sources, not as
runtime component providers. Installable registry source remains Foldkit-native.

`registry/upstream/source-manifest.json` is the machine-readable source map. It
records each source kind, pinned URL or package version, local snapshot path,
and derived contract path. Refresh snapshots with:

```sh
bun run sync:upstream-contracts -- --write
```

Check that checked-in snapshots and derived contracts still match with:

```sh
bun run sync:upstream-contracts -- --check
```

Current sources:

- shadcn utility source: `apps/v4/lib/utils.ts` from `shadcn-ui/ui`.
- shadcn Button source: `apps/v4/registry/new-york-v4/ui/button.tsx` from
  `shadcn-ui/ui`.
- shadcn theme source: `apps/v4/registry/themes.ts` from `shadcn-ui/ui` plus
  the pinned `shadcn` package preset metadata.
- Base UI Button source: pinned `@base-ui/react` package metadata and
  `@base-ui/react/button` type entry point.

The derived contracts under `registry/upstream/derived/**` are intentionally
small. Component source and OpenStory preview code should read the contracts,
not import upstream React packages or repository paths.
