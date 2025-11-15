import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rvwquaajwmrxspmktdnf.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2d3F1YWFqd21yeHNwbWt0ZG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Nzg2NzUsImV4cCI6MjA3NzU1NDY3NX0.McfRSNj2TZVpvff7QV84FKmIVz0o2deL_HGuMLDwWOY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
