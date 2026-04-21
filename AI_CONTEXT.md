# QRWide AI Context

This file is a high-signal reference for humans and AI agents working on QRWide.
It is intended to reduce the need to reread the entire codebase before making changes.

## 1. What QRWide Is

QRWide is a Next.js App Router SaaS for creating QR codes, saving them, tracking scans, and upgrading users from free to paid plans.

Core product promises:
- Free QR generation with no forced expiry.
- Saved QR codes are usually dynamic and can be updated after printing.
- Scan analytics are tracked in Supabase and optionally accelerated with Upstash Redis.
- Public users can generate/download QR codes without logging in, but must log in to save and track them.

Primary deployed app URL during current setup:
- `https://qr-wide.vercel.app`

Default canonical/marketing fallback in code:
- `https://qrwide.com`

## 2. Tech Stack

- Framework: Next.js 14 App Router
- Language: TypeScript
- Styling: Tailwind CSS 4 plus custom CSS variables in `app/globals.css`
- Auth + Database + Storage: Supabase
- Cache / redirect acceleration: Upstash Redis
- Payments: Stripe
- Email utility: Resend
- QR rendering:
  - Client preview/download: `qr-code-styling`
  - Server generation / bulk PNGs: `qrcode`
- Charts: `recharts`

## 3. Repo Structure

Top-level folders:
- `app/`: Next.js routes and route handlers
- `components/`: reusable UI, auth, QR, analytics, and layout components
- `lib/`: Supabase, Stripe, Redis, plan logic, QR helpers, DB helpers
- `supabase/`: SQL schema and database setup

Important route groups:
- `app/(marketing)/*`: public marketing pages
- `app/(app)/*`: logged-in product area, with one important exception:
  - `/create` is allowed without login by the app layout

Important API routes:
- `app/api/qr/create/route.ts`
- `app/api/qr/[id]/route.ts`
- `app/api/qr/bulk/route.ts`
- `app/api/analytics/[id]/route.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`

Important public functional routes:
- `app/auth/callback/route.ts`
- `app/s/[shortcode]/route.ts`
- `app/share/[shortcode]/page.tsx`

## 4. Product Model

The app has two major usage modes:

1. Public generator mode
- User can visit `/create` without an account.
- User can preview and download a QR locally.
- User cannot save or track a QR unless authenticated.

2. Saved QR SaaS mode
- Authenticated user creates a saved QR.
- Saved QR gets a `shortcode`.
- QR can be viewed on a share page.
- Redirect route `/s/[shortcode]` tracks scans and forwards to the destination.
- Dashboard and analytics show usage metrics.

## 5. Main User Flows

### 5.1 Signup / Login

Files:
- `components/auth/AuthForm.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/auth/callback/route.ts`
- `middleware.ts`

Flow:
- Email/password signup calls `supabase.auth.signUp`.
- Confirmation email redirects to `/auth/callback?next=...`.
- Callback exchanges auth code for session and redirects to a safe internal path.
- Google OAuth uses the same callback pattern.
- Middleware protects product routes and redirects unauthenticated users to `/login`.

Protected routes in middleware:
- `/dashboard`
- `/codes`
- `/analytics`
- `/bulk`
- `/settings`

Special behavior:
- If a logged-in user visits `/login` or `/signup`, middleware redirects them to `/dashboard` or a safe `redirectTo`.

### 5.2 Public Create Flow

Files:
- `app/(app)/layout.tsx`
- `app/(app)/create/CreateClient.tsx`
- `lib/qr/generate.ts`
- `components/qr/QRPreview.tsx`
- `components/qr/QRDownload.tsx`

Important rule:
- `/create` is intentionally allowed without login inside the app layout.

Create page behavior:
- Form fields are driven by `lib/qr/types.ts`.
- Form state is stored in localStorage under `create_qr_data`.
- `buildQRContent()` generates the actual QR payload for preview/download.
- Save button posts to `/api/qr/create`.
- If user is not logged in, save returns `401` and UI redirects to signup/login flow.

### 5.3 Saved QR Flow

Files:
- `app/api/qr/create/route.ts`
- `lib/db/queries.ts`
- `lib/qr/shortcode.ts`
- `app/(app)/dashboard/*`
- `app/share/[shortcode]/*`
- `app/s/[shortcode]/route.ts`

Flow:
- Authenticated user saves a QR.
- A unique 6-character shortcode is generated.
- Record is stored in `qr_codes`.
- Dashboard lists saved codes.
- Share page shows a viewable/downloadable QR.
- Redirect route handles the live scan path.

### 5.4 Scan Tracking Flow

