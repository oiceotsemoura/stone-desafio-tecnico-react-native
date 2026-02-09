# 🔐 Teste Técnico - Revenda Stone

Este projeto demonstra a implementação de autenticação biométrica em um aplicativo mobile de e-commerce, com foco em boas práticas de arquitetura, segurança e experiência do usuário.

---

## 📦 Módulos

### 🔐 Auth

Módulo de autenticação organizado em submódulos independentes:

#### Screens (`auth/screens`)

**Biometric Login** (`auth/screens/biometric-login`)

- **Autenticação biométrica** (Face ID / Touch ID / Digital)
- **Fallback para login manual** com email e senha
- **Validação de formulário** via Zod

**Register** (`auth/screens/register`)

- **Registro de novos usuários** com email, nome completo e senha
- **Validação completa** via Zod:
  - Email válido
  - Nome com mínimo 3 caracteres (apenas letras)
  - Senha com mínimo 6 caracteres (deve conter letra maiúscula, minúscula e número)
  - Confirmação de senha
- **Armazenamento seguro** usando expo-secure-store
- **Validação de email único** (não permite emails duplicados)

#### Services (`auth/services`)

- **AuthService**: Gerencia login e autenticação biométrica
- **BiometricService**: Integração com APIs nativas de biometria
- **UserService**: CRUD de usuários com armazenamento seguro
- **Autenticação dinâmica** contra usuários cadastrados (não usa mais credenciais hardcoded)

#### Store (`auth/store`)

- **useAuthStore**: Estado global de autenticação (Zustand)
- Gerencia sessão, dados do usuário e configurações de biometria

### 🛍️ Products

Módulo de consumo de lista de produtos com:

- Requisições simuladas (mock API)
- Filtros por categoria, preço e disponibilidade
- Busca por texto
- Paginação
- Pull-to-refresh

[Ver documentação completa do módulo →](src/modules/products/README.md)

---

### Pré-requisitos

- Node.js / Yarn ou npm
- Ambiente configurado para desenvolvimento mobile
- Android Studio e/ou Xcode

### Instalação/Execução

- Precisa estar com emulador ou telefone fisico conectado ao computador para teste de biometria

```bash
yarn
yarn run start
```

### Funcionalidades Implementadas

- ✅ Autenticação biométrica (Face ID / Touch ID / Digital)
- ✅ Fallback para autenticação manual
- ✅ **Sistema de cadastro de usuários** com validação completa (email, nome completo, senha)
- ✅ **Armazenamento seguro de usuários** com expo-secure-store
- ✅ **Validação de senha** (mínimo 6 caracteres, letra maiúscula, minúscula e número)
- ✅ **Persistência local de dados por usuário** (AsyncStorage):
  - **Sessão de usuário**: Permanece logado até fazer logout explicito
  - Carrinho de compras persistido por usuário
  - Histórico de pedidos separado por usuário (inicia vazio para novos usuários)
  - Tema do app (claro/escuro) persistido globalmente
  - Dados restaurados automaticamente no login/inicialização
- ✅ Tratamento de erros (401 / 500)
- ✅ Feedback visual ao usuário
- ✅ Mudança de temas (claro/escuro)
- ✅ Logout
- ✅ **Bottom Tabs Navigation** (Home, Pedidos, Configurações)
- ✅ **Módulo de produtos** com listagem, filtros e paginação
- ✅ **Carrinho de compras** com cálculo automático
- ✅ **Checkout com validação de cartão** (Algoritmo de Luhn, validação de CVV e vencimento)
- ✅ **Histórico de pedidos** com filtros por status
- ✅ **Tela de configurações** com controles de tema e conta

### Persistência de Dados

O app simula um backend completo com armazenamento local:

**Sessão:**

- Usuário permanece logado entre sessões do app
- Logout explícito necessário para encerrar sessão
- Restauração automática ao iniciar o app

**Por usuário (isolado):**

- Carrinho de compras mantém itens entre sessões
- Histórico de pedidos exclusivo de cada usuário
- Novos usuários começam com histórico vazio
- Dados preservados mesmo após logout

**Global:**

- Preferência de tema (claro/escuro) compartilhada

**Tecnologias:**

- `AsyncStorage` para dados não sensíveis (carrinho, pedidos, tema)
- `SecureStore` para credenciais, sessão e dados de autenticação

### Melhorias Futuras

- Cobertura maior de testes

- Implementação de teste de integração para validar json da api

- Implementação de teste e2e nos fluxos críticos

- Implementação de design system para reutilização de componentes

- Criação de um tema mais robustos com todos design tokens do figma

- Separação de tela de Login genérica e serviços de biometria

### Tempo gasto

- Planejamento e arquitetura: 10 minutos

- Implementação: 4 horas

- Ajustes e testes: 30 minutos
