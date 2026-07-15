# Locus Estate — Editorial Image-Led Direction

## Source decision

The Refero style catalog loaded only its landing shell during research, so this direction is distilled from the user's `taste.md`, the approved product spec, and one MIT-licensed Uiverse interaction reference. ReactBits was reviewed; its reveal components were rejected because the same restrained effect needs only `IntersectionObserver` and CSS.

## Design thesis

Build a modern Moscow property journal, not a portal and not a black-and-gold luxury template. Photography carries emotion; typography supplies authority; interface chrome stays quiet. Every screen should feel edited, with deliberate whitespace and one visual surprise rather than a stack of effects.

## Palette

- Paper: `#F3EFE7`
- Ivory: `#FBF9F4`
- Ink: `#191817`
- Muted graphite: `#706D67`
- Oxblood: `#6F1D2A`
- Hairline: `#D7D0C5`
- Moss micro-accent: `#6F7464`

Use oxblood for decisive CTAs, collection indices and tiny graphic marks. Never use metallic gold. Keep large surfaces paper or ivory; reserve ink for footer, mobile menu and occasional editorial bands.

## Typography

- Display: Cormorant Garamond 500/600, Cyrillic, tight line-height `0.88–0.98`, slightly negative tracking.
- Interface/body: Manrope 400/500/600, line-height `1.45–1.7`.
- Hero: fluid `clamp(4.4rem, 9vw, 9.2rem)` with intentional line breaks.
- Section titles: fluid `clamp(2.8rem, 5.2vw, 5.8rem)`.
- Eyebrows: Manrope 500, `0.72–0.78rem`, uppercase, letter-spacing `0.16em`.

## Grid and spacing

- Desktop content width: `min(100% - 64px, 1440px)`.
- Editorial grid: 12 columns, 20–28 px gutters.
- Section rhythm: `clamp(5rem, 10vw, 10rem)`.
- Cards do not all share the same crop on the home page: alternate 4:5, 3:2 and 1:1. Catalog remains consistent at 4:5.
- Hairlines, oversized indices and coordinate labels form the recurring architecture motif.

## Interaction

- Primary button: outlined capsule/soft rectangle whose oxblood fill expands from the far edge on hover, adapted from the Uiverse `neat-bullfrog-61` radial-fill behavior.
- Images reveal through a single vertical clip mask; text uses short staggered opacity/translate transitions.
- Property imagery scales at most `1.035` on hover.
- No cursor effects, parallax stacks, three.js, GSAP or perpetual animation.
- `prefers-reduced-motion` removes clip, translate and smooth-scroll effects.

## Components

- Header: thin transparent overlay on hero, paper surface after scroll/interior pages; wordmark left, sparse navigation center, consultation action right.
- Buttons: one primary oxblood, one quiet arrow-link, one icon-only circular favorite.
- Cards: image first, minimal metadata line, large serif title, price aligned opposite dimensions.
- Forms: labels above or floating within a clean bottom-border field; errors directly below; no grey boxed field farm.
- Mobile menu: full-viewport ink panel with oversized serif links and visible contact details.

## Signature element

The “architectural coordinate” is a one-pixel vertical line ending in a small oxblood dot, accompanied by a collection number and Moscow coordinates. It appears once per major composition, never as repeated decoration on every card.

## Layout sketch

```text
DESKTOP / HOME
┌────────────────────────────────────────────────────────────────────┐
│ LOCUS          КОЛЛЕКЦИЯ  УСЛУГИ  БЮРО            КОНСУЛЬТАЦИЯ    │
├──────────────┬───────────────────────────┬─────────────────────────┤
│ 55.7558° N   │ НЕДВИЖИМОСТЬ             │                         │
│      ·       │ КАК ЛИЧНАЯ                │    FULL-BLEED MOSCOW    │
│ coordinate   │ КООРДИНАТА                │    ARCHITECTURE IMAGE   │
│      line    │ [коллекция]  [подбор]     │                         │
├──────────────┴───────────────────────────┴─────────────────────────┤
│ ТИП              ЛОКАЦИЯ             БЮДЖЕТ           [НАЙТИ →]  │
├────────────────────────────────────────────────────────────────────┤
│ ИЗБРАННАЯ КОЛЛЕКЦИЯ                01 tall image                    │
│                 02 wide image                  03 square image      │
│        editorial copy                         04 tall image         │
├────────────────────────────────────────────────────────────────────┤
│ MOSCOW / DISTRICTS       oversized vertical district names         │
├────────────────────────────────────────────────────────────────────┤
│ Founder image       quiet manifesto            oxblood final CTA   │
└────────────────────────────────────────────────────────────────────┘

MOBILE
┌──────────────────────────┐
│ LOCUS              MENU  │
│ 55.7558° N  ·            │
│ НЕДВИЖИМОСТЬ             │
│ КАК ЛИЧНАЯ               │
│ КООРДИНАТА               │
│ [Смотреть коллекцию]     │
│ ┌──────────────────────┐ │
│ │  architectural hero  │ │
│ └──────────────────────┘ │
│ [Тип] [Район] [Бюджет]   │
│ Property / Property / CTA│
└──────────────────────────┘
```

## Self-critique and revision

Warm cream plus serif is a current design default, but here it is explicitly grounded in the approved brief and the material world of limestone Moscow interiors. To keep it from becoming a generic boutique template, the composition avoids centered copy, decorative gold and repeated rounded cards. The distinctive risk is the cadastral-like coordinate spine cutting through the hero grid while the headline occupies an unusually narrow typographic column; this is specific to a property bureau and remains legible on mobile. Numbering is used only for actual collection position or process sequence, not as arbitrary section decoration.

## Avoid

- Symmetric hero with centered headline over a dark gradient.
- A grid of identical rounded cards for every section.
- Excessive pill labels, glassmorphism, purple gradients or neon.
- Stock dashboard iconography and generic blue focus styling.
- Motion that delays navigation or hides content from keyboard users.
