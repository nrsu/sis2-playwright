import { test, expect } from '@playwright/test';
import { money } from './helpers';

test('catalog shows products', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.card').first()).toBeVisible();
  expect(await page.locator('.card').count()).toBeGreaterThan(0);
});

test('sort by price low to high', async ({ page }) => {
  await page.goto('/');
  const responded = page.waitForResponse((r) => r.url().includes('sort=price'));
  await page.locator('[data-test=sort]').selectOption('price,asc');
  await responded;
  await expect(page.locator('[data-test=product-price]').first()).toBeVisible();
  const prices = (await page.locator('[data-test=product-price]').allInnerTexts()).map(money);
  expect(prices.length).toBeGreaterThan(1);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('sort by name A-Z', async ({ page }) => {
  await page.goto('/');
  const responded = page.waitForResponse((r) => r.url().includes('sort=name'));
  await page.locator('[data-test=sort]').selectOption('name,asc');
  await responded;
  await expect(page.locator('[data-test=product-name]').first()).toBeVisible();
  const names = (await page.locator('[data-test=product-name]').allInnerTexts()).map((n) => n.trim());
  const sorted = [...names].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  expect(names).toEqual(sorted);
});

test('pagination: next page', async ({ page }) => {
  await page.goto('/');
  await page.locator('a[aria-label*=Next]').first().click();
  await expect(page.locator('.card').first()).toBeVisible();
});
