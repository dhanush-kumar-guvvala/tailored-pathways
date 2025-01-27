import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jisvpfaxmzvvlvefzgvk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc3ZwZmF4bXp2dmx2ZWZ6Z3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MDA1NDgsImV4cCI6MjA1MzM3NjU0OH0.wqL9I1GNxKhEhaQnw6Gb6E9sJ5zEIYkyj7a_Am9jXJw'

export const supabase = createClient(supabaseUrl, supabaseKey)