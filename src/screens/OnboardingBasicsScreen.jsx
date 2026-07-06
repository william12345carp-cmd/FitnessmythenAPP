/* [7.4] Onboarding Schritt 2 — Basisdaten (§4: exakt 4 Felder) */

import { useEffect, useState } from "react";
import { useApp, useNow } from "../store/appStore.jsx";
import { subscriptionService } from "../services/subscriptionService.js";
import { analyticsService } from "../services/analyticsService.js";
import { parseDecimalInput, isPositiveNumber } from "../lib/number.js";
import { BasicsFields } from "../components/BasicsFields.jsx";
import { Button } from "../components/ui/Button.jsx";

export function OnboardingBasicsScreen() {
  const { state, dispatch } = useApp();
  const now = useNow();
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [touchedTarget, setTouchedTarget] = useState(false);
  const [goal, setGoal] = useState(null);
  const [location, setLocation] = useState(null);

  // §4: Zielgewicht = Körpergewicht, falls nicht abweichend angegeben.
  useEffect(() => {
    if (!touchedTarget) setTargetWeight(weight);
  }, [weight, touchedTarget]);

  const weightNum = parseDecimalInput(weight);
  const targetNum = parseDecimalInput(targetWeight);
  const valid =
    isPositiveNumber(weightNum) && isPositiveNumber(targetNum) && goal && location;

  function finish() {
    // Trial startet mit Registrierung (Mock).
    // TODO: Position des Stripe-Checkouts im Flow (vor/nach Onboarding) ist im
    // Master-Prompt nicht festgelegt — Entscheidung liegt beim Gründer.
    const sub = subscriptionService.startTrial(now);
    const profile = {
      id: state.user.id,
      created_at: now.toISOString(),
      weight_kg: weightNum,
      target_weight_kg: targetNum,
      goal,
      location_equipment: location,
      reminder_setting: "keine",
      ...sub,
      stripe_customer_id: null, // TODO: via Stripe Webhook setzen (§9.3)
      stripe_subscription_id: null, // TODO: via Stripe Webhook setzen (§9.3)
    };
    analyticsService.track("onboarding_completed");
    // §5.4 Cold-Start: sofort Tagesfrage → erste Karte, kein Warten auf morgen.
    dispatch({ type: "CREATE_PROFILE", profile });
  }

  return (
    <div className="fm-screen">
      <span className="fm-eyebrow">Schritt 2 von 2</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 6px" }}>
        Vier Angaben. Das war&rsquo;s.
      </h1>
      <p className="fm-body" style={{ marginBottom: 26 }}>
        Mehr brauchen wir nicht — alles Weitere leitet das System selbst ab.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        <BasicsFields
          weight={weight}
          onWeightChange={setWeight}
          targetWeight={targetWeight}
          onTargetWeightChange={(v) => {
            setTouchedTarget(true);
            setTargetWeight(v);
          }}
          goal={goal}
          onGoalChange={setGoal}
          location={location}
          onLocationChange={setLocation}
          weightPlaceholder="z. B. 82"
          targetWeightPlaceholder="falls abweichend"
        />
      </div>

      <div style={{ marginTop: 28 }}>
        <Button variant="primary" disabled={!valid} onClick={finish}>
          Fertig — heute starten
        </Button>
      </div>
    </div>
  );
}
