import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarqueeBar } from "@/components/MarqueeBar";
import { MusicPlayer } from "@/components/MusicPlayer";

export const metadata = {
  title: "TROOPZ | Jackets and Brand Store",
  description:
    "TROOPZ official brand site and direct-to-customer jacket storefront.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <MarqueeBar />
          {children}
          <Footer />
          <MusicPlayer />
        </CartProvider>
      </body>
    </html>
  );
}
