"use client";

import { useState } from "react";

export function ProductPurchaseForm({ product }) {
  const [size, setSize] = useState(product.availableSizes[0] ?? "M");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: product.slug,
          quantity,
          size,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="purchase-panel" onSubmit={handleCheckout}>
      <label className="field">
        <span>Size</span>
        <select value={size} onChange={(event) => setSize(event.target.value)}>
          {product.availableSizes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Quantity</span>
        <input
          type="number"
          min="1"
          max="10"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </label>

      {product.price != null ? (
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Starting checkout..." : "Buy Now"}
        </button>
      ) : (
        <a className="button" href="/contact">
          Ask About Ordering
        </a>
      )}

      <a className="text-link" href="/contact">
        Inquire or place an order directly
      </a>

      <p className="helper-text">
        {product.price != null
          ? "If Stripe keys are not added yet, this will continue in demo checkout mode."
          : "Pricing is being finalized. Use the contact option to place an order or request current pricing."}
      </p>

      {error ? <p className="error-text">{error}</p> : null}
    </form>
  );
}
