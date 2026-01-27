export function HeroStats() {
  return (
    <div
      className="flex justify-between items-end border-b-2 border-transparent pb-12 mb-[-2vw]"
      style={{ borderBottomColor: "var(--hero-border-color)" }}
    >
      <span
        className="font-bold tracking-widest uppercase hidden md:block"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        10+ Projects Shipped
      </span>
      <span
        className="font-bold tracking-widest uppercase hidden md:block"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        A Year of Pixel Perfection
      </span>
      <span
        className="font-bold tracking-widest uppercase"
        style={{
          fontFamily: "var(--hero-stats-font)",
          fontSize: "var(--hero-stats-size)",
          letterSpacing: "var(--hero-stats-letter-spacing)",
        }}
      >
        10+ Collaborations
      </span>
    </div>
  );
}
