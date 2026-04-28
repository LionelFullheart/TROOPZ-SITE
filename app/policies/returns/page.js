export const metadata = {
  title: "Return Policy | TROOPZ",
};

export default function ReturnPolicyPage() {
  const sections = [
    {
      title: "1. All Sales Policy",
      body: (
        <p>
          All sales are considered FINAL unless the item arrives damaged,
          defective, or incorrect.
        </p>
      ),
    },
    {
      title: "2. Eligible Returns",
      body: (
        <>
          <p>We only accept returns or replacements under the following conditions:</p>
          <p>- Item arrived damaged</p>
          <p>- Item is defective</p>
          <p>- Wrong item was received</p>
          <p>To request a return, you must contact us within 7 days of delivery.</p>
        </>
      ),
    },
    {
      title: "3. Return Requirements",
      body: (
        <>
          <p>To be eligible for a return:</p>
          <p>- Item must be unused and in original condition</p>
          <p>- Item must be in original packaging</p>
          <p>- Proof of purchase is required</p>
          <p>
            We reserve the right to deny returns that do not meet these conditions.
          </p>
        </>
      ),
    },
    {
      title: "4. Refunds & Replacements",
      body: (
        <>
          <p>If your return is approved:</p>
          <p>- You may receive a replacement item (if available)</p>
          <p>OR</p>
          <p>- A refund to your original payment method</p>
          <p>Refunds are processed within 5–10 business days after approval.</p>
        </>
      ),
    },
    {
      title: "5. Non-Returnable Items",
      body: (
        <>
          <p>We do NOT accept returns for:</p>
          <p>- Worn or used items</p>
          <p>- Incorrect sizing (please review sizing charts before purchase)</p>
          <p>- Change of mind</p>
        </>
      ),
    },
    {
      title: "6. Return Process",
      body: (
        <>
          <p>
            To start a return, contact{" "}
            <a href="mailto:troopzsoulja@gmail.com">troopzsoulja@gmail.com</a>
          </p>
          <p>Include:</p>
          <p>- Order number</p>
          <p>- Description of issue</p>
          <p>- Photos (if item is damaged/incorrect)</p>
        </>
      ),
    },
    {
      title: "7. Shipping Costs",
      body: (
        <p>
          Customers are responsible for return shipping costs unless the item was
          incorrect or defective.
        </p>
      ),
    },
    {
      title: "8. Contact",
      body: (
        <p>
          For any questions, contact{" "}
          <a href="mailto:troopzsoulja@gmail.com">troopzsoulja@gmail.com</a>
        </p>
      ),
    },
  ];

  return (
    <main className="page-section">
      <div className="shell narrow-page">
        <p className="eyebrow">Policy</p>
        <h1>Return Policy</h1>
        <p className="lead">
          At TROOPZ, we take pride in delivering high-quality products. Please review
          our return policy carefully before making a purchase.
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
