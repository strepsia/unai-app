interface FlagProps {
  country: string;
  className?: string;
}

const Flag = ({ country, className = "w-10 h-7" }: FlagProps) => {
  const isoCode = country?.toLowerCase() || "xx";
  return (
    <img
      src={`https://flagcdn.com/w80/${isoCode}.png`}
      srcSet={`https://flagcdn.com/w160/${isoCode}.png 2x`}
      alt={country}
      className={`${className} rounded object-cover`}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
};

export default Flag;
