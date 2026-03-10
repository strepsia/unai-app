import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Zap } from "lucide-react";
import promoBanner from "@/assets/promo-banner-revolut.jpg";
import HeaderBar from "@/components/HeaderBar";
import { CALENDAR_2026, USER_DATA, getNextRace, isRacePast } from "@/data/f1Data";

const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
};

const Index = () => {
  const navigate = useNavigate();
  const nextRace = getNextRace();
  const completedRaces = CALENDAR_2026.filter((r) => isRacePast(r)).length;
  const countdown = useCountdown(nextRace?.date || "");

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderBar title="Grid Control" />

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        {/* Status card */}
        <div className="bg-card rounded border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Estado del piloto
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              TEMPORADA 2026
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-mono text-2xl font-bold text-primary">
                {USER_DATA.tokens}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">TOKENS</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">
                #{USER_DATA.rank}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">RANKING</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-accent">
                {USER_DATA.totalPredictions}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">CARRERAS</p>
            </div>
          </div>
        </div>

        {/* Next race */}
        {nextRace && (
          <button
            onClick={() => navigate(`/predict/${nextRace.id}`)}
            className="w-full bg-card rounded border border-border p-4 text-left group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-primary" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  PREDICCIÓN ABIERTA
                </span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h2 className="font-mono text-lg font-bold text-foreground mb-1">
              {nextRace.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              {nextRace.circuit} — {new Date(nextRace.date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
              })}
            </p>

            {/* Countdown */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                { val: countdown.days, label: "DÍAS" },
                { val: countdown.hours, label: "HRS" },
                { val: countdown.mins, label: "MIN" },
                { val: countdown.secs, label: "SEG" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center bg-background rounded p-2">
                  <p className="font-mono text-lg font-bold text-primary">{String(val).padStart(2, "0")}</p>
                  <p className="font-mono text-[8px] text-muted-foreground tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 bg-primary/10 rounded px-3 py-2">
              <span className="font-mono text-xs text-primary font-medium">
                → ENVIAR PREDICCIÓN
              </span>
            </div>
          </button>
        )}

        {/* Promo Banner */}
        <button
          className="w-full rounded border border-border overflow-hidden text-left group hover:border-primary/30 transition-colors relative"
          onClick={() => {/* link to promo */}}
        >
          <img
            src={promoBanner}
            alt="Reto Audi Revolut"
            className="w-full h-36 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase block mb-1">
              RETO PATROCINADO
            </span>
            <h3 className="font-mono text-sm font-bold text-foreground leading-tight">
              Reto Audi × Revolut
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              Crea una cuenta Revolut antes del 20 de Marzo y gana{" "}
              <span className="text-primary font-bold">+1000 puntos</span>
            </p>
          </div>
        </button>

        {/* Season progress with F1 car */}
        <div className="bg-card rounded border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Progreso Temporada
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {completedRaces}/{CALENDAR_2026.length}
            </span>
          </div>
          <div className="relative pt-4 pb-1">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all"
                style={{ width: `${(completedRaces / CALENDAR_2026.length) * 100}%` }}
              />
            </div>
            {/* F1 car at progress tip */}
            <div
              className="absolute top-0 transition-all"
              style={{ left: `calc(${Math.max(3, (completedRaces / CALENDAR_2026.length) * 100)}% - 12px)` }}
            >
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                <path d="M1 9h20l-2-4h-4l-2-3H8L6 5H3L1 9z" fill="hsl(var(--primary))" />
                <path d="M9 3.5l1.5-1.5h2L14 3.5H9z" fill="hsl(var(--background))" opacity="0.5" />
                <circle cx="6" cy="11" r="2" fill="hsl(var(--foreground))" />
                <circle cx="6" cy="11" r="0.8" fill="hsl(var(--muted))" />
                <circle cx="17" cy="11" r="2" fill="hsl(var(--foreground))" />
                <circle cx="17" cy="11" r="0.8" fill="hsl(var(--muted))" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;