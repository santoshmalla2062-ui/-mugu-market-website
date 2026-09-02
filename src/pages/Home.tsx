import { Hero } from "@/components/home/Hero";
import { AppsAndServices } from "@/components/home/AppsAndServices";
import { Features } from "@/components/home/Features";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Screenshots } from "@/components/home/Screenshots";
import { About } from "@/components/home/About";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AppsAndServices />
      <WhyChooseUs />
      <Features />
      <Screenshots />
      <About />
    </div>
  );
}
