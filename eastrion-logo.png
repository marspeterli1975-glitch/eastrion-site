import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eastrion | Global Supply Chain Infrastructure",
  description:
    "Eastrion positions supply chain infrastructure, industry capability and risk intelligence within one operating model, with RiskAtlas as its flagship product module.",
  icons: {
    icon: "/eastrion-logo.png",
    shortcut: "/eastrion-logo.png",
    apple: "/eastrion-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
