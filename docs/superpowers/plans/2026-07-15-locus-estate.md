# Locus Estate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Построить полностью работающий адаптивный многостраничный сайт премиального агентства недвижимости Москвы с каталогом, фильтрами, избранным, карточками объектов и lead-формами.

**Architecture:** React-приложение на Vite с маршрутизацией через React Router. Данные объектов локальные и типизированные; фильтрация и валидация вынесены в чистые функции, избранное хранится в небольшом context с безопасным доступом к `localStorage`, страницы собираются из общих доступных UI-компонентов.

**Tech Stack:** React 19, TypeScript, Vite, React Router, обычный CSS, Fontsource, Vitest, Testing Library, ESLint, Playwright.

## Global Constraints

- Бренд: `Locus Estate`; география: Москва и Подмосковье; интерфейс и контент: русский язык.
- Палитра: тёплый limestone, молочный, угольный и oxblood; не использовать клише «золото на чёрном».
- Заголовки: Cormorant Garamond; интерфейс: Manrope; оба шрифта поставлять локально через Fontsource.
- Не подключать UI-kit, Tailwind или animation-библиотеку.
- Маршруты: `/`, `/properties`, `/properties/:slug`, `/services`, `/about`, `/contact`, `*`.
- Фильтры синхронизировать с query-параметрами; избранное сохранять в `localStorage`.
- Формы работают только локально и явно показывают demo-успех без сетевой отправки.
- Поддержать keyboard focus, skip-link, `aria-live`, `prefers-reduced-motion` и мобильную ширину 360 px.
- Все изображения вне первого экрана получают `loading="lazy"`, содержательный `alt` и фиксированный `aspect-ratio`.

---

## File Map

- `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`: сборка, проверки и команды проекта.
- `src/domain/property.ts`, `src/data/properties.ts`: типы и демонстрационные данные восьми объектов.
- `src/domain/filterProperties.ts`, `src/domain/leadValidation.ts`: чистая бизнес-логика с unit-тестами.
- `src/app/App.tsx`, `src/app/AppProviders.tsx`: маршруты и глобальные providers.
- `src/layout/SiteHeader.tsx`, `src/layout/SiteFooter.tsx`, `src/layout/SiteLayout.tsx`: общий каркас.
- `src/components/*`: общие кнопки, заголовки, карточки, формы, анимация появления и карта.
- `src/features/favorites/FavoritesContext.tsx`: сохранение избранного.
- `src/pages/*`: шесть страниц и 404.
- `src/styles/*`: токены, база, компоненты, страницы и адаптивность.
- `public/images/*`: локальные изображения hero, объектов, команды и архитектуры.
- `e2e/site.spec.ts`: сквозной smoke-test пользовательского пути.

### Task 1: Toolchain, domain model and pure logic

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `eslint.config.js`
- Create: `index.html`
- Create: `src/test/setup.ts`
- Create: `src/domain/property.ts`
- Create: `src/domain/filterProperties.ts`
- Create: `src/domain/filterProperties.test.ts`
- Create: `src/domain/leadValidation.ts`
- Create: `src/domain/leadValidation.test.ts`
- Create: `src/data/properties.ts`

**Interfaces:**
- Produces: `Property`, `PropertyFilters`, `filterProperties(properties, filters)`, `formatPrice(price)`, `LeadValues`, `validateLead(values)` and `properties`.

- [ ] **Step 1: Configure the project and test runner**

Create scripts `dev`, `build`, `test`, `test:run`, `lint`, `typecheck`, `preview`, and `e2e`. Add runtime dependencies `react`, `react-dom`, `react-router-dom`, `@fontsource/cormorant-garamond`, `@fontsource/manrope`; add Vite, TypeScript, Vitest, jsdom, Testing Library, ESLint and Playwright as development dependencies. Configure Vitest with `environment: "jsdom"`, `globals: true`, and `src/test/setup.ts` importing `@testing-library/jest-dom/vitest`.

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: exit code 0 and a generated `package-lock.json`.

