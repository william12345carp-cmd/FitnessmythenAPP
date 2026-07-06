// ============================================================================
// Stripe Checkout Session (§9.3) — aufgerufen aus dem Frontend (mit User-JWT).
//
// Option B (Entscheidung Gründer, 2026-07-06): Cardless Trial.
// Der kostenlose Zeitraum lief bereits app-seitig über profiles.trial_ends_at —
// deshalb hier bewusst KEIN trial_period_days. Der Preis kommt ausschließlich
// aus der Env-Variable STRIPE_PRICE_ID (niemals hardcoden).
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

    const admin = supabaseAdmin();
    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();
    if (profileError) return jsonResponse({ error: "profile_not_found" }, 404);

    // Stripe-Kunde wiederverwenden, sonst anlegen und sofort persistieren.
    let customerId = profile.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
    }

    const appUrl = Deno.env.get("APP_URL") ?? req.headers.get("origin");
    if (!appUrl) return jsonResponse({ error: "app_url_missing" }, 500);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      client_reference_id: user.id,
      line_items: [{ price: Deno.env.get("STRIPE_PRICE_ID") ?? "", quantity: 1 }],
      success_url: `${appUrl}/?checkout=success`,
      cancel_url: `${appUrl}/?checkout=cancelled`,
    });

    return jsonResponse({ url: session.url });
  } catch (err) {
    console.error("[create-checkout-session]", err);
    return jsonResponse({ error: "internal_error" }, 500);
  }
});
