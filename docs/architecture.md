# Architecture Specification — VOID ESSENTIALS

## 1. System Overview & Topology

VOID ESSENTIALS is built as a decoupled, modern full-stack e-commerce web application engineered for high-performance rendering, responsive editorial presentation, and robust transactional reliability.

```
┌───────────────────────────────────────────────────────────┐
│                    Client Browser                         │
│   (Next.js App / React / Tailwind CSS / GSAP / Anime.js)  │
└─────────────────────────────┬─────────────────────────────┘
                              │ HTTPS / REST (JSON)
                              ▼
┌───────────────────────────────────────────────────────────┐
│                    Flask API Gateway                      │
│             (Port 5001 / Blueprint Routes)                │
├─────────────────────────────┬─────────────────────────────┤
│  • Auth & JWT Guard         │  • Product Catalog Engine   │
│  • Cart & Order Manager     │  • Contact & Inquiries      │
└──────────────┬──────────────┴──────────────┬──────────────┘
               │ SQLAlchemy ORM              │ Celery Task Queue
               ▼                             ▼
┌─────────────────────────────┐┌─────────────────────────────┐
│       SQLite Database       ││        Redis Server         │
│  (Portable to PostgreSQL)   ││  (Broker & Cache Backend)   │
└─────────────────────────────┘└─────────────┬───────────────┘
                                             │ Task Consumption
                                             ▼
                               ┌─────────────────────────────┐
                               │        Celery Worker        │
                               │ • Email Simulation/Dispatch │
                               │ • Order Audit Logging       │
                               │ • CSV/Data Export Pipeline  │
                               └─────────────────────────────┘
```

---

## 2. Frontend / Backend Responsibilities

### Frontend (Next.js / React / Tailwind CSS)
* **Presentation & Editorial Layout**: Renders editorial high-fashion layouts matching the design references (oversized typography, model layering, dark band category showcases, sticky navigation).
* **State Management**:
  * Cart state (stored in `localStorage` for guests, synced with API on authentication).
  * Wishlist state (local storage with instant optimistic UI toggling).
  * Auth state (JWT access token in memory / secure storage with auto-refresh mechanism).
* **Interactions & Micro-Animations**: GSAP timeline orchestrations for hero typography and scroll reveals; Anime.js for spring micro-interactions (add-to-cart confirmation, drawer slide-ins, badge pulses).
* **Form Validation**: Client-side instant feedback on email formats, required shipping inputs, and contact forms before hitting backend endpoints.

### Backend (Flask REST API)
* **API Endpoints**: RESTful JSON service hosted under `/api/v1/`.
* **Security & Authentication**: JWT token generation and validation, password hashing using `werkzeug.security` (PBKDF2/SHA256) or bcrypt, role-based access control (`customer` vs `admin`).
* **Data Modeling & Integrity**: Declarative SQLAlchemy models with foreign key constraints, indexes, unique constraints, and automated timestamps.
* **Transaction Management**: Atomic operations for checkout, order creation, and stock allocation.
* **Asynchronous Offloading**: Offloads non-blocking side-effects (welcome emails, order receipts, inquiry processing) to Celery via Redis.
* **Graceful Degradation**: If Redis or Celery is unavailable in local development environments, background tasks fall back cleanly to synchronous execution or structured logging without breaking the API request.

---

## 3. API Approach & Endpoints

