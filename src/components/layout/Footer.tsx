import { Link } from "wouter";
import { Moon, Instagram, Facebook } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const TikTokIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.1A6.9 6.9 0 1 0 17.9 13.29a4.85 4.85 0 0 1-.3-4.6Z"/>
  </svg>
);


export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#0A0F2C] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group outline-none inline-flex">
              <Moon className="h-8 w-8 text-white group-hover:text-[#FFF3C4] transition-colors" />
              <span className="text-2xl font-bold tracking-tight">LuniVet</span>
            </Link>
            <p className="text-white/70 max-w-sm leading-relaxed mb-8">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/lunivet_dz/" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/people/Lunivet/61584494005709/" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@lunivet_25?_r" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                <TikTokIcon />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 tracking-wide">{t("footer.quickLinks")}</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/" className="text-white/70 hover:text-white transition-colors">{t("nav.home")}</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/#products" className="text-white/70 hover:text-white transition-colors">{t("footer.products")}</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 tracking-wide">{t("footer.contactUs")}</h4>
            <ul className="flex flex-col gap-4 text-white/70">
              <li>Constantine, Ali Mendjeli</li>
              <li>Elkhroub</li>
              <li><a href="mailto:hello@lunivet.com" className="hover:text-white transition-colors">hello@lunivet.com</a></li>
              <li><a href="tel:+213783898814" className="hover:text-white transition-colors">(+213) 783 898 814</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} LuniVet. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
