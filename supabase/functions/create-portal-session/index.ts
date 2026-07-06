// ============================================================================
// Stripe Customer Portal (§9.3) — Abo verwalten, Zahlungsmethode reparieren,
// kündigen. Aufgerufen aus dem Frontend (mit User-JWT).
// ============================================================================

import { stripe } from "../_shared/stripe.ts";
import { supabaseAdmin, supabaseForRequest } from "../_shared/supabaseAdmin.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const {
      data: { user },
    } = await supabaseForRequest(req).auth.getUser();
    if (!user) return jsonResponse({ error: "unauthorized" }, 401);

    const { data: profile } = await supabaseAdmin()
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();
    // Ohne Stripe-Kunde gibt es nichts zu verwalten (noch nie im Checkout gewesen).
    if (!profile?.stripe_customer_id) return jsonResponse({ error: "no_stripe_customer" }, 404);

    const appUrl = Deno.env.get("APP_URL") ?? req.headers.get("origin");
    if (!appUrl) return jsonResponse({ error: "app_url_missing" }, 500);

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${appUrl}/`,
    });

    return jsonResponse({ url: session.url });
  } catch (err) {
    console.error("[create-portal-session]", err);
    return jsonResponse({ error: "internal_error" }, 500);
  }
});
