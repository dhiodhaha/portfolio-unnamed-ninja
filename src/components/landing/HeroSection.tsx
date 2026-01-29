import { HeroDescription } from "./HeroDescription";
import { HeroStats } from "./HeroStats";
import { HeroHeading } from "./HeroHeading";
import { BackgroundNoise } from "./BackgroundNoise";

export function HeroSection() {
  return (
    <section
      className="relative h-screen w-full flex flex-col justify-end pb-0 z-40 overflow-hidden border-b"
      style={{
        backgroundColor: "var(--hero-bg)",
        borderBottomColor: "var(--hero-border-color)",
        paddingLeft: "var(--hero-padding-x)",
        paddingRight: "var(--hero-padding-x)",
        paddingTop: "var(--hero-padding-top)",
      }}
    >
      <HeroDescription />

      <div className="w-full z-10 pb-[2vw] relative">
        <HeroStats />
        <HeroHeading />
      </div>

      <BackgroundNoise />
    </section>
  );
}
