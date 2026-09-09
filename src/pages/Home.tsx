import { Hero } from "../components/home/Hero";
import { NewsTicker } from "../components/home/NewsTicker";
import { About } from "../components/home/About";
import { AppsAndServices } from "../components/home/AppsAndServices";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Screenshots } from "../components/home/Screenshots";
import { ImageGallery } from "../components/home/ImageGallery";

export default function Home() {
  return (
    <div className="bg-[#0a0c14] min-h-screen text-gray-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
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
