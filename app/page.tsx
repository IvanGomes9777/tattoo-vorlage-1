import { Hero } from "@/components/hero/Hero";
import { Portfolio } from "@/components/work/Portfolio";
import { Artists } from "@/components/artists/Artists";
import { Process } from "@/components/process/Process";
import { Studio } from "@/components/studio/Studio";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <main id="top">
        <Hero />
        <Portfolio />
        <Artists />
        <Process />
        <Contact />
        <Studio />
      </main>
      <Footer />
    </>
  );
}
