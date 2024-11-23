import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ltpasfjejihckukshlhs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0cGFzZmplamloY2t1a3NobGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzMTc2MzAsImV4cCI6MjA0Nzg5MzYzMH0.mgrhzNkYhfnt6QWRkrrozUSh56HTPHc1qkNK9qp6Vus"
);

export default supabase;
