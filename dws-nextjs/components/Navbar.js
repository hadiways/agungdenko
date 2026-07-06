class DWSNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header id="main-header" class="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-transparent py-4 px-6 md:px-12 flex items-center justify-between">
          <!-- Logo -->
          <a href="index.html" class="flex items-center gap-3 group">
              <div class="flex items-center justify-center bg-brand-blue text-white font-display font-extrabold text-2xl px-3 py-1 rounded-md skew-x-12 transform transition-transform group-hover:scale-105 duration-300">
                  <span class="-skew-x-12">DWS</span>
              </div>
              <div class="flex flex-col">
                  <span class="text-white font-display font-bold text-sm tracking-wide leading-none group-hover:text-brand-blueLight transition-colors">PT DENKO WAHANA SAKTI</span>
                  <span class="text-gray-400 text-xs tracking-wider font-light">Material Handling Solution</span>
              </div>
          </a>

          <!-- Desktop Menu -->
          <nav class="hidden lg:flex items-center gap-8">
              <a href="index.html" class="text-white hover:text-brand-blueLight font-medium text-sm transition-colors">Beranda</a>
              <a href="about.html" class="text-white hover:text-brand-blueLight font-medium text-sm transition-colors">Tentang Kami</a>
              <a href="products.html" class="text-white hover:text-brand-blueLight font-medium text-sm transition-colors">Produk</a>
              <a href="services.html" class="text-white hover:text-brand-blueLight font-medium text-sm transition-colors">Layanan</a>
              <a href="gallery.html" class="text-white hover:text-brand-blueLight font-medium text-sm transition-colors">Galeri</a>
              <a href="testimonials.html" class="text-white hover:text-brand-blueLight font-medium text-sm transition-colors">Testimoni</a>
              <a href="contact.html" class="text-white hover:text-brand-blueLight font-medium text-sm transition-colors">Kontak</a>
          </nav>

          <!-- CTA right -->
          <div class="hidden lg:flex items-center">
              <a href="contact.html" class="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150">
                  Minta Penawaran
              </a>
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="lg:hidden text-white hover:text-brand-blueLight transition-colors focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>

          <!-- Mobile Menu Panel -->
          <div id="mobile-menu" class="hidden absolute top-full inset-x-0 bg-brand-darkBg/98 border-t border-white/5 py-6 px-6 z-40 shadow-2xl">
              <nav class="flex flex-col gap-4">
                  <a href="index.html" class="mobile-link text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2 border-b border-white/5">Beranda</a>
                  <a href="about.html" class="mobile-link text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2 border-b border-white/5">Tentang Kami</a>
                  <a href="products.html" class="mobile-link text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2 border-b border-white/5">Produk</a>
                  <a href="services.html" class="mobile-link text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2 border-b border-white/5">Layanan</a>
                  <a href="gallery.html" class="mobile-link text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2 border-b border-white/5">Galeri</a>
                  <a href="testimonials.html" class="mobile-link text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2 border-b border-white/5">Testimoni</a>
                  <a href="contact.html" class="mobile-link text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2">Kontak</a>
                  <a href="contact.html" class="mobile-link mt-2 text-center bg-brand-blue hover:bg-brand-blueDark text-white font-bold py-3 rounded-lg shadow-lg">Minta Penawaran</a>
              </nav>
          </div>
      </header>
    `;

    // Sticky Scroll Logic
    const header = this.querySelector('#main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-brand-darkBg/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/5');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-brand-darkBg/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/5');
            header.classList.add('bg-transparent');
        }
    });

    // Mobile Hamburger Logic
    const mobileMenuBtn = this.querySelector('#mobile-menu-btn');
    const mobileMenu = this.querySelector('#mobile-menu');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenuBtn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
        }
    });

    this.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
            isMenuOpen = false;
        });
    });
  }
}
customElements.define('dws-navbar', DWSNavbar);
