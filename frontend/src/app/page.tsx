import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { AnalyticsDemo } from "@/components/sections/analytics-demo";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <AnalyticsDemo />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}
