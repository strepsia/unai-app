import { useState } from "react";
import { motion } from "framer-motion";
import HeaderBar from "@/components/HeaderBar";
import Flag from "@/components/Flag";
import { CALENDAR_2026, DRIVERS_2026, isRacePast } from "@/data/f1Data";

const Results = () => {
  const predictions = JSON.parse(localStorage.getItem("predictions") || "{}");
  const racesWithPrediction = CALENDAR_2026.filter((r) => !!predictions[r.id]);
  const [selectedRaceId, setSelectedRaceId] = useState(
    racesWithPrediction[racesWithPrediction.length - 1]?.id
  );

  const selectedRace = CALENDAR_2026.find((r) => r.id === selectedRaceId);
  const prediction = selectedRaceId ? predictions[selectedRaceId] : null;

  // For now we simulate "actual results" as a shuffled version for finished races
  // In production this would come from the Jolpica API
  const getMockActual = (raceId: number): number[] | null => {
    if (!isRacePast(CALENDAR_2026.find((r) => r.id === raceId)!)) return null;
    // Deterministic shuffle based on raceId for demo
    const seed = raceId * 7;
    const drivers = [...DRIVERS_2026].sort((a, b) => ((a.id * seed) % 23) - ((b.id * seed) % 23));
    return drivers.slice(0, 10).map((d) => d.id);
  };

  const actualResult = selectedRaceId ? getMockActual(selectedRaceId) : null;

  const getDriverById = (id: number) => DRIVERS_2026.find((d) => d.id === id);

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderBar title="Resultados" />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Race selector */}
        {racesWithPrediction.length > 0 ? (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {racesWithPrediction.map((race) => (
                <button
                  key={race.id}
                  onClick={() => setSelectedRaceId(race.id)}
                  className={`flex items-center gap-1.5 font-mono text-[10px] tracking-wider px-3 py-1.5 rounded whitespace-nowrap border transition-colors ${
                    selectedRaceId === race.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border"
                  }`}
                >
                  <Flag country={race.country} className="w-4 h-3" />
                  R{race.round}
                </button>
              ))}
            </div>

            {prediction && (
              <>
                {/* Score summary */}
                {actualResult && (
                  <div className="bg-card rounded border border-border p-4 text-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      PUNTOS OBTENIDOS
                    </span>
                    <p className="font-mono text-3xl font-bold text-primary mt-1">
                      +{calculateScore(prediction.prediction, actualResult)}
                    </p>
                  </div>
                )}

                {/* Split comparison */}
                <div className="bg-card rounded border border-border p-3">
                  {actualResult ? (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground text-center">
                          TU PREDICCIÓN
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground text-center">
                          RESULTADO REAL
                        </span>
                      </div>

                      <div className="space-y-1">
                        {Array.from({ length: 10 }).map((_, index) => {
                          const predDriverId = prediction.prediction[index];
                          const actualDriverId = actualResult[index];
                          const predDriver = getDriverById(predDriverId);
                          const actualDriver = getDriverById(actualDriverId);
                          const isExactMatch = predDriverId === actualDriverId;
                          const predInTop10 = actualResult.includes(predDriverId);

                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="grid grid-cols-[1fr_auto_1fr] items-center gap-1"
                            >
                              {/* Prediction side */}
                              <div
                                className={`flex items-center gap-1.5 rounded px-2 py-1.5 ${
                                  isExactMatch
                                    ? "bg-accent/10 border border-accent/30"
                                    : predInTop10
                                    ? "bg-secondary"
                                    : "bg-destructive/10 border border-destructive/20"
                                }`}
                              >
                                {predDriver && (
                                  <>
                                    <div
                                      className="w-1 h-3 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: predDriver.teamColor }}
                                    />
                                    <span className="font-mono text-[11px] font-semibold text-foreground">
                                      {predDriver.code}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Position */}
                              <span className={`font-mono text-[10px] w-7 text-center ${
                                isExactMatch ? "text-accent font-bold" : "text-muted-foreground"
                              }`}>
                                P{String(index + 1).padStart(2, "0")}
                              </span>

                              {/* Actual side */}
                              <div className="flex items-center gap-1.5 rounded px-2 py-1.5 bg-background">
                                {actualDriver && (
                                  <>
                                    <div
                                      className="w-1 h-3 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: actualDriver.teamColor }}
                                    />
                                    <span className="font-mono text-[11px] font-semibold text-foreground">
                                      {actualDriver.code}
                                    </span>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border justify-center">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-[9px] text-muted-foreground">Exacto (+25)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-secondary" />
                          <span className="text-[9px] text-muted-foreground">En Top 10</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-destructive" />
                          <span className="text-[9px] text-muted-foreground">Fallado</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* No actual results yet — just show prediction */
                    <>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
                        Tu predicción ({selectedRace?.name})
                      </span>
                      <div className="space-y-1">
                        {prediction.prediction.map((driverId: number, i: number) => {
                          const driver = getDriverById(driverId);
                          if (!driver) return null;
                          return (
                            <div key={i} className="flex items-center gap-2 bg-background rounded px-2 py-1.5">
                              <span className="font-mono text-[10px] text-muted-foreground w-5">
                                P{String(i + 1).padStart(2, "0")}
                              </span>
                              <div className="w-1 h-3 rounded-full" style={{ backgroundColor: driver.teamColor }} />
                              <span className="font-mono text-[11px] font-semibold text-foreground flex-1">{driver.code}</span>
                              <span className="font-mono text-[10px] text-muted-foreground">#{driver.number}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground text-center mt-3">
                        Resultados pendientes — se compararán cuando termine la carrera
                      </p>
                    </>
                  )}

                  {/* Bonus display */}
                  {(prediction.polePosition || prediction.fastestLap) && (
                    <div className="mt-3 pt-3 border-t border-border flex gap-3">
                      {prediction.polePosition && (
                        <p className="font-mono text-[10px] text-muted-foreground">
                          🏁 Pole: <span className="text-foreground font-semibold">{getDriverById(prediction.polePosition)?.code}</span>
                        </p>
                      )}
                      {prediction.fastestLap && (
                        <p className="font-mono text-[10px] text-muted-foreground">
                          ⚡ V.R: <span className="text-foreground font-semibold">{getDriverById(prediction.fastestLap)?.code}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">No hay predicciones aún</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">
                Haz tu primera predicción para ver resultados aquí
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Scoring
const calculateScore = (prediction: number[], actual: number[]): number => {
  let score = 0;
  prediction.forEach((driverId, i) => {
    const actualIdx = actual.indexOf(driverId);
    if (actualIdx === -1) return;
    const diff = Math.abs(i - actualIdx);
    if (diff === 0) score += 25;
    else if (diff === 1) score += 18;
    else if (diff === 2) score += 12;
    else if (diff === 3) score += 8;
    else score += 4;
  });
  return score;
};

export default Results;
