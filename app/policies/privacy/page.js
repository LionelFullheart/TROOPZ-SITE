export const metadata = {
  title: "Privacy Policy | TROOPZ",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      body: (
        <>
          <p>
            <strong>a. Personal Information</strong>
          </p>
          <p>We may collect:</p>
          <p>- Name</p>
          <p>- Email address</p>
          <p>- Shipping and billing address</p>
          <p>- Phone number (if provided)</p>
          <p>
            <strong>b. Payment Information</strong>
          </p>
          <p>
            All payments are processed securely through Stripe. We do NOT store your
            full payment details such as credit card numbers.
          </p>
          <p>
            <strong>c. Automatically Collected Data</strong>
          </p>
          <p>We may automatically collect:</p>
          <p>- IP address</p>
          <p>- Browser type</p>
          <p>- Device information</p>
          <p>- Pages visited and interactions on our site</p>
        </>
      ),
    },
    {
      title: "2. How We Use Your Information",
      body: (
        <>
          <p>We use your information to:</p>
          <p>- Process and fulfill orders</p>
          <p>- Provide customer support</p>
          <p>- Send order confirmations and updates</p>
          <p>- Improve our website and customer experience</p>
          <p>- Send marketing emails (only if you opt in)</p>
        </>
      ),
    },
    {
      title: "3. Sharing Your Information",
      body: (
        <>
          <p>We do NOT sell your personal data.</p>
          <p>We may share your information with trusted third parties:</p>
          <p>- Payment processors (Stripe)</p>
          <p>- Shipping carriers (for delivery)</p>
          <p>- Analytics tools (to improve site performance)</p>
        </>
      ),
    },
    {
      title: "4. Cookies and Tracking",
      body: (
        <>
          <p>We use cookies and similar technologies to:</p>
          <p>- Improve your browsing experience</p>
          <p>- Analyze website traffic</p>
          <p>- Understand user behavior</p>
          <p>You can disable cookies in your browser settings at any time.</p>
        </>
      ),
    },
    {
      title: "5. Email Marketing",
      body: (
        <>
          <p>If you subscribe to our mailing list, you may receive:</p>
          <p>- Product drops</p>
          <p>- Promotions</p>
          <p>- Brand updates</p>
          <p>You can unsubscribe at any time using the link in our emails.</p>
        </>
      ),
    },
    {
      title: "6. Data Security",
      body: (
        <p>
          We use industry-standard security measures to protect your personal
          information. However, no method of internet transmission is 100% secure.
        </p>
      ),
    },
    {
      title: "7. Your Rights",
      body: (
        <>
          <p>Depending on your location, you may have the right to:</p>
          <p>- Access your personal data</p>
          <p>- Request corrections or deletion</p>
          <p>- Opt out of marketing communications</p>
          <p>
            To make a request, contact us at{" "}
            <a href="mailto:troopzsoulja@gmail.com">troopzsoulja@gmail.com</a>.
          </p>
        </>
      ),
    },
    {
      title: "8. Third-Party Links",
      body: (
        <p>
          Our website may contain links to third-party sites. We are not responsible
          for their privacy practices.
        </p>
      ),
    },
    {
      title: "9. Children’s Privacy",
      body: (
        <p>
          Our services are not intended for individuals under the age of 13. We do
          not knowingly collect personal data from children.
        </p>
      ),
    },
    {
      title: "10. Changes to This Policy",
      body: (
        <p>
          We may update this Privacy Policy at any time. Updates will be posted on
          this page with a new effective date.
        </p>
      ),
    },
    {
      title: "11. Contact",
      body: (
        <>
          <p>If you have any questions about this Privacy Policy, contact us at:</p>
          <p>
            Email: <a href="mailto:troopzsoulja@gmail.com">troopzsoulja@gmail.com</a>
          </p>
          <p>
            Website:{" "}
            <a href="https://www.troopzsoulja.com">https://www.troopzsoulja.com</a>
          </p>
        </>
      ),
    },
  ];

  return (
    <main className="page-section">
      <div className="shell narrow-page">
        <p className="eyebrow">Policy</p>
        <h1>Privacy Policy</h1>
        <p className="lead">
          TROOPZ respects your privacy and is committed to protecting your personal
          information.
        </p>
        <div className="policy-scroll-box stack">
          <p>
            <strong>Effective Date:</strong> April 28, 2026
          </p>
          <p>
            TROOPZ (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your
            privacy and is committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, and safeguard your
            information when you visit our website:{" "}
            <a href="https://www.troopzsoulja.com">https://www.troopzsoulja.com</a>
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
