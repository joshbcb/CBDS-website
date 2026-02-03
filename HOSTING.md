# Hosting, Domain, and CMS Guide

## 1. Making the Domain Switch Smooth (from Adobe)

If the client’s site is currently on Adobe (e.g. Adobe Business Catalyst or similar) and you’re moving to a new host:

### Before you switch

- **Find out where the domain is registered**  
  Domain might be at GoDaddy, Namecheap, Google Domains, or with Adobe. The client (or their IT) can check the registrar from the domain’s WHOIS or their email records.
- **Lower DNS TTL ahead of time**  
  A few days before the cutover, reduce TTL on the main records (e.g. to 300 seconds) so changes propagate faster on switch day.
- **Export/back up**  
  Get a list of current DNS records from Adobe (or wherever DNS is managed) and any content you need from the old site.

### Cutover day

1. **Build and deploy the new site** on your chosen host (e.g. Netlify) so it’s live at the host’s URL (e.g. `something.netlify.app`).
2. **Add the custom domain** in the new host’s dashboard and follow their instructions (usually add the domain and optionally “www”).
3. **Update DNS** at the domain registrar:
   - **Option A (simplest):** Point the domain to the new host’s nameservers (Netlify/other will give you 2–4 nameservers).
   - **Option B:** Keep nameservers where they are and only change the **A** and/or **CNAME** records to the values the new host provides.
4. **SSL:** Most hosts (Netlify, Vercel, etc.) issue SSL automatically once DNS points to them. Give it a few minutes to an hour.
5. **Wait for propagation**  
  DNS can take from minutes up to 24–48 hours. The client may still see the old site until their ISP/cache updates.

### Tips

- Do the DNS change at a low-traffic time if possible.
- Keep the old Adobe site available (don’t cancel immediately) until you’ve confirmed email, redirects, and any subdomains on the new host.

---

## 1b. Netlify + Network Solutions: Changing Nameservers (Step-by-Step)

Use this when the site is on **Netlify** and the domain is registered at **Network Solutions**. You point the domain to Netlify by switching to Netlify’s nameservers.

### In Netlify