All responses adhere to a consistent JSON envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "Resource retrieved successfully",
  "errors": null
}
```

### Core API Routes (`/api/v1/`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register new customer account | No |
| `POST` | `/auth/login` | Authenticate customer and issue JWT pair | No |
| `GET` | `/auth/me` | Fetch authenticated user profile & order history | Yes |
| `POST` | `/auth/refresh` | Refresh expired access token | Yes (Refresh) |
| `GET` | `/products` | List products with filtering, search, and sorting | No |
| `GET` | `/products/<slug>` | Get full product detail with variants and images | No |
| `GET` | `/categories` | List collections/categories with metadata | No |
| `GET` | `/cart` | Retrieve user active cart | Optional (Guest/User) |
| `POST` | `/cart/items` | Add/update item in cart | Optional |
| `DELETE` | `/cart/items/<id>`| Remove item from cart | Optional |
| `POST` | `/orders` | Submit order (guest or authenticated) | No / Optional |
| `GET` | `/orders/<order_num>`| Lookup order status and invoice summary | Optional |
| `POST` | `/contact` | Submit contact/support inquiry | No |
| `POST` | `/newsletter` | Subscribe email to restock/drop alerts | No |
| `GET` | `/health` | System health check (DB, Redis, Worker status) | No |

---

## 4. Database Model (SQLite -> PostgreSQL Ready)

The database schema is strictly normalized and avoids SQLite-specific quirks to ensure seamless zero-change migration to PostgreSQL.

### Entities

1. **`users`**
   * `id` (Integer, Primary Key)
   * `email` (String(255), Unique, Indexed)
   * `password_hash` (String(255), Not Null)
   * `full_name` (String(120))
   * `role` (String(20), Default: `'customer'`)
   * `created_at` (DateTime, Default: UTC now)
   * `updated_at` (DateTime, OnUpdate: UTC now)

2. **`categories`**
   * `id` (Integer, Primary Key)
   * `name` (String(80), Unique, Not Null)
   * `slug` (String(100), Unique, Indexed)
   * `tagline` (String(200))
   * `image_url` (String(500))
   * `display_order` (Integer, Default: 0)

3. **`products`**
   * `id` (Integer, Primary Key)
   * `title` (String(200), Not Null)
   * `slug` (String(220), Unique, Indexed)
   * `description` (Text)
   * `care_instructions` (Text)
   * `fabric_composition` (String(200))
   * `price` (Numeric(10, 2), Not Null)
   * `compare_at_price` (Numeric(10, 2), Nullable)
   * `category_id` (Integer, ForeignKey `'categories.id'`, Indexed)
   * `is_featured` (Boolean, Default: False)
   * `is_archival` (Boolean, Default: False)
   * `is_new_arrival` (Boolean, Default: True)
   * `created_at` (DateTime, Default: UTC now)

4. **`product_variants`**
   * `id` (Integer, Primary Key)
   * `product_id` (Integer, ForeignKey `'products.id'`, Indexed)
   * `size` (String(20), Not Null)  *(e.g., "XS", "S", "M", "L", "XL")*
   * `color_name` (String(50), Not Null) *(e.g., "Washed Pitch", "Archival Bone")*
   * `color_hex` (String(20))
   * `sku` (String(60), Unique, Indexed)
   * `stock_quantity` (Integer, Default: 10)
   * `price_override` (Numeric(10, 2), Nullable)

5. **`product_images`**
   * `id` (Integer, Primary Key)
   * `product_id` (Integer, ForeignKey `'products.id'`, Indexed)
   * `image_url` (String(500), Not Null)
   * `alt_text` (String(200))
   * `is_primary` (Boolean, Default: False)
   * `display_order` (Integer, Default: 0)

6. **`orders`**
   * `id` (Integer, Primary Key)
   * `order_number` (String(32), Unique, Indexed)
   * `user_id` (Integer, ForeignKey `'users.id'`, Nullable)
   * `guest_email` (String(255), Nullable)
   * `total_amount` (Numeric(10, 2), Not Null)
   * `shipping_amount` (Numeric(10, 2), Default: 0.00)
   * `tax_amount` (Numeric(10, 2), Default: 0.00)
   * `status` (String(30), Default: `'pending'`) *(pending, confirmed, processing, shipped)*
   * `shipping_address` (JSON / Text)
   * `created_at` (DateTime, Default: UTC now)

7. **`order_items`**
   * `id` (Integer, Primary Key)
   * `order_id` (Integer, ForeignKey `'orders.id'`, Indexed)
   * `product_id` (Integer, ForeignKey `'products.id'`)
   * `variant_id` (Integer, ForeignKey `'product_variants.id'`)
   * `product_title` (String(200))
   * `size` (String(20))
   * `color` (String(50))
   * `quantity` (Integer, Not Null)
   * `unit_price` (Numeric(10, 2), Not Null)

8. **`contact_inquiries`**
   * `id` (Integer, Primary Key)
   * `name` (String(120), Not Null)
   * `email` (String(255), Not Null)
   * `subject` (String(200))
   * `message` (Text, Not Null)
   * `status` (String(30), Default: `'unread'`)
   * `created_at` (DateTime, Default: UTC now)

9. **`newsletter_subscribers`**
   * `id` (Integer, Primary Key)
   * `email` (String(255), Unique, Not Null)
   * `source` (String(50), Default: `'storefront_footer'`)
   * `created_at` (DateTime, Default: UTC now)

---

## 5. Background Jobs (Celery & Redis)

* **Broker & Backend**: `redis://localhost:6379/0` (configurable via `REDIS_URL`).
* **Tasks (`backend/app/tasks/`)**:
  * `tasks.email_tasks.send_order_confirmation(order_id)`: Simulates / triggers transactional order confirmation.
  * `tasks.email_tasks.send_welcome_email(user_id)`: Dispatches customer registration welcome package.
  * `tasks.export_tasks.export_orders_csv()`: Compiles store orders into an administrative CSV sheet.
  * `tasks.notification_tasks.notify_restock(email, product_id)`: Informs subscribers when archival items return.
* **Resilience Pattern**: Each background trigger checks Celery worker connectivity; if offline, it executes synchronously or logs safe mock transactions without raising HTTP 500 errors to the customer.

---

## 6. Integrations & Placeholder Policies

* **Payment Gateway**: Safe simulation of Stripe / payment checkout with mock authorization tokens and instant status updates. Live keys must be supplied via `.env` before real charges can process.
* **Email Service**: Configurable SMTP / SendGrid placeholder. In test/dev mode, logs formatted email envelopes to stdout and Celery task logs.
