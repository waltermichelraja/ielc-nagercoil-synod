# IELC Nagercoil Synod — Admin Dashboard

A small React app that lets a non-technical admin update the site's dynamic
content (messages, events, office bearers, circle stats, photos, contact
details) without ever touching GitHub, JSON, or code.

It writes directly to the `v1-react` branch of the main site repo. The
public `frontend/` site is unaffected until the admin clicks **Save** — at
that point Netlify picks up the new commit and rebuilds automatically.

## How it works (for you, the developer)

```
Admin logs in (email + password, via Netlify Identity)
        ↓
Fills out a plain form (name, phone, text, photo — no JSON visible)
        ↓
Clicks Save
        ↓
Browser calls a serverless function (netlify/functions/save-content.js)
        ↓
That function uses a GitHub token (kept secret, server-side only)
to commit the updated file to v1-react
        ↓
Netlify auto-rebuilds frontend/ → change is live in ~1-2 minutes
```

The admin never sees GitHub, git, commits, or branches. The only thing
they see is a login screen and some forms.

## One-time setup

### 1. Add this folder to the repo

Copy this `admin/` folder into the root of `ielc-nagercoil-synod`, alongside
the existing `frontend/` folder, on the `v1-react` branch. Commit and push.

```
ielc-nagercoil-synod/
├── frontend/     (existing)
└── admin/        (this folder)
```

### 2. Create a second Netlify site

In Netlify: **Add new site → Import an existing project** → pick this same
GitHub repo again → branch `v1-react`. In the site's build settings:

| Setting | Value |
|---|---|
| Base directory | `admin` |
| Build command | `npm run build` |
| Publish directory | `admin/dist` |
| Functions directory | `netlify/functions` |

(These match what's already in `admin/netlify.toml`, so Netlify should
pick them up automatically — but double check on first deploy.)

This gives you a second site + URL, separate from the public frontend
(e.g. `something.netlify.app`, which you can later point a subdomain like
`admin.ielcnagercoil.org` at).

### 3. Turn on Netlify Identity

On the new admin site: **Site configuration → Identity → Enable Identity**.

- Under **Registration**, set it to **Invite only** (important — you don't
  want public sign-up on this).
- Under **External providers**, you can leave everything off; email +
  password is enough.
- Once enabled, go to the **Identity** tab and **Invite users** — enter the
  email address(es) of whoever should have admin access. They'll get an
  email with a link to set their password.

### 4. Create a GitHub token

You need a token the serverless functions can use to write to the repo,
without the admin ever seeing it.

1. GitHub → Settings → Developer settings → **Fine-grained personal access
   tokens** → Generate new token.
2. Resource owner: your account. Repository access: **Only select
   repositories** → choose `ielc-nagercoil-synod`.
3. Permissions → **Contents: Read and write**. Leave everything else at
   "No access."
4. Generate, and copy the token — you won't be able to see it again.

### 5. Set environment variables on the admin Netlify site

Site configuration → Environment variables → add:

| Key | Value |
|---|---|
| `GITHUB_TOKEN` | the token from step 4 |
| `GITHUB_OWNER` | `waltermichelraja` |
| `GITHUB_REPO` | `ielc-nagercoil-synod` |
| `GITHUB_BRANCH` | `v1-react` |
| `VITE_FRONTEND_URL` | the public frontend site's URL (e.g. `https://ielcnagercoil.org`) — used only to preview existing photos in the forms |

(`.env.example` in this folder lists these too, for reference — never
commit a real `.env` file.)

Trigger a redeploy after adding these so the functions pick them up.

### 6. Invite yourself and log in

Check your email for the Netlify Identity invite, set a password, then
visit the admin site URL and log in. You should see the dashboard with six
sections: Site Settings, Messages, Events, Synod Office Bearers, Circles,
Overview.

## What's editable

Everything in `frontend/src/data/content/*.json`:

- **Site Settings** — titles, tagline, notice bar, contact details, social
  links, landing page motto & hero image
- **Messages** — President's/VP's/Secretary's/etc. messages
- **Events** — Upcoming, Synod, Circle, and School events (with photos)
- **Synod Office Bearers** — President through Treasurer, Executive
  Members, Church Council & Trust Association members (with photos)
- **Circles** — per-circle statistics, office bearers, and executives
- **Overview** — synod-wide totals and the Overview page description

Adding a new editable file later just means adding one entry to
`src/config/contentSchema.js` — no new pages or functions needed, the
generic form renderer handles it.

## Local development

```bash
cd admin
npm install
npm run dev
```

Note: the serverless functions (and therefore login + saving) only work
when deployed to Netlify, or when running via `netlify dev` (Netlify CLI)
with the environment variables from step 5 set locally. Plain `npm run dev`
will show the UI but auth/save calls will fail — that's expected.

## Notes & things worth knowing

- **Image uploads** are resized client-side (max 800px wide) before being
  committed, so a phone photo doesn't turn into a multi-MB commit.
- **Conflict handling**: if two people save the same file within moments of
  each other, the second save is rejected with a clear "please reload"
  message rather than silently overwriting the first save.
- **Both Netlify sites watch the same branch**, so a save will trigger a
  rebuild on both the frontend site (correct) and this admin site (harmless,
  just a wasted build). Not worth fixing for v1; Netlify's "ignore build"
  setting can be added later if it becomes annoying.
- **Access control**: only people you've explicitly invited via Netlify
  Identity can log in. There's no public sign-up.
