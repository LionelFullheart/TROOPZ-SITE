"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function CartPageClient() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (data.mode === "demo") {
        clearCart();
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError.message);
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <div className="shell narrow-page success-panel">
        <p className="eyebrow">Cart</p>
        <h1>Your cart is empty.</h1>
        <p className="lead">Add products from the shop, then come back here to check out.</p>
        <div className="button-row">
          <Link href="/shop" className="button">
            Shop Products
          </Link>
          <Link href="/contact" className="button-secondary">
            Contact TROOPZ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell cart-layout">
      <div>
        <p className="eyebrow">Cart</p>
        <h1>Your TROOPZ cart</h1>

        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={`${item.slug}-${item.size}`}>
              <div className="cart-item-image">
                <Image src={item.image} alt={item.name} width={360} height={360} />
              </div>
              <div className="cart-item-copy">
                <p className="product-label">TROOPZ {item.category || "Product"}</p>
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p>{item.price != null ? `$${item.price} USD` : item.priceLabel}</p>
                <div className="cart-actions">
                  <label className="field inline-field">
                    <span>Qty</span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(
                          item.slug,
                          item.size,
                          Number(event.target.value) || 1
                        )
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => removeItem(item.slug, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="cart-summary">
        <p className="eyebrow">Summary</p>
        <h2>{itemCount} item{itemCount === 1 ? "" : "s"}</h2>
        <p className="detail-price">${subtotal} USD</p>
        <p className="helper-text">
          Checkout will hand off to Stripe when keys are connected. Until then, the demo
          checkout flow stays active and safe for the live site.
        </p>
        <button type="button" className="button" onClick={handleCheckout} disabled={loading}>
          {loading ? "Starting checkout..." : "Proceed to Checkout"}
        </button>
        <Link href="/shop" className="button-secondary">
          Continue Shopping
        </Link>
        {error ? <p className="error-text">{error}</p> : null}
      </aside>
    </div>
  );
}
