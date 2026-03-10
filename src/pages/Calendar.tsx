import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import Flag from "@/components/Flag";
import { CALENDAR_2026, formatDate, isRacePast, getNextRace } from "@/data/f1Data";

const Calendar = () => {
  const navigate = useNavigate();
  const nextRace = getNextRace();
  const predictions = JSON.parse(localStorage.getItem("predictions") || "{}");

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderBar title="Carreras" />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-1">
        {CALENDAR_2026.map((race) => {
          const isPast = isRacePast(race);
          const isNext = nextRace?.id === race.id;
          const hasPrediction = !!predictions[race.id];

          return (
            <button
              key={race.id}
              onClick={() => navigate(`/predict/${race.id}`)}
              className={`w-full flex items-center gap-3 p-3 rounded border transition-colors relative ${
                isNext
                  ? "bg-card border-primary"
                  : isPast
                  ? "bg-card/50 border-border opacity-50"
                  : "bg-card border-border hover:border-muted-foreground"
              }`}
            >
              {isNext && <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary rounded-t" />}

              <span className={`font-mono text-sm font-bold w-7 text-center ${
                isNext ? "text-primary" : "text-muted-foreground"
              }`}>
                {race.round}
              </span>

              <Flag country={race.country} className="w-10 h-7" />

              <div className="flex-1 text-left">
                <h3 className={`font-mono text-xs font-bold tracking-tight ${
                  isPast ? "text-muted-foreground" : "text-foreground"
                }`}>
                  {race.name}
                </h3>
                <p className="font-mono text-[10px] text-muted-foreground">{race.circuit}</p>
              </div>

              <div className="text-right">
                <p className={`font-mono text-[10px] font-bold ${
                  isNext ? "text-primary" : "text-muted-foreground"
                }`}>
                  {formatDate(race.date)}
                </p>
                {hasPrediction && (
                  <span className="flex items-center gap-0.5 text-accent font-mono text-[9px] justify-end mt-0.5">
                    <Check size={10} /> Predicho
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
