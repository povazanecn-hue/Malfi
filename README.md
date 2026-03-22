# MALFI – Talianska reštaurácia

> **Base44 App** — View and edit your app on [Base44.com](http://Base44.com). Any change pushed to this repo will also be reflected in the Base44 Builder.

**MALFI** is a full-featured Italian restaurant web application built on the [Base44](http://Base44.com) platform, using React + Vite on the frontend and Base44's managed backend for data entities, authentication, and integrations.

---

## Latest Changes — Initial Release (March 20, 2026)

> **Note:** No merged pull requests exist in this repository. The most recent significant change is the initial `File changes` commit (March 20, 2026), which delivered the complete application from scratch. A summary of its purpose and key changes is below.

### Purpose

The goal of this release was to build a polished, production-ready web presence for **MALFI Talianska Reštaurácia** (Bratislava). The app covers the full customer journey — from browsing the menu and placing an online order, to making a table reservation — as well as an internal admin dashboard for restaurant staff. All data (menu items, orders, reservations, reviews) is managed via **Base44 entities**.

### Key Changes

#### 🏠 Customer-Facing Pages
| Page | Description |
|---|---|
| **Home** (`/MalfiHome`) | Landing page with hero banner, featured dishes, category tiles, story section, gallery, ordering & reservation CTAs, reviews, location/hours, and an Instagram strip |
| **Menu** (`/Menu`) | Filterable menu grid by category, item detail modal (with allergen info, tags, add-ons), and a sticky "Order online" CTA |
| **Order** (`/Order`) | Online ordering page with a full cart flow |
| **Checkout** (`/Checkout`) | Multi-step checkout form |
| **Order Success** (`/OrderSuccess`) | Confirmation screen after a successful order |
| **Reservation** (`/Reservation`) | Multi-step table reservation form (guests, date, time, seating preference, occasion, contact details) with auto-approval for parties ≤ 5 |
| **About** (`/About`) | Restaurant story and team page |
| **Contact** (`/Contact`) | Contact information and enquiry form |

#### 🔐 Access Control
- **Password Gate** — the entire app is protected by a preview password, persisted in `localStorage`, displaying a branded "Coming soon" screen until unlocked.

#### 🛒 Cart & Context
- `CartContext` — global React context managing cart state (add, remove, update quantity, clear).
- `AuthContext` — authentication context integrated with the Base44 SDK.
- `MalfiCartDrawer` — slide-out cart drawer with item list and checkout button.

#### 🛠 Admin Dashboard (`/MalfiAdmin`)
- **Overview** — daily revenue, active orders, today's reservations, average order value.
- **Orders management** — full order list with status labels (pending → confirmed → preparing → ready → dispatched → delivered/cancelled).
- **Reservations management** — reservation list with approval workflow.
- **Menu management** — CRUD for menu categories and items (backed by Base44 entities `MenuCategory` and `MenuItem`).
- **Products management** — product listing and editing.
- Admin panel is protected by `MalfiAdminLayout` and is separate from the public routes.

#### 🎨 UI & Design System
- Custom **Tailwind CSS** design tokens: `bg-cream`, `text-gold`, `text-terracotta`, `text-olive`, `btn-gold`, `btn-primary`, `card-dark`, `container-malfi`, etc.
- **Framer Motion** animations throughout (page transitions, item cards, modals).
- **Italian decorative elements**: `ItalianTricolorStripe`, `ItalianDividers` (quotes, flourishes), `AuthenticityStamp`.
- **MobileBottomNav** — sticky bottom navigation bar for mobile users.
- **PullToRefresh** — native-feel pull-to-refresh gesture on mobile.
- Full suite of **shadcn/ui** primitives (accordion, dialog, drawer, select, toast, etc.).

#### ⚡ Base44 Serverless Function
- `functions/sendReviewNotification.ts` — Deno-based edge function that uses the **Base44 Core email integration** to send a thank-you email to customers after they submit a review, including their star rating and comment.

#### 🗂 Routing
- React Router v6 with nested layouts: `MalfiLayout` (public), `MalfiAdminLayout` (admin), `AdminLayout` (legacy admin).
- Root `/` redirects to `/MalfiHome`.
- Legacy admin routes (`/Admin`, `/AdminOrders`, `/AdminReservations`, `/AdminMenu`, `/AdminProducts`) retained for backwards compatibility.

---

## Getting Started

**Prerequisites:**

1. Clone the repository using the project's Git URL
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)
