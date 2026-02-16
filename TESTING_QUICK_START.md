# Quick Start - Guia Rápido de Testes

Comece a testar em 5 minutos!

## 🚀 Início Rápido

### 1. Iniciar Servidor (Terminal 1)

```bash
cd /home/ubuntu/tmf683-party-interaction
pnpm dev
```

Aguarde até ver: `Server running on http://localhost:3000/`

### 2. Executar Testes Unitários (Terminal 2)

```bash
cd /home/ubuntu/tmf683-party-interaction
pnpm test
```

**Esperado**: 12 testes passando ✓

### 3. Executar Testes E2E (Terminal 3)

```bash
cd /home/ubuntu/tmf683-party-interaction
pnpm test:e2e
```

**Esperado**: 42 testes passando ✓

### 4. Testar API Manualmente

```bash
# Criar interação
curl -X POST http://localhost:3000/api/trpc/partyInteraction.create \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Teste rápido",
    "type": "inbound",
    "channelName": "phone",
    "interactionDate": "2026-02-16T18:00:00Z",
    "involvedParties": []
  }'
```

### 5. Abrir no Navegador

```
http://localhost:3000/
```

---

## 📋 Tipos de Testes

| Tipo | Comando | Tempo | Cobertura |
|------|---------|-------|-----------|
| **Unitários** | `pnpm test` | ~1s | Funções isoladas |
| **E2E** | `pnpm test:e2e` | ~20s | Fluxos completos |
| **API Manual** | `curl ...` | Variável | Endpoints específicos |
| **UI Manual** | Navegador | Variável | Experiência do usuário |

---

## 🎯 Checklist Rápido

### Antes de Fazer Commit

- [ ] `pnpm test` - Testes unitários passando
- [ ] `pnpm check` - Sem erros TypeScript
- [ ] `pnpm format` - Código formatado

### Antes de Deploy

- [ ] `pnpm test` - Todos os testes unitários passando
- [ ] `pnpm test:e2e` - Todos os testes E2E passando
- [ ] Testar manualmente em navegador
- [ ] Testar em mobile (F12 → Device Toolbar)

---

## 🔍 Testes Específicos

### Testar Apenas Autenticação

```bash
pnpm exec vitest run server/auth.logout.test.ts
```

### Testar Apenas Party Interaction

```bash
pnpm exec vitest run server/routers/partyInteraction.test.ts
```

### Testar Apenas Navegação

```bash
pnpm exec playwright test e2e/navigation.spec.ts
```

### Testar Apenas Documentação

```bash
pnpm exec playwright test e2e/documentation.spec.ts
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Porta 3000 em uso | `kill -9 $(lsof -t -i:3000)` |
| Testes falhando | `rm -rf node_modules && pnpm install` |
| Playwright não encontra navegadores | `pnpm exec playwright install` |
| Testes lentos | `pnpm test:e2e --workers=1` |

---

## 📚 Documentação Completa

Para guias detalhados, consulte:

- **TESTING_GUIDE.md** - Guia completo com todos os detalhes
- **TESTING_EXAMPLES.md** - Exemplos práticos passo-a-passo
- **E2E_TESTS.md** - Documentação dos testes E2E
- **E2E_TESTS_SUMMARY.md** - Sumário dos testes implementados

---

## 🎓 Próximos Passos

1. Leia **TESTING_GUIDE.md** para entender todos os tipos de teste
2. Siga exemplos em **TESTING_EXAMPLES.md**
3. Execute testes E2E com UI: `pnpm test:e2e:ui`
4. Configure CI/CD com GitHub Actions

---

## ⚡ Atalhos Úteis

```bash
# Executar tudo
pnpm test && pnpm test:e2e

# Ver relatório E2E
pnpm exec playwright show-report

# Debug E2E
pnpm test:e2e:debug

# Modo watch (reexecuta ao salvar)
pnpm exec vitest

# Verificar cobertura
pnpm exec vitest run --coverage
```

---

## 💡 Dicas

1. **Mantenha servidor rodando** durante desenvolvimento
2. **Use modo watch** para feedback rápido
3. **Execute testes antes de commit** para evitar surpresas
4. **Leia logs de erro** para entender o que falhou
5. **Teste manualmente** para validar experiência do usuário

---

## 📞 Precisa de Ajuda?

Consulte os guias detalhados:

- **Testes Unitários**: TESTING_GUIDE.md → Seção "Testes Unitários"
- **Testes E2E**: TESTING_GUIDE.md → Seção "Testes E2E"
- **Testes de API**: TESTING_GUIDE.md → Seção "Testes de API"
- **Exemplos Práticos**: TESTING_EXAMPLES.md
- **Troubleshooting**: TESTING_GUIDE.md → Seção "Troubleshooting"

---

**Pronto para testar? Comece com `pnpm test`! 🚀**
