# Idaho Software Development — shop redesign

Date: 2026-09-28
Status: approved in conversation, pending spec review
Replaces: the current marketing site in `src/app/page.tsx`, `src/app/services/page.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, and `src/components/ContactForm.tsx`

## Purpose

Win clients for Idaho Software Development. The site should read as a shop a business hires. The voice is "we" throughout the marketing page. Erik Short appears once, in small type, as founder.

Two offers. Custom software leads. Websites are a second, shorter offer.

## Decisions locked

- One marketing page, structured as a front room: a fixed studio panel and a scrolling document. This is the chosen approach ("the practice page"), expressed as a full redesign rather than a restyle of the old scroll.
- Audience: businesses that need custom software, with a clearly scoped website offer beside it.
- Proof is shipped work the shop can name, plus the two client quotes. Vander Woude Enterprises and The GMN Group stay verbatim. Other names are real products and sites already on the public web, or DugoutIQ, which has no public URL yet. Screenshots are added only when a real one is supplied. No delivery date.
- Project inquiries go to `admin@idsoftwaredev.com`. `support@idsoftwaredev.com` stays where it already appears, on the terms page and the SMS page. The privacy page's "contact us" line is not given a new address in this pass.
- The project form does not collect a phone number.
- `/sms-signup`, `/privacy-policy`, and `/terms-of-service` are the Twilio A2P 10DLC compliance set. Paths, public access, and the words on those pages stay. See the compliance section.
- No price and no timeline on the page.
- No street address and no phone number, because none was supplied. Do not invent them.

## What gets thrown out

The current homepage sequence (centered headline, three icon cards, numbered process, biography, testimonial grid, card form). The services page of three gray boxes. Inter, gray bands, Lucide service icons, fade-in-up, and hover-lift cards. The header that hides its links on a phone.

The logo file `public/logo.png` stays. It is the mountain mark plus the wordmark, teal `#4890A0` on transparency.

## Information architecture

| URL | Behavior |
| --- | --- |
| `/` | The shop. Panel plus Work, Capabilities, and Start a project. |
| `/services` | Redirects to `/#capabilities`. The route must not 404. |
| `/sms-signup` | Same opt-in form and the same words. Restyled only. HTTP 200. No redirect. |
| `/privacy-policy` | Same words. Restyled only. HTTP 200. No redirect. |
| `/terms-of-service` | Same words. Restyled only. HTTP 200. No redirect. |

Anchors on `/`: `#work`, `#capabilities`, `#start`.

A redirect to a hash is done from the services page with a client navigation to `/#capabilities`, not a server `Location` that drops the hash.

Every page, including the three compliance pages, uses the same studio frame so the shop and the compliance links are present everywhere.

## The frame

Desktop, from 768px up: a fixed left panel, full viewport height, 340px wide, paper background. The right column scrolls.

Panel contents, top to bottom:

1. `logo.png` at 120px tall, so the mark and the wordmark in the file can be read. The company name is not repeated as a second wordmark under the image.
2. The offer, set in Newsreader: "Custom software for businesses that have outgrown their tools."
3. Vertical navigation: Work, Capabilities, Start a project. Each link scrolls to its anchor. The item for the section in view is marked with an underline in ink.
4. At the bottom, in small Public Sans: "Erik Short, Founder · Treasure Valley", a mailto link to `admin@idsoftwaredev.com`, then SMS opt-in (`/sms-signup`), Privacy (`/privacy-policy`), and Terms (`/terms-of-service`). The copyright line sits under those links.

Mobile, under 768px: a sticky top bar with the logo at 40px tall, the name "Idaho Software Development" set in Public Sans beside it (the wordmark inside the small image is not readable), and a menu button. The offer sentence is the first line of the scrolling page, above Work. The menu is a full-screen list of the three nav items plus SMS opt-in, Privacy, and Terms. Focus moves into the menu when it opens and returns to the button when it closes. Escape closes it.

