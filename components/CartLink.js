"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="cart-link">
      Cart{itemCount ? ` (${itemCount})` : ""}
    </Link>
  );
}
