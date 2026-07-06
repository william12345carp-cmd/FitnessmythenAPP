import { createClient } from "npm:@supabase/supabase-js@2";

// Service-Role-Client: umgeht RLS. NUR serverseitig verwenden (§9.2/§9.3).
export function supabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );
}

// Client im Kontext des aufrufenden Nutzers (JWT aus dem Authorization-Header).
export function supabaseForRequest(req: Request) {
  return createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
}
