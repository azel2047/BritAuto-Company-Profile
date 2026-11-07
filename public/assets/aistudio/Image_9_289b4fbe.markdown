---
name: British Automotive Prestige
colors:
  surface: '#f7f9fe'
  surface-dim: '#d8dadf'
  surface-bright: '#f7f9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#eceef3'
  surface-container-high: '#e6e8ed'
  surface-container-highest: '#e0e2e7'
  on-surface: '#181c20'
  on-surface-variant: '#5b403f'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eff1f6'
  outline: '#8f6f6f'
  outline-variant: '#e3bebc'
  surface-tint: '#b9192f'
  primary: '#b00f2a'
  on-primary: '#ffffff'
  primary-container: '#d32f3f'
  on-primary-container: '#fff3f2'
  inverse-primary: '#ffb3b2'
  secondary: '#1a4cdd'
  on-secondary: '#ffffff'
  secondary-container: '#3f68f6'
  on-secondary-container: '#fffbff'
  tertiary: '#49577e'
  on-tertiary: '#ffffff'
  tertiary-container: '#616f98'
  on-tertiary-container: '#f4f4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b2'
  on-primary-fixed: '#410008'
  on-primary-fixed-variant: '#92001e'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b7c4ff'
  on-secondary-fixed: '#001452'
  on-secondary-fixed-variant: '#0038b7'
  tertiary-fixed: '#dae2ff'
  tertiary-fixed-dim: '#b7c5f3'
  on-tertiary-fixed: '#091a3e'
  on-tertiary-fixed-variant: '#38466c'
  background: '#f7f9fe'
  on-background: '#181c20'
  surface-variant: '#e0e2e7'
  navy-deep: '#060E24'
  navy-surface: '#0B1B3F'
  primary-hover: '#B82635'
  primary-subtle: '#FBE9EB'
  secondary-subtle: '#E6ECFD'
  surface-white: '#FFFFFF'
  border-subtle: '#DDE2F0'
  text-muted: '#4A5578'
  text-on-dark-muted: '#B8C2DD'
  status-success: '#1F9D55'
  status-warning: '#B7791F'
  status-error: '#C0262D'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  space-4xl: 6rem
---

## Brand & Style

This design system defines the digital identity for a premier specialist workshop catering to British luxury marques (Jaguar, Land Rover, Bentley, and Rolls-Royce) based in South Jakarta. The brand narrative blends bespoke British engineering precision with modern, ultra-reliable luxury workshop care. 

The aesthetic is characterized by **Corporate / Modern High-Tech Precision**:
- **Target Audience:** Discerning luxury automobile owners, collectors, and corporate fleet managers who demand uncompromising technical expertise, transparency, and personal accountability.
- **Emotional Resonance:** High trust, quiet confidence, immaculate mechanical mastery, and approachable luxury without pretension.
- **Design Philosophy:** Structural contrast between a commanding dark navy night-drive hero atmosphere and pristine, gallery-clean light operational surfaces. High-chroma racing red is treated with rigorous discipline—reserved strictly for intent-driven conversion targets.

## Colors

The palette operates on three foundational levels: brand primitives, semantic roles, and contextual surfaces, strictly abiding by WCAG AA contrast standards.

### Color Hierarchy & Roles
- **Primary (`#D32F3F`):** High-velocity British performance red. Used with strict restraint solely for primary conversion actions (e.g., booking consultation, direct dispatch), critical indicators, and decisive interactive states. Never utilized as a broad section background.
- **Secondary (`#2F5BEA`):** Precision dynamic cobalt blue. Powers luminous glow emissions, progress indicators, interactive pill tags, badge fills, and structural icon halos.
- **Tertiary & Dark Navy Anchor (`#0B1B3F` & `#060E24`):** Represents British automotive engineering depth. Acts as the canvas for the flagship hero section, headers, and footer foundations, providing a commanding luxury evening ambiance.
- **Neutral & Light Background (`#F4F6FB`):** A soft, clinical light tint that prevents visual fatigue while sustaining high contrast with pure white card surfaces (`#FFFFFF`).
- **Borders & Separators (`#DDE2F0`):** Precise 1px outlines that frame white content cards against the light canvas.

### Color Pairings and Contrast
- Light sections: Surface `#FFFFFF` on `#F4F6FB` canvas with text rendered in `#0B1B3F` (ratio 14.8:1) and secondary copy in `#4A5578` (ratio 5.2:1).
- Hero dark sections: Deep canvas `#060E24` paired with `#FFFFFF` text (ratio 18.2:1) and subtext in `#B8C2DD` (ratio 7.8:1).

## Typography

The design system exclusively adopts **Plus Jakarta Sans**, offering a crisp, geometric, yet friendly modernist presence that reflects bespoke vehicle engineering.

### Scaling & Baseline Rhythm
- **Rhythm & Line Heights:** All line heights are mapped to strict multiples of 4px to snap consistently to the 8px baseline grid.
- **Display Tracking:** Large display headers and H1 titles utilize negative tracking (`-0.02em` to `-0.01em`) to create dense, commanding editorial lockups.
- **Label Tracking:** Functional tags, eyebrow badges, and meta labels enforce expanded tracking (`+0.02em` to `+0.04em`) in uppercase or title-case to maintain legibility at micro dimensions.
- **Responsive Adaptations:** Screen headers compress gracefully on viewport sizes below 768px via dedicated mobile type specifications.

## Layout & Spacing

Layout geometry follows an exact **8px architectural grid system** with fixed-container boundaries up to a maximum width of `1200px`.

