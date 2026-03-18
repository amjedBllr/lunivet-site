import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Leaf, Heart, Star, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { useI18n } from "@/i18n/I18nProvider";

export default function Home() {
  const { t } = useI18n();
  return (
    <PageLayout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0A0F2C]">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Dark starry sky"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F2C]/50 to-[#0A0F2C]" />
        </div>
        
        <div className="container relative z-10 px-4 py-16 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-30 h-30 rounded-full bg-white flex items-center justify-center border border-white/20 mx-auto shadow-2xl shadow-white/5 overflow-hidden p-2">
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight"
          >
            {t("home.hero.title1")} <span className="text-[#FFF3C4]">{t("home.hero.title2")}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            {t("home.hero.subtitle")}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button 
              onClick={() => {
                const element = document.getElementById("products");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              size="lg" 
              className="rounded-full h-14 px-8 text-base bg-white text-[#0A0F2C] hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              {t("home.hero.discover")}
            </Button>
            <Link href="/buy">
              <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-base border-white/30 text-white hover:bg-white/10 bg-transparent">
                {t("home.hero.order")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest uppercase text-primary mb-4"
            >
              {t("home.promise.kicker")}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight"
            >
              {t("home.promise.title")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: t("home.features.0.title"), desc: t("home.features.0.desc") },
              { icon: Heart, title: t("home.features.1.title"), desc: t("home.features.1.desc") },
              { icon: Sparkles, title: t("home.features.2.title"), desc: t("home.features.2.desc") }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="p-8 h-full border-border/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS CAROUSEL */}
      <ProductCarousel />

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("home.testimonials.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("home.testimonials.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Sarah Jenkins", pet: "Luna (Golden Retriever)", 
                quote: "The Lavender Dream mousse is a lifesaver! Luna used to hate baths, but now I just massage this in and wipe her down. She smells amazing.",
                // testimonial happy dog
                img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop"
              },
              { 
                name: "Michael Chen", pet: "Oliver (Maine Coon)", 
                quote: "Finding a product that works for cats is tough. The Ocean Breeze variant is so gentle and doesn't leave any sticky residue. Highly recommend.",
                // testimonial cute cat
                img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop"
              },
              { 
                name: "Emma Davis", pet: "Bella (French Bulldog)", 
                quote: "We travel a lot, and the Citrus Fresh mousse is always in our bag. It's perfect for cleaning muddy paws before getting back in the car.",
                // testimonial french bulldog
                img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="p-8 bg-gray-50 border-none shadow-sm relative pt-12 mt-8">
                  <div className="absolute -top-10 left-8">
                    <img src={t.img} alt={t.pet} className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" />
                  </div>
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.pet}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION / INFO */}
      <section className="py-24 bg-gray-50 relative border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("home.hq.title")}</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {t("home.hq.body")}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t("home.hq.name")}</h4>
                    <p className="text-muted-foreground">Constantine, Ali Mendjeli<br/>Elkhroub</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t("home.hq.phone")}</h4>
                    <p className="text-muted-foreground">(+213) 783 898 814</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t("home.hq.email")}</h4>
                    <p className="text-muted-foreground">hello@lunivet.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[500px] rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205844.22658225!2d6.484777305117366!3d36.28038080666346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f17262431fb97d%3A0x8d872fd9c9dcb7c6!2sEl%20Khroub!5e0!3m2!1sen!2sdz!4v1773849112472!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                title="LuniVet Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
