/**
 * Seed Script: Import Polish Data from CSV to AWS Amplify
 * 
 * Usage:
 *   1. Ensure Amplify sandbox is running: npx ampx sandbox
 *   2. Run this script: npx tsx scripts/seed-polishes.ts
 * 
 * Prerequisites:
 *   npm install tsx (if not installed)
 * 
 * This script:
 *   - Reads polishes.csv from /data directory
 *   - Parses CSV and creates Polish records
 *   - Handles multi-color values (splits on comma)
 *   - Uploads all records to DynamoDB via Amplify Data
 */

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import * as fs from 'fs';
import * as path from 'path';

// Configure Amplify
Amplify.configure(outputs);

// Generate Amplify Data client
const client = generateClient<Schema>();

interface PolishCSVRow {
  Brand: string;
  Number: string;
  Name: string;
  Link: string;
  'Image Address': string;
  LocalImage: string;
  Color: string;
  Finish: string;
}

/**
 * Parse CSV file manually (simple parser for our specific format)
 */
function parseCSV(csvText: string): PolishCSVRow[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const records: PolishCSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Handle quoted fields (colors can have commas)
    const values: string[] = [];
    let currentValue = '';
    let insideQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Push last value
    
    // Create record object
    const record: any = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    records.push(record as PolishCSVRow);
  }
  
  return records;
}

/**
 * Seed database with polish data
 */
async function seedPolishes() {
  console.log('🌱 Starting polish data seed...\n');
  
  try {
    // Read CSV file
    const csvPath = path.join(__dirname, '../data/polishes.csv');
    console.log(`📄 Reading CSV from: ${csvPath}`);
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at ${csvPath}`);
    }
    
    const csvText = fs.readFileSync(csvPath, 'utf-8');
    const polishes = parseCSV(csvText);
    
    console.log(`✅ Parsed ${polishes.length} polishes from CSV\n`);
    
    // Check if data already exists
    console.log('🔍 Checking for existing data...');
    const existingPolishes = await client.models.Polish.list();
    
    if (existingPolishes.data && existingPolishes.data.length > 0) {
      console.log(`⚠️  Found ${existingPolishes.data.length} existing polishes in database.`);
      console.log('   To re-seed, delete existing data first.\n');
      
      // Ask user if they want to continue (in a real implementation)
      // For now, we'll skip if data exists
      console.log('   Skipping seed to avoid duplicates.');
      console.log('   To force re-seed, delete all Polish records first.\n');
      return;
    }
    
    console.log('✅ No existing data found. Proceeding with seed.\n');
    
    // Create polish records
    let successCount = 0;
    let errorCount = 0;
    
    for (const polish of polishes) {
      try {
        // Parse colors array (split on comma)
        const colors = polish.Color
          .split(',')
          .map(c => c.trim())
          .filter(c => c.length > 0);
        
        // Convert LocalImage path from "public/images/..." to "/images/..."
        const localImage = polish.LocalImage.replace('public/', '/');
        
        // Validate finish enum
        const validFinishes = ['Cream', 'Shimmer', 'Cat Eye', 'Mood Change', 'Sheer', 'Glitter'];
        const finish = validFinishes.includes(polish.Finish) ? polish.Finish : 'Cream';
        
        // Create record
        const result = await client.models.Polish.create({
          brand: polish.Brand,
          number: polish.Number,
          name: polish.Name,
          link: polish.Link,
          imageAddress: polish['Image Address'] || null,
          localImage: localImage,
          colors: colors,
          finish: finish as 'Cream' | 'Shimmer' | 'Cat Eye' | 'Mood Change' | 'Sheer' | 'Glitter',
        });
        
        if (result.data) {
          successCount++;
          console.log(`✅ [${successCount}/${polishes.length}] Created: ${polish.Number} - ${polish.Name}`);
        } else {
          throw new Error('Failed to create record');
        }
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Error creating polish "${polish.Name}":`, error);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Seed completed!');
    console.log(`   ✅ Success: ${successCount} polishes`);
    console.log(`   ❌ Errors: ${errorCount} polishes`);
    console.log('='.repeat(60) + '\n');
    
  } catch (error) {
    console.error('💥 Fatal error during seed:', error);
    process.exit(1);
  }
}

// Run seed
seedPolishes()
  .then(() => {
    console.log('✨ Seed script finished successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed script failed:', error);
    process.exit(1);
  });
