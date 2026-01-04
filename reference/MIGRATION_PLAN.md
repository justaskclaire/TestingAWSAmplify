Let me dive deeper into both repositories to understand the full functionality and structure. Now I have a comprehensive understanding of both repositories. Let me compile a detailed migration todo list for you. 

---

# 🚀 Migration Plan:  Nail Polish Inventory → Next. js + AWS Amplify

## Executive Summary

**Goal:** Translate the functionality from `NailPolishInventory` (static HTML/CSS/JS + CSV) to a new Next.js application with AWS Amplify backend (similar to `TestingAWSAmplify`).

**Source App:** Static site with CSV-driven gallery, localStorage personalization, color/finish filters  
**Target App:** Next.js 14 + TypeScript + AWS Amplify Gen2 (DynamoDB + Auth)

---

## 📊 Current Application Analysis

### NailPolishInventory Features to Migrate
| Feature | Current Implementation | Priority |
|---------|----------------------|----------|
| Polish Gallery | CSV → JS dynamic cards | P0 (Core) |
| Color Filtering (11 categories) | Client-side JS, OR logic | P0 |
| Finish Filtering (6 categories) | Client-side JS with animations | P0 |
| Multi-filter Logic | AND between categories, OR within | P0 |
| Favorites (Heart) | localStorage | P1 |
| Next Appointment (Calendar) | localStorage | P1 |
| "My Picks" Filters | localStorage + client filter | P1 |
| Local Images (60 polishes) | `/public/images/` folder | P0 |
| Design System (CSS Variables) | Custom properties, Inter + Playfair fonts | P0 |
| Privacy Policy | Standalone HTML page | P2 |
| Responsive Grid Layout | CSS Grid auto-fill | P0 |
| Card Hover Effects | CSS transitions + transforms | P1 |

### TestingAWSAmplify Template Structure
```
├── amplify/
│   ├── auth/resource.ts        # Cognito auth config
│   ├── data/resource.ts        # DynamoDB schema
│   └── backend. ts              # Amplify backend definition
├── app/
│   ├── page.tsx                # Main page component
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── app.css                 # App-specific styles
├── package.json                # Dependencies
└── amplify.yml                 # Build config
```

---

## 📋 PHASE 0: Repository Setup (You)
> **Duration:** 15-30 minutes | **No Claude needed**

### Task 0. 1: Create New Repository
- [ ] Create new GitHub repository from the same AWS Amplify Gen2 Next.js template
- [ ] Suggested name: `StudioClairePolishes` or `NailPolishGallery`
- [ ] Clone locally and verify `npm install && npm run dev` works

### Task 0.2: Connect to AWS Amplify
- [ ] Connect repository to AWS Amplify Console
- [ ] Verify sandbox deployment works
- [ ] Note your Amplify app ID and region

### Task 0.3: Prepare Assets
- [ ] Download/copy all 60 polish images from `NailPolishInventory/public/images/`
- [ ] Export `polishes.csv` data for reference

---

## 📋 PHASE 1: Data Layer Setup
> **Duration:** 1-2 hours | **Claude executes each sub-task**

### Task 1.1: Define Amplify Data Schema
**File:** `amplify/data/resource.ts`

**Business Context:**
- Each polish has:  Brand, Number, Name, Link, ImageAddress, LocalImage, Color(s), Finish
- Number is NOT unique (duplicates exist) - use composite key
- Colors can be multi-value (comma-separated)
- Finishes:  Cream, Shimmer, Cat Eye, Mood Change, Sheer, Glitter

**Technical Requirements:**
```typescript
// Schema should define:
// 1. Polish model with all fields
// 2. UserPreference model for favorites/nextappt (per-user)
// 3. Authorization rules (public read for polishes, user-owned for preferences)
```

**Acceptance Criteria:**
- [ ] Polish model with all 8 fields from CSV
- [ ] Unique ID field (auto-generated)
- [ ] Color field supports array/list type
- [ ] Finish field is string enum
- [ ] UserPreference model links user to polish IDs
- [ ] Public API key read access for polishes
- [ ] Schema compiles without errors

---

### Task 1.2: Seed Database with Polish Data
**Context:** Need to import 60 polishes from CSV into DynamoDB

**Technical Requirements:**
- Create a seed script or use Amplify sandbox to insert data
- Parse CSV and create Polish records
- Handle multi-color values (split on comma)
- Verify all 60 records exist

**Files to Create/Modify:**
- `scripts/seed-polishes.ts` (new)
- OR use Amplify Data Studio

**Acceptance Criteria:**
- [ ] All 60 polishes in database
- [ ] Colors properly split into arrays
- [ ] LocalImage paths point to `/images/` folder
- [ ] Can query polishes via Amplify client

