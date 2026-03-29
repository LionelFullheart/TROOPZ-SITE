import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
        <Header />
        {children}
        <Footer />
        <MusicPlayer />
      </body>
    </html>
  );
}
