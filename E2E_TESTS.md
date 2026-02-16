# Testes E2E com Playwright

Este projeto inclui testes de integração end-to-end (E2E) usando Playwright para validar fluxos completos do microsserviço TMF683.

## Instalação

Os testes E2E já estão configurados. Playwright foi instalado como dependência de desenvolvimento.

## Estrutura dos Testes

Os testes estão organizados em arquivos separados por funcionalidade:

### 1. `create-interaction.spec.ts`
Testa a página inicial e navegação básica:
- Navegação para a aba API Tester
- Exibição de todas as abas
- Informações sobre o microsserviço
- Funcionalidades principais
- Próximos passos

### 2. `navigation.spec.ts`
Testa a navegação entre abas:
- Navegação para Arquitetura
- Navegação para Documentação
- Navegação para Glossário
- Navegação para Eventos
- Volta para Visão Geral
- Persistência de header e footer

### 3. `documentation.spec.ts`
Testa a documentação e glossário:
- Exibição de abas de documentação
- Conteúdo de Conceitos
- Conteúdo de ODA
- Conteúdo de TMF683
- Conteúdo de EDA
- Busca no glossário
- Definição de termos
- Filtro quando nenhum termo corresponde

### 4. `architecture.spec.ts`
Testa os diagramas C4 Model:
- Exibição de abas de arquitetura
- Context Diagram (Nível 1)
- Container Diagram (Nível 2)
- Component Diagram (Nível 3)
- Code Diagram (Nível 4)
- Estrutura de dados

### 5. `responsive.spec.ts`
Testa responsividade e acessibilidade:
- Responsividade em desktop (1920x1080)
- Responsividade em tablet (768x1024)
- Responsividade em mobile (375x667)
- Contraste adequado de cores
- Navegação por teclado
- Labels acessíveis
- Modo escuro
- Modo claro

### 6. `performance.spec.ts`
Testa performance e carregamento:
- Tempo de carregamento da página inicial
- Ausência de layout shift
- Carregamento de abas sem delay
- Otimização de imagens
- Carregamento correto de CSS
- Carregamento correto de JavaScript
- Carregamento do footer
- Memória estável ao navegar

## Executando os Testes

### Executar todos os testes
```bash
pnpm test:e2e
```

### Executar testes com UI interativa
```bash
pnpm test:e2e:ui
```

### Executar testes em modo debug
```bash
pnpm test:e2e:debug
```

### Executar um arquivo de teste específico
```bash
pnpm exec playwright test e2e/navigation.spec.ts
```

### Executar um teste específico
```bash
pnpm exec playwright test e2e/navigation.spec.ts -g "deve navegar para aba Arquitetura"
```

## Configuração

A configuração dos testes está em `playwright.config.ts`:

- **Base URL**: http://localhost:3000
- **Browsers**: Chromium, Firefox, WebKit
- **Reporters**: HTML report
- **Web Server**: Inicia automaticamente com `pnpm dev`

## Visualizando Relatórios

Após executar os testes, um relatório HTML é gerado:

```bash
pnpm exec playwright show-report
```

## Estrutura de um Teste

```typescript
import { test, expect } from '@playwright/test';

test.describe('Descrição do grupo de testes', () => {
  test.beforeEach(async ({ page }) => {
    // Executado antes de cada teste
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve fazer algo específico', async ({ page }) => {
    // Ação
    await page.click('button:has-text("Clique aqui")');
    
    // Verificação
    const element = page.locator('text=Resultado esperado');
    await expect(element).toBeVisible();
  });
});
```

## Boas Práticas

1. **Use seletores robustos**: Prefira `has-text()` a seletores CSS frágeis
2. **Aguarde o carregamento**: Use `waitForLoadState()` para garantir que a página carregou
3. **Aguarde elementos**: Use `waitForTimeout()` para elementos que aparecem com delay
4. **Agrupe testes relacionados**: Use `test.describe()` para organizar testes
5. **Reutilize setup**: Use `test.beforeEach()` para código comum

## Troubleshooting

### Testes falhando com "element not found"
- Verifique se o servidor está rodando: `pnpm dev`
- Verifique se o seletor está correto
- Aumente o timeout: `await page.waitForTimeout(1000)`

### Testes lentos
- Reduza o número de testes paralelos em `playwright.config.ts`
- Verifique se o servidor está respondendo rápido
- Use `--headed` para ver o que está acontecendo

### Problemas com navegadores
- Instale os navegadores: `pnpm exec playwright install`
- Verifique se há espaço em disco
- Tente executar em um navegador específico: `--project=chromium`

## Integração com CI/CD

Para executar os testes em CI/CD (GitHub Actions, etc):

```yaml
- name: Install dependencies
  run: pnpm install

- name: Run unit tests
  run: pnpm test

- name: Run E2E tests
  run: pnpm test:e2e

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Próximas Melhorias

1. Adicionar testes para fluxos de API (criar, atualizar, deletar interações)
2. Adicionar testes para monitoramento de eventos em tempo real
3. Adicionar testes de carga com k6 ou Artillery
4. Adicionar testes visuais com Percy ou Chromatic
5. Integrar com CI/CD pipeline

## Referências

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Debugging](https://playwright.dev/docs/debug)
