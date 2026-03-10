import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { USER_DATA } from "@/data/f1Data";

interface HeaderBarProps {
  title: string;
}

const HeaderBar = ({ title }: HeaderBarProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <h1 className="font-mono text-sm font-bold tracking-widest uppercase text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary font-semibold">
            {USER_DATA.tokens} TKN
          </span>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <User size={14} className="text-muted-foreground" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-9 z-50 bg-card border border-border rounded shadow-lg min-w-[160px]">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      {USER_DATA.name}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 font-mono text-xs text-destructive hover:bg-secondary transition-colors"
                  >
                    <LogOut size={13} />
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
