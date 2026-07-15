import { expect, test } from '@playwright/test'

test('site metadata exposes a working favicon', async ({ page, request }) => {
  await page.goto('/')

  const faviconHref = await page.locator('link[rel="icon"]').getAttribute('href')
  expect(faviconHref).toBeTruthy()

  const response = await request.get(faviconHref!)
  expect(response.ok()).toBe(true)
})

test('visitor can browse, save and request a viewing', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Недвижимость как личная координата' })).toBeVisible()
  await page.getByRole('link', { name: 'Смотреть коллекцию' }).click()
  await expect(page).toHaveURL(/\/properties/)

  await page.getByRole('link', { name: 'Резиденция в Хамовниках — открыть объект' }).click()
  await expect(page.getByRole('heading', { name: 'Резиденция в Хамовниках' })).toBeVisible()
  await page.getByRole('button', { name: 'Добавить в избранное: Резиденция в Хамовниках' }).click()

  await page.getByLabel('Ваше имя').fill('Анна')
  await page.getByLabel('Телефон').fill('+7 999 123-45-67')
  await page.getByLabel('Согласие на обработку данных').check()
  await page.getByRole('button', { name: 'Записаться на просмотр' }).click()
  await expect(page.getByText(/Данные не отправлены/)).toBeVisible()
})

test('all primary pages open directly', async ({ page }) => {
  for (const [path, heading] of [
    ['/services', 'Сопровождаем решение целиком'],
    ['/about', 'Недвижимость начинается с доверия'],
    ['/contact', 'Начнём с разговора'],
    ['/missing', 'Страница вне коллекции'],
  ]) {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: heading })).toBeVisible()
  }
})

test('catalog filters update the shareable result URL', async ({ page }) => {
  await page.goto('/properties')
  const filtersToggle = page.getByRole('button', { name: 'Фильтры' })
  if (await filtersToggle.isVisible()) await filtersToggle.click()
  await page.getByLabel('Тип недвижимости').selectOption('Дом')

  await expect(page).toHaveURL(/type=%D0%94%D0%BE%D0%BC/)
  await expect(page.getByText('Найдено 2 объекта')).toBeVisible()
})

test('mobile menu opens the saved collection', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chrome')
  await page.goto('/properties/khamovniki-residence')
  await page.getByRole('button', { name: 'Добавить в избранное: Резиденция в Хамовниках' }).click()
  await page.getByRole('button', { name: 'Открыть меню' }).click()

  const dialog = page.getByRole('dialog', { name: 'Навигация' })
  await expect(dialog.getByRole('link', { name: 'Коллекция' })).toBeFocused()
  await dialog.getByRole('link', { name: 'Избранное · 1' }).click()

  await expect(page).toHaveURL('/properties?favorites=1')
  await expect(page.getByRole('heading', { level: 1, name: 'Сохранённые объекты' })).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(1)
})