- [ ] **Step 3: Write failing domain tests**

```ts
import { describe, expect, it } from 'vitest'
import { filterProperties, formatPrice } from './filterProperties'
import type { Property } from './property'

const sample: Property[] = [
  { id: '1', slug: 'one', title: 'One', district: 'Хамовники', address: 'Москва', type: 'Квартира', price: 190_000_000, area: 120, bedrooms: 2, image: '/one.webp', images: ['/one.webp'], tag: 'Новая коллекция', description: 'Описание', features: ['Терраса'], coordinates: [55.74, 37.58] },
  { id: '2', slug: 'two', title: 'Two', district: 'Остоженка', address: 'Москва', type: 'Пентхаус', price: 420_000_000, area: 240, bedrooms: 4, image: '/two.webp', images: ['/two.webp'], tag: 'Эксклюзив', description: 'Описание', features: ['Камин'], coordinates: [55.73, 37.6] },
]

describe('filterProperties', () => {
  it('combines district, type, maximum price and bedrooms', () => {
    expect(filterProperties(sample, { district: 'Хамовники', type: 'Квартира', maxPrice: 250_000_000, bedrooms: 2 })).toEqual([sample[0]])
  })

  it('returns all properties for empty filters', () => {
    expect(filterProperties(sample, {})).toEqual(sample)
  })
})

it('formats price as compact Russian rubles', () => {
  expect(formatPrice(190_000_000)).toBe('190 млн ₽')
})
```

```ts
import { expect, it } from 'vitest'
import { validateLead } from './leadValidation'

it('returns field errors for an invalid lead', () => {
  expect(validateLead({ name: '', phone: '12', consent: false })).toEqual({
    name: 'Укажите имя',
    phone: 'Укажите телефон полностью',
    consent: 'Необходимо согласие',
  })
})

it('accepts a complete lead', () => {
  expect(validateLead({ name: 'Анна', phone: '+7 999 123-45-67', consent: true })).toEqual({})
})
```

- [ ] **Step 4: Run the tests and confirm RED**

Run: `npm run test:run -- src/domain/filterProperties.test.ts src/domain/leadValidation.test.ts`

Expected: FAIL because the domain modules do not exist.

- [ ] **Step 5: Implement the domain model and pure functions**

```ts
export type PropertyType = 'Квартира' | 'Пентхаус' | 'Дом'

export interface Property {
  id: string
  slug: string
  title: string
  district: string
  address: string
  type: PropertyType
  price: number
  area: number
  bedrooms: number
  image: string
  images: string[]
  tag: string
  description: string
  features: string[]
  coordinates: [number, number]
}

export interface PropertyFilters {
  district?: string
  type?: PropertyType
  maxPrice?: number
  bedrooms?: number
}
```

`filterProperties` must apply only defined filters and use `Intl.NumberFormat('ru-RU')` semantics through a compact millions formatter. `validateLead` must return exactly the errors asserted above. Populate `properties` with eight unique objects across Хамовники, Остоженка, Патриаршие пруды, Раменки and Рублёво-Успенское направление; use image paths `/images/property-01.webp` through `/images/property-08.webp`.

- [ ] **Step 6: Verify GREEN and static checks**

Run: `npm run test:run -- src/domain/filterProperties.test.ts src/domain/leadValidation.test.ts`

Expected: 4 tests pass.

Run: `npm run typecheck`

