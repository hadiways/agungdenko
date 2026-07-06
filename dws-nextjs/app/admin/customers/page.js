"use client";

import { useState, useEffect } from "react";
import { Download, MessageSquare, Trash2 } from "lucide-react";

export default function AdminCustomersPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    document.title = "DWS Admin | Customer Leads";
    const saved = localStorage.getItem("quote_leads");
    if (saved) {
      try {
        setLeads(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local leads", e);
        setLeads([]);
      }
    } else {
      localStorage.setItem("quote_leads", JSON.stringify([]));
      setLeads([]);
    }
  }, []);

  const handleDeleteLead = (idx) => {
    if (confirm("Apakah Anda yakin ingin menghapus log leads ini?")) {
      const updated = leads.filter((_, i) => i !== idx);
      setLeads(updated);
      localStorage.setItem("quote_leads", JSON.stringify(updated));
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) {
      alert("Tidak ada data leads untuk diekspor.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nama Perusahaan/Client,WhatsApp,Produk Diminati,Tanggal\n";
    leads.forEach((l) => {
      csvContent += `"${l.company.replace(/"/g, '""')}","${l.phone}","${l.product}","${l.date}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customer_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Customer Leads</h1>
            <p className="text-gray-500 text-sm mt-1">Data permintaan penawaran harga (quotes) masuk secara dinamis dari website.</p>
          </div>
          <button 
            onClick={exportCSV}
            className="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150 flex items-center gap-2"
          >
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
                {leads.length > 0 ? (
                  leads.map((lead, idx) => (
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
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={lead.waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Hubungi WA
                          </a>
                          <button
                            onClick={() => handleDeleteLead(idx)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-lg transition-colors border border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-400 text-xs">
                      Belum ada permintaan penawaran harga masuk.
                    </td>
                  </tr>
                )}
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
