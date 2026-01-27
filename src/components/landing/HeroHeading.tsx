export function HeroHeading() {
  return (
    <h1
      className="leading-[0.8] font-black tracking-tighter text-center select-none"
      style={{
        fontSize: "var(--hero-heading-size-mobile)",
        color: "var(--hero-heading-color)",
        mixBlendMode: "overlay",
        opacity: "var(--hero-heading-opacity)",
      }}
    >
      UNNAMED
    </h1>
  );
}