The panel and the top bar stay available on the compliance pages. Those pages render their document in the scrolling column.

## The scrolling page

Three parts. No separate hero, process diagram, biography, or testimonial grid.

### Work (`#work`)

Paper background. An index, then the two quotes. No full-viewport panels. No stock images, invented screenshots, or icons.

Intro: "Software the shop has running, sites we have published, and programs people install. Where the work is behind a sign-in, the link is the door. Ask us and we will set up a trial."

Two groups, each a label and a list. Every row is a Newsreader name, one sentence, and a link where a public URL exists. Links are the real domain, underlined, deep teal `#245E6C`. External links open in a new tab.

Systems:

| Name | Link | Sentence |
| --- | --- | --- |
| GBC Tools | https://www.gbctools.com | AI vision on the cameras, counting, a report center, and scheduling for church staff. The link opens the sign-in. |
| Job Workflow Pro | https://www.jobworkflowpro.com, App Store, Play Store | Jobs, costing, and scheduling for restoration crews, and a mobile app for people in the field. |
| UmpCrew | https://umpcrew.com, App Store, Play Store | Scheduling for umpire crews in baseball and softball. |
| Mold Detector AI | https://www.molddetectorai.com | A photo is read for mold, and a qualified lead goes to a restoration company. |
| Camp HQ | https://hq.camp | Check-in, attendance, and the staff tools for a week of camp. |
| 5min.bible | https://5min.bible | A daily Bible habit. |
| Spiritual Growth Eval | https://www.spiritualgrowtheval.com | Assessments a ministry uses with its people. |
| DugoutIQ | none | Pitch tracking and game charting for softball and baseball coaches, on iPad. |
| TenkeyBridge | https://tenkeybridge.com | A Windows program, with a cloud gateway, so QuickBooks Desktop can answer in the shape of QuickBooks Online. |

Job Workflow Pro and UmpCrew each show a live App Store link and a live Play Store link, with no UTM parameters. Mold Detector AI and 5min.bible keep `PENDING_` hrefs in code and do not render those links until the four URLs replace them. See Later.

Websites:

| Name | Link | Sentence |
| --- | --- | --- |
| Ridgeline Integrated Systems | https://ridgelineintegrated.com | The website for a commercial cameras, cabling, and AV company in the Treasure Valley. |
| High Desert Dairy Lab | https://www.hddairylab.com | The website for the lab, and the system the lab runs. Customers and staff sign in. |
| Legacy Feed and Fuel | https://www.legacyfeed.com | The website for the feed and fuel business. |

Clients, after the index. Quotes stay verbatim and at least 24px. They are not full-viewport.

- Vander Woude Enterprises, paper, ink text. Attribution: Simon Vander Woude, Vander Woude Enterprises. Quote: "Erik has been an invaluable technology partner. He's built several custom applications for my businesses, and each time he's delivered a rock-solid product that fits our unique needs perfectly. He's great at understanding the business goals behind the software."
- The GMN Group, background `#161816`, text `#f3efe6`. The quote is `#4890A0`. Attribution: Mike Gugino, The GMN Group. Quote: "We came to Erik with a complex idea for a health and safety application, and he has been crushing it. His attention to detail and commitment to getting things right are exactly what you need for a project this critical. We're excited to continue our work with him."

Blog-engine is not a row. It is the generator for a future `/blog` on this site. That pass waits until `blog-engine` has an `idsoftwaredev` config and a `ben_` token. This page does not publish an empty blog.

### Capabilities (`#capabilities`)

A scope sheet on paper. Two rows separated by a 1px rule `#cfc6b8`. Custom software has more room than websites. On desktop the software row is the primary block; the website row follows and is shorter. On mobile they stack.

Custom software. Internal tools, customer portals, and other systems a business runs on. SMS when the operation needs it, set up to carrier rules. A project starts as a written scope, ends as a system in use, and includes the shop after launch.

