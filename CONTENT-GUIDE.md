# Content Guide

Reference for managing the website. The site is built from **tagged posts**, a few **pages**, and some **theme settings**. This document explains, page by page and section by section, what fills each part and how to add it.

---

## How fields are used

Every post and page in Ghost has the same set of fields. This theme reuses them as follows:

| Field | Where to find it in Ghost | How the theme uses it |
|---|---|---|
| Title | top of the editor | Heading, person's name, or year |
| Excerpt | Post settings → Excerpt | Short line on a card; also the event date |
| Feature image | Post settings → Feature image | Card image, photo, or background |
| Body | the main editor area | Full content; or specific lines/blocks used by some sections |
| Meta title | Post settings → Meta data | Small label / heading on certain cards |
| Meta description | Post settings → Meta data | Link text / supporting line on certain cards |
| Canonical URL | Post settings → Meta data | Link destination on certain cards |
| Facebook title | Post settings → Facebook card | A link URL (used as a button link) |
| Tags | Post settings → Tags | Decides which section a post appears in. The first public tag is treated as its category |

Within a section, items are ordered by **publish date** unless stated otherwise.

---

## Theme settings

Found under **Settings → Design → Customize → Site-wide**. These are the only site-wide editable values.

| Setting | Controls |
|---|---|
| About image 1 / 2 / 3 | Home page "Who We Are" photo collage |
| About media url | About page media block (accepts a YouTube link or an image URL) |
| Serve map | About page districts map image |
| Contact email | Footer, contact page, contact form |
| Contact phone | Footer, contact page |
| Contact address (main / southadka / byndoor) | Contact page address cards and footer |
| Contact map embed url | Map on the contact page |
| Donate UPI id | UPI line on the donate page |
| WhatsApp number | Footer WhatsApp icon (digits with country code) |
| Home stat (identified / rehabilitated / devices / families / health / blood) | The six numbers in the home "Social Impact" cards |

## Ghost general settings

Found under **Settings → General**.

| Setting | Used for |
|---|---|
| Title | Site name (footer, page titles, navbar fallback) |
| Description | Footer tagline |
| Logo | Navbar and footer logo |
| Publication cover | Hero slider background when no hero posts exist |
| Social accounts | Footer social icons. Fill any of X, Facebook, LinkedIn, Bluesky, Threads, Mastodon, TikTok, YouTube, Instagram; unused ones are hidden |

## Listing pages (routes)

Upload `routes.yaml` once under **Settings → Labs → Routes**. It creates these automatically generated listing pages:

| URL | Lists posts tagged | Template |
|---|---|---|
| /blogs/ | blog | blogs |
| /newsletters/ | newsletter | newsletters |
| /annual-reports/ | annual-report | annual-reports |
| /events/ | event | events |

## Pages and templates

Create each page, set its slug, and choose its **Template** under Page settings → Template.

| Page | Template |
|---|---|
| Home | default (also set as the homepage) |
| About | About |
| Programs | Programs |
| Sevadhama | Sevadhama |
| Sabalini | Sabalini |
| Arogyam | Arogyam |
| Impact | Impact |
| Donate | Donate |
| Contact | Contact |
| Get Involved | Get Involved |
| Team | Team |
| Stories | Stories |
| Awards | Awards |
| Legal Status | Legal |
| Enquire | Enquire |

## Navigation

Built under **Settings → Navigation**. A label that starts with a dash `-` becomes a dropdown item under the entry above it.

---

## Home page

Sections from top to bottom:

- **Hero slider** — posts tagged `hero-slider`. Title = heading, Excerpt = subtext, Feature image = background. Facebook title (optional) = button link. With no such posts, a single fallback slide uses the Publication cover.
- **Who We Are** — one post tagged `home-about`. Title = heading; the first line of the body = subtitle; a bullet list in the body = the check-points. Collage images come from the theme settings (About image 1/2/3).
- **Focus cards** — posts tagged `home-focus`. Feature image = background, Title = heading, Excerpt = description, Meta title = small pill label, Meta description = link text, Canonical URL = link destination.
- **Our Programs** — the three program **pages** tagged `home-programs`. Uses each page's Title, Feature image, and Excerpt; links to the page.
- **Social Impact** — six numbers come from theme settings; labels and the district/taluk line are fixed.
- **Testimonials** — posts tagged `home-testimonials`. Title = name, Excerpt = quote, Feature image = photo.
- **Success Stories** — posts tagged `success-stories`, shown as a slider with arrow buttons (auto-rotates). See "Video stories" below.
- **Supporters** — one post tagged `home-partners`; place the logo images in the body.
- **Upcoming Events** — posts tagged `event`; shows the soonest upcoming ones.
- **Gallery** — one post tagged `home-gallery`; place the photos in the body.

