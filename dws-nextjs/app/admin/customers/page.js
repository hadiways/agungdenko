import { Download, MessageSquare } from "lucide-react";

export const metadata = {
  title: "DWS Admin | Customer Leads",
  description: "PT Denko Wahana Sakti Administrator Panel Customer Leads",
};

export default function AdminCustomersPage() {
  const leads = [
    {
      company: "PT Sumber Makmur",
      phone: "0812-3456-7890",
      waLink: "https://wa.me/6281234567890",
      product: "Forklift Electric",
      date: "05/07/2026 - 19:45",
    },
    {
      company: "CV Mitra Logistik",
      phone: "0898-7654-3210",
      waLink: "https://wa.me/6289876543210",
      product: "Reach Truck",
      date: "05/07/2026 - 19:10",
    },
    {
      company: "PT Industri Nusantara",
      phone: "0811-2233-4455",
      waLink: "https://wa.me/6281122334455",
      product: "Scissor Lift",
      date: "05/07/2026 - 17:30",
    },
    {
      company: "CV Sinar Logistik",
      phone: "0852-1122-3344",
      waLink: "https://wa.me/6285211223344",
      product: "Hand Pallet",
      date: "04/07/2026 - 15:20",
    },
    {
      company: "PT Harapan Jaya",
      phone: "0877-6655-4433",
      waLink: "https://wa.me/6287766554433",
      product: "Forklift Diesel",
      date: "04/07/2026 - 11:15",
    },
  ];

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Customer Leads</h1>
            <p className="text-gray-500 text-sm mt-1">Data permintaan penawaran harga (quotes) masuk dari website.</p>
          </div>
          <button className="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Ekspor CSV
          </button>
        </div>

        {/* Leads Table Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-brand-darkBg text-white font-display uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">Nama Perusahaan</th>
                  <th className="py-4 px-6">WhatsApp</th>
                  <th className="py-4 px-6">Produk Diminati</th>
                  <th className="py-4 px-6">Tanggal Submit</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {leads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-brand-blue/5 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-darkBg">{lead.company}</td>
                    <td className="py-4 px-6 font-medium">{lead.phone}</td>
                    <td className="py-4 px-6">
                      <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {lead.product}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">{lead.date}</td>
                    <td className="py-4 px-6 text-center">
                      <a
                        href={lead.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Hubungi WA
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
