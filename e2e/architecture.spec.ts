import { test, expect } from '@playwright/test';

test.describe('Arquitetura C4 Model', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve exibir abas de arquitetura', async ({ page }) => {
    // Clicar na aba Arquitetura
    await page.click('button:has-text("Arquitetura")');
    await page.waitForTimeout(500);

    // Verificar que as abas de arquitetura estão presentes
    const tabs = ['Context', 'Container', 'Component', 'Code'];
    
    for (const tab of tabs) {
      const tabButton = page.locator(`button:has-text("${tab}")`);
      await expect(tabButton).toBeVisible();
    }
  });

  test('deve exibir Context Diagram', async ({ page }) => {
    // Clicar na aba Arquitetura
    await page.click('button:has-text("Arquitetura")');
    await page.waitForTimeout(500);

    // Clicar na aba Context
    await page.click('button:has-text("Context")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const contextTitle = page.locator('text=Context Diagram');
    const description = page.locator('text=Mostra o sistema no contexto de usuarios');

    await expect(contextTitle).toBeVisible();
    await expect(description).toBeVisible();
  });

  test('deve exibir Container Diagram', async ({ page }) => {
    // Clicar na aba Arquitetura
    await page.click('button:has-text("Arquitetura")');
    await page.waitForTimeout(500);

    // Clicar na aba Container
    await page.click('button:has-text("Container")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const containerTitle = page.locator('text=Container Diagram');
    const restApiContainer = page.locator('text=REST API Gateway');
    const databaseContainer = page.locator('text=Database');

    await expect(containerTitle).toBeVisible();
    await expect(restApiContainer).toBeVisible();
    await expect(databaseContainer).toBeVisible();
  });

  test('deve exibir Component Diagram', async ({ page }) => {
    // Clicar na aba Arquitetura
    await page.click('button:has-text("Arquitetura")');
    await page.waitForTimeout(500);

    // Clicar na aba Component
    await page.click('button:has-text("Component")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const componentTitle = page.locator('text=Component Diagram');
    const routeHandler = page.locator('text=Route Handler');
    const validator = page.locator('text=Validator');

    await expect(componentTitle).toBeVisible();
    await expect(routeHandler).toBeVisible();
    await expect(validator).toBeVisible();
  });

  test('deve exibir Code Diagram', async ({ page }) => {
    // Clicar na aba Arquitetura
    await page.click('button:has-text("Arquitetura")');
    await page.waitForTimeout(500);

    // Clicar na aba Code
    await page.click('button:has-text("Code")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const codeTitle = page.locator('text=Code Diagram');
    const partyInteractionType = page.locator('text=PartyInteraction');

    await expect(codeTitle).toBeVisible();
    await expect(partyInteractionType).toBeVisible();
  });

  test('deve exibir estrutura de dados no Code Diagram', async ({ page }) => {
    // Clicar na aba Arquitetura
    await page.click('button:has-text("Arquitetura")');
    await page.waitForTimeout(500);

    // Clicar na aba Code
    await page.click('button:has-text("Code")');
    await page.waitForTimeout(500);

    // Verificar que os campos da estrutura estão presentes
    const fields = ['id: string', 'description: string', 'type: enum', 'status: enum', 'channelName: string'];
    
    for (const field of fields) {
      const fieldElement = page.locator(`text=${field}`);
      await expect(fieldElement).toBeVisible();
    }
  });
});
