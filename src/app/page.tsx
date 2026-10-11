import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Challenges } from "@/components/sections/Challenges";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { WhyNovara } from "@/components/sections/WhyNovara";
import { Portfolio } from "@/components/sections/Portfolio";
import { TargetClients } from "@/components/sections/TargetClients";
import { VisionMission } from "@/components/sections/VisionMission";
import { Collaboration } from "@/components/sections/Collaboration";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Challenges />
        <About />
        <Services />
        <Solutions />
        <TechStack />
        <Process />
        <CTAStrip />
        <WhyNovara />
        <Portfolio />
        <TargetClients />
        <VisionMission />
        <Collaboration />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}