Expected: exit code 0.

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts eslint.config.js index.html src/test src/domain src/data
git commit -m "feat: add property domain and project toolchain"
```

### Task 2: Shared shell, favorites and reusable UI

**Files:**
- Create: `src/features/favorites/FavoritesContext.tsx`
- Create: `src/features/favorites/FavoritesContext.test.tsx`
- Create: `src/app/AppProviders.tsx`
- Create: `src/layout/SiteHeader.tsx`
- Create: `src/layout/SiteHeader.test.tsx`
- Create: `src/layout/SiteFooter.tsx`
- Create: `src/layout/SiteLayout.tsx`
- Create: `src/components/ArrowLink.tsx`
- Create: `src/components/FavoriteButton.tsx`
- Create: `src/components/PropertyCard.tsx`
- Create: `src/components/Reveal.tsx`
- Create: `src/components/SectionHeading.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/components.css`

**Interfaces:**
- Consumes: `Property`, `formatPrice`.
- Produces: `useFavorites(): { favorites: string[]; toggleFavorite(id: string): void; isFavorite(id: string): boolean }`, common layout and UI components.

- [ ] **Step 1: Write failing behavior tests**

Test that toggling an id updates the visible state and writes JSON to `localStorage` key `locus-favorites`. Test that the header opens a dialog-like mobile menu, closes it on Escape, exposes links to all five main destinations and renders a visible favorites count.

- [ ] **Step 2: Run the focused tests and confirm RED**

Run: `npm run test:run -- src/features/favorites/FavoritesContext.test.tsx src/layout/SiteHeader.test.tsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement shared behavior and layout**

Use guarded `try/catch` reads and writes around `localStorage`. `SiteLayout` must render a skip-link to `#main-content`, the header, `<main id="main-content">`, and the footer. `Reveal` must use `IntersectionObserver` when available and render visible immediately in tests or unsupported browsers. `FavoriteButton` must have a changing `aria-label`; `PropertyCard` must link the image and title to `/properties/:slug`.

- [ ] **Step 4: Implement the visual foundation**

Define CSS variables `--paper: #f3efe7`, `--ivory: #fbf9f4`, `--ink: #191817`, `--muted: #706d67`, `--oxblood: #6f1d2a`, `--line: #d7d0c5`, `--serif: "Cormorant Garamond"`, `--sans: "Manrope"`. Add fluid typography with `clamp()`, visible `:focus-visible`, a 12-column `.shell` grid and reduced-motion overrides.

- [ ] **Step 5: Verify and commit**

Run: `npm run test:run -- src/features/favorites/FavoritesContext.test.tsx src/layout/SiteHeader.test.tsx`

Expected: all focused tests pass.

Run: `npm run lint`

Expected: exit code 0.

```powershell
git add src/features src/app/AppProviders.tsx src/layout src/components src/styles
git commit -m "feat: add shared shell and favorites"
```

### Task 3: Editorial home page

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/HomePage.test.tsx`
- Modify: `src/styles/components.css`
- Create: `src/styles/pages.css`

**Interfaces:**
- Consumes: `properties`, `PropertyCard`, `SectionHeading`, `Reveal`, `ArrowLink`.
- Produces: default export `HomePage`.

- [ ] **Step 1: Write the failing home-page test**

Render inside `MemoryRouter` and `AppProviders`. Assert the exact hero heading `Недвижимость как личная координата`, quick-search controls, four featured property cards, the five district names, services section and final consultation link.

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm run test:run -- src/pages/HomePage.test.tsx`

Expected: FAIL because `HomePage` does not exist.

- [ ] **Step 3: Build the page**

Implement a split hero with `/images/hero.webp`, coordinate label `55.7558° N · 37.6173° E`, heading, short positioning copy and CTA links to `/properties` and `/contact`. Quick search submits to `/properties` with `type`, `district`, and `maxPrice` query parameters. Follow with a four-item collection, statistics `12 лет`, `340+ сделок`, `68% по рекомендации`, asymmetric services, five districts, founder quote and oxblood consultation band.

- [ ] **Step 4: Add editorial responsive styles**

Use deliberate asymmetry, image-mask reveals, numbered section labels and one oversized serif word behind the district section. Avoid card grids with identical heights outside the catalog. Keep all text and CTAs visible at 360 px.

- [ ] **Step 5: Verify and commit**

Run: `npm run test:run -- src/pages/HomePage.test.tsx`

Expected: the home-page test passes.

```powershell
git add src/pages/HomePage.tsx src/pages/HomePage.test.tsx src/styles
git commit -m "feat: build editorial home page"
```

### Task 4: Catalog and property details

