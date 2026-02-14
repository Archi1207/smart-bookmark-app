# Smart Bookmark App

Build and deploy a bookmark manager with:
- Google OAuth login only
- Add bookmark (title + URL)
- Private bookmarks per user
- Realtime updates across tabs
- Delete own bookmarks
- Vercel deployment

## Live Links
- Live URL: ADD_YOUR_VERCEL_URL_HERE
- GitHub Repo (public): ADD_YOUR_GITHUB_REPO_URL_HERE

## Tech Stack
- Next.js 16 (App Router)
- Supabase (Auth, Postgres, Realtime)
- Tailwind CSS
- TypeScript

## Features Checklist (Assignment Mapping)
1. Google sign-up/log-in only ✅
2. Add bookmark (URL + title) ✅
3. Private per user ✅ (enforced by RLS)
4. Realtime list updates ✅
5. Delete own bookmarks ✅ (enforced by RLS)
6. Deploy on Vercel ✅ (after you add live URL)

## Local Setup
1. Install dependencies:
   - `npm install`
2. Create `.env.local` in project root:
   - `NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
3. Run app:
   - `npm run dev`

## Supabase Setup

### 1) Run SQL (Table + RLS + Realtime)
- Open Supabase Dashboard → SQL Editor
- Run the SQL from [supabase/schema.sql](supabase/schema.sql)

This creates:
- `public.bookmarks` table
- User-scoped RLS policies
- Index for user/time queries
- Realtime publication for `bookmarks`

### 2) Configure Google Auth
- Supabase → Authentication → Providers → Google → Enable
- Add Google OAuth Client ID + Secret from Google Cloud Console

### 3) Auth URL Configuration
- Supabase → Authentication → URL Configuration
- Site URL:
  - `http://localhost:3000`
- Redirect URLs:
  - `http://localhost:3000/api/auth/callback`
  - `http://localhost:3001/api/auth/callback`

### 4) Google Cloud OAuth Client
In Google Cloud Console (OAuth 2.0 Client ID, Web application):
- Authorized JavaScript origins:
  - `http://localhost:3000`
  - `http://localhost:3001`
- Authorized redirect URIs:
  - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

Use the exact callback URL shown on Supabase Google provider page.

## Deploy to Vercel
1. Push code to public GitHub repo
2. Import repo into Vercel
3. Add Environment Variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel domain)
4. Deploy and test Google login + add/delete + realtime
5. Replace placeholder links in this README

## Problems Faced and How I Solved Them

1. **Google auth error: provider not enabled**
   - Problem: Supabase returned `Unsupported provider: provider is not enabled`.
   - Fix: Enabled Google provider and configured OAuth client credentials.

2. **OAuth callback failed on local ports**
   - Problem: Redirect mismatch between localhost ports and allowed URLs.
   - Fix: Added both `3000` and `3001` in Supabase/Google allowed URLs and used `NEXT_PUBLIC_SITE_URL` fallback.

3. **Next.js 16 cookie API changed**
   - Problem: `cookies()` usage caused type/runtime issues.
   - Fix: Updated server-side Supabase code to `await cookies()` and separated server/client Supabase modules.

4. **Tailwind/PostCSS startup issue**
   - Problem: Tailwind plugin config mismatch blocked dev startup.
   - Fix: Updated PostCSS plugin to `@tailwindcss/postcss`.

5. **Duplicate bookmark key warning in React**
   - Problem: Duplicate IDs from realtime + local insert update path.
   - Fix: De-duplicated state updates by bookmark ID and kept list rendering stable.

## Validation
- `npm run build` passes successfully.
- Verified routes:
  - `/`
  - `/login`
  - `/api/auth/callback`

## Submission Checklist
- [ ] Live Vercel URL added above
- [ ] Public GitHub repo URL added above
- [ ] README includes issues faced + solutions
