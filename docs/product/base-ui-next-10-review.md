# Base UI Next 10 Review

This is the review packet for the next 10 Base UI options after `collapsible`.
It follows the component-entry contract requirement to inventory the entire
upstream Base UI page, including the initial demo that may not be listed under
the `Examples` section.

## Scope

Current next 10:

1. `alert-dialog`
2. `autocomplete`
3. `avatar`
4. `context-menu`
5. `drawer`
6. `field`
7. `form`
8. `menubar`
9. `navigation-menu`
10. `number-field`

## Recommended Build Order

1. `field`
2. `number-field`
3. `avatar`
4. `form`
5. `autocomplete`
6. `alert-dialog`
7. `drawer`
8. `context-menu`
9. `menubar`
10. `navigation-menu`

Reasoning:

- `field`, `number-field`, `avatar`, and `form` can be reviewed as smaller
  controlled-state or static slices.
- `autocomplete` is input-heavy but does not require the full modal/overlay
  contract.
- `alert-dialog`, `drawer`, `context-menu`, `menubar`, and `navigation-menu`
  should share a later overlay/focus/menu foundation instead of each inventing
  separate focus, dismissal, portal, and positioning behavior.

## Component Inventory

### alert-dialog

Upstream default demo:

- `Discard draft`
- Opens an alert dialog titled `Discard draft?`
- Description: `You can't undo this action.`
- Actions: `Cancel`, `Discard`

Additional upstream examples:

- Open from a menu
- Close confirmation
- Detached triggers
- Multiple triggers
- Controlled mode with multiple triggers

Recommended first slice:

- `alert-dialog` component with Root, Trigger, Portal, Backdrop, Viewport,
  Popup, Title, Description, Close helpers.
- `alert-dialog-basic` example matching the default `Discard draft` demo.
- Parent-owned open state, close button behavior, and ARIA labelling.

Deferred for follow-up:

- Menu integration.
- Nested close-confirmation dialog.
- Detached trigger handle API.
- Multiple trigger payloads.
- Full modal focus trap and escape/outside-dismiss command layer.

### autocomplete

Upstream default demo:

- Label: `Search tags`
- Placeholder: `e.g. feature`
- Empty state: `No tags found.`
- Items include common tags plus component-prefixed tags such as
  `component: accordion`, `component: alert dialog`, and
  `component: autocomplete`.

Additional upstream examples:

- Async search
- Inline autocomplete
- Grouped
- Fuzzy matching
- Limit results
- Auto highlight
- Command palette
- Grid layout
- Virtualized

Recommended first slice:

- Controlled text input and filtered list with Root, Input, List, Item, Empty,
  Popup/Positioner anatomy.
- `autocomplete-basic` example matching the default `Search tags` demo.

Deferred for follow-up:

- Async loading state.
- Inline completion rendering.
- Fuzzy ranking helpers.
- Virtualized list integration.
- Grid popup layout.
- Command-palette variant.

### avatar

Upstream default demo:

- Two avatars in a row.
- First uses an image and fallback text `LT`.
- Second renders fallback text `LT` directly.

Additional upstream examples:

- No separate `Examples` section on the current Base UI page.

Recommended first slice:

- Audit and promote the existing `avatar` registry component from shadcn-origin
  to Base UI-informed behavior if compatible.
- Preserve current shadcn examples where useful, but add Base UI default demo
  parity and API/anatomy table.

Deferred for follow-up:

- Runtime image loading status callbacks if no local Foldkit image-load
  primitive exists yet.
- Fallback delay behavior.

### context-menu

Upstream default demo:

- Trigger text: `Right click here`
- Menu items: `Add to Library`, `Add to Playlist`, `Play Next`, `Play Last`,
  `Favorite`, `Share`
- Separator groups between item clusters.

Additional upstream examples:

- Nested menu
- Base UI notes that Menu demos also apply to Context Menu.

Recommended first slice:

- `context-menu` component with Trigger, Portal, Positioner, Popup, Item, and
  Separator helpers.
- `context-menu-basic` example matching the default right-click menu content.

Deferred for follow-up:

- Native contextmenu event positioning.
- Long-press behavior.
- Nested submenu behavior.
- Shared menu foundation with `menu` and `menubar`.
- Roving focus and typeahead.

### drawer

Upstream default demo:

- Trigger: `Open drawer`
- Drawer title: `Drawer`
- Description: `This is a drawer that slides in from the side. You can swipe to
dismiss it.`
- Close action: `Close`