### Grid System
- **Desktop (1024px+):** 12-column layout, 24px gutters, maximum container width 1200px.
- **Tablet (768px - 1023px):** 8-column layout, 16px gutters, 32px canvas margins.
- **Mobile (320px - 767px):** 4-column layout, 16px gutters, 16px canvas margins.

### Spacing Principles
- **Macro Spacing:** Major section intervals employ `space-4xl` (96px) on desktop to achieve an unhurried, luxury showroom pacing. Mobile collapses section separations to `space-2xl` (48px).
- **Asymmetric Section Headings:** Section headings feature a distinct top-to-bottom rhythm: 48px clearance above the heading block and 16px clearance into the introductory text.
- **Card Internals:** Standard cards feature uniform `space-lg` (24px) internal padding with a 16px (`space-md`) gap between peer card structures.

## Elevation & Depth

Visual hierarchy splits distinctly between atmospheric lighting in the hero module and minimal, high-clarity planar surfacing across light operational modules.

### Dark Hero Tier (Atmospheric Depth & Glassmorphism)
- **Glassmorphic Paneling:** Hero floating vehicle status cards utilize semi-transparent backdrops (`rgba(11, 27, 63, 0.65)`) layered over a `16px` backdrop-blur with a top-inset border of `1px solid rgba(255, 255, 255, 0.15)`.
- **Secondary Luminescence:** Key accent elements and floating vehicle diagnostic cards cast an ambient indigo-blue glow: `box-shadow: 0px 0px 40px rgba(47, 91, 234, 0.35)`.
- **Diagonal Horizon Transition:** The hero module concludes with a subtle diagonal clipped edge separating the midnight navy environment from the `#F4F6FB` light content arena.

### Light Body Tier (Crisp Planar Hierarchy)
- **Base Level (Canvas):** `#F4F6FB` base tone.
- **Elevated Level 1 (Cards):** Pure `#FFFFFF` surface accompanied by a subtle hairline border (`1px solid #DDE2F0`) and an ultra-diffused floor shadow: `box-shadow: 0px 4px 16px rgba(11, 27, 63, 0.04)`.
- **Elevated Level 2 (Hover/Active & Menus):** Pure `#FFFFFF` lifted with `box-shadow: 0px 12px 32px rgba(11, 27, 63, 0.08)` and border hue transition to `#C8D1E6`.
- **Floating Modals & WhatsApp Anchor:** `box-shadow: 0px 16px 40px rgba(6, 14, 36, 0.16)`.

## Shapes

The design system uses a pill-shaped structural archetype. Interactive trigger controls and status markers feature full-radius pills, counterbalanced by structured structural cards.

### Shape Geometry Rules
- **Interactive Controls (Buttons, Badges, Search Inputs):** Fully rounded pill geometry (`9999px` / `rounded-full`).
- **Cards & Modules:** Fixed `24px` radius (`rounded-lg` level) providing an approachable, modern feel while keeping structural integrity.
- **Nested Card Elements:** Child containers and icon containers inside cards observe an internal nested radius formula of `8px` to `12px` to prevent optical corner jamming.
- **Focus Indicators:** Unbroken `2px` focus halo in `#2F5BEA` with an offset of `2px` outside the element contour.

## Components

### Buttons
- **Primary CTA:** Background `#D32F3F`, text `#FFFFFF`, rounded pill (`9999px`), internal padding `14px 24px`. Houses an optional right-aligned directional arrow glyph nested inside an internal white circular icon pod (`24px`). Hover state scales smoothly to `1.02` with `#B82635` over 150ms.
- **Secondary Action:** Transparent base, border `1.5px solid #2F5BEA`, text `#2F5BEA` on light backgrounds, or white border on dark hero surfaces. Rounded pill (`9999px`), padding `14px 24px`.
- **Floating WhatsApp Anchor:** Fixed button pinned `24px` from bottom-right viewport. Pill or circular layout in brand WhatsApp green or `#D32F3F` emergency priority, housing a persistent high-contrast label and 24px icon. Elevation level 3.

### Cards & Service Units
- **Standard Service Card:** White background (`#FFFFFF`), border `1px solid #DDE2F0`, corner radius `24px`, padding `24px`. Features an icon container (48px pill circle with `#E6ECFD` fill and `#2F5BEA` stroke icon), 20px semi-bold header, two-line descriptive copy, and a text link with an arrow glyph reading "Selengkapnya".
- **Glassmorphic Floating Metric Card (Hero):** Translucent navy backing, 24px radius, soft ambient blue glow underneath (`box-shadow: 0 0 40px rgba(47, 91, 234, 0.35)`). Incorporates subtle vertical float animation (disabled when `prefers-reduced-motion: reduce`).

### Chips & Badges
- **Status / Pill Badges:** Pill shape (`9999px`), padding `6px 12px`. Light secondary style uses `#E6ECFD` background with `#2F5BEA` text. Highlight style uses `#FBE9EB` background with `#D32F3F` text.

### Form Inputs & Checkboxes
- **Text Inputs:** Pill-shaped (`9999px`) or rounded `12px` fields, background `#FFFFFF`, border `1px solid #DDE2F0`, height `48px`, padding `0 20px`. Focus shifts border to `#2F5BEA` with a 2px offset outline.
- **Checkboxes & Radios:** 20px dimensions, corner radius `6px` for checkboxes and `9999px` for radios. Selected state fills with `#2F5BEA` or `#D32F3F` bearing an interior white glyph.

### Operational Guardrails
- All user-facing copy must strictly use formal, respectful Indonesian terminology suitable for premium workshop operations.
- Customer license plates, customer identities, and vehicle registration numbers must never be displayed in demo assets or imagery.
- Red color tokens must never exceed 5% total viewport area.