Files:
- `app/s/[shortcode]/route.ts`
- `lib/qr/track.ts`
- `lib/redis.ts`
- Supabase function `record_scan_event` in `supabase/schema.sql`

Flow:
- Scanner opens `/s/[shortcode]`.
- Route checks Redis cache first if configured.
- If cache miss, route fetches `qr_codes` row from Supabase REST.
- Route ensures QR is active.
- Route starts fire-and-forget tracking.
- Route redirects to normalized destination.
- Tracking writes:
  - `scan_events` row
  - increments `qr_codes.total_scans`
  - increments `qr_codes.unique_scans` when IP hash is first seen for that QR
  - increments owner `profiles.scan_count_month`

### 5.5 Billing Flow

Files:
- `app/(marketing)/pricing/*`
- `app/(app)/settings/*`
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/stripe.ts`

Flow:
- Pricing page or Settings page chooses plan and billing cycle.
- Checkout API creates Stripe Checkout session in subscription mode.
- Success goes to `/dashboard?upgraded=true`.
- Webhook updates `profiles.plan`, `stripe_customer_id`, and `stripe_subscription_id`.
- Webhook downgrades to `free` if subscription is canceled, unpaid, or past due.

## 6. Database Model

Typed in:
- `lib/db/schema.ts`

Schema declared in:
- `supabase/schema.sql`

Main tables:

### `profiles`
- `id` references `auth.users.id`
- `plan`: `free | pro | business`
- `stripe_customer_id`
- `stripe_subscription_id`
- `qr_count`
- `scan_count_month`

Purpose:
- Stores app-level user profile and plan state.
- Counters are denormalized for plan enforcement and reporting.

### `qr_codes`
- `user_id`
- `shortcode`
- `name`
- `type`
- `destination`
- `is_dynamic`
- `is_active`
- `style` JSONB
- `total_scans`
- `unique_scans`
- `folder`
- `tags`

Purpose:
- Main saved QR entity.

### `scan_events`
- `qr_id`
- geo fields: `country`, `region`, `city`, `lat`, `lng`
- device fields: `device_type`, `os`, `browser`
- `ip_hash`
- `referrer`
- `user_agent`

Purpose:
- Raw analytics event store.

### `folders`
- basic folder metadata for grouping QR codes

### `bulk_jobs`
- present in schema
- not fully central to current UI flow
- bulk generation currently streams progress directly and uploads ZIP to storage

## 7. Supabase Functions and Triggers

Defined in `supabase/schema.sql`:
- `handle_new_user()`
- `increment_qr_count(user_id)`
- `decrement_qr_count(user_id)`
- `increment_qr_scans(qr_id)` (legacy/simple helper)
- `record_scan_event(...)`
- `reset_monthly_scan_counts()`

Important trigger:
- `on_auth_user_created` inserts a row in `profiles` on signup

Important RLS design:
- users can only read/update their own profile
- users can CRUD only their own QR codes
- users can read scan events only for QRs they own
- service role can fully access `scan_events`

## 8. Plan / Feature Rules

Files:
- `lib/plans.ts`
- `lib/qr/access.ts`
- `lib/qr/types.ts`

Plan limits:

Free:
- 3 dynamic QR codes
- bulk limit 10
- basic analytics
- no custom logo
- watermark true
- no PDF download

Pro:
- 50 dynamic QR codes
- bulk limit 100
- full analytics
- custom logo
- PDF download

Business:
- unlimited dynamic QR codes
- bulk limit 500
- full analytics + export
- custom logo
- API access
- custom domain

QR type gating:
- Free: `url`, `text`, `wifi`, `vcard`
- Pro: `email`, `call`, `sms`, `whatsapp`, `facebook`, `instagram`, `linkedin`, `tiktok`, `youtube`, `event`
- Business: `pdf`, `app`, `images`, `video`

## 9. QR Content Model

File:
- `lib/qr/generate.ts`

`buildQRContent(type, data)` builds payloads for preview/download.

Examples:
- `url` -> direct URL
- `text` -> raw text
- `wifi` -> `WIFI:T:...`
- `vcard` -> VCARD text block
- `email` -> `mailto:`
- `call` -> `tel:`
- `sms` -> `smsto:`
- `whatsapp` -> `https://wa.me/...`
- `event` -> VEVENT text block

Important distinction:
- Create-page preview uses direct payloads.
- Saved QR pages may use either:
  - direct payload
  - redirect shortlink

That selection now lives in:
- `lib/qr/saved-content.ts`

Current saved-content rule:
- Direct payload types:
  - `text`
  - `wifi`
  - `vcard`
  - `event`
