import Link from "next/link";

export const metadata = {
  title: "Checkout | TROOPZ",
  description: "TROOPZ checkout return page.",
};

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const mode = params?.mode || "live";
  const product = params?.product || "your jacket";

  return (
    <main className="page-section">
      <div className="shell narrow-page success-panel">
        <p className="eyebrow">Checkout Return</p>
        <h1>{mode === "demo" ? "Demo checkout started" : "Thanks for your order."}</h1>
        <p className="lead">
          {mode === "demo"
            ? `Stripe keys are not connected yet, so ${product} was routed through the safe demo flow.`
            : `Your checkout for ${product} was started successfully.`}
        </p>
        <p className="section-copy">
          This page gives TROOPZ a clean post-checkout destination for Vercel deployment
          and future Stripe sessions.
        </p>
        <div className="button-row">
          <Link href="/shop" className="button">
            Back to Shop
          </Link>
          <Link href="/contact" className="button-secondary">
            Contact TROOPZ
          </Link>
        </div>
      </div>
    </main>
  );
}
