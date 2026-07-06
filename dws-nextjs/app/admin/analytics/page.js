import { TrendingUp } from "lucide-react";

export const metadata = {
  title: "DWS Admin | Traffic Analytics",
  description: "PT Denko Wahana Sakti Administrator Panel Traffic Analytics Overview",
};

export default function AdminAnalyticsPage() {
  const chartData = [
    { label: "Sen", value: "600", heightClass: "h-[120px]" },
    { label: "Sel", value: "800", heightClass: "h-[160px]" },
    { label: "Rab", value: "700", heightClass: "h-[140px]" },
    { label: "Kam", value: "900", heightClass: "h-[180px]" },
    { label: "Jum", value: "1050", heightClass: "h-[210px]" },
    { label: "Sab", value: "450", heightClass: "h-[90px]" },
    { label: "Min", value: "500", heightClass: "h-[100px]" },
  ];

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Traffic Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">Ikhtisar lalu lintas pengunjung dan konversi penawaran.</p>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Visits Today */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Visit Hari Ini</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-2xl">1,240</h3>
            <p className="text-green-500 text-[10px] font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +15.3% vs kemarin
            </p>
          </div>
          {/* WhatsApp Clicks */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Click WhatsApp</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-2xl">450 Clicks</h3>
            <p className="text-green-500 text-[10px] font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              36.2% CTR
            </p>
          </div>
          {/* Form Submit */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Form Submit</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-2xl">92 Kiriman</h3>
            <p className="text-green-500 text-[10px] font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              7.4% submit rate
            </p>
          </div>
          {/* Conversion Rate */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Conversion Rate</span>
            <h3 className="text-brand-darkBg font-display font-extrabold text-2xl">8.5%</h3>
            <p className="text-brand-blue text-[10px] font-semibold">Tinggi dibanding rata-rata B2B</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h3 className="text-brand-darkBg font-display font-bold text-lg">Statistik Kunjungan Mingguan</h3>
            <p className="text-gray-400 text-xs mt-0.5">Jumlah pengunjung unik dalam 7 hari terakhir.</p>
          </div>

          {/* Custom Bar Chart Grid */}
          <div className="h-64 flex items-end gap-3 sm:gap-6 border-b border-gray-200 pb-2 px-4 relative">
            {/* Graph gridlines (Background) */}
            <div className="absolute inset-x-0 bottom-2 border-b border-gray-100"></div>
            <div className="absolute inset-x-0 bottom-1/4 border-b border-gray-100"></div>
            <div className="absolute inset-x-0 bottom-2/4 border-b border-gray-100"></div>
            <div className="absolute inset-x-0 bottom-3/4 border-b border-gray-100"></div>

            {chartData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group relative z-10">
                <div className={`w-full bg-brand-blue/20 hover:bg-brand-blue rounded-t-lg transition-all duration-300 relative ${item.heightClass}`}>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-darkBg text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.value}
                  </span>
                </div>
                <span className="text-gray-400 text-[10px] sm:text-xs font-semibold mt-2">{item.label}</span>
              </div>
            ))}
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