- All other saved types use `appUrl/s/{shortcode}`

Reason:
- Browser-redirectable content benefits from tracking.
- Raw content QR types should encode the content directly rather than going through a web redirect.

## 10. Redirect and Destination Logic

Files:
- `app/s/[shortcode]/route.ts`
- `lib/qr/url.ts`

`normalizeQrDestination()` behavior:
- trims input
- keeps any existing scheme like `https:`, `mailto:`, `tel:`, `sms:`, `wifi:`
- converts `//example.com` to `https://example.com`
- converts bare domains like `example.com` to `https://example.com`

Redirect route behavior:
- runtime is `edge`
- fetches record from Redis or Supabase REST
- redirects inactive codes to `/paused`
- redirects missing codes to `/not-found`
- redirects malformed destination to `/`

Recent important fix:
- redirect route now accepts any valid absolute URL scheme that `new URL()` can parse instead of only `http` and `https`
- this avoids valid QR destinations falling back to the app homepage

## 11. Redis Usage

Files:
- `lib/redis.ts`
- `lib/qr/track.ts`
- `app/s/[shortcode]/route.ts`

Redis is optional.

If env vars are missing:
- `redis` is `null`
- app still works
- redirect falls back to Supabase
- helper functions no-op safely

Redis keys:
- `qr:shortcode:{shortcode}` -> cached destination / active state
- `qr:stats:{qrId}:day:{YYYY-MM-DD}` -> daily scan counter

Cache invalidation:
- QR PATCH and DELETE routes call `invalidateShortcode(shortcode)`

## 12. Bulk Generation

Files:
- `app/(app)/bulk/BulkClient.tsx`
- `app/api/qr/bulk/route.ts`

Flow:
- Upload CSV with columns:
  - `name`
  - `destination_url`
  - optional `folder`
  - optional `tags`
- Client validates URLs
- API creates QR records one by one
- Server generates PNGs with `qrcode`
- ZIP is built with `jszip`
- ZIP uploads to Supabase Storage bucket `bulk-zips`
- API streams progress with SSE-style chunks

Important limitation:
- bulk route currently hardcodes saved rows as `type: 'url'`
- bulk generation is intended for URL destinations only in the current implementation

## 13. Dashboard / Analytics / Settings Summary

### Dashboard

Files:
- `app/(app)/dashboard/page.tsx`
- `app/(app)/dashboard/DashboardClient.tsx`

What it does:
- lists user QRs
- search, sort, folder filter
- rename QR
- toggle active state
- duplicate QR
- delete QR
- copy shortlink
- link to share page and analytics

Recent UX change:
- dashboard rows now show an explicit QR thumbnail and `View QR` button instead of using title click for rename

### Analytics

Files:
- `app/(app)/analytics/[id]/page.tsx`
- `app/(app)/analytics/[id]/AnalyticsClient.tsx`
- `app/api/analytics/[id]/route.ts`

What it does:
- verifies QR ownership
- loads last 30 days initially
- range switcher supports 7d / 30d / 90d / all
- free plan sees reduced analytics UI
- pro/business see charts and breakdowns
- business export path is partially exposed via plan logic, but CSV export UI is available for non-free

### Settings

Files:
- `app/(app)/settings/page.tsx`
- `app/(app)/settings/SettingsClient.tsx`

What it does:
- edit display name
- view email
- local theme toggling
- initiate Stripe checkout
- display current plan

Known gap:
- account deletion button is a placeholder and is not wired
- customer portal management is only described, not implemented

## 14. Marketing Layer

Files:
- `app/(marketing)/layout.tsx`
- `app/(marketing)/page.tsx`
- `app/(marketing)/pricing/*`
- `app/(marketing)/features/page.tsx`
- `app/(marketing)/use-cases/*`
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/qr/HeroQRGenerator.tsx`

Purpose:
- public acquisition site
- hero includes a live QR generator demo
- pricing page routes users into signup/settings checkout flow
- multiple use-case pages provide SEO-targeted messaging

## 15. Environment Variables

Template is in:
- `.env.example`

Required for base app:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SHORT_URL`

