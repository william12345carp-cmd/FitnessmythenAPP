/* [7.8] Trial-/Paywall-Screen (§9.3: ruhig, nicht aggressiv)
   Option B (Entscheidung Gründer, 2026-07-06): Der Checkout erscheint erst
   hier — nach Trial-Ende bzw. bei beendetem Abo. Bei 'paused' (Zahlung
   fehlgeschlagen) führt der Weg ins Customer Portal, denn das Abo existiert
   noch; ein zweiter Checkout würde doppelt abrechnen.
   Der neue Status kommt ausschließlich vom Stripe-Webhook (§9.3) — nach der
   Rückkehr aus Stripe lädt useAuthBootstrap das Profil neu. */

import { useState } from "react";
import { useApp } from "../store/appStore.jsx";
import { isMockMode } from "../services/config.js";
import { subscriptionService } from "../services/subscriptionService.js";
import { Button } from "../components/ui/Button.jsx";

export function PaywallScreen() {
  const { state, dispatch } = useApp();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const status = state.profile.subscription_status;

  const headline =
    status === "paused"
      ? "Deine Zahlung konnte nicht verarbeitet werden."
      : status === "cancelled"
        ? "Dein Abo ist beendet."
        : "Deine kostenlose Testphase ist vorbei.";

  async function resume() {
    if (isMockMode) {
      // Mock: direkt auf 'active' — real setzt NUR der Webhook den Status.
      dispatch({ type: "UPDATE_PROFILE", patch: subscriptionService.resumeSubscription() });
      return;
    }
    setBusy(true);
    setFailed(false);
    const result =
      status === "paused"
        ? await subscriptionService.openCustomerPortal()
        : await subscriptionService.startCheckout();
    // Bei Erfolg verlässt der Redirect die App — hier landen nur Fehler.
    if (!result.ok) {
      setFailed(true);
      setBusy(false);
    }
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
        {failed && (
          <div className="fm-note" role="alert">
            Das hat gerade nicht geklappt. Versuch es gleich nochmal.
          </div>
        )}
        <Button variant="red" disabled={busy} onClick={resume}>
          {status === "paused" ? "Zahlung aktualisieren" : "Abo fortsetzen"}
        </Button>
        <p className="fm-small" style={{ textAlign: "center" }}>
          Abgewickelt über Stripe.
        </p>
      </div>
    </div>
  );
}
