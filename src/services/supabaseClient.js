/* [4] Supabase-Client — einzige Instanz für Auth, Postgres und Edge Functions.
   Im Mock-Modus (keine Env-Werte) bleibt der Client null; alle Services
   prüfen isMockMode, bevor sie ihn anfassen. */

import { createClient } from "@supabase/supabase-js";
import { integrationConfig, isMockMode } from "./config.js";

export const supabase = isMockMode
  ? null
  : createClient(integrationConfig.supabaseUrl, integrationConfig.supabaseAnonKey);
