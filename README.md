# VOID ESSENTIALS — Premium Clothing E-Commerce Platform

> **"Essentials, without excess."**  
> An architectural, minimalist full-stack clothing e-commerce web platform inspired directly by editorial fashion lookbooks and the Void Essentials atelier.

---

## 1. Project Overview & Visual Reference

This project pairs high-fashion editorial aesthetics with a decoupled, high-performance web architecture:

* **Visual Reference Mapping (GAZU Layout)**:
  * **Top Announcement Bar**: Jet black (`#0A0A0A`) with shipping thresholds and global utilities.
  * **Minimalist Header**: Uppercase tracked typography (`MEN`, `WOMEN`, `ACCESSORIES`, `ARCHIVE`), centered bold monolithic brand mark (`VOID`), and utility action cluster (`SEARCH`, `LOGIN/ACCOUNT`, `WISHLIST`, `CART`).
  * **Editorial Hero Canvas**: Oversized watermark brand lettering (`VOID`) layered behind an editorial cutout fashion model, asymmetrical typography (*"FASHION THAT MOVES WITH YOU."*), dual CTAs (*"SHOP NOW"* and *"EXPLORE NEW IN"*), and a seasonal badge (*"NEW COLLECTION 2025/2026"*).
  * **Solid Dark Band**: High-contrast black transition section presenting curated portals (`MEN`, `WOMEN`, `ACCESSORIES`) with thumbnail cards and directional arrow links.
  * **Split Campaign Featurette ("NEW VIBES")**: High-contrast headline, narrative copy, and editorial portrait photography.
  * **Trust Pillars**: Balanced 4-column value proposition strip (Fast Delivery, Easy Returns, Quality Assured, Secure Payment).
  * **Curated Grid ("BEST OF VOID")**: Hover image transitions, variant indicators, and quick add-to-bag capabilities.

* **Verified Brand Data (`voidessentials.store`)**:
  * **Brand Name**: VOID ESSENTIALS
  * **Slogan**: *"Essentials, without excess"*
  * **Verified Client Support**: `support@voidessentials.store`
  * **Model**: Atelier restock cycles, private archival fittings, and heavy organic textiles (320–500 GSM).
  * **Marked Placeholders**: Physical showroom address (`[Placeholder: Brand Flagship Atelier, 104 Mercer St, Soho, New York, NY 10012]`) and phone line (`[Placeholder: +1 (800) 555-VOID]`).

---

## 2. Technology Stack

* **Frontend**: Next.js 14, React 18, Tailwind CSS, Lucide Icons, GSAP, Anime.js.
* **Backend**: Python 3, Flask, Flask-SQLAlchemy (SQLite default, PostgreSQL-ready), Flask-JWT-Extended, Flask-Cors.
* **Cache & Worker**: Redis (message broker and cache), Celery (transactional email simulation, CSV export pipelines, restock notifications).
* **Storage**: SQLite (`instance/void_store.db`) with zero SQLite-specific quirks, ready to switch to PostgreSQL via `DATABASE_URL`.

---

## 3. Directory Layout

```
Void/
├── docs/                      # Architectural & planning specifications
│   ├── architecture.md
│   ├── design.md
│   ├── memory.md
│   ├── phases.md
│   ├── prd.md
│   └── rules.md
├── frontend/                  # Next.js Application
│   ├── app/                   # App Router pages (layout, home, catalog, products, checkout, about, contact)
│   ├── components/            # Layout, Home, Product, Cart, Auth, Search, UI components
│   ├── lib/                   # API client, Global Context & Store, Utilities
│   ├── styles/                # Tailwind CSS global styles
│   ├── tailwind.config.js
│   └── package.json
├── backend/                   # Flask REST API Engine
│   ├── app/
│   │   ├── models/            # SQLAlchemy database models
│   │   ├── routes/            # Blueprint endpoints (auth, products, categories, orders, contact, health)
│   │   ├── services/          # Database seeder with Void Essentials catalog
│   │   └── tasks/             # Celery background workers
│   ├── config.py              # Configuration & Environment loading
│   ├── run.py                 # Backend entry point (Port 5001)
│   └── requirements.txt
├── .env.example               # Environment variables template
└── README.md
```

---

## 4. Setup & Running Instructions

### 4.1 Backend Setup (Flask API)

1. Open a terminal in the project root:
   ```bash
   python -m pip install -r backend/requirements.txt
   ```
2. Start the Flask API server:
   ```bash
   python backend/run.py
   ```
   * The API runs at: `http://127.0.0.1:5001`
   * Health check endpoint: `http://127.0.0.1:5001/api/v1/health`
   * On first boot, the database is automatically created and seeded with categories, initial admin user (`admin@voidessentials.store` / `VoidSecure2026!`), and product catalog.

### 4.2 Frontend Setup (Next.js)

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 5. Starting Redis & Celery (Optional / Background Worker)

The platform is designed with **graceful degradation**: if Redis or Celery is not active during local development, the backend executes background tasks (e.g. order receipts, welcome emails) safely in synchronous fallback mode without throwing HTTP errors.

To run Celery and Redis in production or full background mode:

1. **Start Redis Server**:
   * *Windows (WSL / Native)*: `redis-server`
   * *Docker*: `docker run -d -p 6379:6379 redis:alpine`
2. **Start Celery Worker**:
   ```bash
   celery -A backend.app.tasks.celery_tasks.celery_app worker --loglevel=info -P solo
   ```
   *(Note: `-P solo` or `-P threads` is recommended on Windows).*

---

## 6. End-to-End Verification

* **Home Page**: Experience the hero watermark typography, layered editorial cutout, dark category band, and curated products.
* **Catalog & Filtering**: Browse `/catalog` with category filtering (`Men`, `Women`, `Accessories`, `Archival Only`) and price sorting.
* **Product Detail Page**: Visit any item to toggle sizes, color chips, and inspect fabric composition tabs.
* **Shopping Cart & Checkout**: Add pieces to the slide-in cart drawer, adjust quantities, and test the simulated checkout with instant order generation (`VOID-XXXXXXXX`).
* **Inquiry & Newsletter**: Submit messages via `/contact` and test newsletter subscription in the footer.
