import { Hero } from "@/components/hero/Hero";
import { Portfolio } from "@/components/work/Portfolio";
import { Artists } from "@/components/artists/Artists";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Artists />
      <Contact />
    </main>
  );
}
