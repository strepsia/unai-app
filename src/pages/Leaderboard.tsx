import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import { CALENDAR_2026, DRIVERS_2026 } from "@/data/f1Data";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  points: number;
  predictions: number;
  isUser?: boolean;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardEntry | null>(null);
  const [playerHistory, setPlayerHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      // Get all users
      const { data: users } = await supabase.from('users').select('id, username');
      
      // Get all predictions
      const { data: predictions } = await supabase.from('predictions').select('*');

      if (users && predictions) {
        const entries: LeaderboardEntry[] = users.map((u) => {
          const userPreds = predictions.filter((p) => p.user_id === u.id);
          const totalPoints = userPreds.reduce((sum, p) => sum + (p.points || 0), 0);
          return {
            id: u.id,
            name: u.username,
            points: totalPoints,
            predictions: userPreds.length,
            isUser: user?.id === u.id,
            rank: 0,
          };
        });

        // Sort by points and assign ranks
        entries.sort((a, b) => b.points - a.points);
        entries.forEach((e, i) => (e.rank = i + 1));

        setLeaderboard(entries);
      }
      setLoading(false);
    };

    loadLeaderboard();
  }, [user]);

  const loadPlayerHistory = async (playerId: string) => {
    const { data } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_id', playerId);

    if (data) {
      const history = data.map((pred) => {
        const race = CALENDAR_2026.find((r) => r.id === pred.race_id);
        return {
          race,
          predicted: pred.prediction || [],
          points: pred.points || 0,
        };
      });
      setPlayerHistory(history);
    }
  };

  const handleSelectPlayer = (entry: LeaderboardEntry) => {
    setSelectedPlayer(entry);
    loadPlayerHistory(entry.id);
  };

  const getDriver = (id: number) => DRIVERS_2026.find((d) => d.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <HeaderBar title="Rankings" />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="font-mono text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderBar title="Rankings" />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-1">
        {leaderboard.length === 0 ? (
          <div className="flex items-center justify-center h-[40vh]">
            <p className="font-mono text-sm text-muted-foreground">No hay usuarios aún</p>
          </div>
        ) : (
          leaderboard.map((entry) => {
            const isUser = !!entry.isUser;

            return (
              <button
                key={entry.id}
                onClick={() => handleSelectPlayer(entry)}
                className={`w-full flex items-center gap-3 rounded px-3 py-3 border text-left transition-colors hover:bg-secondary ${
                  isUser ? "bg-card border-primary" : "bg-card border-border"
                }`}
              >
                <span className={`font-mono text-lg font-bold w-8 text-center ${
                  entry.rank === 1 ? "text-yellow-500"
                    : entry.rank === 2 ? "text-gray-400"
                    : entry.rank === 3 ? "text-orange-500"
                    : isUser ? "text-primary"
                    : "text-muted-foreground"
                }`}>
                  {entry.rank}
                </span>

                <div className={`w-1 h-8 rounded-full ${
                  entry.rank === 1 ? "bg-yellow-500"
                    : entry.rank === 2 ? "bg-gray-400"
                    : entry.rank === 3 ? "bg-orange-500"
                    : "bg-border"
                }`} />

                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
                  isUser ? "bg-primary/20 text-primary" : "bg-secondary text-foreground"
                }`}>
                  {entry.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <p className="font-mono text-xs font-bold text-foreground">{entry.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{entry.predictions} predicciones</p>
                </div>

                <div className="text-right">
                  <p className="font-mono text-lg font-bold text-foreground">{entry.points.toLocaleString()}</p>
                  <p className="font-mono text-[9px] text-muted-foreground tracking-wider">PTS</p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Player history modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col"
          >
            {/* Modal header */}
            <div className="bg-card border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
                  selectedPlayer.isUser ? "bg-primary/20 text-primary" : "bg-secondary text-foreground"
                }`}>
                  {selectedPlayer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-foreground">{selectedPlayer.name}</h3>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    #{selectedPlayer.rank} · {selectedPlayer.points.toLocaleString()} PTS
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedPlayer(null)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            {/* History content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {playerHistory.length === 0 ? (
                <div className="flex items-center justify-center h-[40vh]">
                  <p className="font-mono text-sm text-muted-foreground">Sin predicciones aún</p>
                </div>
              ) : (
                playerHistory.map(({ race, predicted, points }) => (
                  <motion.div
                    key={race?.id || Math.random()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded border border-border p-3"
                  >
                    {/* Race header */}
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-mono text-[10px] text-muted-foreground">R{String(race?.round || 0).padStart(2, "0")}</p>
                        <p className="font-mono text-xs font-bold text-foreground">{race?.name || 'Carrera'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-lg font-bold text-primary">+{points}</p>
                        <p className="font-mono text-[8px] text-muted-foreground tracking-wider">PTS</p>
                      </div>
                    </div>

                    {/* Positions */}
                    <div className="space-y-0.5">
                      {predicted.slice(0, 10).map((dId: number, idx: number) => {
                        const driver = getDriver(dId);
                        return (
                          <div key={idx} className="flex items-center gap-1.5 rounded px-1.5 py-1 bg-secondary">
                            <span className="font-mono text-[9px] w-5 text-center text-muted-foreground">
                              P{idx + 1}
                            </span>
                            {driver && (
                              <>
                                <div className="w-0.5 h-3 rounded-full" style={{ backgroundColor: driver.teamColor }} />
                                <span className="font-mono text-[10px] font-semibold text-foreground">{driver.code}</span>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leaderboard;