import { test, expect } from '@playwright/test';

// EPAM Client Work navigation test
test.describe('EPAM client work navigation', () => {
  test('navigates from home to Client Work and verifies text', async ({ page }) => {
    // Set viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // 1. Navigate to https://www.epam.com/
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // 2. Click on Accept all for cookies (if present)
    const cookieSelectors = [
      'button:has-text("Accept all")',
      'button:has-text("Accept all cookies")',
      'button:has-text("Accept Cookies")',
      'text=Accept all',
      'text=Accept all cookies',
      'text=Accept Cookies'
    ];
    for (const sel of cookieSelectors) {
      const btn = page.locator(sel);
      if (await btn.count() > 0) {
        try { await btn.first().click({ timeout: 3000 }); } catch(e) { /* ignore */ }
        break;
      }
    }

    // 3. Select "Services" from the header menu
    const services = page.getByRole('link', { name: /Services/i });
    if (await services.count() > 0) {
      await services.first().click();
    } else {
      const alt = page.locator('a:has-text("Services")');
      if (await alt.count() > 0) await alt.first().click();
    }

    // 4. Click the "Explore Our Client Work" link
    const explore = page.getByRole('link', { name: /Explore Our Client Work/i });
    if (await explore.count() > 0) {
      await explore.first().click();
    } else {
      const alt2 = page.locator('a:has-text("Explore Our Client Work")');
      if (await alt2.count() > 0) await alt2.first().click();
    }

    // 5. Verify that the "Client Work" text is visible on the page
    const clientWork = page.locator('text=Client Work');
    await expect(clientWork.first()).toBeVisible({ timeout: 10000 });
  });
});
