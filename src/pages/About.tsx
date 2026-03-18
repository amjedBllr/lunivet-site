import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export default function About() {
  const { t } = useI18n();
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0F2C] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
          <img 
            src={`${import.meta.env.BASE_URL}images/about-hero.png`} 
            alt="Pets resting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F2C] to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("about.hero.title")}</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {t("about.hero.body")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("about.mission.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t("about.mission.p1")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t("about.mission.p2")}
              </p>
              <ul className="space-y-4">
                {[t("about.mission.bullets.0"), t("about.mission.bullets.1"), t("about.mission.bullets.2")].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src={`${import.meta.env.BASE_URL}images/about-hero.png`} 
                alt="Happy pets" 
                className="rounded-3xl shadow-2xl w-full object-cover aspect-square md:aspect-auto md:h-[600px]"
              />
            </div>
          </div>

          <h3 className="text-3xl font-bold text-center mb-12">{t("about.values.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t("about.values.0.title"), desc: t("about.values.0.desc") },
              { title: t("about.values.1.title"), desc: t("about.values.1.desc") },
              { title: t("about.values.2.title"), desc: t("about.values.2.desc") }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 h-full bg-gray-50 border-none">
                  <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                  <p className="text-muted-foreground">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("about.team.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.team.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { name: "Jessica Lin", role: "Founder & CEO", img: "https://images.vexels.com/media/users/3/272731/isolated/preview/ff4ad0ee47cbeee01a346c3bb4349c2f-simple-animal-cat.png" },
              { name: "Dr. Robert Vance", role: "Head of Formulation", img: "https://images.vexels.com/media/users/3/272731/isolated/preview/ff4ad0ee47cbeee01a346c3bb4349c2f-simple-animal-cat.png" },
              { name: "Amanda Rossi", role: "Customer Experience", img: "https://images.vexels.com/media/users/3/272731/isolated/preview/ff4ad0ee47cbeee01a346c3bb4349c2f-simple-animal-cat.png" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300">
                  {/* team member portrait placeholder */}
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-primary font-medium mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
