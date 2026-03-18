import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const products = [
  {
    id: "orange",
    bgColor: "#FFF3C4", // Soft yellow
    accentColor: "#D4B84D",
    image: `${import.meta.env.BASE_URL}images/bottle-lavender.png`,
  },
  {
    id: "jasmine",
    bgColor: "#C4E8FF", // Sky blue
    accentColor: "#68B3E3",
    image: `${import.meta.env.BASE_URL}images/bottle-ocean.png`,
  },
  {
    id: "aloe-vera",
    bgColor: "#C4F0D4", // Mint green
    accentColor: "#65C284",
    image: `${import.meta.env.BASE_URL}images/bottle-citrus.png`,
  }
];

export function ProductCarousel() {
  const { t, dir } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const activeProduct = products[activeIndex];
  const activeName = t(`products.${activeProduct.id}.name`);
  const activeScent = t(`products.${activeProduct.id}.scent`);
  const activeDesc = t(`products.${activeProduct.id}.desc`);
  const isRtl = dir === "rtl";

  const slideLeft = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const slideRight = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const onPrev = isRtl ? slideRight : slideLeft;
  const onNext = isRtl ? slideLeft : slideRight;

  return (
    <motion.section
      id="products"
      animate={{ backgroundColor: activeProduct.bgColor }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-sm font-semibold tracking-wide"
          >
            <Droplets className="w-4 h-4" style={{ color: activeProduct.accentColor }} />
            <span className="text-gray-800">{t("products.kicker")}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
          >
            {t("products.title")}
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 w-full md:w-1/2 relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -50, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/40 backdrop-blur-md shadow-2xl flex items-center justify-center p-8 border border-white/50">
                  <div className="absolute inset-0 rounded-full border border-white/60 animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
                  <img 
                    src={activeProduct.image} 
                    alt={activeName} 
                    className="w-full h-full object-contain relative z-10 drop-shadow-xl hover:-translate-y-2 transition-transform duration-500" 
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={cn("flex-1 w-full md:w-1/2 text-center z-20", isRtl ? "md:text-right" : "md:text-left")}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{activeName}</h3>
                <p className="text-lg font-medium mb-6" style={{ color: activeProduct.accentColor }}>{activeScent}</p>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                  {activeDesc}
                </p>
                <div
                  className={cn(
                    "flex items-center justify-center gap-4",
                    isRtl ? "md:justify-end md:flex-row-reverse" : "md:justify-start"
                  )}
                >
                  <Link href={`/buy?variant=${activeProduct.id}`}>
                    <Button size="lg" className="rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: '#0A0F2C', color: 'white' }}>
                      {t("products.order")}
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={onPrev} className="rounded-full h-12 w-12 border-gray-900/10 hover:bg-white/50 bg-white/30 backdrop-blur-sm">
                      {isRtl ? (
                        <ChevronRight className="w-5 h-5 text-gray-900" />
                      ) : (
                        <ChevronLeft className="w-5 h-5 text-gray-900" />
                      )}
                    </Button>
                    <Button variant="outline" size="icon" onClick={onNext} className="rounded-full h-12 w-12 border-gray-900/10 hover:bg-white/50 bg-white/30 backdrop-blur-sm">
                      {isRtl ? (
                        <ChevronLeft className="w-5 h-5 text-gray-900" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-900" />
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className={cn(
                "flex items-center justify-center gap-3 mt-12",
                isRtl ? "md:justify-end md:flex-row-reverse" : "md:justify-start"
              )}
            >
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-gray-900' : 'bg-gray-900/20 hover:bg-gray-900/40'}`}
                  aria-label={t("products.goTo", { name: t(`products.${p.id}.name`) })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
