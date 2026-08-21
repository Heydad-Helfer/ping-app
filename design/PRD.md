**Role & Project:**
Design a minimalist, mobile-first Progressive Web App (PWA) called "Ping". It is a private, two-player household note and task queue (used by a couple). The UI should feel like a native iOS/Android utility app, not a traditional website. 

**Dualities to Address (CRITICAL):**
1. **Language & Direction (He/Eng):** The design must support both English (LTR) and Hebrew (RTL). Layouts must use logical properties (start/end instead of left/right) so the entire UI mirrors perfectly when the language flips. 
2. **Platform (App vs. Web):** The primary view is mobile (PWA installed on the home screen). It needs large touch targets, a sticky bottom layout, and safe-area padding. It should also scale gracefully to a centered, max-width container on desktop web browsers.

**Core Views & Components (using shadcn/ui visual language):**

1. **The Main Feed:**
   - **Header:** Sticky top header with the app title, a Dark/Light mode toggle, a He/En toggle, and a Clerk user profile button.
   - **Filter Bar:** A horizontal, scrollable row of pill-shaped toggle chips immediately below the header. Chips include: "My Private Notes", Priorities ("Urgent", "Idea", "Routine"), and dynamic tags (e.g., "Groceries", "Medical").
   - **Note Cards:** The feed consists of stacked cards. Each card must display:
     - The author's small avatar (to see who wrote it).
     - The note text.
     - A small visual badge for Priority.
     - Pill outlines for associated tags.
     - An optional target date/deadline.
     - A subtle "Resolve/Archive" checkbox or swipe-to-dismiss action.
   - **Floating Action Button (FAB):** A highly prominent, sticky FAB in the bottom-corner (bottom-right for LTR, bottom-left for RTL) for adding a new note.

2. **Add/Edit Note Drawer (Bottom Sheet):**
   - When the FAB is tapped, a bottom sheet slides up (on mobile) or a standard modal opens (on desktop).
   - Contains a multi-line textarea, a toggle for "Private" (hidden from the other player), segmented controls for Priority, an input for tags, and an optional date picker. 

**Aesthetic Vibe:**
Clean, utilitarian, high-contrast, and fast. Support both a crisp Light Mode and a deep Dark Mode. Do not overcomplicate the colors; use semantic UI colors (e.g., Red for Urgent, Gray for Routine).