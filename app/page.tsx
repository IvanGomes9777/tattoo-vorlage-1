import { Hero } from "@/components/hero/Hero";
import { Portfolio } from "@/components/work/Portfolio";
import { Artists } from "@/components/artists/Artists";
import { Process } from "@/components/process/Process";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Artists />
      <Process />
      <Contact />
    </main>
  );
}
