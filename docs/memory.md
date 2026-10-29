# Project Memory & Decisions — VOID ESSENTIALS

## 1. Project Context
* **Entity**: VOID ESSENTIALS
* **Core Philosophy**: *"Essentials, without excess."*
* **Mission**: Build an ultra-polished, contemporary luxury clothing e-commerce web platform inspired by editorial fashion standards, pairing severe minimalist design with responsive full-stack functionality.

---

## 2. Confirmed Brand Facts (Verified from `voidessentials.store`)
* **Brand Name**: VOID ESSENTIALS
* **Official Slogan**: *"Essentials, without excess"*
* **Official Support Email**: `support@voidessentials.store`
* **Operational Mode**: Atelier drops, private archival fittings, and synchronized seasonal restocks.

---

## 3. Assumptions & Marked Placeholders
* **Physical Address**: `[Placeholder: Brand Flagship Atelier, 104 Mercer St, Soho, New York, NY 10012]`
* **Customer Support Phone**: `[Placeholder: +1 (800) 555-VOID]`
* **Payment Processing**: Simulated checkout with client-side card validation and realistic order receipt generation; live payments require `STRIPE_SECRET_KEY` in `.env`.
* **Transactional Email**: Local fallback logger and Celery background task mock; live dispatch requires SMTP or SendGrid API configuration.

---

## 4. Key Architectural & Technical Decisions
* **Full-Stack Split**: Next.js (App Router, Tailwind CSS, GSAP, Anime.js) on port 3000; Flask API on port 5001.
* **Database**: SQLite default (`instance/void_store.db`) mapped via Flask-SQLAlchemy declarative models, ensuring zero-code migration path to PostgreSQL.
* **Authentication**: JWT token system (access token in headers, secure refresh token).
* **Worker & Cache**: Redis as message broker and caching layer; Celery for asynchronous jobs (order receipts, welcome sequences, administrative CSV exports).
* **Resilience Rule**: If Redis or Celery daemon is stopped during local frontend/backend work, the backend logs a graceful warning and performs tasks synchronously so the store never errors out.
* **Visual Direction**: Direct adaptation of the provided visual reference (`GAZU` layout):
  * Jet black top announcement banner.
  * Spacious uppercase navigation with centered bold brand mark.
  * Hero section featuring oversized background watermark typography layered behind an editorial cutout model figure.
  * Solid dark band category showcase (`MEN`, `WOMEN`, `ACCESSORIES`).
  * Split campaign editorial featurette (`NEW VIBES`).
  * Minimalist 4-column value proposition trust badges.
  * Filterable collection grid with interactive cart drawer.

---

## 5. Changelog & State Preservation
* **Initial Setup (Oct 2026)**: Defined architectural blueprint, PRD, coding rules, visual tokens, and multi-phase execution roadmap.
