export interface Demand {
  id: string;
  type: string;
  responsible: string;
  client: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  orderNumber: string;
  date: string;
  description: string;
  status: 'A Fazer' | 'Em Andamento' | 'Concluído';
  category: 'Reembolso' | 'Furo de Estoque' | 'Troca' | 'Cancelamento' | 'Dúvida';
}

export const mockDemands: Demand[] = [
  {
    id: '1',
    type: 'Reembolso',
    responsible: 'Maria Silva',
    client: 'João Santos',
    priority: 'Alta',
    orderNumber: '#12345',
    date: '2026-04-05',
    description: 'Cliente solicitou reembolso por produto com defeito. Item não corresponde à descrição do site.',
    status: 'A Fazer',
    category: 'Reembolso'
  },
  {
    id: '2',
    type: 'Furo de Estoque',
    responsible: 'Pedro Costa',
    client: 'Ana Oliveira',
    priority: 'Média',
    orderNumber: '#12346',
    date: '2026-04-07',
    description: 'Produto fora de estoque após confirmação do pedido. Necessário contato com fornecedor.',
    status: 'Em Andamento',
    category: 'Furo de Estoque'
  },
  {
    id: '3',
    type: 'Troca',
    responsible: 'Carla Souza',
    client: 'Roberto Lima',
    priority: 'Baixa',
    orderNumber: '#12347',
    date: '2026-04-10',
    description: 'Cliente deseja trocar tamanho do produto. Tamanho M por tamanho G.',
    status: 'Concluído',
    category: 'Troca'
  },
  {
    id: '4',
    type: 'Cancelamento',
    responsible: 'Maria Silva',
    client: 'Fernanda Costa',
    priority: 'Alta',
    orderNumber: '#12348',
    date: '2026-04-06',
    description: 'Cliente solicitou cancelamento dentro do prazo de arrependimento.',
    status: 'Em Andamento',
    category: 'Cancelamento'
  },
  {
    id: '5',
    type: 'Dúvida',
    responsible: 'Pedro Costa',
    client: 'Carlos Mendes',
    priority: 'Baixa',
    orderNumber: '#12349',
    date: '2026-04-08',
    description: 'Cliente com dúvidas sobre prazo de entrega e rastreamento do pedido.',
    status: 'A Fazer',
    category: 'Dúvida'
  },
  {
    id: '6',
    type: 'Reembolso',
    responsible: 'Carla Souza',
    client: 'Paula Ferreira',
    priority: 'Alta',
    orderNumber: '#12350',
    date: '2026-04-12',
    description: 'Produto chegou danificado durante o transporte. Cliente enviou fotos comprobatórias.',
    status: 'A Fazer',
    category: 'Reembolso'
  },
  {
    id: '7',
    type: 'Troca',
    responsible: 'Maria Silva',
    client: 'Lucas Alves',
    priority: 'Média',
    orderNumber: '#12351',
    date: '2026-04-15',
    description: 'Troca de cor do produto. Cliente recebeu cor errada.',
    status: 'Em Andamento',
    category: 'Troca'
  },
  {
    id: '8',
    type: 'Furo de Estoque',
    responsible: 'Pedro Costa',
    client: 'Beatriz Santos',
    priority: 'Alta',
    orderNumber: '#12352',
    date: '2026-04-18',
    description: 'Sistema não atualizou estoque corretamente. Produto vendido sem disponibilidade.',
    status: 'A Fazer',
    category: 'Furo de Estoque'
  }
];

export const responsibles = [
  { name: 'Maria Silva', avatar: 'MS', color: '#2D1B69' },
  { name: 'Pedro Costa', avatar: 'PC', color: '#6f42c1' },
  { name: 'Carla Souza', avatar: 'CS', color: '#17a2b8' }
];

export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Reembolso': '#dc3545',
    'Furo de Estoque': '#ffc107',
    'Troca': '#28a745',
    'Cancelamento': '#fd7e14',
    'Dúvida': '#17a2b8'
  };
  return colors[category] || '#6c757d';
};

export const getPriorityColor = (priority: string) => {
  const colors: { [key: string]: string } = {
    'Alta': '#dc3545',
    'Média': '#ffc107',
    'Baixa': '#28a745'
  };
  return colors[priority] || '#6c757d';
};

export const getResponsibleData = (name: string) => {
  return responsibles.find(r => r.name === name) || responsibles[0];
};
