---
name: Vibrant Minimalism
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464554'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#b90538'
  on-tertiary: '#ffffff'
  tertiary-container: '#dc2c4f'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  electric-indigo: '#6366f1'
  sky-vibrant: '#0ea5e9'
  rose-accent: '#f43f5e'
  surface-dark: '#0f172a'
  surface-border: '#e2e8f0'
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
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 12px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

This design system evolves the existing utilitarian framework into a high-energy, modern interface. By shifting away from a monochrome "ink-on-paper" aesthetic, it embraces a **Modern Corporate** style infused with **Vibrant Minimalism**. The goal is to retain the precision and clarity of the original system while injecting a sense of momentum and optimism.

The design narrative focuses on "Functional Energy"—using whitespace to provide focus and the primary accent color to signal intent. The interface feels airy and light in its default state and sophisticated in dark mode, moving away from muddy grays toward a deep, modern slate that allows the accent colors to pop. It is designed for users who value efficiency but desire a professional, polished environment that feels alive and responsive.

## Colors

The palette is anchored by **Electric Indigo (#6366f1)**, a warm violet that serves as the primary driver for user interaction. This color is reserved for primary actions, active navigation states, and the Floating Action Button.

- **Light Mode:** Uses an "Airy" approach. Backgrounds are clean (`#f8fafc`), and containers use white to create a layered effect. Grays are shifted toward cool blue-grays to maintain a fresh feel.
- **Dark Mode:** Moves away from neutral gray into a "Midnight" slate (`#0f172a`). This provides a more modern, depth-rich environment where the primary accent maintains its vibrancy without causing eye strain.
- **Primary Accent:** Used for the "FAB," primary buttons, and active indicators (e.g., underlining current tab).
- **Secondary/Tertiary:** Used for data visualization and status categorization (e.g., Routine vs. Urgent) to provide a broader spectrum of visual feedback.

## Typography

This design system introduces **Hanken Grotesk** for headlines to provide a sharper, more contemporary edge compared to standard neo-grotesks. **Inter** remains the workhorse for body text and labels due to its unrivaled legibility and systematic character.

- **Headlines:** Use a tighter tracking and heavier weight to create a strong visual hierarchy.
- **Body:** Standardized on Inter with a slightly generous line-height to facilitate scanning of lists and dense information.
- **Labels:** Weights are boosted to 600 (Semi-bold) to ensure small-scale text remains legible against vibrant background tints.
- **Accessibility:** All type must scale using relative units, and contrast ratios for the Electric Indigo against white/slate backgrounds must be strictly monitored.

## Layout & Spacing

The layout utilizes a **Fluid Grid** model with a consistent 4px baseline rhythm. The system is designed to feel spacious but disciplined.

- **Vertical Rhythm:** A 12px gutter is used between cards in a list to provide "breathing room" that contributes to the airy feel.
- **Touch Areas:** Interactive elements maintain a minimum 48px hit box. For buttons containing only icons, the internal padding must ensure the tap target remains compliant.
- **Reflow:** On mobile, margins are set to 16px. As the viewport expands to tablet and desktop, margins increase to 32px, and content containers adopt a max-width to ensure line lengths remain readable.

## Elevation & Depth

This design system uses **Tonal Layers** combined with **Soft Ambient Shadows** to create a sense of organized depth.

- **Surface Tiering:** The background is the lowest level. Cards sit on Level 1, using a slightly lighter color (in dark mode) or pure white (in light mode) with a subtle 1px border.
- **Shadow Profile:** Unlike the previous system, we introduce a very soft, tinted shadow for floating elements. These shadows use a hint of the primary accent color (Indigo) at very low opacity (3-5%) to make the elevation feel integrated rather than "pasted on."
- **Glassmorphism:** Navigation bars and sticky headers use a subtle backdrop blur (12px) with a semi-transparent surface color to maintain a sense of context while scrolling.

## Shapes

The shape language is **Rounded**, moving away from the "industrial" feel of sharper corners to something more approachable and "app-like."

- **Standard Radius:** 0.5rem (8px) is applied to buttons, cards, and input fields.
- **Large Radius:** 1rem (16px) is reserved for larger containers like Bottom Sheets and Modals to emphasize their role as distinct surfaces.
- **Pills:** Full rounding is used for status chips and the Floating Action Button. The FAB, specifically, is a perfect circle to differentiate the primary "Add/Create" action from other square-ish secondary buttons.

## Components

- **Primary Buttons:** Filled with the Electric Indigo accent. They use `label-md` for text, centered, with 16px horizontal padding.
- **Floating Action Button (FAB):** A circular button (56x56px) using the Primary Accent. It features a subtle drop shadow with an indigo tint.
- **Active Navigation:** Icons or text in the bottom nav or sidebar transition to the Primary Accent when active. A 2px horizontal "pill" indicator may appear below the active icon.
- **Cards:** White or dark-slate surfaces with a 1px border (`outline-variant`). When an item is "selected" or "active," the border color switches to the Primary Accent.
- **Input Fields:** Use a soft background tint. On focus, the border transitions to Electric Indigo and the label (if floating) takes the accent color.
- **Chips:** These use a 10% opacity fill of the semantic color (Indigo, Sky, or Rose) with the full-strength color for the text and icon.