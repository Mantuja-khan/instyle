import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Collections } from "@/components/landing/Collections";
import { NewArrivals } from "@/components/landing/NewArrivals";
import { PromoCards } from "@/components/landing/PromoCards";
import { Trending } from "@/components/landing/Trending";
import { FestiveBanner } from "@/components/landing/FestiveBanner";
import { StyleRecommended } from "@/components/landing/StyleRecommended";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InStyle — Effortless Modern Fashion for Women" },
      {
        name: "description",
        content:
          "Timeless pieces, thoughtfully designed for every moment of your day. Shop curated collections, new arrivals and trending styles at InStyle.",
      },
      { property: "og:title", content: "InStyle — Effortless Modern Fashion for Women" },
      {
        property: "og:description",
        content: "Timeless pieces, thoughtfully designed for every moment of your day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InStyleHome,
});

function InStyleHome() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <Hero />
        <Collections />
        <NewArrivals />
        <PromoCards />
        <Trending />
        <FestiveBanner />
        <StyleRecommended />
      </main>
      <Footer />
    </div>
  );
}
