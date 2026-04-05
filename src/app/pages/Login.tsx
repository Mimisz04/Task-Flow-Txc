import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('taskflow-logged-in', 'true');
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="flex-1 bg-primary p-12 flex flex-col justify-between text-white">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8">
            <span className="text-2xl font-bold text-primary">TXC</span>
          </div>
          <h1 className="text-4xl mb-4">Bem-vindo ao TaskFlow TXC</h1>
          <p className="text-lg opacity-90">
            Sistema de gerenciamento de demandas para e-commerce
          </p>
        </div>

        <p className="text-sm opacity-75">
          © 2026 TaskFlow TXC. Todos os direitos reservados.
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl mb-2">Entrar</h2>
          <p className="text-muted-foreground mb-8">
            Faça login para acessar o sistema
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-input-background outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">Lembrar-me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-opacity"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
