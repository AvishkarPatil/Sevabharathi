## SevaBharathi — Ghost Theme

A custom [Ghost](https://ghost.org) 6.x theme for SevaBharathi, an NGO in Belthangady, coastal Karnataka working in spinal-cord-injury rehabilitation, women empowerment, and community health.

Built with Handlebars, vanilla CSS, and vanilla JavaScript — no build step required.

### Highlights

- Content-driven pages: statistics, programmes, stories, events, newsletters, testimonials and more are managed entirely from Ghost admin using tagged posts, page tables, and post metadata.
- Dynamic programmes — add a page tagged `home-programs` and it appears across the site automatically.
- Newsletter subscribe popup (Ghost Members) with a first-visit prompt.
- Dedicated Enquire page, dynamic donate/apply buttons, and past-event handling.
- Multi-language support via Google Translate, responsive layout, and SVG iconography.

### Requirements

- Ghost `>= 6.0.0`

### Install

1. Zip the theme folder (or download a release zip).
2. In Ghost admin, go to **Settings → Design → Change theme → Upload theme**.
3. Activate the theme.
4. Upload `routes.yaml` under **Settings → Labs → Routes** to enable the `/blogs/`, `/newsletters/`, `/annual-reports/`, and `/events/` listing pages.

### Development

Validate the theme against Ghost's rules before shipping:

```bash
npx gscan .
```

### Structure

- `*.hbs` — page and post templates
- `partials/` — shared partials (navigation, footer, cards)
- `assets/css/screen.css` — styles
- `assets/js/main.js` — interactions
- `routes.yaml` — custom routes for listing pages

### License

MIT
