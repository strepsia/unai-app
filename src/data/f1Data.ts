export interface Driver {
  id: number;
  name: string;
  code: string;
  team: string;
  teamColor: string; // hex color
  number: number;
}

export interface Race {
  id: number;
  round: number;
  name: string;
  circuit: string;
  country: string; // ISO 2-letter code for flagcdn
  date: string;
  sprint?: boolean;
}

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

export const DRIVERS_2026: Driver[] = [
  { id: 1, name: "Max Verstappen", code: "VER", team: "Red Bull Racing", teamColor: "#3671C6", number: 1 },
  { id: 2, name: "Isack Hadjar", code: "HAD", team: "Red Bull Racing", teamColor: "#3671C6", number: 6 },
  { id: 3, name: "Lewis Hamilton", code: "HAM", team: "Ferrari", teamColor: "#E8002D", number: 44 },
  { id: 4, name: "Charles Leclerc", code: "LEC", team: "Ferrari", teamColor: "#E8002D", number: 16 },
  { id: 5, name: "George Russell", code: "RUS", team: "Mercedes", teamColor: "#27F4D2", number: 63 },
  { id: 6, name: "Kimi Antonelli", code: "ANT", team: "Mercedes", teamColor: "#27F4D2", number: 12 },
  { id: 7, name: "Lando Norris", code: "NOR", team: "McLaren", teamColor: "#FF8000", number: 4 },
  { id: 8, name: "Oscar Piastri", code: "PIA", team: "McLaren", teamColor: "#FF8000", number: 81 },
  { id: 9, name: "Fernando Alonso", code: "ALO", team: "Aston Martin", teamColor: "#229971", number: 14 },
  { id: 10, name: "Lance Stroll", code: "STR", team: "Aston Martin", teamColor: "#229971", number: 18 },
  { id: 11, name: "Pierre Gasly", code: "GAS", team: "Alpine", teamColor: "#FF87BC", number: 10 },
  { id: 12, name: "Franco Colapinto", code: "COL", team: "Alpine", teamColor: "#FF87BC", number: 43 },
  { id: 13, name: "Liam Lawson", code: "LAW", team: "Racing Bulls", teamColor: "#6692FF", number: 30 },
  { id: 14, name: "Arvid Lindblad", code: "LIN", team: "Racing Bulls", teamColor: "#6692FF", number: 17 },
  { id: 15, name: "Nico Hülkenberg", code: "HUL", team: "Audi", teamColor: "#FF0000", number: 27 },
  { id: 16, name: "Gabriel Bortoleto", code: "BOR", team: "Audi", teamColor: "#FF0000", number: 5 },
  { id: 17, name: "Esteban Ocon", code: "OCO", team: "Haas", teamColor: "#B6BABD", number: 31 },
  { id: 18, name: "Oliver Bearman", code: "BEA", team: "Haas", teamColor: "#B6BABD", number: 87 },
  { id: 19, name: "Alexander Albon", code: "ALB", team: "Williams", teamColor: "#64C4FF", number: 23 },
  { id: 20, name: "Carlos Sainz", code: "SAI", team: "Williams", teamColor: "#64C4FF", number: 55 },
  { id: 21, name: "Valtteri Bottas", code: "BOT", team: "Cadillac", teamColor: "#1E5631", number: 77 },
  { id: 22, name: "Sergio Pérez", code: "PER", team: "Cadillac", teamColor: "#1E5631", number: 11 },
];

