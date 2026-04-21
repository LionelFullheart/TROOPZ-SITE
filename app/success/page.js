import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: "Order Inquiry | TROOPZ",
  description: "Complete your TROOPZ order inquiry.",
};

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const product = params?.product || "your selected item";
  const itemCount = Number(params?.items || 1);
  const inquiryMessage = `I want to place an order for ${itemCount} item${
    itemCount === 1 ? "" : "s"
  }, including ${product}. Please confirm availability, sizing, and next steps.`;

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
