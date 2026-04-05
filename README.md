# TaskFlow TXC

Sistema de gerenciamento de demandas internas para e-commerce com design moderno em estilo SaaS.

## 🚀 Funcionalidades

- **Tela de Login**: Autenticação com design moderno em roxo escuro
- **Dashboard**: Visão geral com estatísticas de demandas (Total, Em Andamento, Concluídas, Urgentes)
- **Criar Demanda**: Formulário completo para registro de novas demandas
- **Quadro Kanban**: Visualização em colunas (A Fazer, Em Andamento, Concluído) com modal de detalhes
- **Calendário**: Visualização mensal com marcações coloridas por categoria de demanda

## 🎨 Design

- **Paleta de Cores**: Roxo Escuro (#2D1B69), Branco e Cinza Claro
- **Estilo**: SaaS moderno com elementos arredondados
- **UI Components**: Shadcn/UI com Tailwind CSS v4

## 🛠️ Tecnologias

- React 19
- TypeScript
- React Router
- Tailwind CSS v4
- Vite
- Lucide React (ícones)

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

## 📋 Estrutura do Projeto

```
src/
├── app/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CreateDemand.tsx
│   │   ├── Kanban.tsx
│   │   └── Calendar.tsx
│   ├── data/           # Dados mockados
│   ├── routes.tsx      # Configuração de rotas
│   └── App.tsx         # Componente principal
├── styles/             # Estilos globais e temas
└── imports/            # Assets e imagens
```

## 🎯 Categorias de Demandas

- **Reembolso** (Vermelho)
- **Furo de Estoque** (Amarelo)
- **Troca** (Verde)
- **Cancelamento** (Laranja)
- **Dúvida** (Azul)

## 💾 Persistência de Dados

Atualmente o sistema utiliza dados mockados em memória. Para implementar persistência real:

- Conecte o Supabase através da página de configurações do Make
- Permite salvar demandas permanentemente
- Implementa autenticação real de usuários
- Sincroniza dados entre sessões

## 📝 Licença

© 2026 TaskFlow TXC. Todos os direitos reservados.

## 👩‍💻 Desenvolvido por

Yasmin Ribeiro Ferreira
