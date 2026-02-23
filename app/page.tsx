import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Methodology from "@/components/Methodology";
import AIStrategist from "@/components/AIStrategist";
import Partnerships from "@/components/Partnerships";
import CaseStudies from "@/components/CaseStudies";
import Awards from "@/components/Awards";
import CelebStrip from "@/components/CelebStrip";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AIAssistant from "@/components/AIAssistant";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Methodology />
      </ScrollReveal>
      <ScrollReveal>
        <AIStrategist />
      </ScrollReveal>
      <ScrollReveal>
        <Partnerships />
      </ScrollReveal>
      <ScrollReveal>
        <CaseStudies />
      </ScrollReveal>
      <ScrollReveal>
        <Awards />
      </ScrollReveal>
      <ScrollReveal>
        <CelebStrip />
      </ScrollReveal>
      <br />
      <br />
      <ScrollReveal>
        <FinalCTA />
      </ScrollReveal>
      <Footer />
      <AIAssistant />
    </>
  );
}
