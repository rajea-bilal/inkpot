# Inkpot UI Design System

Use this skill when building or editing any UI in this project. All new components must follow these tokens and patterns exactly — no deviations unless explicitly discussed.

---

## Colours

Defined in `Frontend/src/app/index.css` as CSS variables.

| Role | Value | CSS variable | Tailwind usage |
|---|---|---|---|
| Background | `#FFFEF2` | `--bg` | `bg-[#FFFEF2]` |
| Nav sidebar | `#F9F8E8` | — | `bg-[#F9F8E8]` |
| Chat input surface | `#FAF9ED` | — | `bg-[#FAF9ED]` |
| Primary text (ink) | `#191918` | `--ink` | `text-[#191918]` |
| Secondary text | `#191918` at 45% opacity | `--ink-dim` | `text-[#191918]/45` |
| Borders / dividers | `#191918` at 10–12% opacity | `--ink-faint` | `border-[#191918]/10` |
| Accent (amber) | `#FCAA2D` | `--accent` | `bg-[#FCAA2D]` |
| Error | `#e53e3e` | — | `text-[#e53e3e]` |

### Opacity scale for `#191918`
Used consistently to express hierarchy — do not invent new opacity values.

| Opacity | Use |
|---|---|
| `/[0.02]` | Input field background (near-invisible tint) |
| `/10` or `/[0.12]` | Borders, dividers, separators |
| `/45` or `/[0.45]` | Secondary / muted text, placeholders |
| full | Primary text |

### Active / hover surface tints
- Active item background: `bg-[#FCAA2D]/5`
- Hover surface: `hover:bg-[#191918]/5`

---

## Typography

Two typefaces only. Both loaded via Google Fonts and `@fontsource-variable/geist`.

| Face | Variable | Use |
|---|---|---|
| Geist (sans) | `font-sans` | Body, headings, UI text |
| Geist Mono | `font-mono` | Labels, overlines, metadata, buttons |

### Type scale in use

| Role | Classes |
|---|---|
| Page heading | `font-sans font-bold text-2xl tracking-tight` (auth) / `text-3xl font-semibold tracking-[-0.025em]` (app) |
| Section heading | `font-sans font-medium text-sm` |
| Body copy | `font-sans text-[0.9rem]` or `text-sm` |
| Overline / label | `font-mono text-[0.65rem] uppercase tracking-[0.05em]` |
| Section label (wider) | `font-mono text-[0.7rem] uppercase tracking-widest` |
| Message meta | `font-mono text-[0.6rem] uppercase tracking-[0.15em]` |
| Tiny metadata | `font-mono text-[0.55rem] uppercase` |
| Error text | `font-mono text-[0.7rem]` in `text-[#e53e3e]` |
| Navigation links | `font-mono text-[0.6rem] uppercase tracking-[0.1em]` |

**The overline pattern** — used everywhere to label a section:
```jsx
<div className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/45">
  Section label
</div>
<div className="font-sans font-medium text-sm text-[#191918]">
  Section title
</div>
```

---

## Spacing

| Context | Value |
|---|---|
| Page padding (auth forms) | `p-8` |
| Page padding (app sections) | `p-10`, `p-16` |
| Sidebar header | `p-6` |
| Sidebar thread items | `px-6 py-4` |
| Form field gap | `mb-5`, `gap-4` |
| Section gap | `gap-6`, `mb-12` |
| Small element gap | `gap-2`, `gap-3` |

---

## Borders & Radius

| Element | Radius |
|---|---|
| Large cards / panels | `rounded-xl`, `rounded-2xl` |
| Inputs, standard buttons | `rounded-md`, `rounded-lg` |
| Chips | `rounded-full` |
| Small inline elements | `rounded` |

Border style is always: `border border-[#191918]/10`

---

## Shadows

| Use | Value |
|---|---|
| Chat input | `shadow-[0_4px_20px_rgba(0,0,0,0.02)]` |
| Content panel | `shadow-[0_4px_24px_-12px_rgba(25,25,24,0.05)]` |
| Auth aside | `shadow-2xl` |

