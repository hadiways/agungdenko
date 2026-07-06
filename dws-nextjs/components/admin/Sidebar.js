class DWSAdminSidebar extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname;
    
    // Check which menu is active
    const isDashboard = currentPath.endsWith('admin/') || currentPath.endsWith('admin/index.html');
    const isProducts = currentPath.includes('products.html');
    const isCustomers = currentPath.includes('customers.html');
    const isAnalytics = currentPath.includes('analytics.html');
    
    this.innerHTML = `
      <!-- Desktop Sidebar (fixed left) -->
      <aside class="hidden lg:flex flex-col w-64 bg-brand-darkBg text-gray-400 fixed inset-y-0 left-0 border-r border-white/5 z-30">
          <!-- Logo at top -->
          <div class="h-20 flex items-center px-6 border-b border-white/5">
              <a href="../index.html" class="flex items-center gap-3 group">
                  <div class="flex items-center justify-center bg-brand-blue text-white font-display font-extrabold text-lg px-2.5 py-0.5 rounded-md skew-x-12 transform group-hover:scale-105 duration-300">
                      <span class="-skew-x-12">DWS</span>
                  </div>
                  <div class="flex flex-col">
                      <span class="text-white font-display font-bold text-xs tracking-wider">ADMIN PANEL</span>
                      <span class="text-brand-blueLight text-[9px] font-light">Material Handling</span>
                  </div>
              </a>
          </div>
          
          <!-- Navigation -->
          <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              <a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${isDashboard ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15' : 'hover:bg-white/5 hover:text-white'}">
                  <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                  <span>Dashboard</span>
              </a>
              <a href="products.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${isProducts ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15' : 'hover:bg-white/5 hover:text-white'}">
                  <i data-lucide="package" class="w-5 h-5"></i>
                  <span>Produk</span>
              </a>
              <a href="customers.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${isCustomers ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15' : 'hover:bg-white/5 hover:text-white'}">
                  <i data-lucide="users" class="w-5 h-5"></i>
                  <span>Customer Leads</span>
              </a>
              <a href="analytics.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${isAnalytics ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15' : 'hover:bg-white/5 hover:text-white'}">
                  <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                  <span>Traffic Analytics</span>
              </a>
          </nav>

          <!-- User Profile info at bottom -->
          <div class="p-4 border-t border-white/5 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blueLight/20 flex items-center justify-center text-brand-blueLight">
                  <i data-lucide="user" class="w-5 h-5"></i>
              </div>
              <div class="flex-1 overflow-hidden">
                  <h4 class="text-white text-xs font-semibold truncate">Agung Ramdhani</h4>
                  <p class="text-gray-500 text-[10px] truncate">Administrator</p>
              </div>
              <a href="../index.html" class="text-gray-500 hover:text-white transition-colors" title="Keluar ke Web Utama">
                  <i data-lucide="log-out" class="w-4 h-4"></i>
              </a>
          </div>
      </aside>

      <!-- Mobile Top Bar -->
      <div class="lg:hidden h-16 bg-brand-darkBg text-white px-6 border-b border-white/5 flex items-center justify-between fixed top-0 inset-x-0 z-40">
          <a href="../index.html" class="flex items-center gap-2">
              <div class="bg-brand-blue text-white font-extrabold text-sm px-2 py-0.5 rounded skew-x-12">
                  <span class="-skew-x-12">DWS</span>
              </div>
              <span class="font-display font-bold text-xs tracking-wider">ADMIN</span>
          </a>
          <button id="admin-menu-toggle" class="text-gray-400 hover:text-white focus:outline-none">
              <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
      </div>

      <!-- Mobile Drawer Panel -->
      <div id="admin-mobile-menu" class="hidden fixed inset-0 z-50 lg:hidden">
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" id="admin-menu-overlay"></div>
          <nav class="fixed top-0 bottom-0 left-0 w-64 bg-brand-darkBg border-r border-white/5 p-6 flex flex-col justify-between z-10">
              <div class="space-y-8">
                  <div class="flex items-center justify-between">
                      <span class="text-white font-display font-bold text-sm tracking-wide">DWS ADMIN</span>
                      <button id="admin-menu-close" class="text-gray-400 hover:text-white">
                          <i data-lucide="x" class="w-5 h-5"></i>
                      </button>
                  </div>
                  <div class="space-y-2 flex flex-col">
                      <a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isDashboard ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                          <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                          <span>Dashboard</span>
                      </a>
                      <a href="products.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isProducts ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                          <i data-lucide="package" class="w-5 h-5"></i>
                          <span>Produk</span>
                      </a>
                      <a href="customers.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isCustomers ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                          <i data-lucide="users" class="w-5 h-5"></i>
                          <span>Customer Leads</span>
                      </a>
                      <a href="analytics.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isAnalytics ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                          <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                          <span>Traffic Analytics</span>
                      </a>
                  </div>
              </div>
              <div class="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div class="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blueLight">
                      <i data-lucide="user" class="w-5 h-5"></i>
                  </div>
                  <div class="flex-1">
                      <h4 class="text-white text-xs font-semibold">Agung Ramdhani</h4>
                      <p class="text-gray-500 text-[10px]">Administrator</p>
                  </div>
              </div>
          </nav>
      </div>
    `;

    // Mobile Drawer Logic
    const toggleBtn = this.querySelector('#admin-menu-toggle');
    const closeBtn = this.querySelector('#admin-menu-close');
    const overlay = this.querySelector('#admin-menu-overlay');
    const mobileMenu = this.querySelector('#admin-mobile-menu');

    const openMenu = () => mobileMenu.classList.remove('hidden');
    const closeMenu = () => mobileMenu.classList.add('hidden');

    if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
  }
}
customElements.define('dws-admin-sidebar', DWSAdminSidebar);