**Files:**
- Create: `src/pages/PropertiesPage.tsx`
- Create: `src/pages/PropertiesPage.test.tsx`
- Create: `src/pages/PropertyPage.tsx`
- Create: `src/pages/PropertyPage.test.tsx`
- Create: `src/components/PropertyFilters.tsx`
- Create: `src/components/PropertyGallery.tsx`
- Create: `src/components/LocationMap.tsx`
- Create: `src/components/LeadForm.tsx`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: property domain functions and shared components.
- Produces: default exports `PropertiesPage`, `PropertyPage`; reusable `LeadForm` and `LocationMap`.

- [ ] **Step 1: Write failing catalog tests**

Render `/properties?district=Хамовники&type=Квартира` in `MemoryRouter`; assert only matching cards and an accessible result count. Change the type to `Дом`, assert the empty state, activate `Сбросить фильтры`, and assert all eight cards return. Toggle grid/list and verify `aria-pressed`.

- [ ] **Step 2: Write failing detail tests**

Render `/properties/khamovniki-residence`; assert title, price, address, feature list, gallery controls, viewing form and two recommendations. Click next image and assert the active-image counter changes. Render an invalid slug and assert `Объект не найден` with a catalog link.

- [ ] **Step 3: Run both files and confirm RED**

Run: `npm run test:run -- src/pages/PropertiesPage.test.tsx src/pages/PropertyPage.test.tsx`

Expected: FAIL because catalog/detail components do not exist.

- [ ] **Step 4: Implement catalog state**

Parse only known query values; treat invalid numeric values as undefined. Update query parameters through `setSearchParams`. Desktop filters remain inline; on mobile the same controls open in an accessible panel. Insert a private-search CTA after the fourth card. The empty state must retain controls and expose a reset button.

- [ ] **Step 5: Implement detail interactions**

Build a keyboard-operable gallery with previous/next buttons and `aria-live` counter. Use a CSS-drawn location map with labelled markers, not an external map API. Keep the viewing form sticky only above 1024 px. `LeadForm` uses `validateLead`, reports field errors and, after success, shows `Спасибо. Советник свяжется с вами в рабочее время.` without network calls.

- [ ] **Step 6: Verify and commit**

Run: `npm run test:run -- src/pages/PropertiesPage.test.tsx src/pages/PropertyPage.test.tsx`

Expected: all catalog and detail tests pass.

```powershell
git add src/pages/PropertiesPage.tsx src/pages/PropertiesPage.test.tsx src/pages/PropertyPage.tsx src/pages/PropertyPage.test.tsx src/components src/styles
git commit -m "feat: add catalog and property details"
```

### Task 5: Remaining pages, router and application entry

**Files:**
- Create: `src/pages/ServicesPage.tsx`
- Create: `src/pages/AboutPage.tsx`
- Create: `src/pages/ContactPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `src/pages/staticPages.test.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`
- Create: `src/main.tsx`
- Modify: `src/styles/pages.css`

**Interfaces:**
- Consumes: all page exports, `SiteLayout`, `AppProviders`, `LeadForm`, `LocationMap`.
- Produces: complete routable application and Vite entry point.

- [ ] **Step 1: Write failing route and content tests**

Assert that `/services` exposes four services and four process steps, `/about` exposes manifesto/team/metrics, `/contact` exposes office details and lead form, and `/missing` exposes `Страница вне коллекции`. In `App.test.tsx`, render each direct route and assert its unique `<h1>`.

- [ ] **Step 2: Run and confirm RED**

Run: `npm run test:run -- src/pages/staticPages.test.tsx src/app/App.test.tsx`

Expected: FAIL because static pages and routes do not exist.

- [ ] **Step 3: Implement pages and routing**

Create routes nested under `SiteLayout`. Add `ScrollToTop` on pathname changes. Services copy covers покупка, продажа, private search and инвестиционный подбор; About includes three named fictional advisers with roles; Contact uses fictional office `Пречистенская набережная, 17`, phone `+7 (495) 021-17-17`, email `hello@locus-estate.ru`, and an explicit demo notice in the footer.

- [ ] **Step 4: Load fonts and styles from the entry point**

Import Cormorant Garamond weights 500/600, Manrope weights 400/500/600, then `tokens.css`, `base.css`, `components.css`, and `pages.css`. Mount `<App />` inside `<StrictMode>` and `<AppProviders>`.

- [ ] **Step 5: Verify the full unit suite and build**

Run: `npm run test:run`

Expected: all unit and component tests pass.

Run: `npm run build`

Expected: Vite production build succeeds.

- [ ] **Step 6: Commit**

```powershell
git add src index.html
git commit -m "feat: complete Locus Estate routes"
```

### Task 6: Assets, responsive polish and end-to-end verification

**Files:**
- Create: `public/images/hero.webp`
- Create: `public/images/property-01.webp` through `public/images/property-08.webp`
- Create: `public/images/about.webp`
- Create: `public/images/adviser-01.webp` through `public/images/adviser-03.webp`
- Create: `public/images/image-fallback.svg`
- Create: `playwright.config.ts`
- Create: `e2e/site.spec.ts`
- Create: `src/styles/responsive.css`
- Modify: `src/main.tsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: complete app and pre-generated source artwork.
- Produces: optimized local image set, mobile styling and executable E2E smoke test.

