class DWSFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer id="kontak" class="bg-brand-darkBg text-gray-400 pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative">
          <div class="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              
              <!-- Column 1: Hubungi Saya -->
              <div class="space-y-6">
                  <div>
                      <h3 class="text-white font-display font-bold text-xl uppercase tracking-wider border-b-2 border-brand-blue pb-2 mb-4 inline-block">Hubungi Saya</h3>
                      <div class="flex items-center gap-3 mt-4">
                          <div class="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blueLight">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          </div>
                          <div>
                              <h4 class="text-white font-bold text-base">Agung Ramdhani</h4>
                              <p class="text-gray-400 text-xs">Sales Executive - PT Denko Wahana Sakti</p>
                          </div>
                      </div>
                  </div>

                  <div class="space-y-4">
                      <a href="https://wa.me/6285784380347" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-gray-300 hover:text-brand-blueLight transition-colors group">
                          <div class="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-brand-blue/10 flex items-center justify-center">
                              <svg class="w-5 h-5 text-brand-blueLight fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.411 1.505 5.41 1.507 5.389 0 9.771-4.377 9.774-9.76.002-2.607-1.011-5.059-2.854-6.904C17.135 2.152 14.69 1.137 12.08 1.137c-5.396 0-9.786 4.385-9.789 9.772a9.713 9.713 0 001.492 5.161l-.982 3.585 3.676-.964zm13.726-5.32c-.33-.165-1.951-.963-2.251-1.073-.3-.11-.518-.165-.736.165-.218.33-.844 1.073-1.036 1.293-.191.22-.383.247-.713.082-1.066-.533-1.89-1.025-2.686-2.387-.21-.36.21-.334.6-.112.35.2.383.33.565.66.182.33.09.632-.045.897-.136.265-.736 1.77-.999 2.4-.255.613-.518.529-.736.54l-.627.01c-.218 0-.573-.082-.873-.412-.3-.33-1.145-1.117-1.145-2.723 0-1.605 1.163-3.155 1.327-3.376.164-.22 2.29-3.498 5.548-4.908.775-.335 1.38-.535 1.85-.683.778-.247 1.487-.212 2.047-.128.625.094 1.95.797 2.224 1.566.273.769.273 1.43.136 1.704-.136.273-.382.44-.712.605z"/></svg>
                          </div>
                          <span>0857-8438-0347</span>
                      </a>
                      
                      <a href="mailto:agung.ramdhani@denkowahanasakti.co.id" class="flex items-center gap-3 text-gray-300 hover:text-brand-blueLight transition-colors group">
                          <div class="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-brand-blue/10 flex items-center justify-center">
                              <svg class="w-5 h-5 text-brand-blueLight" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          </div>
                          <span>agung.ramdhani@denkowahanasakti.co.id</span>
                      </a>

                      <div class="flex items-center gap-3 text-gray-300">
                          <div class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                              <svg class="w-5 h-5 text-brand-blueLight" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          </div>
                          <span>Bandung, Jawa Barat, Indonesia</span>
                      </div>
                  </div>
              </div>

              <!-- Column 2: Kantor Kami -->
              <div>
                  <h3 class="text-white font-display font-bold text-xl uppercase tracking-wider border-b-2 border-brand-blue pb-2 mb-4 inline-block">Kantor Kami</h3>
                  <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                      <strong>PT Denko Wahana Sakti Bandung</strong><br>
                      Jl. Soekarno Hatta No. 645, Bandung, Jawa Barat 40286, Indonesia
                  </p>

                  <!-- Map Frame -->
                  <div class="w-full h-44 rounded-xl overflow-hidden shadow-md relative border border-white/10 group">
                      <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.575971439228!2d107.64969247484725!3d-6.941178693059082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e80be4bfd48b%3A0xe54e2fe7f4abdc4c!2sPT%20Denko%20Wahana%20Sakti%20Bandung!5e0!3m2!1sid!2sid!4v1719999999999!5m2!1sid!2sid" 
                          class="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          allowfullscreen="" 
                          loading="lazy" 
                          referrerpolicy="no-referrer-when-downgrade">
                      </iframe>
                      <a href="https://maps.app.goo.gl/wS78n32Q1mK8P3Q59" target="_blank" rel="noopener noreferrer" class="absolute bottom-2 left-2 bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded shadow-lg transition-colors">
                          Lihat di Google Maps
                      </a>
                  </div>
              </div>

              <!-- Column 3: Kirim Pesan / Minta Penawaran -->
              <div class="bg-brand-darkCard rounded-2xl p-6 border border-white/5 shadow-xl">
                  <h3 class="text-white font-display font-bold text-lg mb-2">Kirim Pesan / Minta Penawaran</h3>
                  <p class="text-gray-400 text-xs mb-6">Lengkapi form berikut untuk langsung menghubungi Sales Representative via WhatsApp.</p>
                  
                  <form id="quote-form" class="space-y-4">
                      <div class="grid grid-cols-2 gap-4">
                          <input type="text" id="form-name" placeholder="Nama Lengkap" required class="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all">
                          <input type="text" id="form-company" placeholder="Perusahaan" required class="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all">
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                          <input type="tel" id="form-phone" placeholder="No. WhatsApp" required class="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all">
                          <input type="email" id="form-email" placeholder="Email" required class="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all">
                      </div>
                      <div>
                          <select id="select-product" class="w-full bg-brand-darkBg border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all">
                              <option value="" disabled selected>Produk yang Diminati</option>
                              <option value="forklift-electric">Forklift Electric</option>
                              <option value="forklift-diesel">Forklift Diesel</option>
                              <option value="reach-truck">Reach Truck</option>
                              <option value="electric-stacker">Electric Stacker</option>
                              <option value="hand-pallet">Hand Pallet</option>
                              <option value="scissor-lift">Scissor Lift</option>
                              <option value="other">Lainnya / Konsultasi</option>
                          </select>
                      </div>
                      <div>
                          <textarea id="form-message" rows="3" placeholder="Pesan / Kebutuhan Anda (Kapasitas beban, tinggi angkat, dll.)" required class="w-full bg-brand-darkBg border border-white/10 rounded-lg p-3 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"></textarea>
                      </div>
                      <button type="submit" class="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-lg hover:shadow-brand-blue/20 active:scale-98 transition-all duration-150">
                          Kirim Pesan
                      </button>
                  </form>
              </div>
          </div>

          <div class="h-[1px] bg-white/5 mb-8"></div>

          <div class="container mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
              <p>&copy; 2026 PT Denko Wahana Sakti. All Rights Reserved. Sales Executive Agung Ramdhani.</p>
              <div class="flex gap-4">
                  <a href="#" class="hover:text-brand-blueLight transition-colors">Syarat & Ketentuan</a>
                  <a href="#" class="hover:text-brand-blueLight transition-colors">Kebijakan Privasi</a>
              </div>
          </div>
      </footer>
    `;

    // Form logic
    const quoteForm = this.querySelector('#quote-form');
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = this.querySelector('#form-name').value;
        const company = this.querySelector('#form-company').value;
        const phone = this.querySelector('#form-phone').value;
        const email = this.querySelector('#form-email').value;
        const productSelect = this.querySelector('#select-product');
        const productName = productSelect.options[productSelect.selectedIndex].text;
        const message = this.querySelector('#form-message').value;

        const targetNumber = '6281234567890'; // Agung Ramdhani WA
        const baseText = `Halo Pak Agung Ramdhani, saya ingin meminta penawaran harga unit dari website PT Denko Wahana Sakti.

Berikut detail kebutuhan saya:
*Nama:* ${name}
*Perusahaan:* ${company}
*No. WhatsApp:* ${phone}
*Email:* ${email}
*Produk Diminati:* ${productName}
*Pesan/Detail:* ${message}`;

        const encodedText = encodeURIComponent(baseText);
        const waUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedText}`;

        window.open(waUrl, '_blank');
    });
  }
}
customElements.define('dws-footer', DWSFooter);
