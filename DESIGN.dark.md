---
name: Midnight Kinetic
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#1e293b'
  surface-container-high: '#334155'
  surface-container-highest: '#2d3449'
  on-surface: '#f8fafc'
  on-surface-variant: '#94a3b8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#ffb2b9'
  on-tertiary: '#67001f'
  tertiary-container: '#ea6479'
  on-tertiary-container: '#5b001a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdadc'
  tertiary-fixed-dim: '#ffb2b9'
  on-tertiary-fixed: '#400010'
  on-tertiary-fixed-variant: '#891933'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  urgent-red: '#f43f5e'
  idea-blue: '#0ea5e9'
  routine-gray: '#94a3b8'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 12px
  margin-mobile: 16px
  margin-desktop: 32px
  card-padding: 16px
  stack-gap: 8px
---

## Brand & Style

This design system is a "Midnight" evolution of the Vibrant Minimalism philosophy. It transitions from a light, airy aesthetic to a high-contrast, immersive environment. The design style is **Modern Corporate with a Dark Mode focus**, utilizing deep charcoal surfaces and high-energy accents to create a sense of focus, precision, and technological sophistication.

The core narrative is "Luminous Depth"—using a dark canvas to let functional colors shine with greater intentionality. By utilizing a near-black base, the interface reduces eye strain while allowing the **Electric Indigo** accent to serve as a beacon for user intent. The result is a professional tool that feels premium, fast, and modern, targeting power users who require high focus and a polished, contemporary workspace.

## Colors

The palette is optimized for a deep-space hierarchy. The primary surface is **Deep Charcoal (#0f172a)**, providing a stable, non-distracting foundation.

- **Primary Accent:** **Electric Indigo (#6366f1)** remains the anchor for all primary actions. In dark mode, it appears more luminous against the slate background.
- **Surface Tiering:** Depth is created by lightening the gray scale as elements move closer to the user. Containers use `#1e293b` (low) and `#334155` (high) to differentiate from the background.
- **Semantic Readability:** Semantic colors are adjusted for dark mode vibrancy. **Urgent Red** uses a lighter, more saturated Rose variant, while **Idea Blue** shifts toward a brighter Sky tone to ensure they meet WCAG AA contrast requirements against dark containers.
- **Neutral Text:** Primary text is off-white (`#f8fafc`) to prevent the harsh "vibrating" effect of pure white on black, while secondary text uses a muted slate-gray.

## Typography

The system utilizes **Hanken Grotesk** for high-impact headlines and **Inter** for all functional and body text. 

In this dark-mode variation, font weights for labels and small body text are strictly maintained at 600 or higher when used over colored backgrounds to preserve legibility against light bleed. Headlines use a tighter tracking to maintain a "technical" and compact appearance. Line heights are slightly more generous in the body levels to assist in reading long-form content on emitting screens.

## Layout & Spacing

This design system follows a **Fluid Grid** model with a 4px baseline rhythm. 

- **Grid:** A 12-column grid is used for desktop, reflowing to a single column on mobile.
- **Rhythm:** Vertical spacing between major components (like cards) is set at 12px to create a rhythmic, breathable stack. 
- **Margins:** Consistent 16px side margins on mobile expand to 32px on desktop. 
- **Touch Targets:** All interactive elements, including icon buttons and chips, must occupy at least a 48x48px footprint regardless of their visual size.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Glows** rather than traditional shadows.

- **Layering:** The background is the base layer (`#0f172a`). Surfaces like cards or list items use a "Level 1" fill (`#1e293b`). Floating elements like modals use "Level 2" (`#334155`).
- **Borders:** A 1px low-contrast outline (`#334155`) is used on all containers to define edges where tonal shifts are subtle.
- **Indigo Glow:** High-elevation elements, such as the FAB or active modals, use an extremely soft, blurred shadow with a primary color tint (`rgba(99, 102, 241, 0.15)`) to create a "luminous" lift effect.
- **Translucency:** Headers and navigation bars use a 20px backdrop blur with a 70% opacity fill of the background color to maintain vertical context.

## Shapes

The shape language is **Rounded**, balancing a professional structure with approachable softness.

- **Base Radius:** 0.5rem (8px) for buttons, inputs, and standard cards.
- **Container Radius:** 1rem (16px) for large surfaces like modals and bottom sheets.
- **Pills:** Used for the FAB and all status chips to signify they are distinct, floating, or interactive metadata.

## Components

- **Buttons:** Primary buttons are filled with **Electric Indigo** with white text. Secondary buttons use a `334155` outline with indigo text.
- **FAB:** A circular indigo button containing a white icon. It is the highest-priority element and carries the subtle indigo glow.
- **Cards:** Use the `#1e293b` surface. On hover or active state, the border transitions from the subtle slate to **Electric Indigo**.
- **Inputs:** Fields use a darker fill (`#020617`) with a 1px slate border. On focus, the border glows with the primary indigo.
- **Chips:** Categorical chips use a 15% opacity fill of their semantic color (Red, Blue, or Gray) with high-contrast text labels.
- **Navigation:** Active items in the sidebar or bottom bar are indicated by a change to Indigo text/icon and a small vertical or horizontal bar (indicator) in the same color.