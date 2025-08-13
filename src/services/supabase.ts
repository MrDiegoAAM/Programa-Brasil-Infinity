import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// URLs das Edge Functions
export const FUNCTIONS_URL = process.env.REACT_APP_FUNCTIONS_URL!;
export const AUTH_FUNCTION_URL = process.env.REACT_APP_AUTH_FUNCTION_URL!;
export const STATUS_FUNCTION_URL = process.env.REACT_APP_STATUS_FUNCTION_URL!;
export const INSTITUTIONS_FUNCTION_URL = process.env.REACT_APP_INSTITUTIONS_FUNCTION_URL!;
export const HOMELESS_FUNCTION_URL = process.env.REACT_APP_HOMELESS_FUNCTION_URL!;
export const HOMELESS_BY_INSTITUTION_FUNCTION_URL = process.env.REACT_APP_HOMELESS_BY_INSTITUTION_FUNCTION_URL!;