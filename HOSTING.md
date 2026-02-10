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

### Why email / webmail is tricky after a DNS move

When you moved nameservers to Netlify, you took over **all** DNS for classicballroom.com. The old DNS (at SERVER284/Web.com) had the right MX, SPF, and CNAME for mail—but those records don’t move automatically. We’ve been rebuilding them from historical DNS and generic docs. The main unknown: **which exact product** hosts your email (Web.com Business Email, Network Solutions Cloud Mail, etc.). Each product has slightly different webmail URLs and CNAME targets. Once you know the product (and who has the account), one call or one support page gives you the exact records and login URL.

### How to find out who provides your email

1. **Who pays for or manages the email?**  
   Whoever set up josh@classicballroom.com, susan@classicballroom.com, etc. (or whoever pays the bill) has an account with the email provider. That person has a login to **Web.com**, **Network Solutions**, or the host that ran the old site. The account dashboard usually shows the product name (e.g. “Business Email”, “Webmail”) and often lists “Your webmail URL” and DNS settings.

2. **Log in where the domain or old site lived**  
   - **Network Solutions:** Go to [networksolutions.com](https://www.networksolutions.com) → Sign in → **Domains** → classicballroom.com. Look for **Email**, **Mail**, or **DNS**; the product and webmail link are often there.  
   - **Web.com:** Go to [web.com](https://www.web.com) → **My Account** / Sign in → find classicballroom.com. Check for **Email** or **Webmail** and which product is listed.

3. **Call support (fastest)**  
   Call **Network Solutions** (1-888-793-7657) or **Web.com** support and say:  
   *“We own classicballroom.com. We moved our website DNS to another host. Which of your products is hosting our email (e.g. josh@classicballroom.com), and what are the exact DNS records and webmail login URL we need?”*  
   They look up the account and can give you the product name, webmail URL, and correct CNAME for mail in one go.

4. **Check old welcome or billing email**  
   Search email for messages from **Web.com**, **Network Solutions**, or **server284** from when @classicballroom.com was set up; they often include the webmail URL and product name.

Once you know the product and (if possible) have the account login, you can use that provider’s help page or support to get the exact webmail URL and CNAME target for mail.classicballroom.com—then everything (redirect, CNAME) can be set once and left alone.

### If the old website was hosted at ICDSoft

ICDSoft hosts both websites and email and uses **Roundcube** for webmail (which matches your setup). If the old site was on ICDSoft, the following applies.

**How ICDSoft webmail works**

- When the domain was pointed to ICDSoft, webmail was available at:
  - **https://classicballroom.com/webmail** (path on the same server)
  - **https://webmail.classicballroom.com**
  - **https://mbox.classicballroom.com**
- After you moved DNS to Netlify, the **site** is no longer on ICDSoft, so **classicballroom.com/webmail** is now your Netlify redirect—it can’t hit ICDSoft’s /webmail path anymore. To get webmail back, you need **webmail.classicballroom.com** or **mbox.classicballroom.com** to point to ICDSoft’s server again (via CNAME in Netlify DNS).

**What to do**

1. **If you still have an ICDSoft account** (same one that hosted classicballroom.com):
   - Log in at [accounts.icdsoft.com](https://accounts.icdsoft.com) or your ICDSoft Control Panel.
   - Find **Server name** (e.g. `s123.sureserver.com`) in the top-right or under server/hosting info.
   - **Option A – Use ICDSoft’s URL when domain isn’t pointed at them:**  
     Webmail is at **https://mbox.YOUR_SERVER.com** (e.g. `https://mbox.s123.sureserver.com`). You can put that URL in **`public/_redirects`** so **/webmail** goes there. No CNAME needed; /webmail will work as soon as you deploy.
   - **Option B – Use webmail.classicballroom.com again:**  
     Ask ICDSoft support: *“Our domain classicballroom.com is now on another host’s DNS (Netlify). What CNAME target should we set for **webmail.classicballroom.com** (or **mbox.classicballroom.com**) so we can access Roundcube webmail at that address?”* They’ll give you a hostname (e.g. their mail server). Add that CNAME in Netlify DNS, then set the **/webmail** redirect to **https://webmail.classicballroom.com** (or mbox) and deploy.

2. **If email was on ICDSoft too** (MX and mail server):  
   Your bounces came from **server284.com**; ICDSoft uses **sureserver.com** (related infrastructure). So either (a) email was on Web.com/server284 and only the **website** was on ICDSoft, or (b) everything was on ICDSoft and server284 is their outbound mail relay. If you’re not sure, ask ICDSoft: *“Is our email for classicballroom.com hosted with you, and what are the MX and webmail settings now that our DNS is elsewhere?”*

3. **If you no longer have the ICDSoft account:**  
   Contact ICDSoft support with the domain name and ask for the webmail URL (e.g. mbox.xxxx.sureserver.com) or the CNAME target for webmail.classicballroom.com. They can look it up by domain.

**Summary:** If the old site was on ICDSoft, /webmail was either a path on their server or a link to webmail/mbox.classicballroom.com. To restore it: use the mbox.xxxx.sureserver.com URL in your redirect (easiest), or get the CNAME target from ICDSoft and point webmail.classicballroom.com (or mbox) at it in Netlify DNS, then redirect /webmail there.

**ICDSoft mail server – exact CNAME (from Control Panel)**

From the ICDSoft Control Panel **Mail system information**, the mail server hostname is **mail.server284.com**. So:

1. **In Netlify DNS:** Add or edit the **CNAME** for **mail**:
   - **Name / Host:** `mail`
   - **Value / Target:** `mail.server284.com`  
   (Remove any existing CNAME for **mail** that pointed to something else, e.g. mail.classicballroom.com.webcommail.net.)
2. **Redirect:** **`public/_redirects`** is set so **/webmail** and **/webmail/** go to **https://mail.classicballroom.com**. After the CNAME is in place and DNS has propagated, **www.classicballroom.com/webmail** and **https://mail.classicballroom.com** will both load ICDSoft’s Roundcube webmail.

Your MX (priority 0 → mail.classicballroom.com) and SPF are already correct; this CNAME makes **mail.classicballroom.com** resolve to mail.server284.com so webmail loads instead of “Under Construction.”

**Alternative:** The old DNS used an **A record** for mail (mail.classicballroom.com → 192.252.144.34), not a CNAME. You can use either: **CNAME** `mail` → `mail.server284.com` (recommended) or **A** record `mail` → `192.252.144.34`. Both work.

### Full DNS from old site (ICDSoft/server284)

For reference, the old DNS had:

| Type | Name / Host | Value | Notes |
|------|-------------|--------|-------|
| A | @ / classicballroom.com | 192.252.144.34 | Old website; now on Netlify. |
| A | mail | 192.252.144.34 | Use **CNAME** mail → mail.server284.com in Netlify instead (or A → 192.252.144.34). |
| MX | @ | mail.classicballroom.com, priority 0 | Add in Netlify. |
| TXT | @ | v=spf1 a mx include:server284.smtp-spf.sureserver.com ~all | SPF – add in Netlify (you already did). |
| TXT | _dmarc | v=DMARC1; p=none; | DMARC – add in Netlify (see below). |
| TXT | dkim._domainkey | v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw/Ir/vSZXby/zgjV7gvrKU+3skG0hbOpkR9rfTWwsUh19B5jmdplOZwxl4egr5txVAGBHpXSVu4TXx244gcnDFyv9G07PeZTYE9zbgi2dqUEjb9wRs1T/HHUTUjWo7bzO8gOIfu2kQpiqn2dIgH43dPf2tSDtHZZhg5GIR6oXWQIDAQAB | DKIM – add in Netlify (see below). |

**Add DMARC and DKIM in Netlify**

These help with deliverability and fix “DKIM = did not pass” in Gmail:

1. **DMARC** – In Netlify DNS, add **TXT**:
   - **Name:** `_dmarc`
   - **Value:** `v=DMARC1; p=none;`

2. **DKIM** – In Netlify DNS, add **TXT**:
   - **Name:** `dkim._domainkey`
   - **Value:** `v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw/Ir/vSZXby/zgjV7gvrKU+3skG0hbOpkR9rfTWwsUh19B5jmdplOZwxl4egr5txVAGBHpXSVu4TXx244gcnDFyv9G07PeZTYE9zbgi2dqUEjb9wRs1T/HHUTUjWo7bzO8gOIfu2kQpiqn2dIgH43dPf2tSDtHZZhg5GIR6oXWQIDAQAB`

After DNS propagates, SPF + DKIM should both pass for Gmail.

### Mail client settings (Outlook, Thunderbird, Apple Mail, phone)

Use these when setting up **@classicballroom.com** in an email program (Microsoft Outlook, Mozilla Thunderbird, Apple Mail, or a phone):

| Setting | Value |
|--------|--------|
| **Incoming server (IMAP)** | mail.server284.com |
| **Incoming (IMAP) port** | 993 (SSL) |
| **Incoming (POP3) port** | 995 (SSL) |
| **Outgoing server (SMTP)** | mail.server284.com |
| **Outgoing (SMTP) SSL/TLS** | Port 465, or port 587 with STARTTLS |
| **Authentication** | Yes (use full email and mailbox password) |

- **Requires SSL:** Yes (incoming and outgoing).
- **Requires TLS:** Yes if available (outgoing).
- **Username:** Full email (e.g. josh@classicballroom.com, susan@classicballroom.com).
- **Password:** The mailbox password for that address.

### Webmail after the switch

If you had **www.classicballroom.com/webmail** (or similar) on the old host, that path no longer exists once the site is on Netlify. A redirect is set up so that **/webmail** and **/webmail/** send users to your email provider’s webmail login.

- **Redirect file:** `public/_redirects` sends `/webmail` → **https://mail.classicballroom.com**. For that to load webmail (ICDSoft Roundcube), add in Netlify DNS: **CNAME** `mail` → **mail.server284.com** (see “ICDSoft mail server – exact CNAME” above). Then deploy and try **www.classicballroom.com/webmail**; log in with your full email address (e.g. josh@classicballroom.com) and mailbox password.
- **If that login doesn’t work**, the email may be with a different product. Try changing the redirect URL in `public/_redirects` to one of these, then redeploy:
  - **Network Solutions (alt interface):** `https://webmail.networksolutionsemail.com/appsuite/`
  - **Web.com account (log in, then open email):** `https://www.web.com/my-account/login?webmaillogin=true`
  - **SecureServer:** `https://webmail.secureserver.net`
- **To get the correct URL:** Call Network Solutions (1-888-793-7657) or Web.com support and ask: “What is the webmail login URL for classicballroom.com?” They can confirm which product hosts your mail and give you the exact link.
- **Using webmail.classicballroom.com or mail.classicballroom.com:** If your provider gives you a hostname (e.g. for CNAME), add that **CNAME** in Netlify DNS, then you can point the redirect there. If **mail.classicballroom.com** shows an “Under Construction” page, the CNAME target (e.g. mail.classicballroom.com.webcommail.net) is wrong for your product — ask Web.com/Network Solutions for the correct CNAME target, or use the direct webmail URL in **`public/_redirects`** (e.g. https://webmail.networksolutionsemail.com/appsuite/) so **/webmail** works without relying on mail.classicballroom.com.

### Email authentication (SPF) – fix “sender is unauthenticated” bounces

After you moved DNS to Netlify, Gmail (and others) may reject mail from **@classicballroom.com** with:

- **“Your email has been blocked because the sender is unauthenticated”**
- **“SPF … = did not pass”** and/or **“DKIM = did not pass”**

That happens because the domain’s DNS no longer authorizes your mail server (server284.com / Web.com). You need to add the correct **SPF** (and DKIM if your provider supports it) in **Netlify DNS**.

**1. Add the SPF record in Netlify**

Your mail is sent via **server284.com** (Web.com). Add this **TXT** record so receiving servers accept it:

1. In **Netlify**, go to **Domain management** → **DNS** (or **Domains** → your domain → **DNS**).
2. Click **Add record** (or **Add DNS record**).
3. Set:
   - **Type:** `TXT`
   - **Name/host:** `@` (or leave blank for the root domain – Netlify may show “@” or “classicballroom.com”).
   - **Value:**  
     `v=spf1 include:spf.cloudus.oxcs.net ~all`
4. Save.

**2. If you already have an SPF record**

You can only have **one** SPF TXT record for the domain. If Netlify already has a TXT record whose value starts with `v=spf1`, **edit that record** and add the Web.com include **before** `~all` or `-all`:

- Before: `v=spf1 include:something.else.com ~all`
- After:  `v=spf1 include:something.else.com include:spf.cloudus.oxcs.net ~all`

**3. DKIM**

Web.com / server284 typically do **not** offer DKIM; they rely on SPF. Gmail accepts “SPF **or** DKIM,” so fixing SPF is usually enough. If bounces continue, contact Web.com (or whoever hosts @classicballroom.com) and ask: “Do you support DKIM for classicballroom.com, and what DNS records should we add?”

**4. MX records**

Make sure **MX** records for classicballroom.com in Netlify DNS point to your mail provider. If MX was not re-added when you switched to Netlify, **incoming** mail will not be delivered. See **“MX records – how to add them in Netlify”** below.

**5. Wait for DNS**

Changes can take from a few minutes up to 24–48 hours. After that, send a test message from susan@classicballroom.com to Gmail again; it should no longer bounce for “unauthenticated sender.”

### MX records – how to add them in Netlify

MX (Mail Exchange) records tell the internet **where to deliver** email for @classicballroom.com. Without them, no one can receive mail at susan@classicballroom.com, josh@classicballroom.com, etc.

Your mail is sent via **server284.com** (Web.com). Use the **Web.com Cloud Mail** MX hostnames below. If your email was set up through Network Solutions instead of Web.com, use the **Network Solutions** hostnames in the table; if unsure, add the Web.com set first, then contact support if mail still doesn’t arrive.

**Step-by-step in Netlify**

1. In **Netlify**, go to **Domain management** (or **Domains** in the left sidebar).
2. Select the domain **classicballroom.com**.
3. Open the **DNS** / **DNS records** section.
4. Click **Add new record** (or **Add record** / **Add DNS record**).
5. Choose **MX** as the record type.
6. Add **four MX records** (one at a time), all with **Priority** `10`:

   **If your email is Web.com Cloud Mail (server284 / typical for classicballroom):**

   | Host / Name | Priority | Value / Mail server        |
   |-------------|----------|----------------------------|
   | `@`         | 10       | mx001.webcom.xion.oxcs.net |
   | `@`         | 10       | mx002.webcom.xion.oxcs.net |
   | `@`         | 10       | mx003.webcom.xion.oxcs.net |
   | `@`         | 10       | mx004.webcom.xion.oxcs.net |

   **If your email is Network Solutions Cloud Mail instead:**

   | Host / Name | Priority | Value / Mail server          |
   |-------------|----------|------------------------------|
   | `@`         | 10       | mx001.netsol.xion.oxcs.net   |
   | `@`         | 10       | mx002.netsol.xion.oxcs.net   |
   | `@`         | 10       | mx003.netsol.xion.oxcs.net   |
   | `@`         | 10       | mx004.netsol.xion.oxcs.net   |

   For each record:
   - **Hostname / Name:** `@` (or leave blank if Netlify uses that for the root domain).
   - **Priority:** `10`.
   - **Value / Mail server:** the hostname only (e.g. `mx001.webcom.xion.oxcs.net`) — no `http://` or trailing dot.
7. Save each record. When finished, you should have **four MX** records, all priority 10.

**Notes**

- Do **not** add any other MX records for classicballroom.com (e.g. remove old or test MX if present), or delivery can be inconsistent.
- DNS can take 15–30 minutes up to 24–48 hours to propagate. After that, incoming mail to @classicballroom.com should be delivered to your Web.com/Network Solutions mailboxes.
- To confirm: use a tool like [dnschecker.org](https://dnschecker.org) (MX lookup for classicballroom.com) and check that the four hostnames above appear.

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

### Invite flow (set password)

The **Netlify Identity widget** is included on every page (in the main layout) so that when someone clicks the invite link (with `#invite_token=...` in the URL), the widget opens and they can set their password. If invite links only showed a token in the URL and no “set password” step, the widget was not on the page they landed on—adding it to the layout fixes that. After they set a password, they’re redirected to `/admin`.

### Using the CMS

- Open **`https://your-site.netlify.app/admin`** (or your custom domain + `/admin`).
- Log in with a Netlify Identity account (invited user).
- Edit **Contact**, **Events**, **Staff**, **Services**, **Classes**, or **Calendars**. Changes are saved as commits to your repo; the next Netlify deploy will publish them.
- **Images:** Use the image field in the CMS to upload files; they’re stored in **`public/uploads`**. The site ships with images in **`public/uploads/events`**, **`public/uploads/staff`**, **`public/uploads/services`**, **`public/uploads/classes`**, and **`public/uploads/calendars`** so service cards, events, staff, classes, and calendars show images by default. New uploads go to **`public/uploads`** (path in content: `/uploads/...`).

### If your repo branch is not `main`

Edit **`public/admin/config.yml`** and set `branch` to your default branch (e.g. `master`).

---

## 1d. Contact forms – email notifications (susan@classicballroom.com)

The site uses **Netlify Forms** for the contact forms (Contact Us on the homepage/services and the contact page form). Submissions are sent to Netlify; you then tell Netlify to email each submission to **susan@classicballroom.com**.

### Step-by-step: set up forms in Netlify

**Before you start:** Deploy the site at least once so Netlify has built the pages. Netlify detects forms only in the built HTML (forms have `data-netlify="true"` and `name="contact"`).

1. **Log in to Netlify**  
   Go to [app.netlify.com](https://app.netlify.com) and sign in.

2. **Open your site**  
   Click the site (e.g. Classic Ballroom / classicballroom.com) from the dashboard.

3. **Open Forms**  
   In the left sidebar, click **Site configuration** (or **Site settings**), then **Forms**.  
   - If you don’t see “Forms,” look under **Build & deploy** or the main site menu for **Forms**.

4. **Confirm the form is detected**  
   After a deploy, you should see a form named **contact** in the list.  
   - If it’s missing, trigger a new deploy (e.g. push a commit or click “Trigger deploy” in the Deploys tab), then check again.  
   - Netlify scans the built HTML for `<form data-netlify="true">` and registers the form’s `name` attribute.

5. **Add an email notification**  
   - On the Forms page, find **Form notifications** (or **Notifications**).  
   - Click **Add notification** (or **Add form notification**).  
   - Choose **Email notification**.

6. **Configure the notification**  
   - **Event:** Leave as “New form submission” (or “Notify me when a form is submitted”).  
   - **Email to notify:** Enter **susan@classicballroom.com**. You can add more addresses if needed.  
   - **Subject (optional):** e.g. `New message from classicballroom.com` or `Contact form submission`.  
   - Save (e.g. **Save** or **Create notification**).

7. **Test it**  
   Visit your live site, fill out the contact form on the homepage or contact page, and submit. Susan should receive an email with the submitted fields (name, phone, email, message/description).

No backend code or API keys are required. Submissions are also stored in Netlify under **Forms** → **contact** → individual submissions, so you can review them in the dashboard even without email.

---

## 1e. SEO (search and social)

The site is set up for strong SEO and social sharing.

### What’s in place

- **Meta tags:** Every page has a unique `<title>` and `<meta name="description">`. Defaults and per-page overrides live in `src/config/site.ts` and in each page’s `<Layout>` props.
- **Canonical URLs:** Each page sets a canonical URL so search engines know the preferred URL (avoids duplicate-content issues with www vs non-www or trailing slashes).
- **Open Graph & Twitter Card:** `og:title`, `og:description`, `og:image`, `og:url`, and Twitter equivalents so links look good when shared on social media.
- **Structured data:** JSON-LD `DanceSchool` (LocalBusiness) with name, address, phone, email, and image. Helps search engines understand the business and can enable rich results.
- **Sitemap:** `@astrojs/sitemap` generates `sitemap-index.xml` and sitemaps at build time. The production URL is set in `astro.config.mjs` (`site: 'https://www.classicballroom.com'`).
- **robots.txt:** In `public/robots.txt`, allows all crawlers and points to the sitemap.

### What you can change

- **Site URL:** If you use a different domain or prefer non-www, update:
  - `site.url` in **`src/config/site.ts`**
  - `site` in **`astro.config.mjs`**
  - The `Sitemap:` line in **`public/robots.txt`**
- **Default title/description:** Edit `site.defaultTitle` and `site.defaultDescription` in `src/config/site.ts`.
- **Per-page SEO:** Each page passes `title`, `description`, `canonical`, or `image` to `<Layout>`. Adjust those in the page files (e.g. `src/pages/contact.astro`).
- **Default share image:** Change `site.defaultOgImage` in `src/config/site.ts` to another path (e.g. a dedicated OG image under `/images/`).
- **Twitter handle:** If you have a Twitter/X account for the studio, set `site.twitterHandle` in `src/config/site.ts` (e.g. `@ClassicBallroom`).

### Optional next steps

- Submit `https://www.classicballroom.com/sitemap-index.xml` in **Google Search Console** and **Bing Webmaster Tools**.
- Add more JSON-LD (e.g. `Event` for upcoming events, `FAQPage` if you add an FAQ section) if you want richer snippets.

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
