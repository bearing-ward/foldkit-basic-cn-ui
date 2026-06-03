# Toast v1 Coverage Matrix

Track the first Foldkit CN Toast registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Source References

- Foldkit primitive API: `node_modules/foldkit/dist/ui/toast/index.d.ts`
- Local Foldkit demo: `src/ui/toast.ts`, `src/ui/view/toast.ts`
- Registry wrapper: `registry/default/ui/toast/`

## Coverage

| Surface             | Status | Notes                                                                                                                                                                                   |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/toast/index.ts` binds `Ui.Toast.make` to a schema-backed payload and re-exports model, message, out-message, lifecycle helpers, commands, and styled view helpers. |
| Styled helpers      | Done   | `registry/default/ui/toast/view.ts` exposes stack, entry, title, description, close button classes, and a reusable `toastEntryView`.                                                    |
| Rendered behavior   | Done   | `toast.scene.test.ts` covers aria-live region rendering, sticky show, status role, dismiss control attributes, and animation command resolution.                                        |
| Basic example       | Done   | `registry/default/examples/toast-basic/` plus scene test for a sticky success notification and manual dismissal.                                                                        |
| Variants example    | Done   | `registry/default/examples/toast-variants/` plus scene test for Info, Success, Warning, and Error notification roles.                                                                   |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/toast*.json` artifacts.                                                                                                                 |
| Docs app routes     | Done   | `/docs/components/toast`, `/docs/components/toast/examples/basic`, `/docs/components/toast/examples/variants`, `/examples/toast-basic`, `/examples/toast-variants`.                     |
| Docs example blocks | Done   | Toast docs examples use `docsExampleBlock` with preview and action row separation.                                                                                                      |

## Deferred

| Item                     | Reason                                                                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Custom action buttons    | V1 keeps the payload renderer focused on title, description, and dismiss. Action-specific payloads can be composed later without changing the primitive wrapper. |
| Runtime timer assertions | Scene coverage resolves animation commands deterministically. Actual duration sleeping remains covered by Foldkit's primitive command contract.                  |

## Verification

- `bun run test -- registry/default/ui/toast/toast.scene.test.ts registry/default/examples/toast-basic/toast-basic.scene.test.ts registry/default/examples/toast-variants/toast-variants.scene.test.ts`
- `bun run typecheck`
- Full verification pending after registry generation.
