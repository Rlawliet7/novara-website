import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { Choreography } from "@/components/scroll/Choreography";
import { RoomIntro } from "@/components/intro/RoomIntro";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
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
        <RoomIntro><Hero /></RoomIntro>
        <Approach />
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
      {/* Ditaruh di akhir pohon halaman, bukan di layout: efek di layout jalan
          sebelum boundary konten selesai terhidrasi, dan style inline dari GSAP
          akan terbaca React sebagai beda server/klien. */}
      <SmoothScroll />
      <Choreography />
    </>
  );
}