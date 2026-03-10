import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Lock, GripVertical, X, ArrowLeft, Check } from "lucide-react";
import { DRIVERS_2026, CALENDAR_2026 } from "@/data/f1Data";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const Predict = () => {
  const { raceId } = useParams<{ raceId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const race = CALENDAR_2026.find((r) => r.id === Number(raceId));

  const [selected, setSelected] = useState<number[]>([]);
  const [polePosition, setPolePosition] = useState<number | null>(null);
  const [fastestLap, setFastestLap] = useState<number | null>(null);
  const [showPoleModal, setShowPoleModal] = useState(false);
  const [showFastestModal, setShowFastestModal] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load existing prediction from Supabase
  useEffect(() => {
    const loadPrediction = async () => {
      if (!user || !raceId) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .eq('race_id', Number(raceId))
        .single();

      if (data) {
        setSelected(data.prediction || []);
        setPolePosition(data.pole_position);
        setFastestLap(data.fastest_lap);
        setIsLocked(true);
      }
      setLoading(false);
    };

    loadPrediction();
  }, [user, raceId]);

  const available = DRIVERS_2026.filter((d) => !selected.includes(d.id));

  const addDriver = (driverId: number) => {
    if (selected.length >= 10 || isLocked) return;
    setSelected((prev) => [...prev, driverId]);
  };

  const removeDriver = (driverId: number) => {
    if (isLocked) return;
    setSelected((prev) => prev.filter((id) => id !== driverId));
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination || isLocked) return;
      const items = Array.from(selected);
      const [reordered] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reordered);
      setSelected(items);
    },
    [selected, isLocked]
  );

  const handleLock = async () => {
    if (selected.length < 10 || !raceId || !user) return;
    setIsLocking(true);

    // Save to Supabase
    const { error } = await supabase.from('predictions').upsert({
      user_id: user.id,
      race_id: Number(raceId),
      prediction: selected,
      pole_position: polePosition,
      fastest_lap: fastestLap,
      points: 0,
    });

    if (!error) {
      setIsLocked(true);
    }
    setIsLocking(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="font-mono text-sm text-muted-foreground">Inicia sesión para predecir</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-primary-foreground px-4 py-2 rounded font-mono text-sm"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  if (!race) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="flex items-center justify-center h-[60vh]">
          <p className="font-mono text-sm text-muted-foreground">Carrera no encontrada</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="flex items-center justify-center h-[60vh]">
          <p className="font-mono text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  const poleDriver = DRIVERS_2026.find((d) => d.id === polePosition);
  const fastestDriver = DRIVERS_2026.find((d) => d.id === fastestLap);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} />
            </button>
            <h1 className="font-mono text-sm font-bold tracking-widest uppercase text-foreground">
              Predicción
            </h1>
          </div>
          <span className="font-mono text-xs text-primary">{selected.length}/10</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Race info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-mono text-sm font-bold text-foreground">{race.name}</h2>
            <p className="text-[10px] text-muted-foreground">{race.circuit}</p>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">Ronda {race.round}</span>
        </div>

        {/* Bonus: Pole + Fastest Lap */}
        {!isLocked && (
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
              ★ Bonus (+10 pts c/u)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowPoleModal(true)}
                className={`p-2.5 rounded text-left transition-colors border ${
                  polePosition
                    ? "bg-[hsl(270,50%,15%)] border-[hsl(270,60%,40%)]"
                    : "bg-card border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs">🏁</span>
                  <span className="font-mono text-[9px] tracking-wider text-[hsl(270,70%,70%)] font-bold uppercase">Pole</span>
                </div>
                {poleDriver ? (
                  <p className="font-mono text-[10px] font-semibold text-foreground truncate">{poleDriver.code} #{poleDriver.number}</p>
                ) : (
                  <p className="font-mono text-[9px] text-muted-foreground">Seleccionar</p>
                )}
              </button>

              <button
                onClick={() => setShowFastestModal(true)}
                className={`p-2.5 rounded text-left transition-colors border ${
                  fastestLap
                    ? "bg-[hsl(25,50%,12%)] border-[hsl(25,80%,45%)]"
                    : "bg-card border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs">⚡</span>
                  <span className="font-mono text-[9px] tracking-wider text-[hsl(25,80%,60%)] font-bold uppercase">V. Rápida</span>
                </div>
                {fastestDriver ? (
                  <p className="font-mono text-[10px] font-semibold text-foreground truncate">{fastestDriver.code} #{fastestDriver.number}</p>
                ) : (
                  <p className="font-mono text-[9px] text-muted-foreground">Seleccionar</p>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Locked bonus display */}
        {isLocked && (polePosition || fastestLap) && (
          <div className="grid grid-cols-2 gap-2">
            {poleDriver && (
              <div className="bg-card border border-border rounded p-2.5">
                <span className="font-mono text-[9px] text-muted-foreground">🏁 Pole</span>
                <p className="font-mono text-[10px] font-semibold text-foreground">{poleDriver.code}</p>
              </div>
            )}
            {fastestDriver && (
              <div className="bg-card border border-border rounded p-2.5">
                <span className="font-mono text-[9px] text-muted-foreground">⚡ V. Rápida</span>
                <p className="font-mono text-[10px] font-semibold text-foreground">{fastestDriver.code}</p>
              </div>
            )}
          </div>
        )}

        {/* Selected - prediction slots */}
        <div className="bg-card rounded border border-border p-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
            Tu Predicción
          </span>

          {selected.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              Selecciona 10 pilotos del grid inferior
            </p>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="prediction">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-1">
                    {selected.map((driverId, index) => {
                      const driver = DRIVERS_2026.find((d) => d.id === driverId);
                      if (!driver) return null;
                      return (
                        <Draggable key={String(driverId)} draggableId={String(driverId)} index={index} isDragDisabled={isLocked}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center gap-2 rounded px-2 py-2 transition-all ${
                                snapshot.isDragging ? "bg-secondary shadow-lg" : "bg-background"
                              } ${isLocking ? "animate-lock-pulse" : ""} ${
                                isLocked ? "border border-primary/20" : ""
                              }`}
                              initial={false}
                              animate={isLocking ? { scale: [1, 1.02, 1] } : {}}
                            >
                              {!isLocked && (
                                <div {...provided.dragHandleProps} className="text-muted-foreground cursor-grab">
                                  <GripVertical size={14} />
                                </div>
                              )}
                              <span className="font-mono text-[10px] text-muted-foreground w-5">
                                P{String(index + 1).padStart(2, "0")}
                              </span>
                              <div
                                className="w-1 h-4 rounded-full"
                                style={{ backgroundColor: driver.teamColor }}
                              />
                              <span className="font-mono text-xs font-semibold text-foreground flex-1">
                                {driver.code}
                              </span>
                              <span className="text-[10px] text-muted-foreground">#{driver.number}</span>
                              {!isLocked && (
                                <button onClick={() => removeDriver(driverId)} className="text-muted-foreground hover:text-destructive ml-1">
                                  <X size={12} />
                                </button>
                              )}
                            </motion.div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          {/* Lock button */}
          {selected.length === 10 && !isLocked && (
            <motion.button
              onClick={handleLock}
              disabled={isLocking}
              className="w-full mt-3 bg-primary text-primary-foreground font-mono text-xs font-bold tracking-widest py-3 rounded flex items-center justify-center gap-2 disabled:opacity-50"
              whileTap={{ scale: 0.98 }}
            >
              <Lock size={14} />
              {isLocking ? "BLOQUEANDO..." : "BLOQUEAR PREDICCIÓN"}
            </motion.button>
          )}

          {isLocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center py-2"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                ✓ PREDICCIÓN BLOQUEADA
              </span>
            </motion.div>
          )}
        </div>

        {/* Available drivers grid */}
        {!isLocked && (
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
              Grid de Pilotos
            </span>
            <div className="grid grid-cols-2 gap-1">
              {available.map((driver) => (
                <button
                  key={driver.id}
                  onClick={() => addDriver(driver.id)}
                  disabled={selected.length >= 10}
                  className="flex items-center gap-2 bg-card rounded px-2.5 py-2 text-left hover:bg-secondary transition-colors disabled:opacity-30 border border-border"
                >
                  <div
                    className="w-1 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: driver.teamColor }}
                  />
                  <span className="font-mono text-xs font-semibold text-foreground">
                    {driver.code}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground ml-auto">
                    #{driver.number}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pole Modal */}
      {showPoleModal && (
        <DriverSelectModal
          title="Pole Position"
          subtitle="¿Quién hará la pole? (+10 PTS)"
          selectedId={polePosition}
          onSelect={(id) => { setPolePosition(id); setShowPoleModal(false); }}
          onClose={() => setShowPoleModal(false)}
        />
      )}

      {/* Fastest Lap Modal */}
      {showFastestModal && (
        <DriverSelectModal
          title="Vuelta Rápida"
          subtitle="¿Quién hará la vuelta rápida? (+10 PTS)"
          selectedId={fastestLap}
          onSelect={(id) => { setFastestLap(id); setShowFastestModal(false); }}
          onClose={() => setShowFastestModal(false)}
        />
      )}
    </div>
  );
};

const DriverSelectModal = ({
  title, subtitle, selectedId, onSelect, onClose,
}: {
  title: string; subtitle: string; selectedId: number | null;
  onSelect: (id: number) => void; onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col">
    <div className="bg-card border-b border-border p-4 flex items-center justify-between">
      <div>
        <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-widest">{title}</h3>
        <p className="font-mono text-[10px] text-muted-foreground">{subtitle}</p>
      </div>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground font-mono">✕</button>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {DRIVERS_2026.map((driver) => (
        <button
          key={driver.id}
          onClick={() => onSelect(driver.id)}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded border text-left transition-colors ${
            selectedId === driver.id
              ? "bg-card border-primary"
              : "bg-card border-border hover:border-muted-foreground"
          }`}
        >
          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: driver.teamColor }} />
          <span className="font-mono text-xs font-semibold text-foreground flex-1">{driver.code}</span>
          <span className="font-mono text-[10px] text-muted-foreground">{driver.team}</span>
          <span className="font-mono text-[10px] text-muted-foreground">#{driver.number}</span>
          {selectedId === driver.id && <Check size={14} className="text-primary" />}
        </button>
      ))}
    </div>
  </div>
);

export default Predict;
