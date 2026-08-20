# Project Context

A record of how this site came to be, for anyone (human or AI) picking up the work later.
Built 2026-07-18 in a Claude Code session with Marlon Copeland.

## What this repo is

The public website for **Unjaded Digital Products, LLC** — a single-page static site
(`index.html` + `styles/site.css` + `scripts/site.js`) served from the repo root by
GitHub Pages on the `main` branch, at **unjaded.net** (GitHub Pages hostname:
`marloncopeland.github.io`).

It replaced two earlier builds that used to live in this repo: `UnjadedSimple/`
(hand-written) and `UnjadedWebFlow/` (Webflow export). Both were deleted in the same
commit that added the current site.

## The business

- **Owner:** Marlon Copeland — Software Engineer & Founder. Morgan State University alum,
  based in the Baltimore, Maryland area. ~15 years in the Microsoft ecosystem
  (SharePoint developer 2011 → senior engineer / technical lead at Prometric →
  solutions team lead at Advanced Metrics → founded Unjaded in 2018).
- **Services:** SharePoint custom solutions & intranet management (Azure, SPFx, React);
  Microsoft-based data management, archiving, auditing, and transport; small business
  website development & administration; custom apps and games.
- **Products in development:** Cave Boss (RPG), A Game of Robert's Rules (educational
  game for parliamentary procedure), Vendor Finder (connects people directly to vendors).
- **Contact email:** marlon@unjaded.net (contact section + form delivery). The footer,
  the Legend pages, and the privacy policy still point at marlon.unjaded@gmail.com —
  decide whether those should move to the domain address too.
- **LinkedIn:** https://www.linkedin.com/in/marloncopeland/

## Design decisions

- **Palette** comes from the Unjaded logo: steel blue-gray (`#7d93ab`) and muted gold
  (`#c9b568`) on dark slate (`#10151c`). All colors are CSS custom properties in
  `styles/site.css`.
- **Logo:** `images/UnjadedTwoColors.png` is the canonical mark.
  `images/UnjadedDPLogoType1.png` contains a typo ("DITGITAL PRODUCTS") — do not use it
  until fixed.
- **No frameworks, no build step** — system font stack, hand-written CSS/JS. Anything in
  the repo root is what ships. The one outbound request is the contact form's POST.
- **Contact form** (updated 2026-08-19) mirrors the structure and behavior of
  brownicity.com/contact: First Name / Last Name (side by side), Email, Topic dropdown,
  Message, "Submit". It posts JSON to FormSubmit's AJAX endpoint
  (`https://formsubmit.co/ajax/marlon@unjaded.net`), so the page never reloads and the
  message arrives as email — a static host has no server of ours to send from.
  - **Delivery address is marlon@unjaded.net**, set once as `CONTACT_EMAIL` in
    `scripts/site.js`; `FORM_ENDPOINT` is derived from it. Swapping to Formspree or
    Web3Forms means changing those two lines and the JSON key names.
  - **One-time activation:** the first real submission sends a confirmation email to
    marlon@unjaded.net. Until that link is clicked, submissions are held rather than
    delivered. This has NOT been done yet.
  - Spam handling: an off-screen `_honey` honeypot field; bots that fill it get the
    success message and nothing is sent. FormSubmit's own captcha is disabled
    (`_captcha: "false"`) since captcha cannot render in an AJAX flow.
  - If the POST fails, the error state offers a pre-filled `mailto:` link and leaves the
    visitor's typed input in place, so a message is never silently lost.
- **Page sections:** hero → trust bar → Services → Products → How We Work (process) →
  About the founder → Contact → footer. Mobile nav collapses to a hamburger under 640px.

## Verification done

Rendering was verified with headless Chrome screenshots at 1280px and 390px widths.
Note for future testing: headless Chrome on Windows clamps its window to ~512px minimum
width, so narrow screenshots come out cropped and look like overflow when there is none.
Measured properly (page in a 390px iframe), scrollWidth is 375px — no horizontal overflow.

## DNS / hosting state (as of 2026-07-18)

- Apex `unjaded.net`: four GitHub Pages A records (185.199.108–111.153) — working.
- `www.unjaded.net`: needed a CNAME to `marloncopeland.github.io` — record was being
  added when this was written; after propagation, re-check in Pages settings and enable
  **Enforce HTTPS**.

## Housekeeping notes

- `images/refs/` and `images/Screenshot*.png` are gitignored — reference material
  (LinkedIn captures, settings screenshots), not site assets.
- `marlonwithasuite.jpg`, `picofmarlonfrom2013.JPG`, and `UnjadedDPLogoType1.png` are
  untracked on purpose; decide later if any belong on the site.
- A Twilio 2FA recovery code file was removed from the working tree but still exists in
  git history. The code should be rotated (or history scrubbed) since this repo is public.
