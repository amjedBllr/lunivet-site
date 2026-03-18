import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LANGUAGES, type Language } from "@/i18n/translations";
import { useI18n } from "@/i18n/I18nProvider";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  // The home and about pages have a dark hero at the top
  const isDarkHeroPage = location === "/" || location === "/about";
  const needsTransparentNav = isDarkHeroPage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        needsTransparentNav 
          ? "bg-transparent py-6" 
          : "bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-border/50"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group outline-none">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="LuniVet"
              className={cn(
                "h-8 w-8 object-contain transition-all duration-300",
                needsTransparentNav && "brightness-0 invert"
              )}
            />
            <span className={cn(
              "text-2xl tracking-tight transition-all duration-300",
              needsTransparentNav 
                ? "text-white" 
                : "bg-gradient-to-r from-purple-500 via-sky-400 to-blue-900 text-transparent bg-clip-text"
            )}>
              <span
                style={{
                  fontFamily: "'Allura', cursive",
                  fontWeight: 900,
                  textShadow: needsTransparentNav ? "none" : "0 0 1.2px rgba(0,0,0,0.45), 0 0 0.7px rgba(0,0,0,0.45)",
                }}
                className="inline-block leading-[1.15] py-0.5"
              >
                LuniVet
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.key} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all hover:opacity-70 outline-none",
                  needsTransparentNav ? "text-white/90" : "text-muted-foreground hover:text-foreground",
                  location === link.href && !needsTransparentNav && "text-primary font-semibold",
                  location === link.href && needsTransparentNav && "text-white font-semibold"
                )}
              >
                {t(link.key)}
              </Link>
            ))}

            <div className="relative">
              <Button
                type="button"
                className={cn(
                  "rounded-full px-2 h-10 bg-transparent border-0 shadow-none outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                  "hover:bg-transparent hover:opacity-70",
                  needsTransparentNav ? "text-white/90" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {LANGUAGES.find((l) => l.code === lang)?.label ?? lang}
                <ChevronDown className="w-4 h-4 ml-2 opacity-70" />
              </Button>
              <select
                aria-label="Language"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <Link href="/buy" className="outline-none">
              <Button 
                variant={needsTransparentNav ? "secondary" : "default"} 
                className={cn(
                  "rounded-full px-6 transition-transform hover:scale-105 shadow-md border-0",
                  needsTransparentNav ? "bg-white text-primary hover:bg-white/90" : ""
                )}
              >
                {t("nav.buyNow")}
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn("h-6 w-6", needsTransparentNav ? "text-white" : "text-primary")} />
            ) : (
              <Menu className={cn("h-6 w-6", needsTransparentNav ? "text-white" : "text-primary")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-b border-border/50 py-4 px-4 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.key} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-medium transition-colors outline-none",
                  location === link.href ? "bg-primary/5 text-primary" : "text-foreground hover:bg-gray-50"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="relative">
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full h-auto px-4 py-3 rounded-lg text-base font-medium transition-colors outline-none justify-between"
              >
                <span>{LANGUAGES.find((l) => l.code === lang)?.label ?? lang}</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Button>
              <select
                aria-label="Language"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="absolute inset-0 opacity-0 cursor-pointer outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-4 pt-2 pb-2 border-t border-gray-100 mt-2">
              <Link href="/buy" onClick={() => setMobileMenuOpen(false)} className="outline-none">
                <Button className="w-full rounded-xl border-0" size="lg">{t("nav.buyNow")}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
