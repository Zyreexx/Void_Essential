# Engineering Rules & Standards — VOID ESSENTIALS

## 1. Project-Specific Directives & Boundaries
* **Documentation First**: Maintain and update `docs/memory.md` whenever key architectural decisions, schema changes, or integrations evolve.
* **Truth in Data**: Never invent fictitious business entities, unverified physical store locations, or unsupported claims. Use confirmed facts from `voidessentials.store` (`support@voidessentials.store`, "Essentials, without excess"). Clearly mark all assumptions with `[Placeholder: ...]`.
* **Honest Integrations**: Never represent third-party payment gateways, external email delivery, or cloud warehouses as active unless configured with verified live credentials. Provide robust, documented fallback routines and test harnesses.

---

## 2. Backend Engineering Rules (Python & Flask)
* **Code Style & Structure**: Follow PEP 8 guidelines. Organize logic into modular blueprints (`auth`, `products`, `orders`, `contact`).
* **ORM & Database**:
  * Use Flask-SQLAlchemy with declarative base models.
  * Define explicit table names, column lengths, indexes, and foreign key relationships.
  * Keep all schema definitions compatible with both SQLite and PostgreSQL.
  * Always use database sessions within proper application contexts and commit/rollback cleanly in try-except blocks.
* **Security & Auth**:
  * Passwords must be hashed using secure algorithms (`werkzeug.security` or `bcrypt`) with high work factors. Plaintext passwords must never touch logs or databases.
  * JWT tokens must carry expiration timestamps (`exp`) and unique subjects (`sub`).
  * Validate all incoming request payloads against explicit required field schemas.
  * Configure CORS to whitelist only authorized frontend origins in production.
* **Async Workers (Celery & Redis)**:
  * Encapsulate all non-critical side effects (email confirmations, administrative report exports) inside Celery task functions.
  * Always implement graceful connectivity checks: if Redis or Celery is unavailable during local development, fall back cleanly without returning HTTP 500 errors to clients.

---

## 3. Frontend Engineering Rules (Next.js, React, Tailwind CSS)
* **Component Architecture**:
  * Structure components cleanly into `components/layout/`, `components/product/`, `components/cart/`, and `components/ui/`.
  * Ensure separation of concerns between stateful container components and presentational UI primitives.
  * Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **Styling & Design Tokens**:
  * Use Tailwind CSS classes adhering to the defined brand tokens (`void-black`, `bone-100`, `pitch-900`, etc.).
  * Avoid arbitrary inline styles where Tailwind utility classes exist.
  * Maintain responsive behavior across all standard breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
* **Animations (GSAP & Anime.js)**:
  * Animations must enhance the premium editorial feel without degrading scroll performance or causing layout shifts.
  * Check for `prefers-reduced-motion` and gracefully minimize heavy transform animations for users with motion sensitivity.
  * Clean up GSAP timelines and anime instances upon component unmounting to prevent memory leaks.

---

## 4. Accessibility & Quality Assurance
* **Keyboard Navigation**: All interactive elements (buttons, links, form inputs, modal closes) must be reachable and operable via keyboard (`Tab`, `Enter`, `Space`, `Escape`).
* **ARIA & Semantics**:
  * Provide descriptive `aria-label` attributes on icon-only buttons (cart trigger, search icon, wishlist heart, modal close buttons).
  * Use `role="dialog"` and `aria-modal="true"` for the cart drawer and authentication dialogs.
* **Contrast Compliance**: Ensure all text meets or exceeds WCAG 2.1 AA standards (minimum 4.5:1 for normal text, 3:1 for large display text).
* **Error States**: Display clear, helpful validation messages on all form fields (invalid email, missing required address fields, card expiration errors).