Additional upstream examples:

- State
- Position
- Nested drawers
- Snap points
- Indent effect
- Non-modal
- Mobile navigation
- Swipe to open
- Action sheet with separate destructive action
- Detached triggers
- Stacking and animations

Recommended first slice:

- `drawer` component with Root, Trigger, Portal, Backdrop, Viewport, Popup,
  Content, Title, Description, Close helpers.
- `drawer-basic` example matching the default side drawer.
- Parent-owned open state.

Deferred for follow-up:

- Swipe gestures.
- Snap points.
- Nested drawer stacking.
- Indent provider.
- Mobile navigation composition.
- Detached trigger handle API.
- Animation lifecycle.

### field

Upstream default demo:

- Label: `Name`
- Input placeholder: `Required`
- Error message for missing value: `Please enter your name`
- Description: `Visible on your profile`

Additional upstream examples:

- No separate `Examples` section on the current Base UI page.

Recommended first slice:

- `field` component with Root, Label, Control, Description, Error, Item, and
  Validity helpers.
- `field-basic` example matching the default `Name` field.
- Parent-owned value/touched/invalid state for Foldkit.

Deferred for follow-up:

- Async validation.
- Full validity object rendering.
- Integration with `form` server errors.

### form

Upstream default demo:

- Field label: `Homepage`
- URL input default: `https://example.com`
- Submit button: `Submit`
- Server-style error for example.com domain.

Additional upstream examples:

- Submit with a Server Function
- Submit form values as a JavaScript object
- Using with Zod

Recommended first slice:

- `form` component wrapping native form behavior and error mapping.
- `form-basic` example matching the default Homepage URL submission.
- Model-owned loading/error state and submit message.

Deferred for follow-up:

- Server Function parity.
- Zod integration.
- Generic form values object helper.
- Async command integration beyond a local deterministic demo.

### menubar

Upstream default demo:

- Menubar triggers: `File`, `Edit`, `View`, `Help`
- `File` menu includes `New`, `Open`, `Save`, `Export`, `Print`
- `Edit` menu includes `Cut`, `Copy`, `Paste`

Additional upstream examples:

- No separate `Examples` section on the current Base UI page.

Recommended first slice:

- Defer implementation until a shared `menu` foundation exists.
- For review, build a static `menubar-basic` preview only if we explicitly
  accept that menu behavior is deferred.

Deferred for follow-up:

- Shared Menu.Root/Menu.Trigger/Menu.Item/Submenu primitives.
- Horizontal menubar keyboard navigation.
- Roving focus and submenu focus handoff.

### navigation-menu

Upstream default demo:

- Root navigation with `Overview`, `Handbook`, and `GitHub`.
- `Overview` and `Handbook` open link-card content.

Additional upstream examples:

- Nested submenus
- Nested inline submenus
- Custom links
- Large menus

Recommended first slice:

- Build after shared menu/positioner/focus foundation.
- If review needs a first pass sooner, implement a static navigation menu with
  Root, List, Item, Trigger, Content, Link, Portal, Positioner, Popup, Viewport,
  and Arrow anatomy but explicitly defer popup positioning and keyboard
  behavior.

Deferred for follow-up:

- Delayed hover open/close.
- Nested submenu behavior.
- Viewport content transitions.
- Collision-aware popup placement.
- Large menu scrolling.

### number-field

Upstream default demo:

- Label: `Amount`
- Default value: `100`
- Decrement and increment buttons.
- Input in the middle.
- Scrub area over the label.

Additional upstream examples:

- No separate `Examples` section on the current Base UI page.

Recommended first slice:

- `number-field` with Root, ScrubArea, Group, Decrement, Input, Increment
  helpers.
- `number-field-basic` example matching the default `Amount` demo.
- Parent-owned numeric value with increment/decrement messages.

Deferred for follow-up:

- Pointer scrubbing.
- Locale/format parsing.
- Commit events.
- Wheel scrubbing.
- Range validation and step snapping variants.

## Review Recommendation

Proceed in two implementation batches:

1. Low-overlay batch: `field`, `number-field`, `avatar`, `form`,
   `autocomplete`.
2. Overlay/menu batch: `alert-dialog`, `drawer`, `context-menu`, `menubar`,
   `navigation-menu`.

The low-overlay batch can keep momentum without inventing a premature shared
overlay contract. The overlay/menu batch should start with a reusable
positioner/focus/dismissal strategy before adding all five components.
