export function HeroDescription() {
  return (
    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[50vw] z-10">
      <p
        className="text-center leading-relaxed tracking-tight"
        style={{
          fontSize: "var(--hero-description-size)",
          color: "var(--hero-description-color)",
          fontWeight: 500,
        }}
      >
        UNNAMED is a creative design engineering factory that crafts one-of-a-kind
        experiences for the web. We bridge the gap between imagination and
        reality, transforming your values and philosophy into digital
        storytelling. Our team of passionate artisans curates memorable
        personal, corporate, and brand identities — cultivating deeper emotional
        resonance through pixels.
      </p>
    </div>
  );
}