Websites. A marketing site for a business that needs to be found and taken seriously. Services sites, portfolios, and online stores. Designed and built, then handed over ready to use.

The SMS sentence in Capabilities describes a service the shop delivers for clients. It is not the shop's own opt-in program. The opt-in program lives only on `/sms-signup`.

### Start a project (`#start`)

Paper background. Intro: "Tell us what the business needs. If you want a trial of something already in use, say which one. We reply at the email you give us."

Fields, each with a visible label (placeholders may repeat the hint, but the label is on screen):

| Field | Control | Required |
| --- | --- | --- |
| Name | text | yes |
| Email | email | yes |
| Company | text | yes |
| What do you need | select: Custom software, A website, Not sure yet | yes |
| Message | textarea | yes |

A hidden honeypot field is included. If it is filled, the server returns the success response and does not send mail.

Button label: Send the brief.

Success: "Received. We'll reply at the email you gave us."
Failure, including a missing mail configuration: "Send it directly to admin@idsoftwaredev.com." The address is a mailto link.

The form does not claim success when the message was not sent.

## Visual system

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f3efe6` | Page background, light panels, form |
| Ink | `#141614` | Text, rules' partner, nav underline |
| Rule | `#cfc6b8` | Hairlines between rows |
| Night | `#161816` | GMN project panel |
| Paper text | `#f3efe6` | Text on the night panel |
| Mark teal | `#4890A0` | Logo and the GMN quote only |
| Deep teal | `#245E6C` | Buttons with white label, focus ring |

Body links are ink with an underline. Mark teal on paper is about 3:1 and is not used for small text or links.

Type:

- Newsreader (Google font, via `next/font`) for the offer sentence, project titles, and quotes.
- Public Sans (Google font, via `next/font`) for navigation, labels, body, form, and legal text.

Labels on the scope sheet and project panels are 12px, uppercase, tracked out, Public Sans. Body is 17–18px with a measure around 62ch. Buttons are deep teal, white label, no shadow, no scale on hover. Hover and active states change color only. Focus is a 2px `#245E6C` outline with 2px offset, visible on every control and link.

Motion: no entrance animation, no hover lift. Anchor scrolling may be smooth. `prefers-reduced-motion: reduce` uses instant jumps and disables any remaining transition.

## Contact data flow

There is no mail sender in the repo today. Add Resend.

- Server Action on the project form, in a server-only module.
- Environment variables: `RESEND_API_KEY` and `CONTACT_FROM`. `CONTACT_FROM` must be a Resend-verified sender on `idsoftwaredev.com`. The recipient is `admin@idsoftwaredev.com`.
- The from-address is not invented at runtime beyond the env var. If `RESEND_API_KEY` or `CONTACT_FROM` is missing, the action returns failure and the form shows the mailto fallback.
- The message body includes name, email, company, the selected need, and the message. Reply-To is the visitor's email.
- Server-side validation mirrors the required fields and checks that the email contains a domain. Invalid input returns field errors. A Resend error returns the same visitor-facing failure sentence, and the server logs the underlying error.
- No phone field, so this form is not a second SMS opt-in.

`.env` files are not committed. `.env.example` lists the two variables with empty values.

## A2P 10DLC compliance surface

These pages exist so Twilio and the carriers can review Idaho Software Development's own messaging program. They are not a marketing feature and they are not a demo of the SMS service sold to clients.

Preserve all of the following:

- Paths `/sms-signup`, `/privacy-policy`, `/terms-of-service` respond 200 to an anonymous visitor. No auth, no noindex, no redirect.
- The business name "Idaho Software Development" stays consistent in the logo, the panel, the copyright line, the form disclosures, and the legal pages.
- `/sms-signup` keeps both checkboxes, both unchecked by default, and the submit button stays disabled until at least one is checked. That matches a page whose only purpose is opt-in.
- Disclosure text stays character for character, including the marketing consent (frequency, message and data rates, HELP, STOP) and the non-marketing consent (order updates and appointment reminders, message and data rates). Terms and Privacy links stay immediately beside that copy and still point at `/terms-of-service` and `/privacy-policy`.
- The SMS page's existing client-side submit behavior stays: it does not call Twilio. This pass does not wire delivery and does not rewrite the success sentence.
- Privacy policy and terms body copy stay character for character, including the SMS program sections. Styling may change so they sit in the scrolling column and use Public Sans. Disclosure text on the opt-in form is at least 14px and ink-colored, not gray on gray.
- Checkboxes render as checkboxes.

