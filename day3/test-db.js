import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uddicwpqucfpovwifefg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZGljd3BxdWNmcG92d2lmZWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzY2OTgsImV4cCI6MjA5NTU1MjY5OH0.hQ7REawQIE76--k8_fuSEHukJMrjoxBlmNAbWL0xzfw'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  const { data, error, count } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
  
  if (error) {
    console.error('❌ Error:', error.message)
    console.log('\nThe orders table might not exist. Run this SQL in Supabase SQL Editor:')
    console.log('\n--- Copy from here ---')
    console.log(require('fs').readFileSync('./supabase/seed-500.sql', 'utf-8'))
    console.log('--- End ---\n')
  } else {
    console.log(`✅ Connected! Found ${count} orders in the database.`)
    
    if (count === 0) {
      console.log('\n⚠️  Database is empty. Run seed-500.sql in Supabase SQL Editor.')
    }
  }
}

testConnection()
