# Regras do Projeto

Este arquivo define como Claude Code deve se comportar neste projeto.

## Stack Técnica

- **Linguagem**: TypeScript 5.3+ (strict mode SEMPRE)
- **Framework**: React 18+ com hooks
- **Estilo**: Tailwind CSS (sem CSS-in-JS)
- **Testes**: Jest + Testing Library

## Padrões de Código

### TypeScript

```typescript
// ✅ BOM: Type explícito, strict mode
interface User {
  id: string;
  email: string;
  name: string;
}

function createUser(data: User): User {
  // ...
}

// ❌ RUIM: any, tipos implícitos
function createUser(data: any) {
  // ...
}
```

### Composição sobre Herança

```typescript
// ✅ BOM: Composição com hooks
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return { user, login, logout };
}

// ❌ RUIM: Herança de classes
class AuthComponent extends BaseComponent {
  // ...
}
```

### Testes Primeiro

**SEMPRE escreva testes antes de implementar funcionalidades novas.**

```typescript
// 1. Escrever teste primeiro
describe('validateEmail', () => {
  it('deve aceitar email válido', () => {
    expect(validateEmail('teste@exemplo.com')).toBe(true);
  });
});

// 2. Depois implementar
function validateEmail(email: string): boolean {
  // ...
}
```

## Estrutura de Arquivos

```
src/
├── components/       # Componentes React
├── hooks/           # Custom hooks
├── utils/           # Funções utilitárias
├── services/        # Chamadas API
└── types/           # Type definitions
```

## Formatação

- **Indentação**: 2 espaços
- **Aspas**: Simples para strings
- **Ponto-e-vírgula**: Sempre
- **Linha máxima**: 80 caracteres (quando possível)

## Commits

Use Conventional Commits:

```
feat: adiciona validação de email
fix: corrige erro no login
docs: atualiza README
test: adiciona testes para Spinner
```

## Quando Usar Opus 4.6

Claude deve sugerir Opus 4.6 quando:
- Arquitetura de sistemas complexos
- Refatoração de código legacy
- Análise de trade-offs técnicos
- Design de APIs públicas

Para tarefas simples (componentes, utils, testes), Sonnet é suficiente.
