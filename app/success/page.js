import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: "Order Status | TROOPZ",
  description: "TROOPZ order confirmation and inquiry.",
};

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const mode = params?.mode || "demo";
  const product = params?.product || "your selected item";
  const itemCount = Number(params?.items || 1);
  const inquiryMessage = `I want to place an order for ${itemCount} item${
    itemCount === 1 ? "" : "s"
  }, including ${product}. Please confirm availability, sizing, and next steps.`;

  if (mode === "live") {
    return (
      <main className="page-section">
        <div className="shell narrow-page success-panel">
          <p className="eyebrow">Order Confirmed</p>
          <h1>Your payment was received.</h1>
          <p className="lead">
            Thank you for your order of {itemCount} item{itemCount === 1 ? "" : "s"},
            including {product}. TROOPZ will follow up with any shipping or order details if
            needed.
          </p>
          <div className="button-row">
            <Link href="/shop" className="button">
              Continue Shopping
            </Link>
            <Link href="/contact" className="button-secondary">
              Contact TROOPZ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="shell contact-grid">
        <div>
          <p className="eyebrow">Order Inquiry</p>
          <h1>Complete your order request.</h1>
          <p className="lead">
            Fill out the form to send TROOPZ your order details for {itemCount} item
            {itemCount === 1 ? "" : "s"}, including {product}.
          </p>
          <div className="contact-info">
            <p>
              Email: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>TROOPZ will follow up directly to confirm availability, sizing, and next steps.</p>
          </div>
        </div>

        <ContactForm
          initialInterest="Order inquiry"
          initialMessage={inquiryMessage}
          submitLabel="Send order request"
        />
      </div>
    </main>
  );
}
