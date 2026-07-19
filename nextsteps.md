# Next Steps

Improvements for the Unjaded Digital Products site, roughly in priority order.

## Contact experience

- [ ] Replace the `mailto:` form with a real form backend (Formspree, FormSubmit, or a
      small Azure Function) so submissions arrive by email without opening the visitor's
      mail client. Keep the direct email link as a fallback.
- [ ] Add a success/thank-you state after submission.
- [ ] Optional: add a Calendly (or similar) "book a call" link for a lower-friction start.
- [ ] Consider a business email on the domain (e.g. hello@unjaded.net) instead of Gmail —
      reads more established on a consulting site.

## Visual proof of work

- [ ] Add screenshots / graphics for each product (Cave Boss, A Game of Robert's Rules,
      Vendor Finder) — even early concept art beats text-only cards.
- [ ] Add a portfolio/case-study section for client work: problem → what we built →
      outcome. One or two strong examples is enough to start.
- [ ] Add client logos (with permission) or short testimonial quotes to the trust bar area.
- [ ] Fix the "DITGITAL" typo in `UnjadedDPLogoType1.png` so the full logotype is usable.

## Site polish

- [ ] Proper favicon set (ico + png sizes + apple-touch-icon) instead of reusing the logo PNG.
- [ ] Open Graph / Twitter card meta tags so links shared on LinkedIn/social show a rich
      preview (og:image, og:title, og:description).
- [ ] Optimize images — `Marlon_Fun_Unjaded.png` is ~400KB; convert to WebP and resize to
      display dimensions.
- [ ] Custom 404 page (404.html) styled to match the site.
- [ ] Accessibility pass: contrast check, focus states, skip-to-content link, alt text review.

## Growth

- [ ] Enable **Enforce HTTPS** in GitHub Pages once the www CNAME validates.
- [ ] Add sitemap.xml and robots.txt; submit to Google Search Console.
- [ ] Lightweight, privacy-friendly analytics (e.g. GoatCounter, Plausible) to see what
      visitors read.
- [ ] Blog or "notes" section for SEO and credibility — SharePoint/Azure how-tos are a
      natural fit for the consulting audience.
- [ ] Per-product landing pages once the games/apps near release, so each has a shareable URL.

## Housekeeping

- [ ] Rotate the Twilio 2FA recovery code (old file remains in git history) or scrub
      history with `git filter-repo`.
- [ ] Update README.md to describe the site (it predates this build).
