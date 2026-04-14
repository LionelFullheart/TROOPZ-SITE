import Link from "next/link";

export const metadata = {
  title: "Checkout | TROOPZ",
  description: "TROOPZ checkout return page.",
};

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const product = params?.product || "your selected item";
  const itemCount = Number(params?.items || 1);

  return (
    <main className="page-section">
      <div className="shell narrow-page success-panel">
        <p className="eyebrow">Order Inquiry</p>
        <h1>Contact TROOPZ to complete your order.</h1>
        <p className="lead">
          Your selection has been received for {itemCount} item{itemCount === 1 ? "" : "s"}, including {product}. Contact TROOPZ directly to confirm availability, sizing, and final order details.
        </p>
        <div className="button-row">
          <Link href="/contact" className="button">
            Contact TROOPZ
          </Link>
          <Link href="/shop" className="button-secondary">
            Back to Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
