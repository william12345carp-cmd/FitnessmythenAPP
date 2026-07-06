/* [7.8] Trial-/Paywall-Screen (§9.3: ruhig, nicht aggressiv) */

import { useApp } from "../store/appStore.jsx";
import { subscriptionService } from "../services/subscriptionService.js";
import { Button } from "../components/ui/Button.jsx";

export function PaywallScreen() {
  const { state, dispatch } = useApp();
  const status = state.profile.subscription_status;

  const headline =
    status === "paused"
      ? "Deine Zahlung konnte nicht verarbeitet werden."
      : status === "cancelled"
        ? "Dein Abo ist beendet."
        : "Deine kostenlose Testphase ist vorbei.";

  function resume() {
    // TODO: Real: Stripe Checkout / Customer Portal; Status wird ausschließlich
    // per Stripe-Webhook gesetzt (§9.3). Mock: direkt auf 'active'.
    const patch = subscriptionService.resumeSubscription();
    dispatch({ type: "UPDATE_PROFILE", patch });
  }

  return (
    <div className="fm-screen fm-screen--center">
      <span className="fm-eyebrow fm-eyebrow--red">Fitnessmythen</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "12px 0 12px" }}>
        {headline}
      </h1>
      <p className="fm-body" style={{ marginBottom: 8 }}>
        Deine Daten und Einstellungen bleiben vollständig erhalten. Sobald du fortsetzt, ist deine
        heutige Karte sofort wieder da.
      </p>
      <p className="fm-body" style={{ marginBottom: 26 }}>
        150&nbsp;€ pro Monat, monatlich kündbar.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button variant="red" onClick={resume}>
          Abo fortsetzen
        </Button>
        <p className="fm-small" style={{ textAlign: "center" }}>
          Abgewickelt über Stripe. {/* TODO: Link zum Stripe Customer Portal (§9.3) */}
        </p>
      </div>
    </div>
  );
}
