import { useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, Trophy, Users, ShoppingBag } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", icon: Home, label: "INICIO" },
  { path: "/calendar", icon: Calendar, label: "CARRERAS" },
  { path: "/leaderboard", icon: Trophy, label: "RANKING" },
  { path: "/leagues", icon: Users, label: "LIGAS" },
  { path: "/store", icon: ShoppingBag, label: "TIENDA" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on prediction detail pages
  if (location.pathname.startsWith("/predict/") || location.pathname === "/login") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="font-mono text-[9px] tracking-widest">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
