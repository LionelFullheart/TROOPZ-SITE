"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function ProductPurchaseForm({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.availableSizes[0] ?? "M");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");

  function handleAddToCart(event) {
    event.preventDefault();
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      category: product.category,
      size,
      quantity,
      price: product.price,
      priceLabel: product.priceLabel,
    });
    setNotice(`${product.name} added to cart.`);
  }

  return (
    <form className="purchase-panel" onSubmit={handleAddToCart}>
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
        <>
          <button type="submit" className="button">
            Add to Cart
          </button>
          <Link href="/cart" className="button-secondary">
            View Cart
          </Link>
        </>
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
          ? "Add products to your cart here, then continue to checkout at the end. Stripe will take over when keys are connected."
          : "Pricing is being finalized. Use the contact option to place an order or request current pricing."}
      </p>

      {notice ? <p className="helper-text">{notice}</p> : null}
    </form>
  );
}
