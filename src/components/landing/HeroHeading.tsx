export function HeroHeading() {
  return (
    <h1
      className="hero-element leading-[0.8] font-black tracking-tighter text-center select-none"
      style={{
        fontSize: "var(--hero-heading-size)",
        color: "var(--hero-heading-color)",
        mixBlendMode: "overlay",
        opacity: "var(--hero-heading-opacity)",
      }}
    >
      UNNAMED
    </h1>
  );
}
