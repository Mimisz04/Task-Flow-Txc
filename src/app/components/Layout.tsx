import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, ClipboardList, KanbanSquare, Calendar, LogOut, Search, User } from "lucide-react";
import { useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('taskflow-logged-in');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('taskflow-logged-in');
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ClipboardList, label: 'Demandas', path: '/demandas/nova' },
    { icon: KanbanSquare, label: 'Kanban', path: '/kanban' },
    { icon: Calendar, label: 'Calendário', path: '/calendario' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-20 bg-primary flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
          <span className="font-bold text-primary">TXC</span>
        </div>

        <nav className="flex flex-col gap-4 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-white text-primary'
                    : 'text-white hover:bg-sidebar-accent'
                }`}
                title={item.label}
              >
                <Icon className="w-6 h-6" />
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white hover:bg-sidebar-accent transition-all"
          title="Sair"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar demandas..."
              className="flex-1 outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-medium">Admin TXC</div>
              <div className="text-sm text-muted-foreground">admin@txc.com</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
