import Link from "next/link";
import {
  TrendingUp,
  Eye,
  Package,
  Users,
  ArrowRight,
  PhoneCall,
  MailOpen,
  PlusCircle,
  Download,
  PieChart,
} from "lucide-react";

export const metadata = {
  title: "DWS Admin | Dashboard Overview",
  description: "PT Denko Wahana Sakti Administrator Panel Overview",
};

export default function AdminDashboard() {
  const recentLeads = [
    {
      company: "PT Sumber Makmur",
      action: "Meminta penawaran: Forklift Electric",
      time: "10 Menit yang lalu",
      icon: PhoneCall,
      iconBg: "bg-green-50 text-green-600",
    },
    {
      company: "CV Mitra Logistik",
      action: "Meminta penawaran: Reach Truck",
      time: "45 Menit yang lalu",
      icon: MailOpen,
      iconBg: "bg-blue-55/10 text-brand-blue",
    },
    {
      company: "PT Industri Nusantara",
      action: "Meminta penawaran: Scissor Lift",
      time: "2 Jam yang lalu",
      icon: PhoneCall,
      iconBg: "bg-green-50 text-green-600",
    },
  ];

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

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Selamat datang kembali, Agung Ramdhani. Berikut adalah performa bisnis hari ini.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
              Live Traffic Active
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* StatCard 1: Traffic */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Total Traffic</span>
              <h3 className="text-brand-darkBg font-display font-extrabold text-3xl">24,850</h3>
              <span className="text-green-500 text-xs font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +12.4% vs minggu lalu
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          {/* StatCard 2: Total Produk */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Total Produk</span>
              <h3 className="text-brand-darkBg font-display font-extrabold text-3xl">6 Active</h3>
              <span className="text-gray-400 text-xs block">Forklift & Lifting Equipment</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* StatCard 3: Total Leads */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Total Leads</span>
              <h3 className="text-brand-darkBg font-display font-extrabold text-3xl">142 Quotes</h3>
              <span className="text-green-500 text-xs font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +8.5% conversion rate
              </span>
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
              {recentLeads.map((lead, idx) => {
                const LeadIcon = lead.icon;
                return (
                  <div key={idx} className="py-4 flex items-center justify-between first:pt-0 last:pb-0 group">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${lead.iconBg} flex items-center justify-center`}>
                        <LeadIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-brand-darkBg font-bold text-sm">{lead.company}</h4>
                        <p className="text-gray-400 text-xs mt-0.5">{lead.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{lead.time}</span>
                  </div>
                );
              })}
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
                      className="flex items-center gap-3 p-3 rounded-xl bg-brand-lightBg hover:bg-brand-blue/5 hover:text-brand-blue border border-transparent hover:border-brand-blueLight/20 text-gray-600 transition-all font-medium text-sm"
                    >
                      <ActionIcon className="w-5 h-5 text-brand-blue" />
                      {action.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="bg-brand-darkBg rounded-xl p-4 text-center border border-white/5 shadow-inner">
              <p className="text-gray-400 text-xs leading-relaxed">PT Denko Wahana Sakti Admin Portal. Selalu jaga kerahasiaan data leads customer.</p>
            </div>
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
