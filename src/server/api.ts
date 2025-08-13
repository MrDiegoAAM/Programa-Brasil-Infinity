import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_FUNCTIONS_URL || "https://aadeajsyatbnkwasiqyj.supabase.co/functions/v1",
  timeout: 10000,
  headers: {
    'apikey': process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZGVhanN5YXRibmt3YXNpcXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NTU4MDIsImV4cCI6MjA3MDUzMTgwMn0.fquqSawX8BtEFEoJqs16mEkcs4FlO950foOzBWacHMM',
    'Content-Type': 'application/json',
  },
});

export default api;
