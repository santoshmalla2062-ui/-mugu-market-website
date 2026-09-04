import { Hero } from "@/components/home/Hero";
import { ImageGallery } from "@/components/home/ImageGallery";
import { AppsAndServices } from "@/components/home/AppsAndServices";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Screenshots } from "@/components/home/Screenshots";
import { About } from "@/components/home/About";
import { NewsTicker } from "@/components/home/NewsTicker";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NewsTicker />
      <Hero />
      <ImageGallery />
      <AppsAndServices />
      <WhyChooseUs />
      <Screenshots />
      <About />
    </div>
  );
}
