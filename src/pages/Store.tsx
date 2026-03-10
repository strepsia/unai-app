import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import { SHOP_ITEMS, USER_DATA } from "@/data/f1Data";

const Store = () => {
  const [redeemedId, setRedeemedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const categories = ["Todos", ...new Set(SHOP_ITEMS.map((i) => i.category))];

  const filteredItems = selectedCategory === "Todos"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((i) => i.category === selectedCategory);

  const handleRedeem = (itemId: number) => {
    setRedeemedId(itemId);
    setTimeout(() => setRedeemedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <HeaderBar title="Tienda" />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Tokens Balance */}
        <div className="bg-card rounded border border-border p-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
            Tus Tokens
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-primary">{USER_DATA.tokens}</span>
            <span className="font-mono text-xs text-muted-foreground">disponibles</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-[10px] tracking-wider px-3 py-1.5 rounded whitespace-nowrap border transition-colors font-bold uppercase ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-2">
          {filteredItems.map((item) => {
            const canAfford = USER_DATA.tokens >= item.price;
            const isRedeemed = redeemedId === item.id;

            return (
              <div key={item.id} className="bg-card rounded border border-border overflow-hidden">
                <div className="h-24 bg-background flex items-center justify-center">
                  <span className="text-4xl">{item.emoji}</span>
                </div>
                <div className="p-2.5">
                  <h4 className="font-mono text-[11px] font-bold text-foreground mb-2 line-clamp-2 leading-tight">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">{item.price}</span>
                    <AnimatePresence mode="wait">
                      {isRedeemed ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-0.5 text-accent"
                        >
                          <Check size={12} />
                        </motion.span>
                      ) : (
                        <button
                          onClick={() => canAfford && handleRedeem(item.id)}
                          disabled={!canAfford}
                          className={`font-mono text-[9px] tracking-wider font-bold px-2 py-1 rounded transition-colors uppercase ${
                            canAfford
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "bg-secondary text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          Canjear
                        </button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Store;