---

### Task 1.3: Copy Image Assets
**Technical Requirements:**
- Copy all images from source repo to `public/images/`
- Maintain exact filenames (referenced in database)
- Verify images load in browser

**Acceptance Criteria:**
- [ ] 60 images in `public/images/`
- [ ] Images accessible at `/images/{filename}`
- [ ] No broken image references

---

## 📋 PHASE 2: Core UI Components
> **Duration:** 2-3 hours | **Claude executes each sub-task**

### Task 2.1: Design System Setup
**Files:** `app/globals.css`, `app/design-tokens. css` (new)

**Business Context:**
- Brand:  "Studio Claire" - elegant nail salon aesthetic
- Colors: Rose gold primary, soft lavender accent, neutral grays
- Typography: Inter (body) + Playfair Display (headings)
- Feel: Professional, feminine, modern

**Technical Requirements:**
Extract and adapt CSS custom properties from source `index.html`:
```css
/* Transfer all : root variables */
/* Colors, spacing, typography, shadows, transitions */
/* Border radius values */
```

**Acceptance Criteria:**
- [ ] All CSS variables defined in globals.css
- [ ] Google Fonts loaded (Inter + Playfair Display)
- [ ] Dark/light considerations (optional)
- [ ] Variables match source design system exactly

---

### Task 2.2: Layout Component
**File:** `app/layout.tsx`

**Technical Requirements:**
- Root layout with metadata (title, description)
- Font loading configuration
- Amplify configuration wrapper
- Basic semantic structure

**Acceptance Criteria:**
- [ ] Proper meta tags for SEO
- [ ] Fonts loaded correctly
- [ ] Amplify configured on client
- [ ] Consistent page structure

---

### Task 2.3: Navigation Header Component
**File:** `app/components/NavHeader.tsx` (new)

**Business Context:**
- Brand name "Studio Claire" top-left
- Navigation links (Polishes active, others disabled/coming soon)
- Future links:  Charms, Stickers, Accessories

**Technical Requirements:**
- Responsive header component
- Active state styling
- Disabled state for future pages
- Match source styling exactly

**Acceptance Criteria:**
- [ ] Header renders with brand name
- [ ] Nav links styled correctly
- [ ] Active/disabled states work
- [ ] Responsive on mobile

---

### Task 2.4: Polish Card Component
**File:** `app/components/PolishCard.tsx` (new)

**Business Context:**
- Each card shows: image, polish number badge, polish name
- Click navigates to external product link
- Hover effects:  lift, shadow, image zoom

**Technical Requirements:**
```typescript
interface PolishCardProps {
  id: string;
  number: string;
  name: string;
  imageUrl: string;
  productLink: string;
  colors: string[];
  finish: string;
  isFavorite?:  boolean;
  isNextAppt?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onNextApptToggle?: (id: string) => void;
}
```

**Acceptance Criteria:**
- [ ] Card renders all polish info
- [ ] Image lazy loading enabled
- [ ] Hover effects match source
- [ ] External link opens in new tab
- [ ] Responsive sizing

---

### Task 2.5: Card Grid Layout
**File:** `app/components/PolishGrid.tsx` (new)

**Technical Requirements:**
- CSS Grid with auto-fill columns
- Min 170px, max 1fr per card
- Gap spacing matches design system
- Empty state handling

**Acceptance Criteria:**
- [ ] Grid renders with proper spacing
- [ ] Responsive column count
- [ ] Empty state message when no results
- [ ] Smooth layout transitions

---

## 📋 PHASE 3:  Filtering System
> **Duration:** 2-3 hours | **Claude executes each sub-task**

### Task 3.1: Filter Bar Container
**File:** `app/components/FilterBar.tsx` (new)

**Business Context:**
- Three filter sections: My Picks, Color Family, Finish Type
- Clear All Filters button
- Filters stack vertically on mobile

**Technical Requirements:**
- Container component for all filter groups
- Clear filters functionality
- Active filter count display
- Responsive layout

**Acceptance Criteria:**
- [ ] Filter bar renders all sections
- [ ] Clear button resets all filters
- [ ] Responsive stacking on mobile
- [ ] Visual separation between sections

---

### Task 3.2: Color Filter Chips
**File:** `app/components/ColorFilter.tsx` (new)

