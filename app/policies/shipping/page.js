export const metadata = {
  title: "Shipping Policy | TROOPZ",
};

export default function ShippingPolicyPage() {
  const sections = [
    {
      title: "1. Order Processing",
      body: (
        <>
          <p>- Orders are processed within 2–5 business days</p>
          <p>- Orders are not processed on weekends or holidays</p>
          <p>- You will receive a confirmation email after placing your order</p>
        </>
      ),
    },
    {
      title: "2. Shipping Times",
      body: (
        <>
          <p>Estimated delivery times:</p>
          <p>- United States: 3–7 business days after shipping</p>
          <p>- International: 7–21 business days (varies by location)</p>
          <p>
            Shipping times may vary depending on demand, location, and carrier
            delays.
          </p>
        </>
      ),
    },
    {
      title: "3. Shipping Rates",
      body: (
        <p>Shipping costs are calculated at checkout based on your location.</p>
      ),
    },
    {
      title: "4. Order Tracking",
      body: (
        <p>
          Once your order has shipped, you will receive a tracking number via
          email.
        </p>
      ),
    },
    {
      title: "5. Delays",
      body: (
        <>
          <p>TROOPZ is not responsible for shipping delays caused by:</p>
          <p>- Carrier issues (USPS, UPS, etc.)</p>
          <p>- Weather conditions</p>
          <p>- Incorrect shipping information provided by the customer</p>
        </>
      ),
    },
    {
      title: "6. Lost or Stolen Packages",
      body: (
        <>
          <p>
            TROOPZ is not responsible for lost or stolen packages once marked as
            delivered.
          </p>
          <p>
            If your package is missing, please contact the shipping carrier
            directly.
          </p>
        </>
      ),
    },
    {
      title: "7. Incorrect Address",
      body: (
        <>
          <p>If you provide an incorrect address:</p>
          <p>- We are not responsible for delivery issues</p>
          <p>- Additional shipping fees may apply for reshipment</p>
        </>
      ),
    },
    {
      title: "8. Contact",
      body: (
        <p>
          For shipping-related inquiries, contact{" "}
          <a href="mailto:troopzsoulja@gmail.com">troopzsoulja@gmail.com</a>
        </p>
      ),
    },
  ];

  return (
    <main className="page-section">
      <div className="shell narrow-page">
        <p className="eyebrow">Policy</p>
        <h1>Shipping Policy</h1>
        <p className="lead">
          Thank you for shopping with TROOPZ. Below is our shipping policy outlining
          how orders are processed and delivered.
        </p>
        <div className="policy-scroll-box stack">
          <p>
            <strong>Effective Date:</strong> April 28, 2026
          </p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
