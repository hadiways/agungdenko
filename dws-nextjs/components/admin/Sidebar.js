"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Sliders
} from "lucide-react";

export default function AdminSidebar({ handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [salesProfile, setSalesProfile] = useState({
    name: "Agung Ramdhani",
    role: "Administrator",
    avatar: ""
  });

  // Fetch updated profile configurations
  useEffect(() => {
    const saved = localStorage.getItem("sales_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSalesProfile({
          name: parsed.name,
          role: parsed.role,
          avatar: parsed.avatar
        });
      } catch (e) {
        console.error("Failed to load sidebar sales profile", e);
      }
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Produk", href: "/admin/products", icon: Package },
    { name: "Kelola Konten", href: "/admin/content", icon: Sliders },
    { name: "Customer Leads", href: "/admin/customers", icon: Users },
    { name: "Traffic Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <>
      {/* Desktop Sidebar (fixed left) */}
      <aside className="hidden lg:flex flex-col w-64 bg-brand-darkBg text-gray-400 fixed inset-y-0 left-0 border-r border-white/5 z-30">
        {/* Logo at top */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center bg-brand-blue text-white font-display font-extrabold text-lg px-2.5 py-0.5 rounded-md skew-x-12 transform group-hover:scale-105 duration-300">
              <span className="-skew-x-12">DWS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display font-bold text-xs tracking-wider">ADMIN PANEL</span>
              <span className="text-brand-blueLight text-[9px] font-light">Material Handling</span>
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/15"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile info at bottom */}
        <div className="p-4 border-t border-white/5 flex items-center gap-3 bg-brand-darkCard/30">
          <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blueLight/20 flex items-center justify-center text-brand-blueLight overflow-hidden shrink-0">
            {salesProfile.avatar ? (
              <img src={salesProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 overflow-hidden text-left">
            <h4 className="text-white text-xs font-semibold truncate">{salesProfile.name}</h4>
            <p className="text-gray-500 text-[10px] truncate">{salesProfile.role}</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-gray-500 hover:text-white transition-colors" 
            title="Keluar dari Panel Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden h-16 bg-brand-darkBg text-white px-6 border-b border-white/5 flex items-center justify-between fixed top-0 inset-x-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-brand-blue text-white font-extrabold text-sm px-2 py-0.5 rounded skew-x-12">
            <span className="-skew-x-12">DWS</span>
          </div>
          <span className="font-display font-bold text-xs tracking-wider">ADMIN</span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer Panel */}
      <div className={`${isMenuOpen ? "block" : "hidden"} fixed inset-0 z-50 lg:hidden`}>
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        ></div>
        <nav className="fixed top-0 bottom-0 left-0 w-64 bg-brand-darkBg border-r border-white/5 p-6 flex flex-col justify-between z-10">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-white font-display font-bold text-sm tracking-wide">DWS ADMIN</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 flex flex-col">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive
                        ? "bg-brand-blue text-white shadow-lg"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-white/5 pt-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blueLight overflow-hidden shrink-0">
              {salesProfile.avatar ? (
                <img src={salesProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white text-xs font-semibold">{salesProfile.name}</h4>
              <p className="text-gray-500 text-[10px]">{salesProfile.role}</p>
            </div>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
