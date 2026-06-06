export function MarqueeBar() {
  const items = [
    "LA Capone Capsule Live",
    "Graphic Tee $68 USD",
    "Hoodie $160 USD",
    "Varsity Jacket $398 USD",
    "Shop the Legacy Capsule",
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
