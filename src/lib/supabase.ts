import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xjncogzherkgueoguqka.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbmNvZ3poZXJrZ3Vlb2d1cWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMjU4OTQsImV4cCI6MjA4NTkwMTg5NH0.6kVlWRE4tLIKHnVCWCGQYFKImsFLzPy42PY98MsakaE';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for database
export interface DbUser {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  tokens: number;
  avatar: any;
  competitions: string[];
  created_at: string;
}

export interface DbPrediction {
  id: string;
  user_id: string;
  race_id: number;
  prediction: number[];
  pole_position: number | null;
  fastest_lap: number | null;
  points: number;
  created_at: string;
}

export interface DbLeague {
  id: string;
  name: string;
  creator_id: string;
  invite_code: string;
  pool_enabled: boolean;
  pool_amount: number;
  logo: any;
  created_at: string;
}

export interface DbRaceResult {
  id: string;
  race_id: number;
  results: number[];
  pole_position: number | null;
  fastest_lap: number | null;
  fetched_at: string;
}
