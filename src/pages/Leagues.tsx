import { useState } from "react";
import { Plus, Copy, Check, Users, X } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";

interface League {
  id: string;
  name: string;
  inviteCode: string;
  members: string[];
  pool?: { amount: number; enabled: boolean };
}

const generateCode = () => Math.random().toString(36).substr(2, 6).toUpperCase();

const Leagues = () => {
  const [leagues, setLeagues] = useState<League[]>(() => {
    return JSON.parse(localStorage.getItem("leagues") || "[]");
  });
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [showDetail, setShowDetail] = useState<League | null>(null);
  const [newName, setNewName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [enablePool, setEnablePool] = useState(false);
  const [poolAmount, setPoolAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const saveLeagues = (updated: League[]) => {
    setLeagues(updated);
    localStorage.setItem("leagues", JSON.stringify(updated));
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    const league: League = {
      id: Date.now().toString(),
      name: newName,
      inviteCode: generateCode(),
      members: ["user"],
      pool: enablePool ? { amount: parseFloat(poolAmount) || 0, enabled: true } : undefined,
    };
    saveLeagues([...leagues, league]);
    setShowCreate(false);
    setNewName("");
    setEnablePool(false);
    setPoolAmount("");
  };

  const handleJoin = () => {
    const found = leagues.find((l) => l.inviteCode === joinCode.toUpperCase());
    if (found && !found.members.includes("user")) {
      const updated = leagues.map((l) =>
        l.id === found.id ? { ...l, members: [...l.members, "user"] } : l
      );
      saveLeagues(updated);
    }
    setShowJoin(false);
    setJoinCode("");
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showDetail) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-40 bg-primary px-4 py-3 flex items-center gap-3">
          <button onClick={() => setShowDetail(null)} className="text-primary-foreground">
            ←
          </button>
          <h1 className="font-mono text-sm font-bold tracking-widest uppercase text-primary-foreground">
            {showDetail.name}
          </h1>
        </header>

        <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
          <div className="bg-card rounded border border-border p-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] text-muted-foreground">{showDetail.members.length} miembros</p>
              {showDetail.pool?.enabled && (
                <p className="font-mono text-xs text-primary mt-1">
                  Bote: €{(showDetail.pool.amount * showDetail.members.length).toFixed(2)}
                </p>
              )}
            </div>
            <button
              onClick={() => copyCode(showDetail.inviteCode)}
              className="bg-primary text-primary-foreground font-mono text-[10px] tracking-widest font-bold px-3 py-2 rounded"
            >
              {copied ? "✓ COPIADO" : "INVITAR"}
            </button>
          </div>

          <div className="bg-card rounded border border-border p-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
              Código de invitación
            </span>
            <div className="flex items-center justify-between bg-background rounded px-3 py-2">
              <span className="font-mono text-lg font-bold text-foreground tracking-widest">
                {showDetail.inviteCode}
              </span>
              <button onClick={() => copyCode(showDetail.inviteCode)} className="text-muted-foreground hover:text-foreground">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
              Ranking de la liga
            </span>
            {showDetail.members.map((member, i) => (
              <div key={member} className="flex items-center gap-3 bg-card rounded border border-border px-3 py-2.5 mb-1">
                <span className={`font-mono text-sm font-bold w-6 text-center ${
                  i === 0 ? "text-yellow-500" : "text-muted-foreground"
                }`}>
                  {i + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-mono text-xs font-bold text-foreground">
                  {member.charAt(0).toUpperCase()}
                </div>
                <span className="font-mono text-xs text-foreground flex-1">{member === "user" ? "Tú" : member}</span>
                <span className="font-mono text-xs text-muted-foreground">0 PTS</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderBar title="Ligas" />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreate(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-mono text-xs font-bold tracking-widest py-3 rounded"
          >
            <Plus size={16} /> CREAR LIGA
          </button>
          <button
            onClick={() => setShowJoin(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-card border border-border text-foreground font-mono text-xs font-bold tracking-widest py-3 rounded"
          >
            UNIRSE
          </button>
        </div>

        {/* Leagues List */}
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">
            Mis Ligas
          </span>
          {leagues.length > 0 ? (
            <div className="space-y-1">
              {leagues.map((league) => (
                <button
                  key={league.id}
                  onClick={() => setShowDetail(league)}
                  className="w-full flex items-center gap-3 bg-card rounded border border-border p-3 text-left hover:border-muted-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-mono font-bold text-primary">
                    {league.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-xs font-bold text-foreground">{league.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{league.members.length} miembros</p>
                  </div>
                  {league.pool?.enabled && (
                    <span className="font-mono text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded tracking-wider font-bold">
                      PORRA
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded border border-border p-8 text-center">
              <Users size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="font-mono text-xs text-muted-foreground">No estás en ninguna liga aún</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">Crea una o únete con un código</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded border border-border p-5 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-sm font-bold text-foreground">Crear Liga</h3>
              <button onClick={() => setShowCreate(false)} className="text-muted-foreground"><X size={18} /></button>
            </div>
            <input
              type="text"
              placeholder="Nombre de la liga"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded text-foreground font-mono text-xs mb-3 placeholder:text-muted-foreground focus:border-primary outline-none"
            />
            <label className="flex items-center gap-2 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enablePool}
                onChange={(e) => setEnablePool(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="font-mono text-xs text-foreground">Habilitar porra (dinero real)</span>
            </label>
            {enablePool && (
              <input
                type="number"
                placeholder="Cantidad por jugador (€)"
                value={poolAmount}
                onChange={(e) => setPoolAmount(e.target.value)}
                className="w-full p-3 bg-background border border-border rounded text-foreground font-mono text-xs mb-3 placeholder:text-muted-foreground focus:border-primary outline-none"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 py-2.5 bg-secondary text-foreground font-mono text-xs rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold rounded"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Modal */}
      {showJoin && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded border border-border p-5 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-sm font-bold text-foreground">Unirse a Liga</h3>
              <button onClick={() => setShowJoin(false)} className="text-muted-foreground"><X size={18} /></button>
            </div>
            <input
              type="text"
              placeholder="Código de invitación"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full p-3 bg-background border border-border rounded text-foreground font-mono text-xs mb-3 placeholder:text-muted-foreground focus:border-primary outline-none uppercase tracking-widest"
              maxLength={6}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowJoin(false)}
                className="flex-1 py-2.5 bg-secondary text-foreground font-mono text-xs rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleJoin}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold rounded"
              >
                Unirse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leagues;
