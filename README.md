# SHIZUKU 雫 — Drip Coffee & Japanese Kitchen

One-page landing site for a **fictional** Japanese-style specialty coffee shop on the Caspian shore (Awaza). Shizuku (雫) means "a single drop" in Japanese — the concept is built around slow hand-drip and Kyoto cold-drip coffee.

> All names, addresses, phone numbers and e-mails on the site are placeholders (`+993 00 123456`, `hello@shizuku.example`). Replace them before using the template for a real business.

## Features

- **Preloader** — a falling drop and ripple that reveals 雫
- **Hero** — Ken Burns crossfade slideshow with progress dots, film grain, ripple rings, outlined kanji, vertical Japanese text and a hanko stamp
- **Marquee band** with menu highlights in English and Japanese
- **About** — animated counters and parallax photos
- **Brewing ritual** — four steps (挽 蒸 注 味)
- **Menu** — four tabs (coffee, signature, kitchen, sweets) with a sliding indicator and vertical Japanese labels
- **Experience** cards with a cursor-following spotlight
- **Gallery** — masonry grid with a keyboard-friendly lightbox
- **Location** — map embed and today's sunset time for Awaza, calculated in the browser
- **Reservation** — validation, seating-zone picker and success state
- **Three languages** — Turkmen (source text in HTML), Russian, English
- Scroll progress bar, back-to-top ring, `prefers-reduced-motion` support, fully responsive

## Tech stack

Vanilla HTML, CSS and JavaScript. Google Fonts (Outfit, Playfair Display, Shippori Mincho), Font Awesome 6.

## Structure

```
├── index.html
├── css/style.css
├── js/script.js
└── assets/images/logo.svg
```

## Images

Photos are loaded from [Unsplash](https://unsplash.com) (free license) via `images.unsplash.com`. To host them yourself, download them into `assets/images/` and update the `src` attributes.

## Run locally

```bash
python -m http.server 5517
```

Then open http://localhost:5517.

## Design tokens

| Token | Value |
|-------|-------|
| Primary (shu-iro) | `#E8562A` |
| Accent (amber) | `#F2A65A` |
| Dark (sumi) | `#0F0E0D` |
| Light (washi) | `#F3EEE6` |
