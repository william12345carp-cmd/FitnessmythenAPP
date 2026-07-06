/* [7.4] Onboarding Schritt 2 — Basisdaten (§4: exakt 4 Felder) */

import { useEffect, useState } from "react";
import { useApp, useNow } from "../store/appStore.jsx";
import { profileService } from "../services/profileService.js";
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
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  // §4: Zielgewicht = Körpergewicht, falls nicht abweichend angegeben.
  useEffect(() => {
    if (!touchedTarget) setTargetWeight(weight);
  }, [weight, touchedTarget]);

  const weightNum = parseDecimalInput(weight);
  const targetNum = parseDecimalInput(targetWeight);
  const valid = isPositiveNumber(weightNum) && isPositiveNumber(targetNum) && goal && location;

  async function finish() {
    // Option B (Entscheidung Gründer, 2026-07-06): Trial startet mit der
    // Registrierung — die Trial-Felder setzt die DB beim Insert (kein Stripe
    // im Onboarding; Checkout erscheint erst an der Paywall).
    setSaving(true);
    setSaveFailed(false);
    try {
      const profile = await profileService.createProfile(
        {
          userId: state.user.id,
          weightKg: weightNum,
          targetWeightKg: targetNum,
          goal,
          locationEquipment: location,
        },
        now
      );
      analyticsService.track("onboarding_completed");
      // §5.4 Cold-Start: sofort Tagesfrage → erste Karte, kein Warten auf morgen.
      dispatch({ type: "CREATE_PROFILE", profile });
    } catch (error) {
      console.error("[onboarding] profile insert failed", error);
      setSaveFailed(true);
      setSaving(false);
    }
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

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
        {saveFailed && (
          <div className="fm-note" role="alert">
            Das Speichern hat gerade nicht geklappt. Deine Angaben sind noch da — versuch es gleich
            nochmal.
          </div>
        )}
        <Button variant="primary" disabled={!valid || saving} onClick={finish}>
          Fertig — heute starten
        </Button>
      </div>
    </div>
  );
}
