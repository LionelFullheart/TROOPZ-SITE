import Stripe from "stripe";

export function hasStripeConfig() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_SITE_URL);
}

export function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}
