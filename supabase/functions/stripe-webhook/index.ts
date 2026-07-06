// ============================================================================
// Stripe-Webhook — DIE EINZIGE QUELLE DER WAHRHEIT für subscription_status
// (§9.3). Kein anderer Code setzt diese Spalte; das Frontend liest sie nur.
//
// Authentifizierung: Stripe-Signatur (STRIPE_WEBHOOK_SECRET), kein JWT
// (supabase/config.toml: verify_jwt = false).
//
// Status-Mapping Stripe → profiles.subscription_status:
//   active, trialing                → active   (trialing kommt bei Option B nicht vor)
//   past_due, unpaid, incomplete    → paused   (Zahlung offen/fehlgeschlagen)
//   canceled, incomplete_expired    → cancelled
// ============================================================================

import { stripe, Stripe } from "../_shared/stripe.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { jsonResponse } from "../_shared/cors.ts";

// Async-Provider erforderlich: die Edge-Runtime erlaubt nur SubtleCrypto.
const cryptoProvider = Stripe.createSubtleCryptoProvider();

const STATUS_MAP: Record<string, string> = {
  active: "active",
  trialing: "active",
  past_due: "paused",
  unpaid: "paused",
  incomplete: "paused",
  paused: "paused",
  canceled: "cancelled",
  incomplete_expired: "cancelled",
};

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return jsonResponse({ error: "missing_signature" }, 400);

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "",
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed", err);
    return jsonResponse({ error: "invalid_signature" }, 400);
  }

  const admin = supabaseAdmin();

  async function updateByCustomer(customerId: string, patch: Record<string, unknown>) {
    const { error } = await admin
      .from("profiles")
      .update(patch)
      .eq("stripe_customer_id", customerId);
    if (error) throw error;
  }

  try {
    switch (event.type) {
      // Checkout abgeschlossen → Abo aktiv, Stripe-IDs persistieren.
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.client_reference_id) break;
        const { error } = await admin
          .from("profiles")
          .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_status: "active",
          })
          .eq("id", session.client_reference_id);
        if (error) throw error;
        break;
      }

      // Jede Statusänderung des Abos (inkl. Kündigung zum Periodenende).
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const mapped = STATUS_MAP[subscription.status];
        if (!mapped) break; // unbekannter Status: nichts raten, Event loggen
        await updateByCustomer(subscription.customer as string, {
          subscription_status: mapped,
          stripe_subscription_id: subscription.id,
        });
        break;
      }

      // Abo endgültig beendet.
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await updateByCustomer(subscription.customer as string, {
          subscription_status: "cancelled",
        });
        break;
      }

      // Fehlgeschlagene Zahlung sofort spiegeln (schneller als past_due-Update).
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.customer) {
          await updateByCustomer(invoice.customer as string, {
            subscription_status: "paused",
          });
        }
        break;
      }

      default:
        // Nicht abonnierte Events bestätigen, damit Stripe nicht erneut sendet.
        break;
    }
  } catch (err) {
    // 500 → Stripe wiederholt die Zustellung (Retry ist hier erwünscht).
    console.error(`[stripe-webhook] ${event.type} failed`, err);
    return jsonResponse({ error: "processing_failed" }, 500);
  }

  return jsonResponse({ received: true });
});
