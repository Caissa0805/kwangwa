# KWANGYA - working plan

## Product
Next direction: replace agent-curated catalog updates with a private admin area where the owner uploads, describes, publishes and removes wallpaper cards. Supabase Auth identifies the admin, Postgres stores metadata, and Storage holds originals. The public gallery reads only published records. Do not deploy this work until the user asks.
Independent K-pop wallpaper archive focused on aespa, with Karina as the hero. First delivery is an interactive overview. No checkout, pricing, accounts or commerce. User will steer further features after reviewing.

## Current architecture
- React + Vite static deployment, no server required.
- src/catalog.js is the single source of truth for images, artists, groups, crop focal positions and original source links.
- App.jsx owns filters, search, favorites and page sections. Favorites persist locally under kwangya-saved.
- WallpaperStudio.jsx owns canvas composition, phone/desktop presets, fill/full-photo modes, zoom, position, local upload and JPEG export. The clock is preview-only.
- Atmosphere.jsx isolates optional WebGL. Content and editing must work when WebGL fails.
- styles.css owns the token palette, typography, grid and responsive rules.

## Reuse rules for subsequent requests
1. Read this file and DESIGN.md first; inspect only relevant modules.
2. Add artists/images to catalog; do not duplicate gallery or editor components.
3. Add output formats to presets in WallpaperStudio. Export and preview share the same canvas.
4. Preserve image source metadata. Do not claim resized images gain detail or that source photos are licensed for commercial resale.
5. Keep downloads free until the user explicitly changes scope.
6. Record changed decisions and completed features here, then build and verify the affected interaction once.

## Initial deliverable
- Animated Karina hero, group navigation, responsive gallery.
- Artist and orientation filters, search, saved favorites with empty states.
- Phone 1080x1920 / desktop 1920x1080 editor and downloadable composition.
- Upload local JPG/PNG/WebP. No upload leaves the browser.
- Reduced-motion support, keyboard-accessible native dialog, fallback scene.

## Deferred until user feedback
User accounts, cloud favorites, image ingestion pipeline, moderation, commercial licensing workflow, artist pages, custom output sizes, AI outpainting and any paid downloads.

## Requested resource decisions
Taste + Impeccable: reviewed design guidance; photography, authored entrance, coherent typography, responsive QA. User's explicit motion/glass brief governs aesthetic decisions.
Awesome DESIGN.md: consulted Apple photography-first layout principles; original aespa-inspired palette and composition.
img2threejs: reserved for future reference-object reconstruction, not applied to Karina's face or human likeness.
react-three-fiber + ShaderGradient: optional hero atmosphere, isolated from gallery/editor.
liquid-glass.js: assess browser support before using effects; retain functional CSS glass fallback.
Playwright CLI: browser verification where supported. Report any runtime limitations honestly.

## Reference
https://yujiverse.gumroad.com/l/jgcsp - Winter wallpaper pack, multiple screen aspect ratios. Used as a product reference, not copied or purchased.

## Verification and implementation notes
- Eight real, locally stored photos connected; individual source URLs in catalog.
- Playwright CLI verified artist filter, all images loaded, saved toggle, desktop export and mobile overflow.
- ShaderGradient + react-three-fiber live, three pinned to 0.170.0 for shader compatibility. Hero scene suspends offscreen and when motion is paused.
- Liquid Glass JS reviewed; full-page capture dependency unsuitable for this photo/canvas preview. Current floating card uses CSS backdrop glass. img2threejs is not used because no object reconstruction was requested.
- Original image rights are not represented as cleared. No paid commerce.

## Image quality and catalog requirements - November 14, 2026
- Use the highest-resolution authentic originals available. Never label resized/upscaled output as native 4K. Prefer sources supporting 1080x1920 phone or 1920x1080 desktop after crop; native 4K requires 3840x2160 useful source detail. Record original width/height and show when enlargement is needed. No generative face enhancement.
- All gallery photos must be verifiably from 2023-2026. Keep page provenance and year, and remove older images.
- Required individual artist coverage: Jang Wonyoung, Karina, Winter, An Yujin, Kim Chaewon, Sakura Miyawaki, Sullyoon, Hanni, Yuna, Haerin, Danielle, Ningning, Kazuha, Yuqi, Soyeon, Ryujin, Rei, Minnie, Hyein, Minji, Giselle, Yena, Yeji, Haewon, Liz.
- Karina photos are restricted to these user-approved eras: Drama; Supernova / Armageddon; Hot Mess; Whiplash; Dirty Work; Rich Man; WDA / LEMONADE; KISS N TELL. A name in this allowlist does not verify an actual release/photo: source-check each asset before adding it. Do not silently substitute another era.
- Preserve source links and local asset provenance. Quality and date requirements apply to future additions as well.