- [ ] **Step 1: Prepare local visual assets**

Convert approved generated sources to WebP at quality 84: hero/about at 1920 px wide, property cards at 1440 px, adviser portraits at 800 px. Keep each file below 650 KB and verify dimensions with Pillow. Add a neutral limestone SVG fallback with the Locus monogram.

- [ ] **Step 2: Write the failing E2E smoke test**

```ts
import { expect, test } from '@playwright/test'

test('visitor can browse, save and request a viewing', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Недвижимость как личная координата' })).toBeVisible()
  await page.getByRole('link', { name: /Смотреть коллекцию/ }).first().click()
  await expect(page).toHaveURL(/\/properties/)
  await page.getByRole('link', { name: /Резиденция в Хамовниках/ }).first().click()
  await page.getByRole('button', { name: /Добавить в избранное/ }).click()
  await page.getByLabel('Ваше имя').fill('Анна')
  await page.getByLabel('Телефон').fill('+7 999 123-45-67')
  await page.getByLabel(/согласие/i).check()
  await page.getByRole('button', { name: /Записаться на просмотр/ }).click()
  await expect(page.getByText(/Советник свяжется/)).toBeVisible()
})
```

- [ ] **Step 3: Confirm RED, then configure Playwright**

Run: `npm run e2e`

Expected before configuration: FAIL because the Playwright config or running app is missing. Configure `webServer.command: "npm run dev -- --host 127.0.0.1 --port 4173"`, `baseURL: "http://127.0.0.1:4173"`, and desktop Chrome plus mobile Pixel 7 projects.

- [ ] **Step 4: Finish responsive and accessibility styling**

At 1024 px move the catalog to two columns and disable sticky form; at 720 px switch to a four-column layout, collapse navigation into the menu, stack forms, and keep controls at least 44 px high. Add `@media (prefers-reduced-motion: reduce)` to disable transforms, smooth scrolling and reveal transitions. Import `responsive.css` last.

- [ ] **Step 5: Run all automated verification**

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run test:run`

Expected: all tests pass.

Run: `npm run build`

Expected: exit code 0 and `dist/` generated.

Run: `npm run e2e`

Expected: desktop and mobile projects pass.

- [ ] **Step 6: Perform browser QA**

Open the app at 1440×1000 and 390×844. Visit every route; verify no console errors, missing images, horizontal overflow or clipped focus. Exercise filters, favorites, gallery, mobile menu, both forms and the 404 route. Capture desktop and mobile screenshots for delivery.

- [ ] **Step 7: Commit**

```powershell
git add public src/styles/responsive.css src/main.tsx playwright.config.ts e2e package.json package-lock.json
git commit -m "test: polish and verify Locus Estate"
```
