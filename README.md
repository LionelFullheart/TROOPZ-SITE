# TROOPZ Ecommerce Starter

Fast v1 brand site and jacket storefront for TROOPZ, built with Next.js and ready for Vercel.

## What this includes

- Home page
- Shop page
- Product detail pages for 3 mock jackets
- About page
- Contact page
- Checkout return page
- Footer policy pages
- Demo-safe checkout flow with Stripe-ready architecture

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Vercel will detect Next.js automatically.
4. Add environment variables in Vercel when you are ready for live Stripe checkout.
5. Deploy.

## Where to add the logo

- Main logo file: [public/logo.png](/Users/lionelfullheart/Downloads/troopz-uspto-site/public/logo.png)
- Replace that file with your final TROOPZ logo export using the same filename.

## Where to replace jacket images

- Mock product images live in:
  - [public/products/utility-jacket.svg](/Users/lionelfullheart/Downloads/troopz-uspto-site/public/products/utility-jacket.svg)
  - [public/products/field-jacket.svg](/Users/lionelfullheart/Downloads/troopz-uspto-site/public/products/field-jacket.svg)
  - [public/products/signature-camo-jacket.svg](/Users/lionelfullheart/Downloads/troopz-uspto-site/public/products/signature-camo-jacket.svg)

- Product data is managed in:
  - [lib/products.js](/Users/lionelfullheart/Downloads/troopz-uspto-site/lib/products.js)

- To replace images later:
  1. Add your real jacket images to `public/products/`
  2. Update the `image` value for each product in `lib/products.js`

## Where to edit text and contact info

- Brand/site content: [lib/site.js](/Users/lionelfullheart/Downloads/troopz-uspto-site/lib/site.js)
- Home page layout: [app/page.js](/Users/lionelfullheart/Downloads/troopz-uspto-site/app/page.js)
- Contact page: [app/contact/page.js](/Users/lionelfullheart/Downloads/troopz-uspto-site/app/contact/page.js)

## Stripe setup

The site works without Stripe keys.

If Stripe environment variables are missing, `Buy Now` sends customers through a safe demo checkout flow so the app still works in development and after deployment.

When you are ready to enable live checkout, add:

```bash
STRIPE_SECRET_KEY=sk_test_or_live_key_here
NEXT_PUBLIC_SITE_URL=https://your-live-domain.com
```

Stripe checkout logic lives in:

- [app/api/checkout/route.js](/Users/lionelfullheart/Downloads/troopz-uspto-site/app/api/checkout/route.js)
- [lib/stripe.js](/Users/lionelfullheart/Downloads/troopz-uspto-site/lib/stripe.js)

## Founder-friendly edit points

- Products: `lib/products.js`
- Brand copy: `lib/site.js`
- Global styling: `app/globals.css`
- Header/footer components: `components/Header.js`, `components/Footer.js`

## Notes

- This is intentionally a fast, lightweight v1.
- The contact form currently works in demo mode and should later be connected to email, a CRM, or form handling service.
- Replace mock policies with your real business and legal language before public launch.
