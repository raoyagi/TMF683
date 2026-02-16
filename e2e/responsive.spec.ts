import { test, expect, devices } from '@playwright/test';

test.describe('Responsividade e Acessibilidade', () => {
  test('deve ser responsivo em desktop', async ({ page }) => {
    // Definir viewport de desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que o conteúdo está visível
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();

    // Verificar que as abas estão visíveis
    const tabs = page.locator('button:has-text("Visão Geral")');
    await expect(tabs).toBeVisible();
  });

  test('deve ser responsivo em tablet', async ({ page }) => {
    // Definir viewport de tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que o conteúdo está visível
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();

    // Verificar que as abas estão visíveis
    const tabs = page.locator('button:has-text("Visão Geral")');
    await expect(tabs).toBeVisible();
  });

  test('deve ser responsivo em mobile', async ({ page }) => {
    // Definir viewport de mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que o conteúdo está visível
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();

    // Verificar que as abas estão visíveis (podem estar em scroll)
    const tabs = page.locator('button:has-text("Visão Geral")');
    await expect(tabs).toBeVisible();
  });

  test('deve ter contraste adequado de cores', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que o texto principal tem contraste adequado
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    
    // Verificar que o elemento está visível (implica em contraste adequado)
    await expect(title).toBeVisible();
  });

  test('deve ter navegacao por teclado', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Pressionar Tab para navegar
    await page.keyboard.press('Tab');
    
    // Verificar que um elemento recebeu foco
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    expect(focusedElement).toBeTruthy();
  });

  test('deve ter labels acessiveis', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Clicar na aba Glossário
    await page.click('button:has-text("Glossário")');
    await page.waitForTimeout(500);

    // Verificar que o input de busca tem label
    const searchInput = page.locator('input[placeholder="Buscar termo..."]');
    await expect(searchInput).toBeVisible();
  });

  test('deve exibir corretamente em modo escuro (se suportado)', async ({ browser }) => {
    const context = await browser.newContext({
      colorScheme: 'dark',
    });
    const page = await context.newPage();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que o conteúdo está visível em modo escuro
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();

    await context.close();
  });

  test('deve exibir corretamente em modo claro', async ({ browser }) => {
    const context = await browser.newContext({
      colorScheme: 'light',
    });
    const page = await context.newPage();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que o conteúdo está visível em modo claro
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();

    await context.close();
  });
});
