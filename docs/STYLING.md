# Shared styling guide

The client uses Bootstrap 5 with Sass. Do not add a new standalone CSS file for a screen; put shared tokens and patterns in the styles folder, then import feature styles from `client/src/styles/main.scss`.

## Where to change styles

- `client/src/styles/_tokens.scss` — brand colors, typography, spacing, borders, and Bootstrap theme overrides.
- `client/src/styles/_component-kit.scss` — reusable visual classes shared by customer and admin screens.
- `client/src/styles/_customer.scss` — customer storefront layout and responsive styles.
- `client/src/styles/_admin.scss` — admin console layout and responsive styles.
- `client/src/styles/main.scss` — the single style entry point; imports Bootstrap and the project style modules.

## Reusable classes

| Class | Use |
| --- | --- |
| `.nw-button` | Base style for a project button. |
| `.nw-button--primary` | Brand filled button. |
| `.nw-button--quiet` | Low emphasis button. |
| `.nw-button--compact` | Small table or toolbar action. |
| `.nw-card` | White surface with the shared border and shadow. |
| `.nw-eyebrow` | Small uppercase section label. |
| `.nw-field` | Standard input surface. |
| `.nw-status` | Compact rounded status label. |
| `.nw-muted` | Secondary text color. |
| `.nw-divider` | Standard horizontal divider. |

Use Bootstrap utilities such as `d-flex`, `gap-3`, `align-items-center`, `p-3`, and grid classes for common layout. Use the `nw-*` classes for the product's repeated visual patterns. Keep feature-specific layout classes in the matching customer or admin partial.

## Add a new component

1. Create the React component under `client/src/components/customer/` or `client/src/components/admin/`.
2. Use Bootstrap utilities for common layout and the shared `nw-*` classes for buttons, fields, surfaces, and labels.
3. Put screen-specific styling in the relevant SCSS partial. Add a new partial only when a feature becomes large enough to benefit from its own file, then import it in `main.scss`.
4. Read colors and spacing from `_tokens.scss`; avoid introducing a new one-off value when an existing token fits.

The existing screens retain their detailed visual selectors, while shared patterns such as buttons, cards, labels, and fields now extend the common style kit.
