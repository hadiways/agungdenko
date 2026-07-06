"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/Sidebar";
import { Lock, User, LogIn, ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "agung";
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "agung*";

  useEffect(() => {
    const authStatus = localStorage.getItem("dws_admin_logged_in");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      credentials.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("dws_admin_logged_in", "true");
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Username atau password salah!");
    }
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      localStorage.removeItem("dws_admin_logged_in");
      setIsLoggedIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1B2B] flex items-center justify-center text-white font-sans">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B1B2B] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Dynamic Glowing Background Circles */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-blue/15 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-blueLight/10 blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center gap-3 mb-8 text-center">
            <div className="flex items-center justify-center bg-brand-blue text-white font-display font-extrabold text-2xl px-5 py-2 rounded-xl skew-x-12 transform shadow-lg">
              <span className="-skew-x-12">DWS</span>
            </div>
            <div>
              <h2 className="text-white font-display font-bold text-lg tracking-wider">PORTAL ADMINISTRATOR</h2>
              <p className="text-gray-400 text-xs mt-1">PT Denko Wahana Sakti - Material Handling</p>
            </div>
          </div>

          {/* Login Card Panel */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-white font-display font-bold text-xl mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-blueLight" />
              <span>Sign In</span>
            </h3>
            <p className="text-gray-400 text-xs mb-6">Silakan masukkan kredensial administrator Anda.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-[10px] font-bold uppercase mb-2 tracking-wider">Username / Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    placeholder="Username / Email"
                    className="w-full bg-white/5 border border-white/10 focus:border-brand-blue rounded-xl pl-10 pr-4 py-3.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] font-bold uppercase mb-2 tracking-wider">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 focus:border-brand-blue rounded-xl pl-10 pr-4 py-3.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-98 transition-all duration-150 flex items-center justify-center gap-2 mt-6"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Dashboard</span>
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
              &larr; Kembali ke Website Publik
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-lightBg flex font-sans">
      {/* Sidebar Navigation */}
      <AdminSidebar handleLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 pt-16 lg:pt-0">
        {/* Top bar with Logout */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:justify-end gap-4">
          <div className="lg:hidden flex items-center bg-brand-blue text-white font-display font-extrabold text-sm px-2.5 py-1 rounded skew-x-12 transform shadow">
            <span className="-skew-x-12">DWS</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-red-600 font-bold uppercase tracking-wider transition-colors"
          >
            Keluar (Logout)
          </button>
        </header>

        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
