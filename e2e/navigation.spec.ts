import { test, expect } from '@playwright/test';

test.describe('Navegacao entre abas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve navegar para aba Arquitetura', async ({ page }) => {
    // Clicar na aba Arquitetura
    await page.click('button:has-text("Arquitetura")');
    
    // Aguardar que o conteúdo carregue
    await page.waitForTimeout(500);

    // Verificar que o conteúdo da aba está visível
    const architectureTitle = page.locator('text=Arquitetura C4 Model');
    await expect(architectureTitle).toBeVisible();
  });

  test('deve navegar para aba Documentacao', async ({ page }) => {
    // Clicar na aba Documentação
    await page.click('button:has-text("Documentação")');
    
    // Aguardar que o conteúdo carregue
    await page.waitForTimeout(500);

    // Verificar que o conteúdo da aba está visível
    const docTitle = page.locator('text=Documentação Educacional');
    await expect(docTitle).toBeVisible();
  });

  test('deve navegar para aba Glossario', async ({ page }) => {
    // Clicar na aba Glossário
    await page.click('button:has-text("Glossário")');
    
    // Aguardar que o conteúdo carregue
    await page.waitForTimeout(500);

    // Verificar que o conteúdo da aba está visível
    const glossaryTitle = page.locator('text=Glossario Tecnico');
    await expect(glossaryTitle).toBeVisible();
  });

  test('deve navegar para aba Eventos', async ({ page }) => {
    // Clicar na aba Eventos
    await page.click('button:has-text("Eventos")');
    
    // Aguardar que o conteúdo carregue
    await page.waitForTimeout(500);

    // Verificar que o conteúdo da aba está visível
    const eventsTitle = page.locator('text=Monitor de Eventos em Tempo Real');
    await expect(eventsTitle).toBeVisible();
  });

  test('deve voltar para aba Visao Geral', async ({ page }) => {
    // Navegar para outra aba
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Voltar para Visão Geral
    await page.click('button:has-text("Visão Geral")');
    await page.waitForTimeout(500);

    // Verificar que estamos de volta na visão geral
    const overviewTitle = page.locator('text=Bem-vindo ao TMF683 Party Interaction Management');
    await expect(overviewTitle).toBeVisible();
  });

  test('deve exibir footer em todas as abas', async ({ page }) => {
    // Verificar footer na aba inicial
    let footer = page.locator('text=TMF683 Party Interaction Management © 2026');
    await expect(footer).toBeVisible();

    // Navegar para outra aba
    await page.click('button:has-text("Arquitetura")');
    await page.waitForTimeout(500);

    // Verificar que footer ainda está visível
    footer = page.locator('text=TMF683 Party Interaction Management © 2026');
    await expect(footer).toBeVisible();
  });

  test('deve exibir header em todas as abas', async ({ page }) => {
    // Verificar header na aba inicial
    let header = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(header).toBeVisible();

    // Navegar para outra aba
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Verificar que header ainda está visível
    header = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(header).toBeVisible();
  });
});
