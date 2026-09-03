import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

import img1 from "@/assets/images/sunset_valley_1788081186609.jpg";
import img2 from "@/assets/images/village_view_1788081252406.jpg";
import img3 from "@/assets/images/golden_field_1788081270515.jpg";
import img4 from "@/assets/images/lush_terrace_1788081236555.jpg";

export function ImageGallery() {
  const [images, setImages] = useState<string[]>([img1, img2, img3, img4]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from Firestore
  useEffect(() => {
    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const uploadedImages = snapshot.docs.map((doc) => doc.data().imageUrl as string);
      
      // Combine newly uploaded images from db with default images
      setImages([...uploadedImages, img1, img2, img3, img4]);
      
      // Keep index in bounds if array size changes
      setCurrentIndex((prev) => Math.min(prev, uploadedImages.length + 3)); 
    });

    return () => unsubscribe();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="py-20 relative z-10 bg-black/20 border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Explore Mugu
            </h2>
            <p className="text-lg text-gray-400">
              Beautiful scenery from the Mugu region. Images are managed by the admin.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl border border-white/10 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient Overlay for better control visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors border border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20 flex-wrap px-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-emerald-400 w-8" : "bg-white/40 hover:bg-white/60 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
