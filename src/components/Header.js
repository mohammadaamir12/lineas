"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Home, Building, DollarSign, Calendar, Users, 
  UserCheck, Mail, ChevronRight, Heart, Sun, Moon
} from "lucide-react";
import { useTheme } from "next-themes";
import Logo from '../assets/images/lineas-logo.png'

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

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Prevent hydration mismatch for theme-dependent content
  if (!mounted) {
    return (
      <header className="sticky top-0 border-b bg-slate-100 z-50 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 flex items-center">
              <img
                src="/logo.png"
                alt="LINEAS Estate Agents"
                className="max-h-10 w-auto object-contain block"
              />
            </div>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 border-b z-50 shadow-md backdrop-blur-sm" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--foreground, #e2e8f0)', borderOpacity: 0.2 }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 h-20 flex items-center justify-between">      
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 flex items-center">
              <img
                src='/lineas-logo.png'
                alt="LINEAS Estate Agents"
                className="max-h-10 w-auto object-contain block"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item, index) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative px-1 py-1 font-medium perspective-1000" style={{ color: 'var(--foreground)' }}
                >
                  <div className="relative preserve-3d">
                    <span
                      className={[
                        "whitespace-nowrap block will-change-transform transform-gpu select-none transition-all duration-500 ease-out font-semibold",
                        animate ? `animate-slideInUp` : "",
                        "group-hover:translate-y-[-4px] group-hover:scale-102", 
                      ].join(" ")}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Underline */}
                  <span
                    className={[
                      "pointer-events-none absolute left-0 -bottom-1 h-[2px]",
                      "origin-left transform transition-transform duration-300",
                      active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                    style={{ backgroundColor: 'var(--foreground)' }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3 ml-2">
            <Link
              href="/valuation"
              className="rounded-sm border px-4 py-2 text-sm font-semibold transition hover:opacity-80 whitespace-nowrap"
              style={{ 
                borderColor: 'var(--foreground)', 
                backgroundColor: 'var(--foreground)', 
                color: 'var(--background)' 
              }}
            >
              Book Valuation
            </Link>

            <Link
              href="/favorites"
              className="group flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition hover:opacity-80 whitespace-nowrap"
              style={{ 
                borderColor: 'var(--foreground)', 
                color: 'var(--foreground)' 
              }}
            >
              My Lineas
              <Heart size={16} className="transition" style={{ color: 'var(--foreground)' }} />
            </Link>

            {/* Dark/Light toggle (desktop) */}
            <button
              onClick={toggleTheme}
              className="p-1 m-1 rounded-md border transition hover:opacity-80"
              style={{ 
                borderColor: 'var(--foreground)', 
                color: 'var(--foreground)' 
              }}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Toggle + Theme Toggle */}
          <div className="md:hidden flex items-center gap-1">
            {/* Dark/Light toggle (mobile) */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border transition hover:opacity-80"
              style={{ 
                borderColor: 'var(--foreground)', 
                color: 'var(--foreground)' 
              }}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 -mr-2 relative z-60"
              style={{ color: 'var(--foreground)' }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Overlay */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[55] bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out",
          open 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-full pointer-events-none",
        ].join(" ")}
        style={{ top: '80px' }} // Adjusted to match header height
      >
        <nav className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-2">
            {NAV.map((item, index) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "group flex items-center gap-3 p-2 rounded-xl transition-all duration-200",
                    active 
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
                    open ? `animate-[slideInDown_0.6s_ease-out_${index * 0.1}s_both]` : "",
                  ].join(" ")}
                  style={{
                    animationDelay: open ? `${index * 0.1}s` : '0s',
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8">
                    <Icon size={20} />
                  </div>
                  <span className="text-lg font-medium flex-1">{item.label}</span>
                  {item.hasSubmenu && (
                    <ChevronRight 
                      size={20} 
                      className={active ? "text-white dark:text-slate-900" : "text-slate-400 dark:text-slate-500"} 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons at bottom */}
          <div className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/valuation"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center px-3 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Book Valuation
              </Link>
              <Link
                href="/favorites"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white text-sm font-semibold transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                My Lineas
                <Heart size={16} />
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-x-360 {
          transform: rotateX(360deg);
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out both;
        }
      `}</style>
    </>
  );
}