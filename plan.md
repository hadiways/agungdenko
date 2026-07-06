# Project Plan: PT Denko Wahana Sakti - B2B Static Portal & Admin Dashboard

## 1. Concept Overview
Create a high-end, professional, and modern company profile, landing page, and SaaS Admin Dashboard for **PT Denko Wahana Sakti**, a distributor of forklift and material handling solutions. The design follows an industrial corporate blue aesthetic (Primary Blue `#084C8F`, Secondary Blue `#86A8BD`, Dark Navy `#0B1B2B`, Accent Blue `#2F80ED`), reflecting a clean and trustworthy B2B heavy equipment distributor identity.

## 2. Tech Stack
*   **Structure:** HTML5 with semantic layout tags.
*   **Styling:** Tailwind CSS (via CDN) for modern styling, custom typography (Poppins & Inter fonts via Google Fonts), and custom CSS animations.
*   **Interactivity:** Vanilla JavaScript (Web Components) for dynamic rendering of product data, testimonials, hamburger menus, and contact forms.
*   **Data Layer:** External `/data/` directory containing product listings, testimonials, service icons, gallery items, and partners for easy edits.
*   **Styles:** External `/styles/theme.css` stylesheet for smooth scrollbars and keyframes.
*   **Assets:** Local original assets in kebab-cased JPG format under `public/images/`.
*   **Package Management:** Custom root `package.json` mapping `npm run dev` in the root workspace folder to launch a lightweight static web server on port 3001 serving `dws-nextjs/`.

## 3. File Structure (Consolidated)
```text
/agungdenko
  ├── dws-nextjs/
  │     ├── index.html       (Main homepage)
  │     ├── about.html       (About page)
  │     ├── products.html    (Products catalog)
  │     ├── services.html    (Services page)
  │     ├── gallery.html     (Gallery page)
  │     ├── testimonials.html (Testimonials page)
  │     ├── contact.html     (Contact page)
  │     ├── data/
  │     │     ├── products.js
  │     │     ├── services.js
  │     │     ├── testimonials.js
  │     │     ├── partners.js
  │     │     └── features.js
  │     ├── components/
  │     │     ├── Navbar.js  (Sticky Header Component)
  │     │     ├── Footer.js  (Dark Footer & Form Component)
  │     │     └── admin/
  │     │           └── Sidebar.js (Admin Sidebar Web Component)
  │     ├── admin/
  │     │     ├── index.html (Dashboard Overview)
  │     │     ├── products.html (Product management)
  │     │     ├── customers.html (Customer leads)
  │     │     └── analytics.html (Traffic analytics)
  │     ├── public/images/   (Folder containing blue-themed assets)
  │     └── styles/
  │           └── theme.css  (Custom CSS scrollbars & animations)
  ├── package.json           (Custom root npm script mappings)
  └── plan.md                (This file)
```

## 4. Task List

*   [x] **Task 1: Set up directories and plan.md**
*   [x] **Task 2: Generate realistic high-quality blue assets** using the image generation tool.
*   [x] **Task 3: Create & Organize dws-nextjs folder structure**
    *   Split monolithic data script into `/data/` folder files.
    *   Extract header/footer logic into custom Web Components under `/components/`.
    *   Move custom styles to `/styles/theme.css`.
*   [x] **Task 4: Build & Refactor Pages**
    *   Create index.html, about.html, products.html, services.html, gallery.html, contact.html, and testimonials.html.
    *   Link styles/theme.css stylesheet and remove internal styles.
*   [x] **Task 5: Implement Interactive Logic**
    *   Hamburger menu, sticky scroll transition, testimonials slider, dynamic WhatsApp redirect.
*   [x] **Task 6: Configure root package.json**
    *   Create `package.json` mapping `npm run dev` in the root workspace folder to launch the static server serving `dws-nextjs/`.
*   [x] **Task 7: Resolve broken image paths**
    *   Create subdirectories under `public/images/` and generate solid-color placeholders matching corporate B2B palettes.
    *   Update image references in data files and page markup to relative `./public/images/...` paths.
*   [x] **Task 8: Add SaaS Admin Dashboard**
    *   Create `admin/` pages for Overview, Products, Customers, and Analytics.
    *   Add Admin Sidebar Web Component under `components/admin/Sidebar.js`.
*   [x] **Task 9: Consolidate Workspace & Resolve Duplication**
    *   Remove all redundant folders and files (`index.html`, `public/`, `styles/`, `data/`) from the root workspace directory.
    *   Set the development server port to `3001` to prevent port collisions.
    *   Audit and unify all paths inside the `dws-nextjs/` directory.