export const CALENDAR_2026: Race[] = [
  { id: 1, round: 1, name: "GP de Australia", circuit: "Albert Park", country: "au", date: "2026-03-08" },
  { id: 2, round: 2, name: "GP de China", circuit: "Shanghai", country: "cn", date: "2026-03-15", sprint: true },
  { id: 3, round: 3, name: "GP de Japón", circuit: "Suzuka", country: "jp", date: "2026-03-29" },
  { id: 4, round: 4, name: "GP de Bahréin", circuit: "Sakhir", country: "bh", date: "2026-04-12" },
  { id: 5, round: 5, name: "GP de Arabia Saudí", circuit: "Jeddah", country: "sa", date: "2026-04-19" },
  { id: 6, round: 6, name: "GP de Miami", circuit: "Miami", country: "us", date: "2026-05-03", sprint: true },
  { id: 7, round: 7, name: "GP de Canadá", circuit: "Montreal", country: "ca", date: "2026-05-24", sprint: true },
  { id: 8, round: 8, name: "GP de Mónaco", circuit: "Monte Carlo", country: "mc", date: "2026-06-07" },
  { id: 9, round: 9, name: "GP de Barcelona-Catalunya", circuit: "Barcelona", country: "es", date: "2026-06-14" },
  { id: 10, round: 10, name: "GP de Austria", circuit: "Spielberg", country: "at", date: "2026-06-28" },
  { id: 11, round: 11, name: "GP de Gran Bretaña", circuit: "Silverstone", country: "gb", date: "2026-07-05", sprint: true },
  { id: 12, round: 12, name: "GP de Bélgica", circuit: "Spa", country: "be", date: "2026-07-19" },
  { id: 13, round: 13, name: "GP de Hungría", circuit: "Hungaroring", country: "hu", date: "2026-07-26" },
  { id: 14, round: 14, name: "GP de Países Bajos", circuit: "Zandvoort", country: "nl", date: "2026-08-23", sprint: true },
  { id: 15, round: 15, name: "GP de Italia", circuit: "Monza", country: "it", date: "2026-09-06" },
  { id: 16, round: 16, name: "GP de Madrid", circuit: "IFEMA Madrid", country: "es", date: "2026-09-13" },
  { id: 17, round: 17, name: "GP de Azerbaiyán", circuit: "Baku", country: "az", date: "2026-09-26" },
  { id: 18, round: 18, name: "GP de Singapur", circuit: "Marina Bay", country: "sg", date: "2026-10-11", sprint: true },
  { id: 19, round: 19, name: "GP de Estados Unidos", circuit: "Austin", country: "us", date: "2026-10-25" },
  { id: 20, round: 20, name: "GP de México", circuit: "Hermanos Rodríguez", country: "mx", date: "2026-11-01" },
  { id: 21, round: 21, name: "GP de Brasil", circuit: "Interlagos", country: "br", date: "2026-11-08" },
  { id: 22, round: 22, name: "GP de Las Vegas", circuit: "Las Vegas", country: "us", date: "2026-11-21" },
  { id: 23, round: 23, name: "GP de Catar", circuit: "Losail", country: "qa", date: "2026-11-29" },
  { id: 24, round: 24, name: "GP de Abu Dhabi", circuit: "Yas Marina", country: "ae", date: "2026-12-06" },
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 1, name: "Gorra Red Bull Racing", price: 50, category: "Gorras", emoji: "🧢" },
  { id: 2, name: "Camiseta Ferrari", price: 80, category: "Ropa", emoji: "👕" },
  { id: 3, name: "Miniatura F1 1:43", price: 120, category: "Coleccionables", emoji: "🏎️" },
  { id: 4, name: "Poster GP Monaco", price: 30, category: "Decoración", emoji: "🖼️" },
  { id: 5, name: "Llavero Mercedes", price: 15, category: "Accesorios", emoji: "🔑" },
  { id: 6, name: "Sudadera McLaren", price: 150, category: "Ropa", emoji: "🧥" },
  { id: 7, name: "Guantes Racing", price: 200, category: "Equipamiento", emoji: "🧤" },
  { id: 8, name: "Volante Replica", price: 500, category: "Premium", emoji: "🎮" },
  { id: 9, name: "Casco Mini 1:2", price: 350, category: "Coleccionables", emoji: "⛑️" },
  { id: 10, name: "Bandera a Cuadros", price: 25, category: "Decoración", emoji: "🏁" },
];

// Scoring system
export const calculatePredictionPoints = (
  prediction: number[],
  actualResult: number[],
  predictedPole?: number | null,
  actualPole?: number | null,
  predictedFastestLap?: number | null,
  actualFastestLap?: number | null
): number => {
  if (!prediction || !actualResult) return 0;
  let totalPoints = 0;

  prediction.forEach((predictedDriverId, predIndex) => {
    const actualIndex = actualResult.indexOf(predictedDriverId);
    if (actualIndex !== -1) {
      const difference = Math.abs(predIndex - actualIndex);
      if (difference === 0) totalPoints += 25;
      else if (difference === 1) totalPoints += 18;
      else if (difference === 2) totalPoints += 12;
      else if (difference === 3) totalPoints += 8;
      else totalPoints += 4;
    }
  });

  if (actualPole && predictedPole === actualPole) totalPoints += 10;
  if (actualFastestLap && predictedFastestLap === actualFastestLap) totalPoints += 10;

  return totalPoints;
};

// Helper
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
};

export const getNextRace = (): Race | undefined => {
  const today = new Date();
  return CALENDAR_2026.find((r) => new Date(r.date) > today);
};

export const isRacePast = (race: Race): boolean => {
  return new Date(race.date) < new Date();
};

// Simulated user data
export const USER_DATA = {
  name: "Piloto",
  points: 0,
  tokens: 250,
  rank: 127,
  totalPredictions: 0,
};