Required for Redis acceleration:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Required for Stripe:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRO_MONTHLY_PRICE_ID`
- `STRIPE_PRO_YEARLY_PRICE_ID`
- `STRIPE_BUSINESS_MONTHLY_PRICE_ID`
- `STRIPE_BUSINESS_YEARLY_PRICE_ID`

Optional / future:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## 16. Deployment Notes

Files:
- `next.config.mjs`

Important behavior:
- in development, default dist dir is `.next-dev`
- in production, dist dir is `.next`

Reason:
- Windows file locking caused repeated `EPERM` issues with `.next`
- separate dev directory reduces local cache corruption/stuck-start problems

Also in config:
- ESLint is ignored during builds because current Next 14 lint integration conflicts with ESLint 9 in this repo
- remote images allow `*.supabase.co` and `www.google.com`

## 17. Known Gotchas / Important Historical Fixes

These are the issues already discovered during setup and debugging:

1. Supabase signup depended on `handle_new_user()` trigger
- If profiles are not created, auth appears to work but app logic breaks later.

2. Redirect URLs must be configured in Supabase Auth
- Production and localhost callback URLs must both exist.

3. URL QR destinations should be normalized on save
- Bare domains like `chitbase.com` must become `https://chitbase.com`.

4. Saved QR display is not identical to create-page preview
- Create page shows direct payload.
- Saved/public/share flows may encode tracked shortlinks depending on QR type.

5. Redis is optional, not mandatory
- Local development should still work without Upstash.

6. Dashboard UX was previously confusing
- title click used to rename instead of opening a details/view page.

7. Some valid QR payloads cannot be treated as browser-only redirects
- direct content types should not be forced through `/s/[shortcode]`.

8. Account deletion is not implemented
- UI exists, backend does not.

9. Stripe customer portal is not implemented
- upgrade flow exists
- subscription self-management flow does not

10. Resend helper exists but is not clearly wired into a milestone workflow
- `lib/resend.ts` provides `sendScanMilestoneEmail()`
- no obvious active route/job invokes it today

## 18. Route Map

Public marketing:
- `/`
- `/features`
- `/pricing`
- `/privacy`
- `/terms`
- `/changelog`
- `/use-cases/restaurants`
- `/use-cases/real-estate`
- `/use-cases/events`

Auth:
- `/login`
- `/signup`
- `/auth/callback`

App:
- `/dashboard`
- `/create`
- `/bulk`
- `/settings`
- `/analytics/[id]`

Public QR:
- `/share/[shortcode]`
- `/s/[shortcode]`
- `/paused`
- `/not-found`

API:
- `/api/qr/create`
- `/api/qr/[id]`
- `/api/qr/bulk`
- `/api/analytics/[id]`
- `/api/stripe/checkout`
- `/api/stripe/webhook`

## 19. If You Need To Change X, Start Here

If you need to change auth:
- `middleware.ts`
- `components/auth/AuthForm.tsx`
- `app/auth/callback/route.ts`
- Supabase Auth settings

If you need to change QR type options or form fields:
- `lib/qr/types.ts`
- `lib/qr/generate.ts`
- `app/(app)/create/CreateClient.tsx`

If you need to change plan enforcement:
- `lib/plans.ts`
- `lib/qr/access.ts`
- `app/api/qr/create/route.ts`
- `app/api/qr/bulk/route.ts`
- `app/(marketing)/pricing/*`
- `app/(app)/settings/SettingsClient.tsx`

If you need to change redirect behavior:
- `app/s/[shortcode]/route.ts`
- `lib/qr/url.ts`
- `lib/qr/saved-content.ts`
- `app/share/[shortcode]/SharePageClient.tsx`

If you need to change analytics:
- `supabase/schema.sql`
- `app/s/[shortcode]/route.ts`
- `app/api/analytics/[id]/route.ts`
- `app/(app)/analytics/[id]/AnalyticsClient.tsx`

If you need to change dashboard UX:
- `app/(app)/dashboard/DashboardClient.tsx`

If you need to change billing:
- `app/(marketing)/pricing/PricingPlansClient.tsx`
- `app/(app)/settings/SettingsClient.tsx`
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/stripe.ts`

## 20. Current Overall State

At the time this file was written:
- local signup/login works
- profile trigger flow works
- dashboard works
- QR creation and saving work
- share pages work
- redirect tracking works
- production has been deployed to Vercel
- saved QR destination handling was recently corrected

Main areas still rough or incomplete:
- account deletion
- Stripe customer portal
- Resend integration usage
- richer QR details pages beyond share/analytics
- some docs/tests/tooling polish

## 21. Recommended Reading Order For Future AI Agents

If you only have 10 minutes, read in this order:

1. `AI_CONTEXT.md`
2. `lib/db/schema.ts`
3. `lib/plans.ts`
4. `lib/qr/types.ts`
5. `app/(app)/create/CreateClient.tsx`
6. `app/s/[shortcode]/route.ts`
7. `app/(app)/dashboard/DashboardClient.tsx`
8. `app/api/stripe/checkout/route.ts`
9. `supabase/schema.sql`

That sequence gives the fastest mental model of the system.
