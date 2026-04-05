import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockDemands, getCategoryColor, type Demand } from "../data/mockData";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getDemandsByDate = (day: number | null): Demand[] => {
    if (!day) return [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];

    return mockDemands.filter(d => d.date === dateStr);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const days = getDaysInMonth(currentDate);

  const getDateString = (day: number | null) => {
    if (!day) return '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const selectedDemands = selectedDate
    ? mockDemands.filter(d => d.date === selectedDate)
    : [];

  return (
    <div className="p-8 h-full flex gap-8">
      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <h1>Calendário</h1>
          <p className="text-muted-foreground">Visualize os prazos das demandas</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 flex-1 flex flex-col">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 flex-1">
            {days.map((day, index) => {
              const demands = getDemandsByDate(day);
              const dateStr = getDateString(day);
              const isSelected = selectedDate === dateStr;
              const isToday = day &&
                new Date().toDateString() ===
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

              return (
                <div
                  key={index}
                  onClick={() => day && setSelectedDate(dateStr)}
                  className={`
                    relative aspect-square rounded-xl border transition-all
                    ${day ? 'cursor-pointer hover:border-primary' : 'border-transparent'}
                    ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}
                    ${isToday && !isSelected ? 'bg-muted/50' : ''}
                  `}
                >
                  {day && (
                    <>
                      <div className={`
                        absolute top-2 right-2 text-sm
                        ${isToday ? 'font-bold text-primary' : ''}
                      `}>
                        {day}
                      </div>

                      {demands.length > 0 && (
                        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                          {demands.slice(0, 3).map((demand, idx) => (
                            <div
                              key={idx}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: getCategoryColor(demand.category) }}
                              title={demand.type}
                            />
                          ))}
                          {demands.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{demands.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm font-medium mb-3">Legenda</div>
            <div className="flex flex-wrap gap-4">
              {['Reembolso', 'Furo de Estoque', 'Troca', 'Cancelamento', 'Dúvida'].map(category => (
                <div key={category} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  />
                  <span className="text-sm">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Demands for Selected Date */}
      {selectedDate && (
        <div className="w-80 bg-white rounded-2xl border border-border p-6 overflow-y-auto">
          <h3 className="mb-4">
            Demandas - {new Date(selectedDate).toLocaleDateString('pt-BR')}
          </h3>

          {selectedDemands.length > 0 ? (
            <div className="space-y-3">
              {selectedDemands.map(demand => (
                <div
                  key={demand.id}
                  className="p-4 rounded-xl border border-border hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCategoryColor(demand.category) }}
                    />
                    <span className="font-medium">{demand.type}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Cliente: {demand.client}
                  </div>
                  <div className="text-sm font-mono text-muted-foreground mb-2">
                    {demand.orderNumber}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2 py-1 rounded-full text-xs"
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
                    <span className="text-xs text-muted-foreground">
                      {demand.responsible}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Nenhuma demanda nesta data
            </div>
          )}
        </div>
      )}
    </div>
  );
}
