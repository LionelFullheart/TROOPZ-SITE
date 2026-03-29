import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getStripeClient, hasStripeConfig } from "@/lib/stripe";

export async function POST(request) {
  try {
    const body = await request.json();
    const product = getProductBySlug(body.slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const quantity = Math.min(Math.max(Number(body.quantity) || 1, 1), 10);
    const size = body.size || product.availableSizes[0];

    if (product.price == null) {
      return NextResponse.json(
        { error: "Pricing is not set yet for this product. Please use the contact form to order." },
        { status: 400 }
      );
    }

    if (!hasStripeConfig()) {
      const demoUrl = `/success?mode=demo&product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(size)}&quantity=${quantity}`;
      return NextResponse.json({ url: demoUrl, mode: "demo" });
    }

    const stripe = getStripeClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${siteUrl}/success?mode=live&product=${encodeURIComponent(product.name)}`,
      cancel_url: `${siteUrl}/products/${product.slug}`,
      line_items: [
        {
          quantity,
          price_data: {
            currency: "usd",
            unit_amount: product.price * 100,
            product_data: {
              name: `${product.name} (${size})`,
              description: product.description,
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url, mode: "live" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
