"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Home, Building, DollarSign, Calendar, Users, 
  UserCheck, Mail, ChevronRight, Heart, Sun, Moon
} from "lucide-react";
import { useTheme } from "next-themes";

const NAV = [
  { label: "Home", href: "/", icon: Home },
  { label: "Rent", href: "/rent", icon: Building },
  { label: "Buy", href: "/buy", icon: DollarSign },
  { label: "Short Let", href: "/short-let", icon: Calendar },
  { label: "Commercial", href: "/commercial", icon: Building },
  { label: "Landlords", href: "/landlords", icon: Users, hasSubmenu: true },
  { label: "Tenants", href: "/tenants", icon: UserCheck, hasSubmenu: true },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true); 
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setAnimate(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 border-b bg-slate-100 z-50 shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="LINEAS Estate Agents"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
     <header 
  className="sticky top-0 border-b z-50 shadow-md backdrop-blur-sm w-full"
  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--foreground, #e2e8f0)' }}
>
  <div className="w-full px-4 sm:px-6 lg:px-20 h-20 flex items-center justify-between">
    {/* Logo */}
    <Link href="/" className="flex items-center gap-2">
      <img
        src='/lineas-logo.png'
        alt="LINEAS Estate Agents"
        className="h-12 w-auto object-contain"
      />
    </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((item, index) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative px-1 py-1 font-medium"
                  style={{ color: 'var(--foreground)' }}
                >
                  <span
                    className={[
                      "whitespace-nowrap block transition-all duration-500 ease-out font-semibold",
                      animate ? `animate-slideInUp` : "",
                    ].join(" ")}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.label}
                  </span>
                  <span
                    className={[
                      "absolute left-0 -bottom-1 h-[2px] origin-left transition-transform duration-300",
                      active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                    style={{ backgroundColor: 'var(--foreground)' }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3 ml-2">
            <Link
              href="/valuation"
              className="rounded-sm border px-4 py-2 text-sm font-semibold transition hover:opacity-80 whitespace-nowrap"
              style={{ borderColor: 'var(--foreground)', backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
            >
              Book Valuation
            </Link>

            <Link
              href="/favorites"
              className="group flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition hover:opacity-80 whitespace-nowrap"
              style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)' }}
            >
              My Lineas
              <Heart size={16} />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border transition hover:opacity-80"
              style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)' }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border transition hover:opacity-80"
              style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)' }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="p-2"
              style={{ color: 'var(--foreground)' }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={[
          "lg:hidden fixed inset-0 z-[55] bg-white dark:bg-gray-900 transition-all duration-500",
          open 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-full pointer-events-none",
        ].join(" ")}
        style={{ top: '80px' }}
      >
        <nav className="px-6 py-4 space-y-2">
          {NAV.map((item, index) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center gap-3 p-2 rounded-xl transition-all",
                  active 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
                ].join(" ")}
                style={{ animationDelay: open ? `${index * 0.1}s` : '0s' }}
              >
                <Icon size={20} />
                <span className="text-lg font-medium">{item.label}</span>
                {item.hasSubmenu && <ChevronRight size={20} />}
              </Link>
            );
          })}

        </nav>
        {/* CTA Buttons at bottom */} <div className="px-6 pb-6 pt-2"> <div className="grid grid-cols-2 gap-3"> <Link href="/valuation" onClick={() => setOpen(false)} className="flex items-center justify-center px-3 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white" > Book Valuation </Link> <Link href="/favorites" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white text-sm font-semibold transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800" > My Lineas <Heart size={16} /> </Link> </div> </div>
      </div>
      

      <style jsx>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translate3d(0, 30px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out both;
        }
      `}</style>
    </>
  );
}
