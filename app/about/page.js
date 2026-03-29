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
        <h1>Built around jackets, identity, and a direct brand presence.</h1>
        <p className="lead">{site.brandStatement}</p>
        <div className="stack">
          <p>
            TROOPZ is positioned as a streetwear and outerwear label with a clean,
            strong, military-inspired visual identity. This starter site keeps the
            brand mark visible, presents products clearly, and supports direct
            customer intent through shopping and contact flows.
          </p>
          <p>
            The current version is intentionally simple so it can launch quickly,
            be deployed on Vercel, and stay easy to edit as real images, pricing,
            and Stripe settings are added later.
          </p>
        </div>
      </div>
    </main>
  );
}
