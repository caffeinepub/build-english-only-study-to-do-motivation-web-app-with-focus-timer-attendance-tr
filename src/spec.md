# Specification

## Summary
**Goal:** Rebrand the existing study/to-do app to “Maleeha Focus” for a Pharm-D student, with updated categories, a dedicated “For Maleeha 🌸” experience, refreshed quotes, and an iOS-style theme/typography—while keeping existing core features working offline.

**Planned changes:**
- Update all user-facing naming/copy to “Maleeha Focus” (English only), including browser title and PWA manifest metadata.
- Replace task categories with: “Pharm-D Study”, “Personal”, “Health & Routine”, “For Maleeha”, including Pharm-D Study subjects and working category selection/filtering (with safe handling of older stored categories).
- Implement the “For Maleeha 🌸” category behavior: quick-add presets (3 exact tasks), flower completion indicator for this category only, and a soft pastel accent applied only within this category’s UI elements.
- Update the daily quote generator to use exactly the provided 20 “from Chotu” quotes (verbatim), with manual refresh and existing daily persistence behavior.
- Apply the requested iOS-style color palette across light/dark mode, update category tint styling, and keep theme meta/manifest values consistent.
- Update typography: iOS system-style font for general UI and a soft handwritten style for quote text.
- Ensure Home layout matches: today’s date at top, quote card near top, category cards in the middle, and a bottom floating add button that opens task creation.
- Preserve existing task CRUD and local/offline persistence.
- Keep the focus system at 45 minutes + short break, with iOS-style progress ring animation and in-app distraction reduction (no OS-level DND claims).
- Update Attendance Tracker wording for Pharm-D context while preserving subject management, present/absent marking, percentage calculations, and monthly calendar view.
- Add a Settings (or About) section that displays the provided App Store description verbatim in English.

**User-visible outcome:** The app appears as “Maleeha Focus” with updated Pharm-D categories/subjects, a special “For Maleeha 🌸” section with preset encouragement tasks and flower completion styling, refreshed daily quotes from Chotu, an iOS-like theme (light/dark), and the same offline-capable tasks, focus timer, and attendance tracking features.
