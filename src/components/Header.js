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
  MessageCircle,
  FileText,
} from "lucide-react";
import { useTheme } from "next-themes";

const NAV = [
  { label: "Home", href: "/", icon: Home },
  { label: "Rent", href: "/propertydetails", icon: Building },
  { label: "Buy", href: "/propertydetails", icon: DollarSign },
  { label: "Short Let", href: "/propertydetails", icon: Calendar },
  { label: "Commercial", href: "/propertydetails", icon: Building },
  { label: "Landlords", icon: Users, hasSubmenu: true },
  { label: "Tenants", icon: UserCheck, hasSubmenu: true },
  { label: "Contact", href: "/contact", icon: Mail },
];

const LANDLORD_SUBMENU = [
  { label: "Fees", href: "/landlordsfees", icon: Trash2 },
  { label: "Management", href: "/managementfees", icon: Users2 },
];

const TENANTS_SUBMENU = [
  { label: "Advice", href: "/tenantadvice", icon: MessageCircle },
  { label: "Fees", href: "/tenantfees", icon: Trash2 },
  { label: "Deposit Scheme", href: "/tenantdeposit", icon: FileText },
];

export default function Header({ rent }) {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showLandlordsDropdown, setShowLandlordsDropdown] = useState(false);
  const [showTenantsDropdown, setShowTenantsDropdown] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [landlordsHoverTimeout, setLandlordsHoverTimeout] = useState(null);
  const [tenantsHoverTimeout, setTenantsHoverTimeout] = useState(null);
  const pathname = usePathname() || "/";
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => {
      clearTimeout(timer);
      if (landlordsHoverTimeout) clearTimeout(landlordsHoverTimeout);
      if (tenantsHoverTimeout) clearTimeout(tenantsHoverTimeout);
    };
  }, [landlordsHoverTimeout, tenantsHoverTimeout]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('selectedPropertyItem');
      if (saved && pathname === "/propertydetails") {
        setSelectedItem(saved);
      } else if (pathname !== "/propertydetails") {
        setSelectedItem(null);
        sessionStorage.removeItem('selectedPropertyItem');
      }
    }
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (item) => {
    const propertyItems = ["Rent", "Buy", "Short Let", "Commercial"];
    
    if (propertyItems.includes(item.label)) {
      return pathname === "/propertydetails" && (selectedItem === item.label || (item.label === "Rent" && rent));
    }

    if (item.label === "Home") {
      return pathname === "/" && selectedItem === null;
    }

    if (item.label === "Landlords") {
      return LANDLORD_SUBMENU.some(sub => pathname === sub.href) || pathname.startsWith("/landlords") || pathname.startsWith("/managementfees");
    }
    
    if (item.label === "Tenants") {
      return TENANTS_SUBMENU.some(sub => pathname === sub.href) || pathname.startsWith("/tenant");
    }
     if (item.label === "Contact") {
      return pathname.startsWith("/contact");
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

  const handleLandlordsMouseEnter = () => {
    if (landlordsHoverTimeout) clearTimeout(landlordsHoverTimeout);
    setShowLandlordsDropdown(true);
  };

  const handleLandlordsMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowLandlordsDropdown(false);
    }, 150);
    setLandlordsHoverTimeout(timeout);
  };

  const handleTenantsMouseEnter = () => {
    if (tenantsHoverTimeout) clearTimeout(tenantsHoverTimeout);
    setShowTenantsDropdown(true);
  };

  const handleTenantsMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowTenantsDropdown(false);
    }, 150);
    setTenantsHoverTimeout(timeout);
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

  const handleNavClick = (item) => {
    const propertyItems = ["Rent", "Buy", "Short Let", "Commercial"];
    
    if (propertyItems.includes(item.label)) {
      setSelectedItem(item.label);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('selectedPropertyItem', item.label);
      }
    } else {
      setSelectedItem(null);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('selectedPropertyItem');
      }
    }
    
    setOpen(false);
    router.push(item.href);
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
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/lineas-logo.png" 
              alt="LINEAS Estate Agents" 
              className="h-8 w-auto object-contain md:h-8 lg:h-10 xl:h-12" 
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-5 ml-20">
            {NAV.map((item, index) => {
              const active = isActive(item);
              const hasSubmenu = item.hasSubmenu;

              if (hasSubmenu) {
                const isLandlords = item.label === "Landlords";
                const isTenants = item.label === "Tenants";
                const showDropdown = isLandlords ? showLandlordsDropdown : showTenantsDropdown;
                const handleMouseEnter = isLandlords ? handleLandlordsMouseEnter : handleTenantsMouseEnter;
                const handleMouseLeave = isLandlords ? handleLandlordsMouseLeave : handleTenantsMouseLeave;
                const submenuItems = getSubmenuItems(item.label);

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className="group relative px-1 py-1 font-medium cursor-pointer"
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
                    </span>

                    <div
                      className={[
                        "absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-200 min-w-[200px]",
                        showDropdown ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
                      ].join(" ")}
                      style={{ borderColor: "var(--foreground, #e2e8f0)", zIndex: 60 }}
                    >
                      <div className="py-2">
                        {submenuItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = isSubmenuItemActive(subItem.href);
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={[
                                "flex items-center gap-3 px-4 py-3 transition-colors group",
                                isSubActive
                                  ? "bg-[#33B7DF]/10 text-[#33B7DF] font-semibold"
                                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:text-white"
                              ].join(" ")}
                              onClick={() => {
                                setSelectedItem(null);
                                if (typeof window !== 'undefined') {
                                  sessionStorage.removeItem('selectedPropertyItem');
                                }
                              }}
                            >
                              <SubIcon 
                                size={20} 
                                className={
                                  isSubActive 
                                    ? "text-[#33B7DF]" 
                                    : "text-slate-700 dark:text-slate-300 group-hover:text-white"
                                } 
                              />
                              <span className={[
                                "font-medium",
                                isSubActive 
                                  ? "text-[#33B7DF]" 
                                  : "text-slate-700 dark:text-slate-300 group-hover:text-white"
                              ].join(" ")}>
                                {subItem.label}
                              </span>
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
                  key={index}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleNavClick(item)}
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

          <div className="hidden lg:flex items-center gap-3 ml-6">
            <Link
              href="/bookvaluation"
              className="rounded-sm border px-4 py-2 text-sm font-semibold transition whitespace-nowrap 
                         border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] 
                         hover:bg-white hover:text-slate-900"
            >
              Book Valuation
            </Link>

            <Link
              href="/favorites"
              className="group flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition whitespace-nowrap
                         border-[var(--foreground)] text-[var(--background)] bg-[var(--foreground)]
                         hover:bg-white hover:text-slate-900"
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

      <div
        className={[
          "lg:hidden fixed inset-0 z-[55] bg-white dark:bg-gray-900 transition-all duration-500",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none",
        ].join(" ")}
        style={{ top: "80px" }}
      >
        <div className="h-full overflow-y-auto">
          <nav className="px-4 py-4 space-y-2">
            {NAV.map((item) => {
              const Icon = item.icon;
              const submenuItems = getSubmenuItems(item.label);
              const hasSubmenu = submenuItems.length > 0;
              const isSubmenuOpen = mobileSubMenuOpen[item.label];
              const active = isActive(item);

              return (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleMobileSubmenu(item.label);
                        return;
                      }
                      handleNavClick(item);
                    }}
                    className={[
                      "w-full flex items-center justify-between p-3 rounded-xl transition-all box-border",
                      active
                        ? "bg-[#33B7DF] text-white font-semibold shadow-md"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
                    ].join(" ")}
                    style={{ maxWidth: "100%", minWidth: 0 }}
                  >
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
                  </button>

                  {hasSubmenu && (
                    <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isSubmenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                      {submenuItems.map(subItem => {
                        const SubIcon = subItem.icon;
                        const isSubActive = pathname === subItem.href;
                        return (
                          <button
                            key={subItem.label}
                            onClick={() => {
                              setOpen(false);
                              router.push(subItem.href);
                              setSelectedItem(null);
                              if (typeof window !== 'undefined') {
                                sessionStorage.removeItem('selectedPropertyItem');
                              }
                            }}
                            className={[
                              "w-full flex items-center gap-3 p-3 ml-4 rounded-xl transition-colors box-border",
                              isSubActive
                                ? "bg-[#33B7DF] text-white font-semibold shadow-md"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800",
                            ].join(" ")}
                            style={{ maxWidth: "calc(100% - 1rem)", minWidth: 0 }}
                          >
                            <SubIcon size={18} className="flex-shrink-0" />
                            <span className="font-medium truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="px-4 pb-6 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/valuation");
                  setSelectedItem(null);
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('selectedPropertyItem');
                  }
                }}
                className="flex items-center justify-center px-3 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Book Valuation
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/favorites");
                  setSelectedItem(null);
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('selectedPropertyItem');
                  }
                }}
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white text-sm font-semibold transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                My Lineas <Heart size={16} />
              </button>
            </div>
          </div>
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