**Business Context:**
11 color categories with specific colors:
- Red (#dc2626), Pink (#ec4899), Orange (#f97316), Yellow (#eab308)
- Green (#22c55e), Blue (#3b82f6), Purple (#a855f7), Brown (#92400e)
- Neutral (#a3a3a3), Grey (#6b7280), Gold (#d4af37)

**Technical Requirements:**
- Checkbox-style multi-select
- Color-coded chips matching the color name
- OR logic within (any selected color matches)
- Active state styling

**Acceptance Criteria:**
- [ ] All 11 colors rendered
- [ ] Chips show actual color
- [ ] Multi-select works
- [ ] Active state visible

---

### Task 3.3: Finish Filter Chips
**File:** `app/components/FinishFilter.tsx` (new)

**Business Context:**
6 finish types with animated visual effects:
- Cream:  Subtle gradient
- Shimmer: Pulsing shine animation
- Cat Eye: Diagonal magnetic stripe animation
- Mood Change: Color-cycling animation
- Sheer: Semi-transparent effect
- Glitter: Sparkle particle animation

**Technical Requirements:**
- Checkbox-style multi-select
- Animated icons/badges per finish type
- Match source CSS animations exactly

**Acceptance Criteria:**
- [ ] All 6 finishes rendered
- [ ] Animations match source
- [ ] Multi-select works
- [ ] Performance acceptable (no jank)

---

### Task 3.4: Filter Logic Hook
**File:** `app/hooks/usePolishFilters.ts` (new)

**Technical Requirements:**
```typescript
// Filter logic: 
// (matchesColor OR noColorSelected) 
// AND (matchesFinish OR noFinishSelected)
// AND (matchesPersonal OR noPersonalSelected)

interface UsePolishFiltersReturn {
  selectedColors: Set<string>;
  selectedFinishes: Set<string>;
  selectedPersonal: Set<'favorites' | 'nextappt'>;
  toggleColor: (color: string) => void;
  toggleFinish: (finish: string) => void;
  togglePersonal: (type: 'favorites' | 'nextappt') => void;
  clearAll: () => void;
  filterPolishes: (polishes: Polish[], userPrefs: UserPrefs) => Polish[];
}
```

**Acceptance Criteria:**
- [ ] Filter state management works
- [ ] AND/OR logic correct
- [ ] Multi-color polishes match any selected color
- [ ] Clear all resets everything

---

## 📋 PHASE 4: Personalization Features
> **Duration:** 1-2 hours | **Claude executes each sub-task**

### Task 4.1: Personalization Icons
**File:** Update `app/components/PolishCard.tsx`

**Business Context:**
- Heart icon:  Toggle favorite (pink/red when active)
- Calendar icon: Toggle "next appointment" (blue when active)
- Icons appear on hover, always visible if active
- Mobile:  Always slightly visible, larger touch targets (44x44px)

**Technical Requirements:**
- Add icon buttons to card overlay
- Prevent click from navigating to product link
- Visual states:  default, hover, active
- Keyboard accessible (Tab, Enter)

**Acceptance Criteria:**
- [ ] Both icons render on cards
- [ ] Click toggles state
- [ ] Visual feedback immediate
- [ ] Mobile touch targets correct
- [ ] Keyboard navigation works

---

### Task 4.2: User Preferences Backend
**File:** Update `amplify/data/resource.ts` (if not done in 1.1)

**Technical Requirements:**
- UserPreference model:  userId, favorites[], nextAppt[]
- Per-user authorization (owner only)
- Optimistic updates for better UX

**Acceptance Criteria:**
- [ ] User prefs persist to database
- [ ] Only owner can read/write their prefs
- [ ] Works without auth (localStorage fallback)

---

### Task 4.3: Preferences Hook
**File:** `app/hooks/useUserPreferences.ts` (new)

**Technical Requirements:**
```typescript
interface UseUserPreferencesReturn {
  favorites: Set<string>;
  nextAppt: Set<string>;
  toggleFavorite: (polishId: string) => Promise<void>;
  toggleNextAppt: (polishId: string) => Promise<void>;
  isLoading: boolean;
}
```

- Sync with Amplify DataStore
- Fallback to localStorage if not authenticated
- Optimistic UI updates

**Acceptance Criteria:**
- [ ] Favorites persist across sessions
- [ ] Next appt persists across sessions
- [ ] Works offline (localStorage)
- [ ] Syncs when online

---

### Task 4.4: "My Picks" Filter
**File:** `app/components/MyPicksFilter.tsx` (new)

**Business Context:**
- Two filter buttons: "❤️ My Favorites", "📅 My Next Appt"
- Shows count in parentheses
- Placed FIRST in filter bar (most important for mobile)

**Technical Requirements:**
- Filter by localStorage/DataStore preferences
- Show count badges
- Empty state messages: 
  - "No favorites yet - tap ♡ on polishes you love!"
  - "No polishes selected yet - tap 📅 to pick for your next visit!"

**Acceptance Criteria:**
- [ ] Filter buttons render with counts
- [ ] Clicking filters gallery
- [ ] Empty states show helpful messages
- [ ] Updates immediately when toggling icons

---

## 📋 PHASE 5: Main Page Assembly
> **Duration:** 1 hour | **Claude executes**

### Task 5.1: Home Page Component
**File:** `app/page.tsx`

**Technical Requirements:**
- Server component for initial data fetch
- Client component wrapper for interactivity
- Compose all components: 
  1. NavHeader
  2. FilterBar (MyPicks + Color + Finish)
  3. PolishGrid with PolishCards
- Loading states
- Error boundaries

**Acceptance Criteria:**
- [ ] Page renders all components
- [ ] Data fetches from Amplify
- [ ] Filters work end-to-end
- [ ] Personalization works
- [ ] Mobile responsive

---

### Task 5.2: Loading & Error States
**Files:** `app/loading.tsx`, `app/error.tsx`

**Technical Requirements:**
- Skeleton cards while loading
- Graceful error handling
- Retry functionality

**Acceptance Criteria:**
- [ ] Loading skeleton matches card layout
- [ ] Error message is user-friendly
- [ ] Retry button works

---

## 📋 PHASE 6: Polish & Deploy
> **Duration:** 1-2 hours | **Claude executes each sub-task**

### Task 6.1: Privacy Policy Page
**File:** `app/privacy-policy/page.tsx`

**Technical Requirements:**
- Port privacy policy content from source
- Update contact info placeholders
- Style consistently with app

**Acceptance Criteria:**
- [ ] Policy content complete
- [ ] Links work
- [ ] Mobile readable

---

### Task 6.2: Accessibility Audit
**Technical Requirements:**
- ARIA labels on interactive elements
- Keyboard navigation for all features
- Color contrast verification
- Screen reader testing

**Acceptance Criteria:**
- [ ] All buttons have accessible names
- [ ] Tab order is logical
- [ ] Contrast ratios pass WCAG AA
- [ ] Filter announcements work

---

### Task 6.3: Performance Optimization
**Technical Requirements:**
- Image optimization (Next.js Image component)
- Code splitting verification
- Lighthouse audit

**Acceptance Criteria:**
- [ ] Images serve optimized formats
- [ ] First contentful paint < 2s
- [ ] No layout shift on load

---

### Task 6.4: Production Deployment
**Technical Requirements:**
- Verify Amplify build succeeds
- Test production URL
- Monitor for errors

**Acceptance Criteria:**
- [ ] App deploys successfully
- [ ] All features work in production
- [ ] No console errors

---

## 📁 Complete File Manifest

### New Files to Create
```
app/
├── components/
│   ├── NavHeader.tsx
│   ├── FilterBar.tsx
│   ├── ColorFilter.tsx
│   ├── FinishFilter.tsx
│   ├── MyPicksFilter.tsx
│   ├── PolishCard. tsx
│   └── PolishGrid.tsx
├── hooks/
│   ├── usePolishFilters. ts
│   └── useUserPreferences.ts
├── privacy-policy/
│   └── page.tsx
├── loading. tsx
├── error.tsx
├── page.tsx (replace template)
├── layout.tsx (modify)
├── globals.css (modify)
└── design-tokens.css (new)

amplify/
├── data/
│   └── resource.ts (modify schema)
└── backend. ts (may need auth updates)

public/
└── images/
    └── (60 polish images)

scripts/
└── seed-polishes.ts (optional)
```

### Files to Delete
- Template todo app code from `page.tsx`
- Template CSS from `app. css`, `page.module.css`

---

## ⚠️ Critical Notes for Claude Sonnet

1. **Always test locally** before committing - run `npm run dev`
2. **TypeScript strict mode** - all types must be explicit
3. **Amplify client generation** - run `npx ampx generate` after schema changes
4. **CSS Variables** - use design tokens, don't hardcode colors
5. **Mobile-first** - test on 375px width minimum
6. **Composite IDs** - Polish numbers are NOT unique, use number-name combination

---

## 🎯 Success Metrics

| Metric | Target |
|--------|--------|
| All 60 polishes display | ✓ |
| Color filters work (11 categories) | ✓ |
| Finish filters work (6 categories) | ✓ |
| Multi-filter logic correct | ✓ |
| Favorites persist | ✓ |
| Next Appt persists | ✓ |
| Mobile responsive | ✓ |
| Lighthouse Performance | >80 |
| Lighthouse Accessibility | >90 |

---

This plan gives you **23 discrete tasks** across **6 phases** that can be executed sequentially with Claude Sonnet. Each task has clear acceptance criteria and enough context to execute independently. 