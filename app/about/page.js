import { site } from "@/lib/site";

export const metadata = {
  title: "About | TROOPZ",
  description: "About the TROOPZ brand.",
};

export default function AboutPage() {
  return (
    <main className="page-section">
      <div className="shell narrow-page">
        <p className="eyebrow">About TROOPZ</p>
        <h1>Built around the spirit of the Soulja.</h1>
        <p className="lead">
          TROOPZ is a streetwear brand built around the spirit of the Soulja -
          resilient, loyal, sharp, and unshaken under pressure.
        </p>
        <div className="stack">
          <p>
            The brand represents toughness, identity, discipline, and presence.
            It reflects the mindset of standing tall, moving with purpose, and
            staying solid through whatever comes.
          </p>
          <p>
            That energy is often expressed through two core visual symbols: toy
            soldiers and dogs. The toy soldier represents readiness, structure,
            bravery, and the idea of always being prepared. The dog represents
            loyalty, instinct, protection, and raw heart. Together, these motifs
            help define the world of TROOPZ.
          </p>
          <p>
            TROOPZ turns those symbols into bold product drops through strong
            graphics, statement outerwear, and streetwear with character. The
            brand is not just about clothing - it is about attitude,
            symbolism, and wearing a uniform for the ones who move like soldiers
            and stand ten toes down.
          </p>
        </div>
      </div>
    </main>
  );
}
