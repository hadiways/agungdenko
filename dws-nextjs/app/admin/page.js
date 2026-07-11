"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/fetch";
import { PRODUCTS_QUERY } from "@/lib/sanity/queries";
import {
  TrendingUp,
  Package,
  Users,
  ArrowRight,
  PhoneCall,
  PlusCircle,
  Download,
  PieChart,
  UserCheck,
  Save,
  RotateCcw
} from "lucide-react";

export default function AdminDashboard() {
  // Sales Profile State
  const [salesForm, setSalesForm] = useState({
    name: "Agung Ramdhani",
    role: "Sales Consultant",
    phone: "6285784380347",
    status: "Online sekarang",
    avatar: ""
  });

  // Dynamic statistics states
  const [productsCount, setProductsCount] = useState(0);
  const [leadsCount, setLeadsCount] = useState(0);
  const [recentLeadsList, setRecentLeadsList] = useState([]);

  const quickActions = [
    {
      name: "Tambah Produk Baru",
      href: "/admin/products",
      icon: PlusCircle,
    },
    {
      name: "Ekspor Leads (CSV)",
      href: "/admin/customers",
      icon: Download,
    },
    {
      name: "Laporan Analytics Bulanan",
      href: "/admin/analytics",
      icon: PieChart,
    },
  ];

  // Load configuration and data states on mount
  useEffect(() => {
    const token = localStorage.getItem("dws_admin_token");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

    // 1. Fetch Setting from API
    async function loadSettings() {
      try {
        const response = await fetch(`${apiUrl}/settings`);
        const result = await response.json();
        if (response.ok && result.success) {
          const apiSettings = result.data;
          // Load existing localStorage profile
          const savedProfile = localStorage.getItem("sales_profile");
          let profile = {
            name: "Agung Ramdhani",
            role: "Sales Consultant",
            phone: apiSettings.whatsapp || "6285784380347",
            status: "Online sekarang",
            avatar: ""
          };
          if (savedProfile) {
            try {
              profile = { ...profile, ...JSON.parse(savedProfile) };
            } catch (e) {}
          }
          profile.phone = apiSettings.whatsapp || profile.phone;
          setSalesForm(profile);
          localStorage.setItem("sales_profile", JSON.stringify(profile));
        }
      } catch (err) {
        console.error("Failed to load settings from API", err);
      }
    }
    loadSettings();

    // 2. Fetch Customer Leads (Contact Messages) from API
    async function loadLeads() {
      try {
        const response = await fetch(`${apiUrl}/contact-messages`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          }
        });
        const result = await response.json();
        if (response.ok && result.success) {
          const apiLeads = result.data.map(l => ({
            id: l.id,
            company: l.company || l.name,
            phone: l.phone,
            product: l.subject || l.message || "Lainnya",
            date: new Date(l.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
            waLink: `https://wa.me/${l.phone.replace(/[^\d]/g, "")}`
          }));
          setLeadsCount(apiLeads.length);
          setRecentLeadsList(apiLeads.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load leads from API", err);
      }
    }
    if (token) {
      loadLeads();
    }

    // 3. Fetch Products Count from API
    async function loadProductsCount() {
      try {
        const response = await fetch(`${apiUrl}/products`);
        const result = await response.json();
        if (response.ok) {
          const list = result.data || result;
          setProductsCount(Array.isArray(list) ? list.length : 0);
        }
      } catch (err) {
        console.error("Failed to fetch products count from API", err);
      }
    }
    loadProductsCount();
  }, []);

  const handleTextChange = (e) => {
    setSalesForm({
      ...salesForm,
      [e.target.id]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSalesForm((prev) => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sanitizeInput = (str) => {
    if (typeof str !== "string") return str;
    let cleaned = str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
    cleaned = cleaned.replace(/on\w+\s*=\s*(['"])[^\1]*?\1/gi, "");
    cleaned = cleaned.replace(/<[^>]*>/g, "");
    return cleaned.trim();
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dws_admin_token");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const sanitized = {
      name: sanitizeInput(salesForm.name),
      role: sanitizeInput(salesForm.role),
      phone: sanitizeInput(salesForm.phone).replace(/[^\d+]/g, ""),
      status: sanitizeInput(salesForm.status),
      avatar: salesForm.avatar
    };

    try {
      const response = await fetch(`${apiUrl}/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          whatsapp: sanitized.phone
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        localStorage.setItem("sales_profile", JSON.stringify(sanitized));
        setSalesForm(sanitized);
        alert("Profil Sales & database WhatsApp berhasil disimpan secara dinamis!");
      } else {
        alert(result.message || "Gagal menyimpan ke database.");
      }
    } catch (err) {
      console.error("Save profile error:", err);
      alert("Gagal terhubung ke API backend, tetapi profil disimpan secara lokal.");
      localStorage.setItem("sales_profile", JSON.stringify(sanitized));
      setSalesForm(sanitized);
    }
  };

  const handleResetProfile = async () => {
    if (confirm("Reset profil ke bawaan default?")) {
      const defaultProfile = {
        name: "Agung Ramdhani",
        role: "Sales Consultant",
        phone: "6285784380347",
        status: "Online sekarang",
        avatar: ""
      };
      const token = localStorage.getItem("dws_admin_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      try {
        await fetch(`${apiUrl}/settings`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            whatsapp: "6285784380347"
          })
        });
      } catch (e) {}

      setSalesForm(defaultProfile);
      localStorage.setItem("sales_profile", JSON.stringify(defaultProfile));
      alert("Profil direset ke bawaan asli!");
    }
  };

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Selamat datang kembali, {salesForm.name}. Berikut adalah performa bisnis Anda.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
              Live Portal Active
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* StatCard 1: Total Produk */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Total Produk</span>
              <h3 className="text-brand-darkBg font-display font-extrabold text-3xl">{productsCount} Aktif</h3>
              <span className="text-gray-400 text-xs block">Forklift & Lifting Equipment</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* StatCard 2: Total Leads */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Total Leads</span>
              <h3 className="text-brand-darkBg font-display font-extrabold text-3xl">{leadsCount} Quotes</h3>
              <span className="text-gray-400 text-xs block">Data Permintaan Penawaran Harga</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Detailed Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent leads list */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-brand-darkBg font-display font-bold text-lg">Aktivitas Leads Terbaru</h3>
              <Link href="/admin/customers" className="text-brand-blue hover:text-brand-blueDark font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                Lihat Semua
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentLeadsList.length > 0 ? (
                recentLeadsList.map((lead, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between first:pt-0 last:pb-0 group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-brand-darkBg font-bold text-sm">{lead.company}</h4>
                        <p className="text-gray-400 text-xs mt-0.5">Meminta penawaran: {lead.product}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{lead.date}</span>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-gray-400 text-xs">Belum ada leads permintaan penawaran.</p>
              )}
            </div>
          </div>

          {/* Quick actions card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-brand-darkBg font-display font-bold text-lg border-b border-gray-100 pb-4">Tindakan Cepat</h3>
              <div className="space-y-3">
                {quickActions.map((action, idx) => {
                  const ActionIcon = action.icon;
                  return (
                    <Link
                      key={idx}
                      href={action.href}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-brand-blue/30 hover:bg-brand-blue/5 text-gray-600 hover:text-brand-blue font-bold text-xs transition-all duration-200"
                    >
                      <ActionIcon className="w-4 h-4 text-brand-blue" />
                      <span>{action.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sales profile setting panel */}
        <div id="sales-profile-settings" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-brand-darkBg font-display font-bold text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-brand-blue" />
              <span>Pengaturan Profil Sales (WhatsApp Contact)</span>
            </h3>
            <p className="text-gray-400 text-xs mt-1">Sesuaikan informasi kontak sales pada kartu mengambang public page secara instan.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Nama Sales</label>
                <input
                  type="text"
                  id="name"
                  value={salesForm.name}
                  onChange={handleTextChange}
                  placeholder="Contoh: Agung Ramdhani"
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Jabatan / Role</label>
                <input
                  type="text"
                  id="role"
                  value={salesForm.role}
                  onChange={handleTextChange}
                  placeholder="Contoh: Sales Consultant"
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-xs font-bold uppercase mb-2">No. WhatsApp (Format 628xxx)</label>
                  <input
                    type="text"
                    id="phone"
                    value={salesForm.phone}
                    onChange={handleTextChange}
                    placeholder="Contoh: 6285784380347"
                    required
                    className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Status Ketersediaan</label>
                  <input
                    type="text"
                    id="status"
                    value={salesForm.status}
                    onChange={handleTextChange}
                    placeholder="Contoh: Online sekarang"
                    required
                    className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-brand-blue overflow-hidden shrink-0">
                  {salesForm.avatar ? (
                    <img src={salesForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold">{salesForm.name.charAt(0)}</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="text-brand-darkBg font-bold text-sm">Avatar Profile</h4>
                  <p className="text-gray-400 text-xs">Pilih file foto profile sales (PNG, JPG maks 1MB).</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Pengaturan Profil
                </button>
                <button
                  type="button"
                  onClick={handleResetProfile}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs uppercase py-3.5 px-6 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-16 border-t border-gray-200 pt-6">
        &copy; 2026 PT Denko Wahana Sakti. Administrator Dashboard Panel.
      </footer>
    </div>
  );
}
