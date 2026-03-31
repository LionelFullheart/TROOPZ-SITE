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
        <h1>Product-first. Loud visuals. Direct checkout.</h1>
        <p className="lead">{site.brandStatement}</p>
        <div className="stack">
          <p>
            TROOPZ is built around focused product drops, strong identity, and a direct
            path from collection page to cart.
          </p>
        </div>
      </div>
    </main>
  );
}
