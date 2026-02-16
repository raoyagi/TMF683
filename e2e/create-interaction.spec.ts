import { test, expect } from '@playwright/test';

test.describe('Criar Party Interaction', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
    // Aguardar que a página carregue
    await page.waitForLoadState('networkidle');
  });

  test('deve navegar para a aba API Tester', async ({ page }) => {
    // Clicar na aba API Tester
    await page.click('button:has-text("API Tester")');
    
    // Verificar que a aba está visível
    const apiTesterSection = page.locator('text=Testador de API REST');
    await expect(apiTesterSection).toBeVisible();
  });

  test('deve exibir a página inicial com todas as abas', async ({ page }) => {
    // Verificar que o título principal está presente
    const title = page.locator('h1:has-text("TMF683 Party Interaction Management")');
    await expect(title).toBeVisible();

    // Verificar que todas as abas estão presentes
    const tabs = ['Visão Geral', 'Arquitetura', 'Documentação', 'API Tester', 'Eventos', 'Glossário'];
    
    for (const tab of tabs) {
      const tabButton = page.locator(`button:has-text("${tab}")`);
      await expect(tabButton).toBeVisible();
    }
  });

  test('deve exibir informações sobre o microsserviço', async ({ page }) => {
    // Verificar que a descrição está presente
    const description = page.locator('text=Um microsserviço moderno para gerenciar interações de clientes');
    await expect(description).toBeVisible();

    // Verificar que os cards de funcionalidades estão presentes
    const restApiCard = page.locator('text=REST API');
    const eventBrokerCard = page.locator('text=Event Broker');
    const observabilityCard = page.locator('text=Observabilidade');

    await expect(restApiCard).toBeVisible();
    await expect(eventBrokerCard).toBeVisible();
    await expect(observabilityCard).toBeVisible();
  });

  test('deve exibir funcionalidades principais', async ({ page }) => {
    // Verificar que a seção de funcionalidades está presente
    const functionalitiesSection = page.locator('text=Funcionalidades Principais');
    await expect(functionalitiesSection).toBeVisible();

    // Verificar que cada funcionalidade está listada
    const features = [
      'Criar, ler, atualizar e deletar Party Interactions',
      'Publicar eventos quando interações são criadas',
      'Registrar eventos em banco de dados para auditoria',
      'Monitorar eventos em tempo real',
      'Testar endpoints REST interativamente',
    ];

    for (const feature of features) {
      const featureElement = page.locator(`text=${feature}`);
      await expect(featureElement).toBeVisible();
    }
  });

  test('deve exibir próximos passos', async ({ page }) => {
    // Verificar que a seção de próximos passos está presente
    const nextStepsSection = page.locator('text=Próximos Passos');
    await expect(nextStepsSection).toBeVisible();

    // Verificar que cada passo está listado
    const steps = [
      'Leia a Documentação',
      'Explore a Arquitetura',
      'Use o API Tester',
      'Monitore Eventos',
      'Consulte o Glossário',
    ];

    for (const step of steps) {
      const stepElement = page.locator(`text=${step}`);
      await expect(stepElement).toBeVisible();
    }
  });
});
