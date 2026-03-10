import { Driver } from "@/data/f1Data";

interface DriverCardProps {
  driver: Driver;
  position?: number;
  variant?: "grid" | "prediction" | "compact";
  showPosition?: boolean;
  isCorrect?: boolean | null;
}

const DriverCard = ({ driver, position, variant = "grid", showPosition = false, isCorrect }: DriverCardProps) => {
  const borderStyle = isCorrect === true
    ? "border-l-2 border-l-accent"
    : isCorrect === false
    ? "border-l-2 border-l-destructive"
    : "border-l-2";

  return (
    <div
      className={`
        flex items-center gap-3 bg-card rounded px-3 py-2.5 
        ${borderStyle}
        ${variant === "compact" ? "py-1.5 px-2" : ""}
        transition-colors
      `}
      style={{
        borderLeftColor: isCorrect === null || isCorrect === undefined
          ? `hsl(${driver.teamColor})`
          : undefined,
      }}
    >
      {showPosition && position !== undefined && (
        <span className="font-mono text-xs text-muted-foreground w-5 text-right">
          P{String(position).padStart(2, "0")}
        </span>
      )}
      <span className="font-mono font-semibold text-sm tracking-wider text-foreground">
        {driver.code}
      </span>
      <span className="text-xs text-muted-foreground truncate flex-1">
        {driver.team}
      </span>
      <span className="font-mono text-xs text-muted-foreground">
        #{driver.number}
      </span>
    </div>
  );
};

export default DriverCard;
