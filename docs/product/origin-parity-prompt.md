# Origin Parity Prompt

Use this prompt before adding, reviewing, or accepting any Base UI or shadcn
origin component/example:

```text
You are reproducing an origin UI example for a Foldkit registry component.

Goal: the Foldkit output must look and behave identical to the origin example,
within the constraints of Foldkit and the installed local primitives. Do not
settle for a same-named approximation.

Inputs:
- Origin URL: <paste meta.foldkit.origin URL>
- Origin example name: <paste exact upstream heading>
- Local component/example paths: <paste registry/default/ui/... and
  registry/default/examples/...>

Required comparison:
1. Capture the origin example's visual structure: outer demo container, item
   count, grid/flex orientation, card widths, spacing, border radius, borders,
   dividers, shadows, background, typography scale, text wrapping, media size,
   icon/image/avatar placement, actions, footer/header placement, and responsive
   behavior.
2. Capture the origin component anatomy: which parts are nested, which part owns
   the media/header/content/actions/footer, whether wrappers such as ItemGroup,
   ButtonGroup, FieldGroup, or Card are present, and whether the origin renders
   an anchor/button/input/select/etc.
3. Capture behavior: controlled state, multi/single selection, disabled/inert
   state, keyboard/focus behavior, aria roles/names, popover/dialog/portal
   behavior, links, forms, and parent-owned callbacks.
4. Implement the Foldkit example to match the origin. Use the same visible text,
   same number of elements, same orientation, same component anatomy, and the
   same visual intent. Use real origin image URLs when the origin example uses
   images, unless the URL is unavailable; document any substitution.
5. If Foldkit/local primitives cannot match a behavior or structure, do not fake
   it silently. Add an explicit deferral note in docs with the reason and add a
   test proving the supported local behavior.
6. Verify with scene tests and, for visual examples, browser screenshots against
   the origin screenshot. Tests must exercise behavior or assert inert/disabled
   state for presentation-only examples.

Acceptance bar:
- A reviewer should not be able to place the origin screenshot and local output
  side by side and see avoidable structure, orientation, spacing, media, or
  behavior differences.
- Any remaining difference must be documented as a deliberate local constraint,
  not an accidental approximation.
```
