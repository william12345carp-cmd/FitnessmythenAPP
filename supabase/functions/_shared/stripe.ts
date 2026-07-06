import Stripe from "npm:stripe@18.5.0";

// Fetch-basierter HTTP-Client — erforderlich in der Deno-Edge-Runtime.
export const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(),
});

export { Stripe };
