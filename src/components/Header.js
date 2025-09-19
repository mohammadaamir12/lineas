"use client";
import { useState, useEffect, useRef } from "react";
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
  Bookmark, 
  User, 
  LogOut,
  UserRoundCog ,
  Binoculars,
  CupSoda,
  Coffee,
  Building2
} from "lucide-react";
import { useTheme } from "next-themes";

const NAV = [
  { label: "Home", href: "/", icon: Home },
  { label: "Rent", href: "/propertydetails", icon: Building },
  { label: "Buy", href: "/propertydetailbuy", icon: DollarSign },
  { label: "Short Let", href: "/propertydetailhortlet", icon: Calendar },
  { label: "Commercial", href: "/propertydetailcommercial", icon: Building },
  { label: "Landlords", icon: Users, hasSubmenu: true },
  { label: "Tenants", icon: UserCheck, hasSubmenu: true },
  { label: "Contact", href: "/contact", icon: Mail },
];

const LANDLORD_SUBMENU = [
  { label: "Fees", href: "/landlordsfees", icon: CupSoda },
  { label: "Management", href: "/managementfees", icon: UserRoundCog },
];

const TENANTS_SUBMENU = [
  { label: "Advice", href: "/tenantadvice", icon: Binoculars },
  { label: "Fees", href: "/tenantfees", icon: CupSoda },
  { label: "Deposit Scheme", href: "/tenantdeposit", icon: Building2 },
];

export default function Header({ rent }) {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showLandlordsDropdown, setShowLandlordsDropdown] = useState(false);
  const [showTenantsDropdown, setShowTenantsDropdown] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Refs for timeouts
  const landlordsHoverTimeoutRef = useRef(null);
  const tenantsHoverTimeoutRef = useRef(null);
  const showTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  
  const pathname = usePathname() || "/";
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Clear all timeouts on unmount
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    
    return () => {
      clearTimeout(timer);
      [landlordsHoverTimeoutRef, tenantsHoverTimeoutRef, showTimeoutRef, hideTimeoutRef]
        .forEach(ref => {
          if (ref.current) {
            clearTimeout(ref.current);
            ref.current = null;
          }
        });
    };
  }, []);

  // Handle selected item based on pathname
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
    if (item.label === "Rent") {
      return pathname.startsWith("/propertydetails");
    }
    if (item.label === "Buy") {
      return pathname.startsWith("/propertydetailbuy");
    }
    if (item.label === "Short Let") {
      return pathname.startsWith("/propertydetailhortlet");
    }
    if (item.label === "Commercial") {
      return pathname.startsWith("/propertydetailcommercial");
    }

    if (item.label === "Home") {
      return pathname === "/" && selectedItem === null;
    }

    if (item.label === "Landlords") {
      return LANDLORD_SUBMENU.some(sub => pathname === sub.href) || 
             pathname.startsWith("/landlords") || 
             pathname.startsWith("/managementfees");
    }
    
    if (item.label === "Tenants") {
      return TENANTS_SUBMENU.some(sub => pathname === sub.href) || 
             pathname.startsWith("/tenant");
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

  // Improved hover handlers with proper cleanup
  const handleLandlordsMouseEnter = () => {
    if (landlordsHoverTimeoutRef.current) {
      clearTimeout(landlordsHoverTimeoutRef.current);
      landlordsHoverTimeoutRef.current = null;
    }
    setShowLandlordsDropdown(true);
  };

  const handleLandlordsMouseLeave = () => {
    landlordsHoverTimeoutRef.current = setTimeout(() => {
      setShowLandlordsDropdown(false);
    }, 150);
  };

  const handleTenantsMouseEnter = () => {
    if (tenantsHoverTimeoutRef.current) {
      clearTimeout(tenantsHoverTimeoutRef.current);
      tenantsHoverTimeoutRef.current = null;
    }
    setShowTenantsDropdown(true);
  };

  const handleTenantsMouseLeave = () => {
    tenantsHoverTimeoutRef.current = setTimeout(() => {
      setShowTenantsDropdown(false);
    }, 150);
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
    if (item.href) {
      router.push(item.href);
    }
  };

  // Improved popup handlers with proper cleanup
  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    showTimeoutRef.current = setTimeout(() => {
      setShowPopup(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    
    hideTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 200);
  };

  const handlePopupMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handlePopupMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 200);
  };

  // Show loading state while mounting
  if (!mounted) {
    return (
      <header className="sticky top-0 border-b bg-slate-100 dark:bg-gray-900 z-50 shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/Logo2.jpeg" 
              alt="LINEAS Estate Agents" 
              className="h-10 w-auto object-contain" 
            />
          </Link>
        </div>
      </header>
    );
  }

  const buttonClass = 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)]';

  const popupClass = 'bg-[var(--background)] border-[var(--foreground)] text-[var(--foreground)] shadow-xl';

  return (
    <>
      <header
        className="sticky top-0 border-b z-50 shadow-md backdrop-blur-sm w-full"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--foreground)",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-20 h-20 flex items-center justify-between">
       <Link href="/" className="flex-shrink-0">
  <img 
    src="/lineas-logo.png" 
    alt="LINEAS Estate Agents" 
    className="h-8 w-auto  object-contain xl:h-14 md:10 lg:12" 
  />
