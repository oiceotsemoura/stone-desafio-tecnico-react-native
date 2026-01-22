# 🔐 Biometric Login – Teste Técnico

Este projeto demonstra a implementação de autenticação biométrica em um aplicativo mobile, com foco em boas práticas de arquitetura, segurança e experiência do usuário.

---

## 🧠 Decisões Técnicas

- A arquitetura escolhida foi prédefinida pelo desafio técnico, escolhas como quais bibliotecas usar, organização de pastas e padrões foram escolhidas préviamente para poder ver a capacidade de seguir padroes arquiteturais.
- As únicas coisas que foram adicionadas foram a pasta de temas(theme) e os testes das funcionalidades de biometria, teste da tela home e teste da logica de negócio de autenticação.

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js / Yarn ou npm
- Ambiente configurado para desenvolvimento mobile
- Android Studio e/ou Xcode

### Instalação

- Precisa estar com emulador ou telefone fisico conectado ao computador para teste de biometria

```bash
yarn
yarn run android
```

### Funcionalidades Implementadas

- Autenticação biométrica (Face ID / Touch ID / Digital)

- Fallback para autenticação manual

- Tratamento de erros (401 / 500)

- Feedback visual ao usuário

- Tela home com mudança de temas

- Logout

### Melhorias Futuras

- Cobertura maior de testes

- Implementação de teste de integração para validar json da api

- Implementação de teste e2e nos fluxos críticos

- Implementação de design system para reutilização de componentes

- Salvar email do usuário ao fazer logout

- Criação de um tema mais robustos com todos design tokens do figma

- Separação de tela de Login genérica e serviços de biometria

### Tempo gasto

- Planejamento e arquitetura: 10 minutos

- Implementação: 4 horas

- Ajustes e testes: 30 minutos
