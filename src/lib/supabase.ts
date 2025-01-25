import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jisvpfaxmzvvlvefzgvk.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)