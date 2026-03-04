# Commit, Push e Create PR

Este slash command automatiza todo o fluxo de commit → push → pull request.

## Uso

```
/commit-push-pr "Descrição das mudanças"
```

## O que o comando faz

1. **Verifica status**: Mostra arquivos modificados
2. **Stage changes**: Adiciona arquivos relevantes (ignora secrets)
3. **Commit**: Cria commit com mensagem descritiva
4. **Push**: Faz push para origin
5. **Create PR**: Cria pull request no GitHub
6. **Retorna URL**: Mostra link do PR criado

## Instruções para Claude

Quando este comando for executado, siga estes passos:

### 1. Análise inicial
```bash
git status
git diff
```

### 2. Stage arquivos (exceto secrets)
```bash
git add .
# Se houver .env ou credentials.json, avisar usuário
```

### 3. Criar commit
```bash
git commit -m "[tipo]: [descrição]

[detalhes das mudanças]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Tipos de commit**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `refactor`: Refatoração
- `docs`: Documentação
- `test`: Testes
- `chore`: Tarefas auxiliares

### 4. Push
```bash
git push origin HEAD
```

### 5. Criar PR
```bash
gh pr create \
  --title "[tipo]: [descrição curta]" \
  --body "## Mudanças

- [lista de mudanças principais]

## Testes

- [ ] Testes unitários passam
- [ ] Testes de integração passam
- [ ] Testado manualmente

## Screenshots

[se aplicável]

---
🤖 Generated with Claude Code"
```

### 6. Retornar resultado

Mostrar:
- ✅ Commit criado: [hash]
- ✅ Push realizado
- ✅ PR criado: [URL]

## Exemplo de execução

```
Usuario: /commit-push-pr "Adiciona validação de email"

Claude:
📋 Analisando mudanças...
   Modified: src/api/users.ts
   Modified: src/utils/validators.ts
   New: src/utils/validators.test.ts

✅ Commit criado: a3f2b1c
✅ Push realizado: origin/feat/email-validation
✅ PR criado: https://github.com/usuario/repo/pull/42

Pronto! 🎉
```

## Casos especiais

### Arquivos sensíveis detectados
Se detectar .env, credentials.json, etc:
```
⚠️ ATENÇÃO: Arquivos sensíveis detectados:
  - .env
  - config/secrets.json

Deseja continuar? (não recomendado)
```

### Branch main/master
Se estiver em main/master:
```
⚠️ Você está na branch principal.
Criar nova branch? [nome sugerido]
```

### Testes falhando
Se testes estiverem falhando:
```
⚠️ Testes estão falhando.
Deseja criar PR como draft?
```