1. Log in at [app.netlify.com](https://app.netlify.com).
2. Open the **site** that will use the custom domain (e.g. classicballroom.com).
3. Go to **Domain management** (or **Domain settings** / **Domains** in the site menu).
4. Click **Add custom domain** (or **Add domain** / **Add a domain**) and add your domain (e.g. `classicballroom.com`). Add `www.classicballroom.com` too if you use www.
5. Netlify will show **DNS configuration**. Choose the option to use **Netlify DNS** (e.g. “Set up Netlify DNS” or “Use Netlify nameservers”).
6. Open **DNS** in the left sidebar (team/site level). Select the domain you added.
7. In the **Name servers** panel, copy the **four nameservers** Netlify shows. They look like:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`  
   (Your values will be different; use exactly what Netlify shows.)
8. **Before leaving:** If the domain currently has email or other DNS records (MX, etc.), add those in Netlify’s DNS panel first so you don’t lose email when you switch nameservers.

### In Network Solutions

1. Log in at [www.networksolutions.com](https://www.networksolutions.com) → **Sign In** / **My Account**.
2. Go to **Domains** (or **Domain Names**) and find the domain (e.g. classicballroom.com).
3. Click the domain to manage it.
4. Find **Nameservers** (often under **Advanced Tools**, **DNS**, or **Domain Settings**). Click **Manage** or **Edit** next to “Nameservers” / “Nameserver (DNS)”.
5. Choose **Custom nameservers** (or “I have specific nameservers”) and remove the current ones (e.g. NS1.SERVER284.COM, NS2.SERVER284.COM).
6. Enter the **four Netlify nameservers** you copied, one per line.
7. Save. Network Solutions may show a warning that changing nameservers can affect email/website; confirm if prompted.

### After you save

- **Propagation:** DNS can take from a few minutes up to 24–48 hours. Netlify will show the domain as “Pending” or “Waiting for DNS” until it sees the new nameservers.
- **SSL:** Once DNS is pointing to Netlify, Netlify will issue an HTTPS certificate automatically. Test `https://classicballroom.com` and `https://www.classicballroom.com` after propagation.

---

## 1c. Enabling the CMS on Netlify (Decap / Netlify CMS)

The site uses **Decap CMS** (formerly Netlify CMS). Content is stored in **`content/*.json`** and edited at **`/admin`** (e.g. `https://yoursite.netlify.app/admin` or `https://classicballroom.com/admin`).

### One-time setup in Netlify

1. In the **Netlify dashboard**, open your site.
2. Go to **Site configuration** (or **Settings**) → **Integrations** (or **Identity**).
3. **Enable Netlify Identity:**  
   - Open **Identity** and click **Enable Identity** (or **Invite users**).  
   - Under **Registration preferences**, choose **Invite only** (recommended) so only people you invite can log in, or **Open** for self-signup.
4. **Enable Git Gateway:**  
   - Go to **Identity** → **Services** (or **Applications and usage**).  
   - Find **Git Gateway** and click **Enable**. This lets the CMS write to your Git repo without giving editors full repo access.
5. **Invite editors:**  
   - In **Identity** → **Invite users**, add the email addresses of people who should edit content. They’ll get an invite email; after they set a password, they can log in at `/admin`.

### Using the CMS

- Open **`https://your-site.netlify.app/admin`** (or your custom domain + `/admin`).
- Log in with a Netlify Identity account (invited user).
- Edit **Contact**, **Events**, **Staff**, **Services**, **Classes**, or **Calendars**. Changes are saved as commits to your repo; the next Netlify deploy will publish them.
- **Images:** Use the image field in the CMS to upload files; they’re stored in **`public/uploads`**. If a field is empty, the site shows a placeholder until you add an image.

### If your repo branch is not `main`

Edit **`public/admin/config.yml`** and set `branch` to your default branch (e.g. `master`).

---

## 2. Should You Pick Your Own Host or Use Theirs?

| Use **your/host’s platform** (e.g. Netlify) | Use **client’s** existing host |
|---------------------------------------------|----------------------------------|
| One place for code, CMS, and domain         | Client may already pay for hosting and want to keep it |
| You control deployments and CMS             | You may need to adapt to their setup (FTP, cPanel, etc.) |
| Easy custom domain + SSL                    | Domain might stay with them; you just hand off files |
| Best fit for **static Astro + CMS**         | Only makes sense if their host can serve static files and (if needed) run a CMS |

**Recommendation:**  
For an Astro static site and a simple CMS, **using a platform like Netlify** (or Vercel, Cloudflare Pages) is usually the smoothest: custom domain, free SSL, Git-based deploys, and optional CMS (e.g. Netlify CMS/Decap). Use the client’s host only if they strongly want to keep everything there and their host can serve a static `dist` folder (or you’re okay handing off built files and no CMS).

---

## 3. Cheap hosting options (with CMS in mind)

For a **basic static site** (no database) with **low cost** and **CMS integration**, these are the main options. All support Astro, custom domains, and free SSL.

| Host | Free tier | CMS (Decap/Netlify CMS) | Best for |
|------|-----------|--------------------------|----------|
| **Cloudflare Pages** | **Unlimited bandwidth**, 500 builds/mo, 20k files | ✅ Yes (GitHub OAuth via a small Cloudflare Function) | **Cheapest at scale**; best if you want to avoid bandwidth limits. |
| **Netlify** | 100 GB bandwidth, 300 build min/mo | ✅ **Easiest** — Decap CMS + Netlify Identity out of the box | **Simplest CMS setup**; no auth plumbing. |
| **Vercel** | 100 GB bandwidth, generous build minutes | ✅ Yes (Decap works; auth needs custom setup) | Great DX; slightly more work for Decap auth. |
| **GitHub Pages** | Unlimited (public repos) | ✅ Yes (Decap works; you need OAuth — e.g. Netlify Identity for “auth only” or a GitHub OAuth app) | **$0 and you’re already set up**; add CMS with a bit of auth config. |
| **Render** | Free static hosting | ❌ No built-in CMS (use a headless CMS if needed) | Simple deploys; CMS would be separate (e.g. Sanity, Contentful). |

### Recommendation for your case

- **Keep cost minimal + want CMS:**  
  - **Option A — Easiest:** **Netlify** (free tier). Decap CMS works with one click (Netlify Identity). 100 GB/month is plenty for a small studio site.  
  - **Option B — Most generous free tier:** **Cloudflare Pages** (unlimited bandwidth, 500 builds). Decap CMS is supported; you add a small serverless function for GitHub OAuth (guides exist). Best if you expect more traffic or want no bandwidth worry.  
  - **Option C — Stay on GitHub Pages:** Keep your current GitHub Actions deploy. Add Decap CMS and use **Netlify Identity** only for login (you don’t have to host the site on Netlify). Slightly more setup, but $0 hosting.

- **Willing to skip a Git-based CMS:**  
  Use **Cloudflare Pages** or **Render** for hosting and plug in a **headless CMS** with a free tier (e.g. **Sanity**, **Contentful**, **Decap** on another host). More flexible long-term but more setup than Decap on Netlify.

**Summary:** For “cheap + basic site + CMS,” **Netlify free tier** is the smoothest (Decap CMS built-in). For **lowest cost and no bandwidth cap**, **Cloudflare Pages** is better; Decap works with a small OAuth function. **GitHub Pages** stays free and can use Decap if you add auth (e.g. Netlify Identity for login only).

---

## 4. Basic CMS Options (Including Netlify / Decap)

This project is **static Astro** (no server by default). Content is in the repo (e.g. `src/data/`, components). A “basic CMS” usually means non-developers can edit text, events, or images.

### Option A: Netlify CMS (Decap CMS) on Netlify

- **What it is:** Git-based CMS; edits go back into your repo as commits. Good for pages, events, staff, simple galleries.
- **Fit:** Works well if you host on **Netlify** and connect the repo there. You add an `/admin` route and a config file that defines editable collections (e.g. services, events, staff).
- **Steps in short:**
  1. Deploy the site to Netlify and connect the GitHub repo.
  2. Add Netlify Identity (or GitHub OAuth) so only the client can log in.
  3. Add the CMS admin page and `config.yml` (or use a package like `astro-netlify-cms` to scaffold it).
  4. Move editable content (e.g. services hover text, events, staff bios) into files or a folder that the CMS writes to (e.g. `src/data/` or `content/`), and have Astro read from there.

If you want, the next step is to add a `content/` folder (or keep using `src/data/`) and define Decap/Netlify CMS collections for the content you want editable.

### Option B: Headless CMS (Sanity, Contentful, etc.)

- **What it is:** External CMS; Astro fetches content at build time (or with on-demand rendering if you add an adapter).
- **Fit:** More flexible and scalable, but needs more setup (API keys, content models, and Astro integration). Better if the client needs a lot of content types or multiple sites later.

### Option C: Keep Content in the Repo (no CMS)

- **What it is:** You or the client edit `src/data/*.ts` (or similar) and redeploy.
- **Fit:** Simplest; fine if updates are rare and the client is okay with you making edits or using GitHub’s web editor.

**Practical suggestion:**  
If you’re set on Netlify for hosting, adding **Netlify CMS (Decap)** gives a “basic CMS” with minimal extra infrastructure. I can outline the exact config and file structure for this repo if you want to add it.

---

## 5. Using Netlify CMS with `src/data`

**Can you use `/src/data` as the content folder?**  
Yes. In the Netlify CMS config you set each collection’s `file` or `folder` to live under `src/data`. One important detail: **Netlify CMS writes JSON or Markdown files, not TypeScript.** So you’d have:

- CMS editing e.g. `src/data/contact.json`, `src/data/events.json`, `src/data/staff.json`, etc.
- Your existing `.ts` files in `src/data` either:
  - **Option A:** Stay as the single source of truth, and you **don’t** point the CMS at them (CMS would write to separate JSON/MD files that you’d then read in code), or  
  - **Option B:** Be replaced for that content—e.g. remove `Contact.ts` and have the site load `src/data/contact.json` at build time (e.g. `import contact from '../data/contact.json'` or `import.meta.glob`).

So “designating the content folder as `/src/data`” means: **CMS writes into `src/data` as JSON (or Markdown)**. You then wire your components to read from those files instead of (or in addition to) the current `.ts` files. Images that the CMS uploads are usually stored under `public/uploads/` (or similar); in the CMS you store the **path** (e.g. `/uploads/photo.jpg`), and the site uses that path in `<img src={...}>` or similar.

**What content should be added to the CMS (that isn’t there yet)?**

Right now all editable content lives in **`src/data`** as TypeScript. None of it is yet managed by the CMS. These are the pieces that make sense to put under the CMS, and what’s in each:

| Content        | Current file     | What to put in CMS |
|----------------|------------------|--------------------|
| **Contact**    | `Contact.ts`     | Phone, email, address (singleton). Optionally add hours of operation if you want them editable. |
| **Events**     | `Events.ts`      | List of events: title, date, time, description, image (path to upload). |
| **Staff**      | `Staff.ts`       | List of staff: name, title, bio, image (path to upload). |
| **Services**   | `Services.ts`    | Same list: id, title, hoverText; image as path or keep image choice in code. |
| **Classes**    | `Classes.ts`     | Schedule: title, day, time; image as path or fixed set in code. |
| **Calendars**  | `Calendars.ts`   | Current/next month label and image path (e.g. for PDF/image of the calendar). |
| **Galleries**  | `imageGalleries.js` | Gallery title and list of image paths (or keep script-generated and only use CMS for captions/titles). |

So: **everything currently in `src/data` (and the gallery config) is a candidate for the CMS.** There isn’t a separate “content that should be added that isn’t there”—it’s that none of this is CMS-backed yet. The only thing you might **add** as new content is:

- **Hours of operation** (if you want them on the site and editable in the CMS)—could live in the Contact singleton.
- **Site-wide text** (e.g. tagline, footer blurb)—could be a small “Settings” or “Site” singleton in `src/data/settings.json`.

Summary:

- Yes, you can designate the content folder as **`/src/data`** and have Netlify CMS write **JSON** (or Markdown) files there.
- The content to add to the CMS is: **Contact, Events, Staff, Services, Classes, Calendars, and (optionally) Galleries**, plus optionally hours and site-wide settings. Right now none of that is in the CMS; moving it there is the next step when you add the CMS config and switch the site to read from the CMS-written files.

---

## 6. Code Changes When Moving to Your Own Host / Custom Domain

Right now the site is set up for **GitHub Pages** under a repo path:

- In **`astro.config.mjs`**: `base: '/CBDS-website/'`

When you move to **Netlify (or any host) with a custom domain** (e.g. `https://classicballroom.com`):

1. **Set `base` to `'/'`** in `astro.config.mjs`:
   ```js
   base: '/',
   ```
2. **Redeploy.**  
   Links and assets are already built using `import.meta.env.BASE_URL` in `src/utils/url.ts`, so they will automatically use `/` once `base` is changed.
3. **GitHub Actions:**  
   If you stop using GitHub Pages, you can disable or remove the workflow in `.github/workflows/deploy.yml` so it doesn’t overwrite or conflict with Netlify’s deploys.

After that, the same codebase works on Netlify (or another host) with a clean root URL and custom domain.

---

## 7. Quick Checklist for Go-Live

- [ ] Decide host (e.g. Netlify) and create account / connect repo.
- [ ] Confirm where the domain is registered and who can change DNS.
- [ ] Lower TTL a few days before switch (if possible).
- [ ] In `astro.config.mjs`, set `base: '/'` for custom domain.
- [ ] Deploy site and add custom domain at new host.
- [ ] Update DNS (nameservers or A/CNAME) at registrar.
- [ ] Verify SSL and test `https://` and `https://www` (if used).
- [ ] Optional: Add Netlify CMS and move editable content into CMS-backed files.
- [ ] After a few days of stable traffic, consider turning off the old Adobe site.
