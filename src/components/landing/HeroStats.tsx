export function HeroStats() {
  return (
    <div className="flex justify-between items-end pb-2 md:pb-4 w-full">
      <span
        className="font-bold tracking-widest uppercase hidden md:block"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        50+ Countries Visited
      </span>
      <span
        className="font-bold tracking-widest uppercase hidden md:block"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        12+ Years of Experience
      </span>
      <span
        className="font-bold tracking-widest uppercase"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        100+ Collaborations
      </span>
    </div>
  );
}
