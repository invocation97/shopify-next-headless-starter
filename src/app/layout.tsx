import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getStoreBranding } from "@/lib/shopify/server/branding";
import { storeConfig } from "@/config/store";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getStoreBranding();
  return {
    title: storeConfig.branding.name,
    description: brand.slogan ?? brand.shortDescription ?? "",
    openGraph: {
      title: storeConfig.branding.name,
      description: brand.slogan ?? brand.shortDescription ?? "",
      images: [brand.logo?.image?.url],
    },
    twitter: {
      title: storeConfig.branding.name,
      description: brand.slogan ?? brand.shortDescription ?? "",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const brand = await getStoreBranding();
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      >
        <Providers>
          <Header brand={brand} />
          {children}
          <Footer brand={brand} />
        </Providers>
      </body>
    </html>
  );
}
