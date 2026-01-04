# Scripts Directory

This directory contains utility scripts for data management and seeding.

## seed-polishes.ts

Seeds the database with nail polish data from CSV.

### Prerequisites

```powershell
# Install tsx for TypeScript execution
npm install -D tsx
```

### Usage

```powershell
# 1. Start Amplify sandbox (in a separate terminal)
npx ampx sandbox

# 2. Wait for sandbox to be ready, then run seed script
npx tsx scripts/seed-polishes.ts
```

### What it does

- Reads `data/polishes.csv` (60 polish records)
- Parses CSV and handles multi-color values
- Creates Polish records in DynamoDB via Amplify Data
- Converts image paths from `public/images/` to `/images/` format
- Validates finish enum values
- Provides detailed progress output

### Safety Features

- Checks for existing data before seeding
- Skips seed if data already exists (prevents duplicates)
- Detailed error reporting for any failed records

### Re-seeding

To re-seed the database:

1. Delete all existing Polish records in Amplify Data console
2. Run the seed script again

### Output Example

```
🌱 Starting polish data seed...

📄 Reading CSV from: /path/to/data/polishes.csv
✅ Parsed 60 polishes from CSV

🔍 Checking for existing data...
✅ No existing data found. Proceeding with seed.

✅ [1/60] Created: 427 - Air Of Mint
✅ [2/60] Created: 729 - Ambrosia
...
✅ [60/60] Created: 26 - Cleocatra

============================================================
🎉 Seed completed!
   ✅ Success: 60 polishes
   ❌ Errors: 0 polishes
============================================================

✨ Seed script finished successfully!
```