---

## Component Patterns

### Primary CTA button
Amber background, dark ink text. Used for the main action on any screen.
```jsx
<button className="bg-[#FCAA2D] text-[#191918] px-4 py-3 rounded-md font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] border-none cursor-pointer transition-[filter] duration-200 hover:brightness-105">
  Label
</button>
```

### Inverse CTA button
Dark background, cream text. Used as a strong secondary action.
```jsx
<button className="bg-[#191918] text-[#FFFEF2] px-4 py-4 rounded-lg font-mono text-xs uppercase tracking-wider border border-[#191918] cursor-pointer">
  Label
</button>
```

### Ghost / outline button
Transparent with border. Used for low-priority actions (e.g. "New Chat").
```jsx
<button className="border border-[#191918]/10 bg-transparent font-mono text-[0.65rem] uppercase tracking-widest text-[#191918] rounded transition-colors duration-200 hover:bg-white cursor-pointer">
  + Label
</button>
```

### Form input
```jsx
<Input
  className="h-auto w-full bg-[#191918]/[0.02] border-[#191918]/[0.12] rounded-md px-4 py-3 font-sans text-[0.9rem] text-[#191918] transition-colors duration-200 outline-none focus-visible:ring-0 focus-visible:border-[#191918]/[0.45] shadow-none"
/>
```

### Form field label (overline style)
```jsx
<label className="block font-mono text-[0.65rem] uppercase tracking-[0.05em] text-[#191918]/[0.45] mb-2">
  Field name
</label>
```

### Chip (suggestion tag)
```jsx
<span className="py-1.5 px-3 rounded-full border border-[#191918]/10 font-mono text-[0.65rem] text-[#191918]/45 transition-all duration-200 cursor-pointer bg-[#FFFEF2] hover:border-[#FCAA2D] hover:text-[#191918]">
  Label
</span>
```

### Accent dot (status / section marker)
```jsx
<div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
```

### Noise overlay (texture layer)
Applied as a fixed, pointer-events-none layer at `opacity-[0.04]` using an SVG fractalNoise filter. Present on the auth page and chat page.

### Error message
```jsx
<p className="text-[#e53e3e] text-[0.7rem] mt-1 font-mono">{error}</p>
```

### Error banner
```jsx
<div className="bg-[#e53e3e]/10 border border-[#e53e3e]/20 rounded-md p-3">
  <p className="text-[#e53e3e] text-[0.8rem] font-sans">{message}</p>
</div>
```

---

## Interaction & Motion

| Pattern | Classes |
|---|---|
| Default colour transition | `transition-colors duration-200` |
| Button filter transition | `transition-[filter] duration-200` |
| Transform transition | `transition-transform duration-200` |
| Animated icon on hover (spring) | `ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1` |
| Primary button hover | `hover:brightness-105` |
| Ghost button hover | `hover:bg-[#191918]/5` or `hover:bg-white` |
| Chip hover | `hover:border-[#FCAA2D] hover:text-[#191918]` |

Use `group` + `group-hover:` for icon animations inside buttons.

---

## Layout

### Auth layout (Login / Register)
Fixed aside panel (420px wide) + scrollable main. Aside holds the brand panel with the gradient and noise canvas. Main is centred content.

```
.layout-aside   — position: fixed, width: 420px, full height
.layout-main    — margin-left: 420px, centred flex container
```

Responsive: aside hidden below 860px, main takes full width.

### App layout (ChatPage, Dashboard)
Horizontal flex stack: thin nav (64px) → secondary sidebar (280px) → main content (flex-1).

```
nav     — w-16, bg-[#F9F8E8], icon column
aside   — w-[280px], bg-[#FFFEF2], chat list
main    — flex-1, bg-[#FFFEF2], content area
```

---

## Auth Panel Gradient

The left panel on auth pages uses this gradient (applied as `.panel-gradient`):
```css
background: linear-gradient(180deg,
  #8ba5bb 0%,
  #e1c4a9 45%,
  #c48c5a 50%,
  #525333 65%,
  #2a2a1c 100%
);
```
