export function HeroDescription() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center z-10">
      <p
        className="text-center leading-relaxed tracking-tight"
        style={{
          fontSize: "var(--hero-description-size)",
          color: "var(--hero-description-color)",
          maxWidth: "var(--hero-description-max-width)",
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
