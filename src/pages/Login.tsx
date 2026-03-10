import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Completa todos los campos");
      return;
    }
    if (isRegister && !form.email) {
      setError("El email es requerido");
      return;
    }

    setLoading(true);
    setError("");

    if (isRegister) {
      const result = await register(form.username, form.email, form.password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Error al registrar");
      }
    } else {
      const result = await login(form.username, form.password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-destructive/20 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🏎️</div>
        <h1 className="font-mono text-4xl font-bold text-foreground mb-2">Grid Control</h1>
        <p className="text-muted-foreground">Predice. Compite. Gana.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full p-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
        />
        {isRegister && (
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
        )}
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
        />

        {error && <p className="text-destructive text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-4 bg-primary text-primary-foreground font-mono font-bold rounded-xl hover:opacity-90 transition shadow-lg uppercase tracking-wider disabled:opacity-50"
        >
          {loading ? "Cargando..." : isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
          className="w-full p-3 text-muted-foreground hover:text-foreground transition"
        >
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
      </form>
    </div>
  );
};

export default Login;
