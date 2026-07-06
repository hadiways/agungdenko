"use client";

import { useState, useEffect } from "react";

export default function AdminAnalyticsPage() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    popularProduct: "-",
    activeClient: "-",
    thisMonthCount: 0
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    document.title = "DWS Admin | Leads Analytics";
    const saved = localStorage.getItem("quote_leads");
    let activeLeads = [];
    if (saved) {
      try {
        activeLeads = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse leads for analytics", e);
      }
    }
    setLeads(activeLeads);

    if (activeLeads.length > 0) {
      // Calculate dynamic metrics
      const total = activeLeads.length;

      // 1. Most popular product
      const productCounts = {};
      activeLeads.forEach(l => {
        const prod = l.product || "Lainnya";
        productCounts[prod] = (productCounts[prod] || 0) + 1;
      });
      let popular = "-";
      let maxProdCount = 0;
      Object.entries(productCounts).forEach(([name, count]) => {
        if (count > maxProdCount) {
          maxProdCount = count;
          popular = name;
        }
      });

      // 2. Active client
      const clientCounts = {};
      activeLeads.forEach(l => {
        const client = l.company || "Perseorangan";
        clientCounts[client] = (clientCounts[client] || 0) + 1;
      });
      let activeClient = "-";
      let maxClientCount = 0;
      Object.entries(clientCounts).forEach(([name, count]) => {
        if (count > maxClientCount) {
          maxClientCount = count;
          activeClient = name;
        }
      });

      // 3. Submissions this month
      const dateNow = new Date();
      const thisMonth = String(dateNow.getMonth() + 1).padStart(2, '0');
      const thisYear = String(dateNow.getFullYear());
      let thisMonthCount = 0;
      activeLeads.forEach(l => {
        if (l.date && l.date.includes("/")) {
          const parts = l.date.split(" - ")[0].split("/");
          if (parts[1] === thisMonth && parts[2] === thisYear) {
            thisMonthCount++;
          }
        }
      });

      setStats({
        total,
        popularProduct: popular,
        activeClient,
        thisMonthCount
      });

      // 4. Chart Data: group quotes count by Product Category
      const chartMap = {};
      activeLeads.forEach(l => {
        const prod = l.product || "Lainnya";
        chartMap[prod] = (chartMap[prod] || 0) + 1;
      });
      const maxCount = Math.max(...Object.values(chartMap), 1);
      const chartItems = Object.entries(chartMap).map(([name, count]) => {
        const percent = Math.round((count / maxCount) * 200); // max 200px
        return {
          label: name,
          value: `${count} Quotes`,
          height: Math.max(percent, 8)
        };
      });
      setChartData(chartItems);
    } else {
      setStats({
        total: 0,
        popularProduct: "-",
        activeClient: "-",
        thisMonthCount: 0
      });
      setChartData([]);
    }
  }, []);

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Leads Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">Ikhtisar analisis data permintaan penawaran (leads) aktif.</p>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Leads */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Total Leads</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-2xl">{stats.total} Quotes</h3>
            <p className="text-brand-blue text-[10px] font-semibold">Semua waktu</p>
          </div>
          {/* Popular Product */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Produk Terpopuler</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-lg truncate mt-1">{stats.popularProduct}</h3>
            <p className="text-brand-blue text-[10px] font-semibold">Minat tertinggi</p>
          </div>
          {/* Active Client */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Client Teraktif</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-lg truncate mt-1">{stats.activeClient}</h3>
            <p className="text-brand-blue text-[10px] font-semibold">Quote terbanyak</p>
          </div>
          {/* This Month Count */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Leads Bulan Ini</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-2xl">{stats.thisMonthCount} Baru</h3>
            <p className="text-brand-blue text-[10px] font-semibold">Periode berjalan</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h3 className="text-brand-darkBg font-display font-bold text-lg">Distribusi Minat Produk</h3>
            <p className="text-gray-400 text-xs mt-0.5">Statistik jumlah permintaan penawaran harga berdasarkan kategori produk.</p>
          </div>

          {/* Custom Bar Chart Grid */}
          <div className="h-64 flex items-end gap-3 sm:gap-6 border-b border-gray-200 pb-2 px-4 relative">
            {/* Graph gridlines (Background) */}
            <div className="absolute inset-x-0 bottom-2 border-b border-gray-100"></div>
            <div className="absolute inset-x-0 bottom-1/4 border-b border-gray-100"></div>
            <div className="absolute inset-x-0 bottom-2/4 border-b border-gray-100"></div>
            <div className="absolute inset-x-0 bottom-3/4 border-b border-gray-100"></div>

            {chartData.length > 0 ? (
              chartData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center group relative z-10 max-w-[80px]">
                  <div 
                    className="w-full bg-brand-blue/20 hover:bg-brand-blue rounded-t-lg transition-all duration-300 relative min-h-[8px]"
                    style={{ height: `${item.height}px` }}
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-darkBg text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                      {item.value}
                    </span>
                  </div>
                  <span className="text-gray-400 text-[9px] sm:text-xs font-semibold mt-2 truncate max-w-full text-center" title={item.label}>
                    {item.label}
                  </span>
                </div>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                Tidak ada data leads untuk membuat statistik.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-16 border-t border-gray-200 pt-6">
        &copy; 2026 PT Denko Wahana Sakti. Administrator Dashboard Panel.
      </footer>
    </div>
  );
}