Known mismatch, deliberately left alone because this pass does not tweak compliance copy: the terms and privacy policy describe non-promotional project updates, while the form also offers marketing consent. Aligning those is a later, deliberate edit, not part of this redesign.

Also deferred: adding the stricter non-sharing sentence ("mobile information will not be shared with third parties or affiliates for marketing or promotional purposes" and "text messaging originator opt-in data and consent will not be shared with any third parties") and adding `support@idsoftwaredev.com` to the privacy contact line. The current policy already says the shop does not sell, rent, or share phone numbers for third-party marketing and names Twilio as the delivery provider.

## Components

| Unit | Responsibility |
| --- | --- |
| `StudioFrame` | Panel, mobile bar, menu, compliance links, founder line. Wraps every page. |
| Home page | Work, Capabilities, Start a project. Copy lives here, not in a CMS. |
| `ProjectForm` | Client form, field errors, success and failure. Calls the server action. |
| `sendProjectInquiry` | Server-only. Validates, honeypot, Resend, mapped errors. |
| `SmsOptInForm` | Existing behavior. Visual update only. Words unchanged. |
| Legal pages | Existing copy. Wrapped in `StudioFrame`. |
| Services page | Client redirect to `/#capabilities`. |

`Header` and `Footer` are removed once `StudioFrame` covers their jobs. The copyright line moves to the bottom of the panel and to the bottom of the mobile document.

## Error handling

| Case | Visitor sees |
| --- | --- |
| Empty required field or bad email | The field's label and an error under that field. The button does not pretend to send. |
| Honeypot filled | The success sentence. No email. |
| Missing Resend env | The failure sentence with the mailto link. |
| Resend rejects the message | The same failure sentence. Server logs the reason. |
| SMS form submitted as today | Whatever the current component already shows. Unchanged. |

## Verification

The repo has no test runner. Do not add one for this pass. Verify by:

1. `npm run build` succeeds.
2. Desktop: panel stays fixed while Work, Capabilities, and the form scroll. The active nav item follows the section.
3. Mobile width: menu opens, links reach all three sections and the three compliance pages, menu traps focus, Escape closes it.
4. Project form with env missing shows the failure mailto. With env present, a submission arrives at `admin@idsoftwaredev.com` and the success sentence shows. A filled honeypot does not send.
5. `/services` lands on `/#capabilities`.
6. `/sms-signup`, `/privacy-policy`, and `/terms-of-service` return the same words as before this change. Diff the visible strings.
7. The project form has no phone input.
8. Keyboard: every panel link, compliance link, field, and button shows the focus ring. Buttons and links meet contrast as specified.
9. `prefers-reduced-motion: reduce` does not animate scroll or hover transforms.

## Later

Store links still to add, when Erik sends the URLs. Do not render a store link while its href contains `PENDING_`.

- Mold Detector AI — App Store
- Mold Detector AI — Play Store
- 5min.bible — App Store
- 5min.bible — Play Store

## Out of scope

- Wiring `/sms-signup` to Twilio or storing subscribers.
- Editing privacy, terms, or SMS disclosure copy.
- Publishing a street address, phone number, prices, or timelines.
- Screenshots, or clients beyond Vander Woude Enterprises and The GMN Group.
- A team page, a dark-mode toggle, or a second marketing page.
- `/blog` routes before blog-engine has an idsoftwaredev config and token.
- Replacing `logo.png`.
