import { test, expect } from '@playwright/test';

test.describe('Documentacao e Glossario', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve exibir abas de documentacao', async ({ page }) => {
    // Clicar na aba Documentação
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Verificar que as abas de documentação estão presentes
    const tabs = ['Conceitos', 'ODA', 'TMF683', 'EDA'];
    
    for (const tab of tabs) {
      const tabButton = page.locator(`button:has-text("${tab}")`);
      await expect(tabButton).toBeVisible();
    }
  });

  test('deve exibir conteudo de Conceitos', async ({ page }) => {
    // Clicar na aba Documentação
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Clicar na aba Conceitos
    await page.click('button:has-text("Conceitos")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const microsserviceTitle = page.locator('text=Microsservico');
    const apiTitle = page.locator('text=API REST');
    const eventBrokerTitle = page.locator('text=Event Broker');

    await expect(microsserviceTitle).toBeVisible();
    await expect(apiTitle).toBeVisible();
    await expect(eventBrokerTitle).toBeVisible();
  });

  test('deve exibir conteudo de ODA', async ({ page }) => {
    // Clicar na aba Documentação
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Clicar na aba ODA
    await page.click('button:has-text("ODA")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const odaTitle = page.locator('text=Open Digital Architecture');
    await expect(odaTitle).toBeVisible();
  });

  test('deve exibir conteudo de TMF683', async ({ page }) => {
    // Clicar na aba Documentação
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Clicar na aba TMF683
    await page.click('button:has-text("TMF683")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const tmf683Title = page.locator('text=TMF683 Party Interaction Management');
    await expect(tmf683Title).toBeVisible();
  });

  test('deve exibir conteudo de EDA', async ({ page }) => {
    // Clicar na aba Documentação
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Clicar na aba EDA
    await page.click('button:has-text("EDA")');
    await page.waitForTimeout(500);

    // Verificar que o conteúdo está presente
    const edaTitle = page.locator('text=Event-Driven Architecture');
    await expect(edaTitle).toBeVisible();
  });

  test('deve permitir buscar termos no glossario', async ({ page }) => {
    // Clicar na aba Glossário
    await page.click('button:has-text("Glossário")');
    await page.waitForTimeout(500);

    // Preencher o campo de busca
    const searchInput = page.locator('input[placeholder="Buscar termo..."]');
    await searchInput.fill('API');

    // Aguardar que os resultados apareçam
    await page.waitForTimeout(500);

    // Verificar que o termo API está presente
    const apiTerm = page.locator('text=API (Application Programming Interface)');
    await expect(apiTerm).toBeVisible();
  });

  test('deve exibir definicao de termo no glossario', async ({ page }) => {
    // Clicar na aba Glossário
    await page.click('button:has-text("Glossário")');
    await page.waitForTimeout(500);

    // Verificar que um termo está presente
    const term = page.locator('text=Microsservico');
    await expect(term).toBeVisible();

    // Verificar que a definição está presente
    const definition = page.locator('text=Pequeno programa que faz uma coisa muito bem');
    await expect(definition).toBeVisible();
  });

  test('deve filtrar glossario quando nenhum termo corresponde', async ({ page }) => {
    // Clicar na aba Glossário
    await page.click('button:has-text("Glossário")');
    await page.waitForTimeout(500);

    // Preencher o campo de busca com termo inexistente
    const searchInput = page.locator('input[placeholder="Buscar termo..."]');
    await searchInput.fill('XYZABC123');

    // Aguardar que a mensagem de nenhum resultado apareça
    await page.waitForTimeout(500);

    // Verificar que a mensagem está presente
    const noResults = page.locator('text=Nenhum termo encontrado');
    await expect(noResults).toBeVisible();
  });
});
