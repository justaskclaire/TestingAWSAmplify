# Quick Start Guide - Migration Project

## What We're Building
Migrating the NailPolishInventory static site to a modern Next.js + AWS Amplify application.

## Current Status
✅ **Phase 1 Complete** - Data layer is ready!

## What's Done
- Database schema defined (Polish + UserPreference models)
- Seed script created to import 60 polishes from CSV
- All 63 images copied to `/public/images/`
- Ready to build UI components

## How to Test What We Have

### 1. Start the Development Environment
```powershell
# Navigate to project
cd c:\PersonalProjects\TestingAWSAmplify\TestingAWSAmplify

# Install dependencies (if needed)
npm install

# Start Amplify sandbox (Terminal 1)
npx ampx sandbox

# Wait for "Deployed" message, then start Next.js (Terminal 2)
npm run dev
```

### 2. Seed the Database (First Time Only)
```powershell
# In Terminal 3 (after sandbox is running)
npm run seed

# Expected output: 60 polishes created successfully
```

### 3. View Current Application
- Open: http://localhost:3000
- Currently shows template todo app (not migrated yet)

## Project Structure

```
TestingAWSAmplify/
├── amplify/
│   ├── data/resource.ts         ✅ Polish & UserPreference models
│   └── backend.ts               ✅ Amplify configuration
├── app/
│   ├── page.tsx                 ⏳ TODO: Replace with gallery
│   ├── layout.tsx               ⏳ TODO: Update with fonts/metadata
│   └── globals.css              ⏳ TODO: Add design tokens
├── public/
│   └── images/                  ✅ 63 polish images
├── data/
│   └── polishes.csv             ✅ Source data (60 records)
├── scripts/
│   ├── seed-polishes.ts         ✅ Database seeding script
│   └── README.md                ✅ Seed script documentation
└── reference/
    ├── MIGRATION_PLAN.md        📋 Complete migration roadmap
    └── PROGRESS.md              📊 Current progress tracker
```

## What's Next - Phase 2: Core UI Components

### Task 2.1: Design System Setup (30-45 min)
Extract CSS from [NailPolishInventory/index.html](../../NailPolishInventory/index.html):
- Copy all CSS custom properties (`:root` variables)
- Create `app/design-tokens.css`
- Update `app/globals.css`
- Load Google Fonts (Inter + Playfair Display)

### Task 2.2: Layout Component (15 min)
Update [app/layout.tsx](../app/layout.tsx):
- Add proper page metadata (title, description)
- Configure fonts
- Remove template code

### Task 2.3: Navigation Header (30 min)
Create `app/components/NavHeader.tsx`:
- "Studio Claire" brand name
- Nav links (Polishes, Charms, Stickers, Accessories)
- Active/disabled states
- Responsive design

### Task 2.4: Polish Card Component (45 min)
Create `app/components/PolishCard.tsx`:
- Display polish image, number, name
- Hover effects (lift, shadow, zoom)
- Link to external product page
- Favorite/Next Appt icon placeholders

### Task 2.5: Card Grid Layout (30 min)
Create `app/components/PolishGrid.tsx`:
- CSS Grid auto-fill (170px min)
- Empty state message
- Loading skeleton

**Estimated Time:** 2.5-3 hours for all of Phase 2

## Key Files to Reference

### Source Application (What We're Migrating From)
- **HTML/CSS/JS:** `../../NailPolishInventory/index.html` (1,916 lines - all in one)
- **Data:** `../../NailPolishInventory/data/polishes.csv`
- **Images:** `../../NailPolishInventory/public/images/`

### Migration Documentation
- **Master Plan:** `reference/MIGRATION_PLAN.md` (detailed 23-task breakdown)
- **Progress:** `reference/PROGRESS.md` (current status)
- **This File:** `reference/QUICKSTART.md` (you are here)

## Helpful Commands

```powershell
# Start development
npm run dev                    # Next.js dev server (port 3000)
npx ampx sandbox              # Amplify backend sandbox

# Database
npm run seed                   # Seed polishes from CSV
npx ampx sandbox delete       # Delete sandbox (careful!)

# Code generation
npx ampx generate             # Generate Amplify client types (after schema changes)

# Build & Deploy
npm run build                 # Production build
git push                      # Triggers Amplify CI/CD (if connected)
```

## Design System Reference

From source application (`NailPolishInventory/index.html` lines 11-100):

**Colors:**
- Primary: Rose gold (#f43f5e, #e11d48)
- Accent: Soft lavender (#a855f7, #9333ea)
- Neutrals: Gray scale (#fafafa to #171717)

**Typography:**
- Headings: Playfair Display (600, 700, 800)
- Body: Inter (400, 500, 600, 700)

**Spacing:** 8px base scale (0.5rem to 3rem)

**Border Radius:** 8px, 14px, 16px

**Shadows:** 5 levels (xs to xl)

## Common Issues & Solutions

### Seed Script Fails
**Problem:** `amplify_outputs.json` not found  
**Solution:** Make sure `npx ampx sandbox` is running first

### Images Don't Load
**Problem:** 404 on `/images/filename.jpg`  
**Solution:** Verify files exist in `public/images/` (not `public/public/images/`)

### TypeScript Errors in Seed Script
**Problem:** Schema types not found  
**Solution:** Run `npx ampx generate` after schema changes

### Amplify Sandbox Won't Start
**Problem:** Port conflicts or AWS credentials  
**Solution:** Check AWS CLI configured (`aws configure`), close other Amplify processes

## Testing Checklist (When UI is Ready)

- [ ] Gallery displays all 60 polishes
- [ ] Images load correctly
- [ ] Color filters work (11 categories)
- [ ] Finish filters work (6 types)
- [ ] Favorites toggle and persist
- [ ] Next Appt toggle and persist
- [ ] Mobile responsive (test at 375px width)
- [ ] Links to product pages work
- [ ] Hover effects smooth (no jank)

## Questions?

Check these resources:
1. **Migration Plan:** `reference/MIGRATION_PLAN.md` - Full 6-phase plan
2. **Progress Report:** `reference/PROGRESS.md` - What's done, what's next
3. **Source Code:** `../../NailPolishInventory/index.html` - Original implementation
4. **Amplify Docs:** https://docs.amplify.aws/nextjs/

---

**Ready to continue?** Start with Phase 2, Task 2.1 (Design System Setup)
