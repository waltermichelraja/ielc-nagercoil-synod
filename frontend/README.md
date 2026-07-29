# IELC Nagercoil Synod — Website (React + Vite)

Static, content-driven website for the India Evangelical Lutheran Church, Nagercoil Synod.
Built with **React + Vite (plain JavaScript, .jsx — no TypeScript)** and **React Router**,
with **Decap CMS** wired up for non-technical content editing.

This replaces the earlier Eleventy/Nunjucks prototype — same design, same content model,
new stack.

## Stack

- **React 18 + Vite** — build tool, dev server, fast HMR
- **React Router v6** — client-side routing (Home, Message, Events, Overview, Admin,
  Congregations, Contact, and one dynamic route per Circle)
- **Plain CSS** — `src/styles/style.css`, same design tokens as before (deep sea /
  laterite / palmyra green / liturgical gold palette, Fraunces + Source Sans fonts).
  No Tailwind — keeps things simple since the client's admin will never touch CSS.
- **JSON content files** in `src/data/content/*.json` — the single source of truth.
  Thin `.js` wrapper modules in `src/data/*.js` just import and re-export that JSON, so
  React components import clean JS modules while Decap CMS edits the underlying JSON
  files directly (CMS only understands JSON/YAML/Markdown, not `.js`).
- **Decap CMS** (`public/admin/`) — gives the client's admin a login-protected panel to
  edit all site content without touching code.

## Project structure

```
src/
  data/
    content/          ← JSON files Decap CMS edits directly
      site.json, circles.json, events.json, messages.json,
      overview.json, synodBearers.json
    site.js, circles.js, ...   ← thin re-export wrappers React imports
  components/
    Header.jsx         ← nav, mobile toggle, scrolling notice ticker
    Footer.jsx
    HierarchyDiagram.jsx  ← Synod → 5 Circles diagram (used on Home + Overview)
  pages/
    Home.jsx, Message.jsx, Events.jsx, Overview.jsx,
    Leadership.jsx (Admin page), Congregations.jsx, Contact.jsx,
    Circle.jsx (dynamic /circles/:slug), NotFound.jsx
  styles/style.css
  App.jsx               ← routes
  main.jsx              ← entry point
public/
  admin/                ← Decap CMS (config.yml + index.html)
  images/               ← placeholder SVGs (swap for real photos any time)
netlify.toml
```

## 1. Run it locally

```bash
cd nagercoil-synod-react
npm install
npm run dev
```

Opens at **http://localhost:5173**. You'll see Home, Message, Events, Overview, Admin,
Congregations, Contact, and all 5 circle pages (`/circles/colachel`, `/circles/madurai`,
`/circles/nagercoil`, `/circles/thovalai`, `/circles/tirunelveli`) — all with placeholder
content pulled from the PPTX structure.

To build for production:

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

> **Note:** this project was generated in a sandboxed environment without registry
> access, so `npm install` has not been run or verified here yet. Run it locally first —
> if anything in `package.json` needs a version bump, npm will tell you.

## 2. What's built

- 8 page types, all data-driven from `src/data/content/*.json` — no hardcoded text in
  components
- The Synod → 5 Circles hierarchy diagram on Home and Overview
- Scrolling notice ticker, mobile nav toggle, sticky header
- Contact form wired for Formspree (just needs your form ID once you have one —
  see `src/pages/Contact.jsx`)
- Decap CMS config (`public/admin/config.yml`) mapped to every content JSON file

## 3. Next steps, in order

1. **Push this to a GitHub repo.**
2. **Deploy to Netlify** — build command and publish directory are already set in
   `netlify.toml` (`npm run build` → `dist/`).
3. **Enable Netlify Identity + Git Gateway** on the site, then invite the admin's email.
4. **Update `public/admin/config.yml`** — replace `site_url` with your real Netlify URL.
5. Admin logs into `/admin/` and starts editing real content (names, stats, address,
   photos, notices, messages, events).

## Content editing without the CMS

Since content lives in plain JSON, anyone comfortable with git can also just edit the
files directly under `src/data/content/` and push — no CMS login required.

## Swapping placeholder images

`public/images/placeholder-person.svg` and `placeholder-event.svg` are simple SVG
placeholders. Replace them (or, once the CMS is live, upload real photos through the
Admin panel — they land in `src/data/uploads/` and get referenced automatically).