## About page

- Hero — Excerpt = subtitle.
- Media block — theme setting "About media url" (YouTube link shows a video, image URL shows an image).
- Vision / Mission / Goal, Core values — fixed layout.
- Our Journey timeline — posts tagged `milestones`. Title = year, Excerpt = description, Feature image = photo. A year with no image keeps the previous photo.
- Where We Serve — map from the theme setting "Serve map".

## Programs page

- Optional intro from the page body.
- Three cards built from the program **pages** tagged `home-programs`.

## Program pages (Sevadhama / Sabalini / Arogyam)

- **About block** — from the page body: first line = heading, second line = paragraph, anything from the third line onward appears in a full-width box after the focus area.
- **Activities / services** — posts tagged `sevadhama-activities` / `sabalini-activities` / `arogyam-activities`.
- **Apply band** — Meta title = heading, Meta description = text, Canonical URL = button link.
- **Impact numbers** — fixed per page.
- **Success stories** — posts tagged `sevadhama-stories` / `sabalini-stories` / `arogyam-stories`.
- **Testimonials** — posts tagged `sevadhama-testimonials` / `sabalini-testimonials` / `arogyam-testimonials`. Title = name, Excerpt = quote, Feature image = photo.
- **Video stories** — posts tagged `sevadhama-video` / `sabalini-video` / `arogyam-video`. Feature image = thumbnail, Title = heading, body = the video plus description text.
- **Gallery** — posts tagged `sevadhama-album` / `sabalini-album` / `arogyam-album` (Title = caption, Feature image = photo), or a Gallery card placed in the page body.
- The Sevadhama "Livelihood" image uses that page's X (Twitter) card image.

## Impact page

- **Stats grid** — add a two-column table (label, number) in the page body to control all numbers in one place. Without a table, a built-in set is shown.
- **Program breakdown** — fixed cards linking to the program pages.
- **Success stories** — posts tagged `success-stories`.

## Donate page

- **Account details** — page body.
- **UPI** — theme setting; **QR code** — page Feature image.
- **Support intro** — page Excerpt.
- Funds cards and the sponsorship table are part of the page layout.

## Contact page

- Address cards, phone, and email come from theme settings.
- Map comes from the theme setting "Contact map embed url".
- Includes a contact form.

## Get Involved page

- Three image cards (Donate / Support / Volunteer) and programme-enquiry links, part of the page layout.

## Team page

- **Leadership** — posts tagged `team-lead`. Feature image = photo; body line 1 = name, line 2 = position, line 3 onward = bio.
- **Everyone else** — add an HTML block in the page body using `team-grid-section` → `team-members-grid` → `team-member-card-vertical`. Add two or more sections plus a `team-category-bar` to turn the groups into tabs.

## Stories page

