"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Building,
  DollarSign,
  Calendar,
  Users,
  UserCheck,
  Mail,
  ChevronRight,
  Heart,
  Sun,
  Moon,
  Trash2,
  Users2,
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

const LANDLORD_SUBMENU = [
  { label: "Fees", href: "/landlordsfees", icon: Trash2 },
  { label: "Management", href: "/landlords/management", icon: Users2 },
];

const TENANTS_SUBMENU = [
  { label: "Tenant Services", href: "/tenants/services", icon: UserCheck },
  { label: "Tenant Guide", href: "/tenants/guide", icon: Users2 },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showLandlordsDropdown, setShowLandlordsDropdown] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({});
  const pathname = usePathname() || "/";
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (item) => {
    if (item.label === "Landlords") {
      return LANDLORD_SUBMENU.some(sub => pathname === sub.href) || pathname.startsWith("/landlords");
    }
    if (item.label === "Tenants") {
      return TENANTS_SUBMENU.some(sub => pathname === sub.href) || pathname.startsWith("/tenants");
    }
    return pathname === item.href;
  };

  const isSubmenuItemActive = (href) => pathname === href;

  const toggleMobileSubmenu = (itemLabel) => {
    setMobileSubMenuOpen(prev => ({
      ...prev,
      [itemLabel]: !prev[itemLabel]
    }));
  };

  const getSubmenuItems = (itemLabel) => {
    switch (itemLabel) {
      case "Landlords":
        return LANDLORD_SUBMENU;
      case "Tenants":
        return TENANTS_SUBMENU;
      default:
        return [];
    }
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 border-b bg-slate-100 z-50 shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="LINEAS Estate Agents" className="h-10 w-auto object-contain" />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className="sticky top-0 border-b z-50 shadow-md backdrop-blur-sm w-full"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--foreground, #e2e8f0)",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-20 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/lineas-logo.png" alt="LINEAS Estate Agents" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((item, index) => {
              const active = isActive(item);

              const handleClick = (e) => {
                if (item.label === "Landlords") {
                  e.preventDefault();
                  router.push("/landlordsfees");
                }
                if (item.label === "Tenants") {
                  e.preventDefault();
                  router.push("/tenants");
                }
              };

              if (item.label === "Landlords") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setShowLandlordsDropdown(true)}
                    onMouseLeave={() => setShowLandlordsDropdown(false)}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={handleClick}
                      className="group relative px-1 py-1 font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      <span
                        className={[
                          "whitespace-nowrap block transition-all duration-500 ease-out font-semibold nav-label",
                          animate ? "animate-slideInDown" : "",
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
                        style={{ backgroundColor: active ? "#33B7DF" : "var(--foreground)" }}
                      />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={[
                        "absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-200 min-w-[200px]",
                        showLandlordsDropdown ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
                      ].join(" ")}
                      style={{ borderColor: "var(--foreground, #e2e8f0)", zIndex: 60 }}
                    >
                      <div className="py-2">
                        {LANDLORD_SUBMENU.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = isSubmenuItemActive(subItem.href);
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={[
                                "flex items-center gap-3 px-4 py-3 transition-colors",
                                isSubActive
                                  ? "bg-[#33B7DF]/10 text-[#33B7DF] font-semibold"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
                              ].join(" ")}
                              style={{ color: isSubActive ? "#33B7DF" : "var(--foreground)" }}
                            >
                              <SubIcon size={20} />
                              <span className="font-medium">{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={handleClick}
                  className="group relative px-1 py-1 font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  <span
                    className={[
                      "whitespace-nowrap block transition-all duration-500 ease-out font-semibold nav-label",
                      animate ? "animate-slideInDown" : "",
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
                    style={{ backgroundColor: active ? "#33B7DF" : "var(--foreground)" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA + Theme */}
          <div className="hidden lg:flex items-center gap-3 ml-2">
            <Link
              href="/valuation"
              className="rounded-sm border px-4 py-2 text-sm font-semibold transition hover:opacity-80 whitespace-nowrap"
              style={{ borderColor: "var(--foreground)", backgroundColor: "var(--foreground)", color: "var(--background)" }}
            >
              Book Valuation
            </Link>

            <Link
              href="/favorites"
              className="group flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition hover:opacity-80 whitespace-nowrap"
              style={{ borderColor: "var(--foreground)", color: "var(--foreground)" }}
            >
              My Lineas <Heart size={16} />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border transition hover:opacity-80"
              style={{ borderColor: "var(--foreground)", color: "var(--foreground)" }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border transition hover:opacity-80"
              style={{ borderColor: "var(--foreground)", color: "var(--foreground)" }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="p-2" style={{ color: "var(--foreground)" }}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={[
          "lg:hidden fixed inset-0 z-[55] bg-white dark:bg-gray-900 transition-all duration-500",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none",
        ].join(" ")}
        style={{ top: "80px" }}
      >
        {/* Fixed container with proper padding and overflow handling */}
        <div className="h-full overflow-y-auto">
          <nav className="px-4 py-4 space-y-2">
            {NAV.map((item) => {
              const Icon = item.icon;
              const submenuItems = getSubmenuItems(item.label);
              const hasSubmenu = submenuItems.length > 0;
              const isSubmenuOpen = mobileSubMenuOpen[item.label];

              // Active parent if itself or any submenu item is active
              const active = isActive(item);

              return (
                <div key={item.href} className="space-y-1">
                  {/* Parent Button - Fixed width and padding */}
                 
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="text-lg font-medium truncate">{item.label}</span>
                    </div>
                    {hasSubmenu && (
                      <ChevronRight 
                        size={20} 
                        className={`transition-transform duration-200 flex-shrink-0 ${isSubmenuOpen ? "rotate-90" : ""}`} 
                      />
                    )}
                

                 
                </div>
              );
            })}
          </nav>

          {/* Mobile CTA */}
   
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translate3d(0, -30px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out both; }
        .nav-label { display: inline-block; opacity: 1; transform: translateY(0); transition: transform 250ms cubic-bezier(0.4,0,0.2,1); }
        :global(.group):hover .nav-label { transform: translateY(4px); }
      `}</style>
    </>
  );
}