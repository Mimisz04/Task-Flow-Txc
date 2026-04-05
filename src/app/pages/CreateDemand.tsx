import { useState } from "react";
import { useNavigate } from "react-router";
import { Save, ArrowLeft } from "lucide-react";
import { responsibles } from "../data/mockData";

export function CreateDemand() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    responsible: '',
    client: '',
    priority: 'Média' as 'Baixa' | 'Média' | 'Alta',
    orderNumber: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const demandTypes = [
    'Reembolso',
    'Furo de Estoque',
    'Troca',
    'Cancelamento',
    'Dúvida',
    'Outro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demanda criada com sucesso! (Esta é uma versão demo com dados mockados)');
    navigate('/kanban');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Dashboard
      </button>

      <div className="bg-white rounded-2xl border border-border p-8">
        <h1 className="mb-2">Nova Demanda</h1>
        <p className="text-muted-foreground mb-8">
          Preencha os dados para criar uma nova demanda
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Tipo de Demanda *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Selecione o tipo</option>
                {demandTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Responsável *</label>
              <select
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Selecione o responsável</option>
                {responsibles.map(resp => (
                  <option key={resp.name} value={resp.name}>{resp.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Nome do Cliente *</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="Nome completo"
                className="w-full px-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Prioridade *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Número do Pedido *</label>
              <input
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                placeholder="#12345"
                className="w-full px-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Data *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Descrição *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva os detalhes da demanda..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-opacity"
            >
              <Save className="w-5 h-5" />
              Criar Demanda
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl border border-input hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
