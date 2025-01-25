below i have attached my supabase project url and anon-key ,now connect to my supabase project backend
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jisvpfaxmzvvlvefzgvk.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
