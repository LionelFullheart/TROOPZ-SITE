import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getStripeClient, hasStripeConfig } from "@/lib/stripe";

export async function POST(request) {
  try {
    const body = await request.json();
    const cartItems = Array.isArray(body.items)
      ? body.items
      : [
          {
            slug: body.slug,
            quantity: body.quantity,
            size: body.size,
          },
        ];

    if (!cartItems.length) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const normalizedItems = cartItems.map((item) => {
      const product = getProductBySlug(item.slug);

      if (!product) {
        throw new Error("Product not found.");
      }

      if (product.price == null) {
        throw new Error(
          "One or more products do not have pricing set yet. Please use the contact form to order."
        );
      }

      return {
        product,
        quantity: Math.min(Math.max(Number(item.quantity) || 1, 1), 10),
        size: item.size || product.availableSizes[0],
      };
    });

    if (!hasStripeConfig()) {
      const demoUrl = `/success?mode=demo&items=${normalizedItems.length}&product=${encodeURIComponent(
        normalizedItems[0].product.name
      )}`;
      return NextResponse.json({ url: demoUrl, mode: "demo" });
    }

    const stripe = getStripeClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${siteUrl}/success?mode=live&items=${normalizedItems.length}&product=${encodeURIComponent(
        normalizedItems[0].product.name
      )}`,
      cancel_url: `${siteUrl}/cart`,
      line_items: normalizedItems.map(({ product, quantity, size }) => ({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price * 100,
          product_data: {
            name: `${product.name} (${size})`,
            description: product.description,
          },
        },
      })),
    });

    return NextResponse.json({ url: session.url, mode: "live" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
