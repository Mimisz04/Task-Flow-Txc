import { useState } from "react";
import { X, Calendar, User, Hash, AlertCircle } from "lucide-react";
import { mockDemands, getCategoryColor, getResponsibleData, type Demand } from "../data/mockData";

export function Kanban() {
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);

  const columns = [
    { id: 'A Fazer', title: 'A Fazer', color: '#2D1B69' },
    { id: 'Em Andamento', title: 'Em Andamento', color: '#ffc107' },
    { id: 'Concluído', title: 'Concluído', color: '#28a745' }
  ];

  const getDemandsByStatus = (status: string) => {
    return mockDemands.filter(d => d.status === status);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1>Quadro Kanban</h1>
        <p className="text-muted-foreground">Acompanhe o andamento das demandas</p>
      </div>

      <div className="flex gap-6 flex-1 overflow-x-auto pb-4">
        {columns.map(column => {
          const demands = getDemandsByStatus(column.id);
          return (
            <div key={column.id} className="flex-1 min-w-[320px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <h3>{column.title}</h3>
                <span className="px-2 py-1 rounded-full bg-muted text-sm">
                  {demands.length}
                </span>
              </div>

              <div className="flex-1 bg-muted/30 rounded-2xl p-4 space-y-3 overflow-y-auto">
                {demands.map(demand => {
                  const responsible = getResponsibleData(demand.responsible);
                  return (
                    <div
                      key={demand.id}
                      onClick={() => setSelectedDemand(demand)}
                      className="bg-white rounded-xl p-4 border border-border cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getCategoryColor(demand.category) }}
                          />
                          <span className="font-medium">{demand.type}</span>
                        </div>
                        {demand.priority === 'Alta' && (
                          <AlertCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Cliente: <span className="text-foreground">{demand.client}</span>
                        </div>
                        <div className="text-sm font-mono text-muted-foreground">
                          {demand.orderNumber}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white"
                          style={{ backgroundColor: responsible.color }}
                          title={demand.responsible}
                        >
                          {responsible.avatar}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(demand.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {demands.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Nenhuma demanda
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Detalhes */}
      {selectedDemand && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedDemand(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2>Detalhes da Demanda</h2>
              <button
                onClick={() => setSelectedDemand(null)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getCategoryColor(selectedDemand.category) }}
                />
                <h3>{selectedDemand.type}</h3>
                <span
                  className="px-3 py-1 rounded-full text-sm ml-auto"
                  style={{
                    backgroundColor:
                      selectedDemand.priority === 'Alta'
                        ? '#fdeaea'
                        : selectedDemand.priority === 'Média'
                        ? '#fff9e6'
                        : '#e8f5e9',
                    color:
                      selectedDemand.priority === 'Alta'
                        ? '#dc3545'
                        : selectedDemand.priority === 'Média'
                        ? '#f59e0b'
                        : '#28a745'
                  }}
                >
                  {selectedDemand.priority}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Cliente
                  </div>
                  <div>{selectedDemand.client}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Pedido
                  </div>
                  <div className="font-mono">{selectedDemand.orderNumber}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Responsável
                  </div>
                  <div>{selectedDemand.responsible}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data
                  </div>
                  <div>{new Date(selectedDemand.date).toLocaleDateString('pt-BR')}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Descrição</div>
                <div className="bg-muted/30 rounded-xl p-4">
                  {selectedDemand.description}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-3">Histórico de Status</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Demanda criada</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(selectedDemand.date).toLocaleDateString('pt-BR')} às 10:00
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Status inicial: A Fazer
                      </div>
                    </div>
                  </div>

                  {selectedDemand.status !== 'A Fazer' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Em Andamento</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(selectedDemand.date).toLocaleDateString('pt-BR')} às 14:30
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Atribuído a {selectedDemand.responsible}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDemand.status === 'Concluído' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Concluído</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(selectedDemand.date).toLocaleDateString('pt-BR')} às 16:45
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Demanda finalizada com sucesso
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
