import { ClipboardList, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { mockDemands, getCategoryColor } from "../data/mockData";

export function Dashboard() {
  const totalDemands = mockDemands.length;
  const inProgress = mockDemands.filter(d => d.status === 'Em Andamento').length;
  const completed = mockDemands.filter(d => d.status === 'Concluído').length;
  const urgent = mockDemands.filter(d => d.priority === 'Alta').length;

  const latestDemands = mockDemands.slice(0, 5);

  const stats = [
    {
      icon: ClipboardList,
      label: 'Total de Demandas',
      value: totalDemands,
      color: '#2D1B69',
      bgColor: '#f0ecf9'
    },
    {
      icon: Clock,
      label: 'Em Andamento',
      value: inProgress,
      color: '#ffc107',
      bgColor: '#fff9e6'
    },
    {
      icon: CheckCircle2,
      label: 'Concluídas',
      value: completed,
      color: '#28a745',
      bgColor: '#e8f5e9'
    },
    {
      icon: AlertCircle,
      label: 'Urgentes',
      value: urgent,
      color: '#dc3545',
      bgColor: '#fdeaea'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas demandas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Latest Demands Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3>Últimas Demandas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Tipo
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Cliente
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Pedido
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Prioridade
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Responsável
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {latestDemands.map((demand) => (
                <tr key={demand.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getCategoryColor(demand.category) }}
                      />
                      <span>{demand.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{demand.client}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm">{demand.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor:
                          demand.priority === 'Alta'
                            ? '#fdeaea'
                            : demand.priority === 'Média'
                            ? '#fff9e6'
                            : '#e8f5e9',
                        color:
                          demand.priority === 'Alta'
                            ? '#dc3545'
                            : demand.priority === 'Média'
                            ? '#f59e0b'
                            : '#28a745'
                      }}
                    >
                      {demand.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor:
                          demand.status === 'Concluído'
                            ? '#e8f5e9'
                            : demand.status === 'Em Andamento'
                            ? '#fff9e6'
                            : '#f0ecf9',
                        color:
                          demand.status === 'Concluído'
                            ? '#28a745'
                            : demand.status === 'Em Andamento'
                            ? '#f59e0b'
                            : '#2D1B69'
                      }}
                    >
                      {demand.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{demand.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