- **Stories grid** — posts tagged `success-stories`, with search and a category filter (category = the post's first tag).
- **Feedback slider** — posts tagged `feedback`. Title = name, Excerpt = quote, Feature image = photo; a video in the body becomes a video testimonial.

## Awards page

- Add one **Image card** per award in the page body, with the award name as the image caption. They render as a framed two-column grid.

## Blogs / Newsletters / Annual Reports / Events

- Listing pages generated from `routes.yaml` (see "Listing pages" above).
- Newsletter and Annual-report cards show the **first page of the PDF** automatically — add the PDF as a File card in the post body.
- Event posts: put the **event date in the Excerpt as `YYYY-MM-DD`**, the description and photos in the body, and the registration link in the Facebook title field.

## Video stories

Add a video (YouTube embed or uploaded video) to a success-story post's body. A play button then appears on its card; clicking it plays the video in a popup, while the rest of the card opens the full post. The `video-story` tag can also be added to flag these.

---

## How to add content (basics)

### Add a tagged post (used by most sections)
1. **Posts → New post**.
2. Type the **Title**.
3. Open **Post settings** (gear icon, top right):
   - **Tags** — add the tag for the section you want it to appear in (see the tag list above).
   - **Excerpt** — the short line (or the event date, where noted).
   - **Feature image** — the card image/photo.
4. Add the **body** content if the section uses it (story text, video, PDF, photos).
5. Click **Publish**.

To change the order of items in a section, change the posts' **publish dates** (Post settings → Publish date).

### Create a page and assign its template
1. **Pages → New page**.
2. Type the Title.
3. **Page settings → Template** → choose the template (see the Pages and templates table).
4. **Page settings → Page URL** → set the slug.
5. Add body content where the page uses it (program pages, donate, awards, etc.).
6. Publish.

### Set the homepage
Create the Home page, then **Settings → make this page the homepage** (or set it as the front page in Ghost settings).

### Upload the routes file
**Settings → Labs → Routes → Upload routes file** → choose `routes.yaml` from the theme. Needed for /blogs/, /newsletters/, /annual-reports/, /events/. Re-upload it whenever it changes.

### Add a PDF (newsletters, annual reports)
In the post body, click **+ → File**, upload the PDF. The card automatically shows the PDF's first page as the cover. (No feature image needed.)

### Add a video (video stories, program videos, feedback)
In the post body, paste a **YouTube link** on its own line (Ghost turns it into an embed), or use **+ → Video** to upload a video file.

### Add a gallery (home gallery, program gallery)
In the post/page body, use **+ → Gallery** and drop in multiple images.

### Add an image with a caption (Awards page)
In the page body, use **+ → Image**, upload the photo, then click **"Type caption…"** and write the award name. Repeat for each award.

---

## Team page HTML

The leadership cards come from `team-lead` posts. Everyone else is added as one **HTML block** in the Team page body.

1. Edit the Team page. On a new line, click **+ → HTML** (or type `/html`).
2. Paste the block below inside that HTML card.
3. Publish/Update the page.

One group:
```html
<section class="team-grid-section">
  <div class="team-members-grid">
    <div class="team-member-card-vertical">
      <div class="team-member-media"><img src="IMAGE_URL" alt="Name" class="team-member-media-image"></div>
      <div class="team-member-body"><h3 class="team-card-name">Name</h3><p class="team-card-role">Role</p></div>
    </div>
    <!-- repeat the team-member-card-vertical block for each person -->
  </div>
</section>
```

Multiple groups with tabs — add one `team-grid-section` per group (in the order you want the tabs), then one `team-category-bar` with a button per group:
```html
<section class="team-grid-section">
  <div class="team-members-grid">
    <!-- group 1 cards -->
  </div>
</section>
<section class="team-grid-section">
  <div class="team-members-grid">
    <!-- group 2 cards -->
  </div>
</section>

<div class="team-category-bar">
  <div class="team-category-scroll">
    <button type="button" class="team-category-tab active">First Group Name</button>
    <button type="button" class="team-category-tab">Second Group Name</button>
  </div>
</div>
```
Rules: the Nth button shows the Nth section; the button marked `active` shows first; with a single group no tabs appear. Use real image URLs (upload images anywhere in Ghost and copy their address), and keep every tag closed.

---

## Impact page table

The stats grid is built from a **table** in the Impact page body. Ghost has no built-in table, so add it with a **Markdown card** (`+ → Markdown`) or an **HTML card** (`+ → HTML`).

Use **three columns: id, name, number**.
- **id** — chooses the icon. It must match an icon file name in the theme's `assets/impact-icons` folder, without `.svg`.
- **name** — the label shown under the number.
- **number** — the figure shown (you can include commas or `+`, e.g. `13,500+`).

Markdown card example:
```
| id | name | number |
|----|------|--------|
| wheelchair | Wheelchairs Distributed | 438 |
| ambulance | Ambulance Services | 403 |
| blood-units | Units of Blood Collected | 11,399 |
```

Add one row per stat. Remove the table to fall back to the built-in set. If an `id` has no matching icon file, that card simply shows no icon.

Available icon ids: `ambulance`, `blood-donation-camp`, `blood-units`, `diabetic-machines`, `doctors-office`, `grocery-kit`, `home-accessibility`, `hospital-visited`, `livelihood-cases`, `medical-assistance`, `medical-camp`, `medical-intervention`, `medical-kit`, `mobility-aids`, `panchayats-visited`, `rehabilitation`, `rural-women`, `search`, `self-employed`, `serving-health`, `sewing-machine`, `solar-inverter`, `surgical-assistance`, `taluka-covered`, `team`, `walking-stick`, `wheelchair`, `women-empowered`. (To add a new icon, drop an SVG into `assets/impact-icons` and use its file name as the id.)

---

## Field conventions used as links

- **Facebook title** (Post settings → Facebook card) is used as a **link URL**: the hero slide button and the event "Register" button.
- **Meta title / Meta description / Canonical URL** (Post settings → Meta data) fill the label, text, and link of the home focus cards and the program "Apply/Enquire" band.
- **Excerpt** holds the **event date** (`YYYY-MM-DD`) for event posts, and the intro text on the donate page.

## Newly configurable content (no developer needed)

All of the items below have a built-in fallback, so the site keeps showing the current content until you add the source. Numbers and amounts are shown exactly as you type them (commas and a trailing "+" are kept).

### Donate page — sponsorship amounts
Create a post tagged `donate-sponsorship`. In its body add a two-column table: first column = what the donation sponsors, second column = the amount (e.g. `₹2,000`). Each row becomes a row in the sponsorship table on the Donate page.

### Legal Status page
Put a two-column table in the Legal page body itself: first column = the registration type/label, second column = the number/value. Each row becomes a legal card. Leave the body empty to keep the built-in cards.

### About page — statistics
Create a post tagged `about-stats`. In its body add a two-column table (label | value). The label decides where the value goes:
- a label containing **year** → the "Years of service" badge
- a label containing **district** → the "Districts served" stat and the "… districts" heading
- a label containing **benefic** → the "Beneficiaries reached" stat

### About page — Vision, Mission & Goal
Create a post tagged `about-purpose`. In its body write three paragraphs: first = Vision, second = Mission, third = Goal. They fill the three purpose cards in order.

### Arogyam page — impact statistics
Create a post tagged `arogyam-impact`. In its body add a three-column table: `id | name | number`, where `id` matches an icon filename in `assets/impact-icons` (without `.svg`). Works exactly like the Impact page table.

### Per-programme statistics (Sevadhama / Sabalini / Arogyam)
Each programme page has its own "by the numbers" section, driven the same way:
- Sevadhama → post tagged `sevadhama-impact`
- Sabalini → post tagged `sabalini-impact`
- Arogyam → post tagged `arogyam-impact`

In each post's body add a three-column table `id | name | number` (same format and icon system as the Impact page). Until the post exists, the page shows its built-in numbers.

### Programmes (no longer fixed at three)
Programmes are pulled from pages tagged `home-programs`. Add a new page with that tag and it automatically appears on the Home page, Programs page, the Impact page "By Programme" section, and the Get Involved enquiry list — ordered by publish date. Each card links to the page, or to the page's Facebook title (`og_title`) field if you put a URL there.

### Past events
Events are sorted by the date in the post Excerpt (`YYYY-MM-DD`). Once that date is in the past, the "Register" button is automatically hidden on both the events list and the event page, and an "Event Completed" status is shown instead.

### Donate page — "Donate Online" button
The button under the QR code is controlled by the Donate page's Meta data:
- **Meta title** → the button label (e.g. "Donate Online").
- **Canonical URL** → the donation link; it opens in a new tab.

The button only appears when **both** are filled. It behaves like a real button (it does not look like a plain hyperlink and does not reveal the raw URL on hover).

### Enquire page
Create a page tagged/slugged `enquire` with the **Enquire** template. It has a fuller form than Contact (name, phone, email, city, interest, role, message).

On each programme page, the Apply/Enquire band's **first button** is dynamic:
- **Link** → `/enquire/` by default, or the page's **Canonical URL** if set (e.g. an external Google Form).
- **Label** → "Enquire Now" / "Apply Now" by default, or the page's **Meta title** if set.

The band's **second button** is a **Donate** button linking to `/donate/`. The Get Involved Support / Volunteer buttons also point to the enquire page (you can deep-link with `?for=` to preselect the interest, e.g. `/enquire/?for=Volunteer`).

### Newsletter subscribe
The **Subscribe to newsletter** button (Newsletters and Annual Reports pages) opens a popup with a Ghost members email form. On the **home page**, first-time visitors who are not already subscribed see this popup once (after a short delay). This uses Ghost's built-in Members feature — enable it under **Settings → Membership**, and set up your newsletter under **Settings → Email newsletter**.
