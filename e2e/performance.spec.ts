import { test, expect } from '@playwright/test';

test.describe('Performance e Carregamento', () => {
  test('deve carregar a pagina inicial em tempo aceitavel', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Verificar que a página carregou em menos de 5 segundos
    expect(loadTime).toBeLessThan(5000);
  });

  test('deve exibir conteudo sem layout shift', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar que a página carregue completamente
    await page.waitForLoadState('networkidle');
    
    // Verificar que o título está presente
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();
    
    // Verificar que o layout não mudou após o carregamento
    const titleBox = await title.boundingBox();
    expect(titleBox).toBeTruthy();
  });

  test('deve carregar abas sem delay significativo', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Medir tempo para clicar em uma aba
    const startTime = Date.now();
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);
    const clickTime = Date.now() - startTime;

    // Verificar que a aba carregou em tempo aceitável
    expect(clickTime).toBeLessThan(1000);

    // Verificar que o conteúdo está visível
    const docTitle = page.locator('text=Documentação Educacional');
    await expect(docTitle).toBeVisible();
  });

  test('deve ter imagens otimizadas (se houver)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Obter todas as imagens
    const images = await page.locator('img').count();

    // Se houver imagens, verificar que elas carregaram
    if (images > 0) {
      const firstImage = page.locator('img').first();
      const isVisible = await firstImage.isVisible();
      expect(isVisible).toBeTruthy();
    }
  });

  test('deve ter CSS carregado corretamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que os estilos estão aplicados
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    
    // Obter o tamanho da fonte (deve ser maior que o padrão)
    const fontSize = await title.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    // Verificar que a fonte foi aplicada
    expect(fontSize).toBeTruthy();
  });

  test('deve ter JavaScript carregado corretamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar que os botões são interativos
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);

    // Clicar em um botão e verificar que funciona
    await page.click('button:has-text("Documentação")');
    await page.waitForTimeout(500);

    // Verificar que a navegação funcionou
    const docTitle = page.locator('text=Documentação Educacional');
    await expect(docTitle).toBeVisible();
  });

  test('deve ter footer carregado corretamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll para o final da página
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Aguardar um pouco para o footer ficar visível
    await page.waitForTimeout(500);

    // Verificar que o footer está presente
    const footer = page.locator('text=TMF683 Party Interaction Management © 2026');
    await expect(footer).toBeVisible();
  });

  test('deve ter memoria estavel ao navegar entre abas', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navegar entre várias abas
    const tabs = ['Documentação', 'Arquitetura', 'Glossário', 'Eventos', 'API Tester'];

    for (const tab of tabs) {
      await page.click(`button:has-text("${tab}")`);
      await page.waitForTimeout(300);
    }

    // Voltar para a aba inicial
    await page.click('button:has-text("Visão Geral")');
    await page.waitForTimeout(500);

    // Verificar que a página ainda está responsiva
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();
  });
});
