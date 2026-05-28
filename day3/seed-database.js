import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://uddicwpqucfpovwifefg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZGljd3BxdWNmcG92d2lmZWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzY2OTgsImV4cCI6MjA5NTU1MjY5OH0.hQ7REawQIE76--k8_fuSEHukJMrjoxBlmNAbWL0xzfw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Reading seed file...');
  const sql = readFileSync('./supabase/seed-500.sql', 'utf-8');
  
  console.log('Executing seed SQL...');
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
  
  if (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
  
  console.log('✅ Database seeded successfully with 500 orders!');
  
  // Verify count
  const { count } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });
  
  console.log(`Total orders in database: ${count}`);
}

seedDatabase();
