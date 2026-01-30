export function HeroStats() {
  return (
    <div className="hero-element flex justify-between items-end pb-2 md:pb-4 w-full">
      <span
        className="font-bold tracking-widest uppercase hidden md:block"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        MINDCRAFTER
      </span>
      <span
        className="font-bold tracking-widest uppercase hidden md:block"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        PIXEL+LOGIC
      </span>
      <span
        className="font-bold tracking-widest uppercase"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        DESIGN&ENGINEER
      </span>
    </div>
  );
}
