# Dashboard checkpoint — 15 November 2026
- Admin: Karina Whiplash background, frosted panels, collection totals, search, draft filters, full card editor, image replacement, live preview, deletion, publication controls.
- Removed era, year and source from the admin form. Existing metadata retained; year and source are nullable.
- Restored eight original bundled photos as editable database records. Original main Karina card is published; other originals are drafts awaiting owner selection.
- Public layout retained. Gallery supports both original bundled files and private Storage signed URLs.
- OpeningReveal uses Framer Motion: central eight-spoke star fades in, moves for 0.7 seconds to the measured navbar logo, then a 0.85 second circular reveal expands from that exact position. Image and font readiness are awaited without artificial loading holds. Reduced motion bypasses the sequence. Browser checks verified zero-pixel handoff error at 1440px, removal of the completed mask, and reduced-motion bypass at mobile width.
- Opening animation runs only on /admin. The public website opens directly.
- Removed the public era selector and archive-year label. Artist filtering remains available.
- Reference videos inspected visually from 0.4-second contact sheets and 0.2-second enlarged opening frames. First reference: dot at approximately 2.6s, expanding circular reveal through 3.2s, fully revealed near 3.4s. Second: image background visible through blurred translucent panels with fine light borders; content fades into panels over roughly 0.8–1.2s. Easing is approximated from frames.
- QA: production build; browser mocked-auth editor preview and save-payload check; mobile overflow check; no browser JS errors in that check. Actual upload/auth roundtrip still needs owner use. No measured guarantee of 60 FPS; performance depends on device and blur compositing.
- Next: owner reviews dashboard, tests one real upload/replacement. No deployment authorized.


- Website displays: separate Hero slides and Wallpaper Studio sidebar pages, sharing the real public components for live previews. Images and all featured copy/card copy are editable, with unsaved-navigation protection.
- Hero slides: unlimited add/reorder/remove/enable controls; total derives from enabled slides (five => 01/05). Timed rotation, previous/next and pause; pauses on hover/focus, hidden tabs and reduced motion. Interval configurable 3-30 seconds.
- Studio display: editable desktop/phone photos, heading/body/button/note, device captions, clock and date.
- Persistence: migration 0004 applied to Supabase; public site_content reads and site-media photos, admin-only writes. Images upload on Save, retaining original quality. Existing saved files remain available to avoid breaking shared references.
- Validation: production build and Chrome browser checks with mocked auth/API: fifth slide, image-upload payload, public content propagation, disable => 04, autoplay, unsaved guard, mobile overflow, zero JS errors. Real owner upload remains to be exercised. No deployment.
