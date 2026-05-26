import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-blue-500/20">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
}
