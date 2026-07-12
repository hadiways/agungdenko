"use client";

import { useState, useEffect } from "react";
import { sanityFetch } from "@/lib/sanity/fetch";
import scrapedProducts from "@/data/scraped_products.json";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  });

  const [salesProfile, setSalesProfile] = useState({
    name: "Agung Ramdhani",
    role: "Sales Executive - PT Denko Wahana Sakti",
    phone: "6285784380347",
    email: "agung@denko.co.id",
    avatar: ""
  });

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const baseProducts = scrapedProducts || [];
    const saved = localStorage.getItem("custom_products");
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        setProductList([...custom, ...baseProducts]);
      } catch (e) {
        console.error("Failed to parse custom products for footer", e);
        setProductList(baseProducts);
      }
    } else {
      setProductList(baseProducts);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sales_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSalesProfile({
          name: parsed.name,
          role: parsed.role,
          phone: parsed.phone,
          email: "agung@denko.co.id",
          avatar: parsed.avatar
        });
      } catch (e) {
        console.error("Failed to load footer sales profile", e);
      }
    }
  }, []);

  const [contentAvailability, setContentAvailability] = useState({
    hasArticles: false,
    hasGallery: false
  });

  useEffect(() => {
    async function checkAvailability() {
      try {
        const query = `{
          "hasArticles": count(*[_type == "article" && status == "published"]) > 0,
          "hasGallery": count(*[_type == "gallery"]) > 0
        }`;
        const data = await sanityFetch(query);
        if (data) {
          setContentAvailability({
            hasArticles: !!data.hasArticles,
            hasGallery: !!data.hasGallery
          });
        }
      } catch (err) {
        console.error("Failed to check footer content availability", err);
      }
    }
    checkAvailability();
  }, []);

  useEffect(() => {
    const handleSelectProduct = (e) => {
      setFormData((prev) => ({
        ...prev,
        product: e.detail,
      }));
      const element = document.getElementById("kontak");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("select-product", handleSelectProduct);
    return () => window.removeEventListener("select-product", handleSelectProduct);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, company, phone, email, product, message } = formData;
    const targetNumber = salesProfile.phone;
    const baseText = `Halo Pak ${salesProfile.name}, saya ingin meminta penawaran harga unit dari website PT Denko Wahana Sakti.

Berikut detail kebutuhan saya:
*Nama:* ${name}
*Perusahaan:* ${company}
*No. WhatsApp:* ${phone}
*Email:* ${email}
*Produk Diminati:* ${product || "Lainnya / Konsultasi"}
*Pesan/Detail:* ${message}`;

    try {
      const existingLeads = JSON.parse(localStorage.getItem("quote_leads") || "[]");
      const dateNow = new Date();
      const formattedDate = `${String(dateNow.getDate()).padStart(2, '0')}/${String(dateNow.getMonth() + 1).padStart(2, '0')}/${dateNow.getFullYear()} - ${String(dateNow.getHours()).padStart(2, '0')}:${String(dateNow.getMinutes()).padStart(2, '0')}`;
      const newLead = {
        company: company || name || "Perseorangan",
        phone: phone,
        waLink: `https://wa.me/${phone.replace(/[^\d]/g, "")}`,
        product: product || "Lainnya / Konsultasi",
        date: formattedDate,
      };
      localStorage.setItem("quote_leads", JSON.stringify([newLead, ...existingLeads]));
    } catch (err) {
      console.error("Failed to save lead to localStorage", err);
    }

    const encodedText = encodeURIComponent(baseText);
    const waUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedText}`;
    window.open(waUrl, "_blank");
  };

  return (
    <footer id="kontak" className="bg-brand-darkBg text-gray-400 pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Column 1: Hubungi Saya */}
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-display font-bold text-xl uppercase tracking-wider border-b-2 border-brand-blue pb-2 mb-4 inline-block">Hubungi Saya</h3>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blueLight overflow-hidden shrink-0">
                {salesProfile.avatar ? (
                  <img src={salesProfile.avatar} alt={salesProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                )}
              </div>
              <div>
                <h4 className="text-white font-bold text-base">{salesProfile.name}</h4>
                <p className="text-gray-400 text-xs">{salesProfile.role}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a href={`https://wa.me/${salesProfile.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-brand-blueLight transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-brand-blue/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-blueLight fill-current" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clipRule="evenodd"/>
                  <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
                </svg>
              </div>
              <span>{salesProfile.phone}</span>
            </a>

            <a href="mailto:agung@denko.co.id" className="flex items-center gap-3 text-gray-300 hover:text-brand-blueLight transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-brand-blue/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-blueLight" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span>agung@denko.co.id</span>
            </a>

            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-blueLight" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span>Bandung, Jawa Barat, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Column 2: Kantor Kami */}
        <div>
          <h3 className="text-white font-display font-bold text-xl uppercase tracking-wider border-b-2 border-brand-blue pb-2 mb-4 inline-block">Kantor Kami</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            <strong>PT Denko Wahana Sakti Bandung</strong><br />
            Kawasan Industri DE Prima Terra Blok E 2 No 11, Jalan Raya Sapan, RT 01 RW 01, Kelurahan Tegalluar, Kecamatan Bojongsoang, Kab. Bandung, Jawa Barat
          </p>

          {/* Map Frame */}
          <div className="w-full h-44 rounded-xl overflow-hidden shadow-md relative border border-white/10 group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.575971439228!2d107.64969247484725!3d-6.941178693059082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e80be4bfd48b%3A0xe54e2fe7f4abdc4c!2sPT%20Denko%20Wahana%20Sakti%20Bandung!5e0!3m2!1sid!2sid!4v1719999999999!5m2!1sid!2sid" 
              className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            <a href="https://maps.app.goo.gl/YDXaaiqJANYgGVFC7" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 left-2 bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded shadow-lg transition-colors">
              Lihat di Google Maps
            </a>
          </div>
        </div>

        {/* Column 3: Kirim Pesan / Minta Penawaran */}
        <div className="bg-brand-darkCard rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="text-white font-display font-bold text-lg mb-2">Kirim Pesan / Minta Penawaran</h3>
          <p className="text-gray-400 text-xs mb-6">Lengkapi form berikut untuk langsung menghubungi Sales Representative via WhatsApp.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" id="name" placeholder="Nama Lengkap" required value={formData.name} onChange={handleChange} className="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
              <input type="text" id="company" placeholder="Perusahaan" required value={formData.company} onChange={handleChange} className="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="tel" id="phone" placeholder="No. WhatsApp" required value={formData.phone} onChange={handleChange} className="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
              <input type="email" id="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
            </div>
            <div>
              <select id="product" value={formData.product} onChange={handleChange} className="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all">
                <option value="" disabled>Produk yang Diminati</option>
                {productList && productList.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Lainnya / Konsultasi">Lainnya / Konsultasi</option>
              </select>
            </div>
            <div>
              <textarea id="message" rows="3" placeholder="Pesan / Kebutuhan Anda (Kapasitas beban, tinggi angkat, dll.)" required value={formData.message} onChange={handleChange} className="w-full bg-brand-darkBg border border-white/10 rounded-lg p-3 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-lg hover:shadow-brand-blue/20 active:scale-98 transition-all duration-150">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>

      {/* Footer Quick Links Grid */}
      <div className="h-[1px] bg-white/5 my-8"></div>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs mb-8">
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider">Produk Populer</h4>
          <ul className="space-y-2">
            <li><a href="/products?cat=diesel" className="hover:text-brand-blueLight transition-colors">Forklift Diesel</a></li>
            <li><a href="/products?cat=electric" className="hover:text-brand-blueLight transition-colors">Forklift Electric</a></li>
            <li><a href="/products?cat=reach-truck" className="hover:text-brand-blueLight transition-colors">Reach Truck</a></li>
            <li><a href="/products?cat=stacker" className="hover:text-brand-blueLight transition-colors">Electric Stacker</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider">Layanan</h4>
          <ul className="space-y-2">
            <li><a href="/services/sales" className="hover:text-brand-blueLight transition-colors">Sales (Penjualan)</a></li>
            <li><a href="/services/maintenance" className="hover:text-brand-blueLight transition-colors">Service & Maintenance</a></li>
            <li><a href="/services/sparepart" className="hover:text-brand-blueLight transition-colors">Suku Cadang</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider">Solusi Industri</h4>
          <ul className="space-y-2">
            <li><a href="/solutions/warehouse" className="hover:text-brand-blueLight transition-colors">Warehouse (Gudang)</a></li>
            <li><a href="/solutions/manufacturing" className="hover:text-brand-blueLight transition-colors">Manufacturing (Pabrik)</a></li>
            <li><a href="/solutions/logistics" className="hover:text-brand-blueLight transition-colors">Logistics (Distribusi)</a></li>
            <li><a href="/solutions/cold-storage" className="hover:text-brand-blueLight transition-colors">Cold Storage (Gudang Beku)</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider">Perusahaan</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-brand-blueLight transition-colors">About Us</a></li>
            {contentAvailability.hasGallery && (
              <li><a href="/gallery" className="hover:text-brand-blueLight transition-colors">Gallery</a></li>
            )}
            <li><a href="/testimonials" className="hover:text-brand-blueLight transition-colors">Testimonials</a></li>
            {contentAvailability.hasArticles && (
              <li><a href="/artikel" className="hover:text-brand-blueLight transition-colors">Artikel & News</a></li>
            )}
          </ul>
        </div>
      </div>

      <div className="h-[1px] bg-white/5 mb-8"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>&copy; 2026 PT Denko Wahana Sakti. All Rights Reserved. Sales Executive Agung Ramdhani.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand-blueLight transition-colors">Syarat & Ketentuan</a>
          <a href="#" className="hover:text-brand-blueLight transition-colors">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
}