</Link>

          <nav className="hidden lg:flex items-center gap-4 ml-20 ">
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
                    <span className="group relative px-1 py-1 font-medium cursor-pointer" style={{ color: "var(--foreground)" }}>
                      <span
                        className={`whitespace-nowrap block transition-all duration-500 ease-out font-semibold nav-label ${
                          animate ? "animate-slideInDown" : ""
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] origin-left transition-transform duration-300 ${
                          active 
                            ? "w-full scale-x-100" 
                            : "w-full scale-x-0 group-hover:scale-x-100"
                        }`}
                        style={{ 
                          backgroundColor: active ? "#33B7DF" : "var(--foreground)"
                        }}
                      />
                    </span>

                    <div
                      className={`absolute top-full left-0 mt-2 rounded-lg shadow-lg transition-all duration-200 min-w-[200px] border ${
                        showDropdown 
                          ? "opacity-100 translate-y-0 pointer-events-auto" 
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                      style={{ 
                        backgroundColor: "var(--background)",
                        borderColor: "var(--foreground)",
                        zIndex: 60 
                      }}
                    >
                      <div className="py-2">
                        {submenuItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = isSubmenuItemActive(subItem.href);
                          return (
                            <Link
                          key={subItem.href}
                          href={subItem.href}
                         className={`flex items-center gap-3 px-4 py-3 transition-colors group ${
                         isSubActive
                        ? "bg-[#33B7DF]/10 text-[#33B7DF] font-semibold"
                       : "text-white hover:bg-slate-800 hover:text-white dark:hover:text-black"
                       }`}
                       onClick={() => {
                       setSelectedItem(null);
                        if (typeof window !== "undefined") {
                         sessionStorage.removeItem("selectedPropertyItem");
                        }
                        }}
                       >
                      <SubIcon
                       size={20}
                        className={`transition-colors ${
                        isSubActive
                        ? "text-[#33B7DF]"
                        : "text-[var(--foreground)] group-hover:text-white"
                        }`}
  />
  <span
    className={`font-medium text-sm transition-colors ${
      isSubActive
        ? "text-[#33B7DF]"
        : "text-[var(--foreground)] group-hover:text-white"
    }`}
  >
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
                  href={item.href || "#"}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleNavClick(item)}
                  className="group relative px-1 py-1 font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  <span
                    className={`whitespace-nowrap block transition-all duration-500 ease-out font-semibold nav-label  ${
                      animate ? "animate-slideInDown" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] origin-left transition-transform duration-300 ${
                      active 
                        ? "w-full scale-x-100" 
                        : "w-full scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ 
                      backgroundColor: active ? "#33B7DF" : "var(--foreground)"
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 ml-6">
           <Link
  href="/bookvaluation"
  className={`rounded-sm border px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${buttonClass}`}
>
  Book Valuation
</Link>

            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`group flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${buttonClass}`}>
                My Lineas <Heart size={16} />
              </button>

           {showPopup && (
          <div 
            className={`absolute top-full left-0 mt-2 w-48 rounded-lg border shadow-lg z-50 py-2 ${popupClass}`}
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
            style={{ 
              animation: 'fadeIn 0.2s ease-out',
              backgroundColor: "var(--background)",
              borderColor: "var(--foreground)",
              color: "var(--foreground)"
            }}
          >
<button 
      className="w-full px-4 py-2 text-sm text-left flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-slate-800 hover:text-white transition-colors duration-200"
    >
      <Home size={16} />
      Dashboard
    </button>
    
    <button 
      className="w-full px-4 py-2 text-sm text-left flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-slate-800 hover:text-white transition-colors duration-200"
    >
      <Bookmark size={16} />
      Favorites
    </button>
    
    <button 
      className="w-full px-4 py-2 text-sm text-left flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-slate-800 hover:text-white transition-colors duration-200"
    >
      <User size={16} />
      Profile
    </button>
    
    <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
    
    <button className="w-full px-4 py-2 text-sm text-left flex items-center gap-3 text-red-500 hover:bg-slate-800 hover:text-white transition-colors duration-200">
      <LogOut size={16} />
      Sign Out
    </button>
          </div>
        )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border transition hover:opacity-80"
              style={{ 
                borderColor: "var(--foreground)", 
                color: "var(--foreground)" 
              }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border transition hover:opacity-80"
              style={{ 
                borderColor: "var(--foreground)", 
                color: "var(--foreground)" 
              }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              aria-label="Toggle menu" 
              onClick={() => setOpen(!open)} 
              className="p-2"
              style={{ color: "var(--foreground)" }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-all duration-500 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ 
          top: "80px",
          backgroundColor: "var(--background)"
        }}
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
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all box-border ${
                      active
                        ? "bg-[#33B7DF] text-white font-semibold shadow-md"
                        : "hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                    style={{ 
                      maxWidth: "100%", 
                      minWidth: 0,
                      color: active ? "white" : "var(--foreground)"
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="text-lg font-medium truncate">{item.label}</span>
                    </div>
                    {hasSubmenu && (
                      <ChevronRight
                        size={20}
                        className={`transition-transform duration-200 flex-shrink-0 ${
                          isSubmenuOpen ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </button>

                  {hasSubmenu && (
                    <div className={`space-y-1 overflow-hidden transition-all duration-300 ${
                      isSubmenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}>
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
                            className={`w-full flex items-center gap-3 p-3 ml-4 rounded-xl transition-colors box-border ${
                              isSubActive
                                ? "bg-[#33B7DF] text-white font-semibold shadow-md"
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                            }`}
                            style={{ 
                              maxWidth: "calc(100% - 1rem)", 
                              minWidth: 0,
                              color: isSubActive ? "white" : "var(--foreground)"
                            }}
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
                  router.push("/bookvaluation");
                  setSelectedItem(null);
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('selectedPropertyItem');
                  }
                }}
                className="flex items-center justify-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)"
                }}
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
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                style={{
                  borderColor: "var(--foreground)",
                  color: "var(--foreground)"
                }}
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out both; }
        .nav-label { 
          display: inline-block; 
          opacity: 1; 
          transform: translateY(0); 
          transition: transform 250ms cubic-bezier(0.4,0,0.2,1); 
        }
        :global(.group):hover .nav-label { transform: translateY(4px); }
      `}</style>
    </>
  );
}