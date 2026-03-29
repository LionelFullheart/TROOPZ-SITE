import { CartPageClient } from "@/components/CartPageClient";

export const metadata = {
  title: "Cart | TROOPZ",
  description: "Review your TROOPZ cart and continue to checkout.",
};

export default function CartPage() {
  return (
    <main className="page-section">
      <CartPageClient />
    </main>
  );
}
