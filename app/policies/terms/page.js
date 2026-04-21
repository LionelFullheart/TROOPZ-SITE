export const metadata = {
  title: "Terms | TROOPZ",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Use of the Site",
      body:
        "This website is intended for lawful shopping, browsing, and informational use only. You agree not to misuse the site, attempt unauthorized access, interfere with site operations, or use the site for fraudulent purposes.",
    },
    {
      title: "2. Products and Availability",
      body:
        "TROOPZ offers apparel, accessories, and limited-release items. All products are subject to availability. We reserve the right to limit quantities, discontinue products, or update product offerings at any time without notice.",
    },
    {
      title: "3. Pricing",
      body:
        "All prices are listed in U.S. dollars unless otherwise stated. Prices, product descriptions, and availability may change without notice. TROOPZ reserves the right to correct pricing errors, listing errors, or inaccuracies at any time, including after an order has been submitted.",
    },
    {
      title: "4. Orders",
      body:
        "Placing an order does not guarantee acceptance. TROOPZ reserves the right to refuse, cancel, or limit any order for any reason, including suspected fraud, inventory errors, pricing errors, or suspected resale activity.",
    },
    {
      title: "5. Payments",
      body:
        "Payments must be completed through the payment methods made available at checkout. By submitting payment information, you represent that you are authorized to use that payment method.",
    },
    {
      title: "6. Shipping",
      body:
        "Orders are processed and shipped according to our Shipping Policy. Delivery estimates are not guaranteed and may vary due to carrier delays, demand, weather, or other factors outside our control.",
    },
    {
      title: "7. Returns and Refunds",
      body:
        "Returns, exchanges, and refund requests are governed by our Return Policy. By placing an order, you agree to the return terms posted on this site at the time of purchase.",
    },
    {
      title: "8. Intellectual Property",
      body:
        "All content on this site, including but not limited to logos, graphics, product images, designs, text, branding, artwork, and layout, is owned by TROOPZ or used with permission and is protected by intellectual property laws. No part of this site may be copied, reproduced, distributed, modified, or used for commercial purposes without prior written permission.",
    },
    {
      title: "9. Product Presentation",
      body:
        "We aim to display products and colors as accurately as possible. However, actual colors and appearance may vary depending on screen settings, lighting, production variation, and device display quality.",
    },
    {
      title: "10. User Submissions",
      body:
        "If you submit reviews, messages, emails, feedback, or other content to TROOPZ, you grant TROOPZ the right to use, reproduce, and display that content for business, promotional, or operational purposes, unless otherwise prohibited by law.",
    },
    {
      title: "11. Third-Party Services",
      body:
        "This site may use third-party services for payments, analytics, shipping, communications, or hosting. TROOPZ is not responsible for third-party websites, systems, or services beyond our direct control.",
    },
    {
      title: "12. Disclaimer",
      body:
        "This site and all products and content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied, except as required by law.",
    },
    {
      title: "13. Limitation of Liability",
      body:
        "To the fullest extent permitted by law, TROOPZ shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the site, your purchase of products, or any inability to access the site.",
    },
    {
      title: "14. Indemnification",
      body:
        "You agree to defend, indemnify, and hold harmless TROOPZ and its affiliates, owners, officers, employees, and service providers from any claims, damages, liabilities, costs, or expenses arising from your misuse of the site or violation of these Terms.",
    },
    {
      title: "15. Governing Law",
      body:
        "These Terms shall be governed by and interpreted under the laws of the applicable state and federal laws of the United States, without regard to conflict of law principles.",
    },
    {
      title: "16. Changes to These Terms",
      body:
        "TROOPZ reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the site after changes are posted constitutes acceptance of those changes.",
    },
  ];

  return (
    <main className="page-section">
      <div className="shell narrow-page">
        <p className="eyebrow">Policy</p>
        <h1>Terms of Service</h1>
        <p className="lead">
          Welcome to TROOPZ. By accessing or using this website, you agree to be bound
          by these Terms of Service and all applicable laws and regulations. If you do
          not agree, please do not use this site.
        </p>
        <div className="policy-scroll-box stack">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <section>
            <h2>17. Contact</h2>
            <p>For questions regarding these Terms, contact:</p>
            <p>
              <a href="mailto:troopzsoulja@gmail.com">troopzsoulja@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
