export function MarqueeBar() {
  const items = [
    "Napalm Collection Live",
    "Slides $100 USD",
    "Hooded Sweatshirt $120 USD",
    "Denim Jacket $150 USD",
    "Orders via Cart + Stripe Checkout Flow",
  ];

  return (
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
