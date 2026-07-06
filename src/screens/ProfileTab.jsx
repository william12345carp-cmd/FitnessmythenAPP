/* [7.9] Profil (§2: Basisdaten, Erinnerung, Abo, minimalistisch) */

import { useState } from "react";
import { useApp, useNow } from "../store/appStore.jsx";
import { authService } from "../services/authService.js";
import { subscriptionService } from "../services/subscriptionService.js";
import { reminderService } from "../services/reminderService.js";
import { profileService } from "../services/profileService.js";
import { analyticsService } from "../services/analyticsService.js";
import { GOALS, LOCATIONS, REMINDER_OPTIONS, STATUS_LABELS } from "../data/options.js";
import { parseDecimalInput, isPositiveNumber } from "../lib/number.js";
import { BasicsFields } from "../components/BasicsFields.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Choice } from "../components/ui/Choice.jsx";

export function ProfileTab() {
  const { state, dispatch } = useApp();
  const now = useNow();
  const p = state.profile;

  // Formular-State wird beim Öffnen der Bearbeitung aus dem Profil befüllt —
  // abgebrochene Änderungen bleiben so nie im Formular hängen.
  const [form, setForm] = useState(null); // null = Ansichtsmodus
  const [saveFailed, setSaveFailed] = useState(false);
  const [portalHint, setPortalHint] = useState(null); // null | "mock" | "error"
  const editing = form !== null;

  function startEditing() {
    setForm({
      weight: String(p.weight_kg),
      targetWeight: String(p.target_weight_kg),
      goal: p.goal,
      location: p.location_equipment,
    });
  }

  const weightNum = editing ? parseDecimalInput(form.weight) : null;
  const targetNum = editing ? parseDecimalInput(form.targetWeight) : null;
  const valid = editing && isPositiveNumber(weightNum) && isPositiveNumber(targetNum);

  async function save() {
    const patch = {
      weight_kg: weightNum,
      target_weight_kg: targetNum,
      goal: form.goal,
      location_equipment: form.location,
    };
    setSaveFailed(false);
    try {
      await profileService.updateProfile(p.id, patch);
      dispatch({ type: "UPDATE_PROFILE", patch });
      analyticsService.track("profile_updated");
      setForm(null);
    } catch (error) {
      console.error("[profile] update failed", error);
      setSaveFailed(true);
    }
  }

  async function setReminder(value) {
    await reminderService.updateReminder(value);
    dispatch({ type: "UPDATE_PROFILE", patch: { reminder_setting: value } });
  }

  async function openPortal() {
    const result = await subscriptionService.openCustomerPortal();
    // Bei Erfolg verlässt der Redirect die App; hier landen nur Mock/Fehler.
    if (!result.ok) setPortalHint(result.reason === "mock" ? "mock" : "error");
  }

  async function signOut() {
    await authService.signOut();
    dispatch({ type: "SIGN_OUT" });
  }

  const trialEnds = new Date(p.trial_ends_at);
  const trialActive = p.subscription_status === "trial" && now < trialEnds;
  const goalLabel = GOALS.find((g) => g.value === p.goal)?.label;
  const locationLabel = LOCATIONS.find((l) => l.value === p.location_equipment)?.label;

  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <h1 className="fm-display fm-display--md" style={{ marginBottom: 26 }}>
        Profil
      </h1>

      {/* --- Basisdaten --- */}
      <div className="fm-section">
        <p className="fm-section__title">Basisdaten</p>
        {!editing ? (
          <>
            <div className="fm-row">
              <span className="fm-row__label">Körpergewicht</span>
              <span className="fm-row__value">{p.weight_kg} kg</span>
            </div>
            <div className="fm-row">
              <span className="fm-row__label">Zielkörpergewicht</span>
              <span className="fm-row__value">{p.target_weight_kg} kg</span>
            </div>
            <div className="fm-row">
              <span className="fm-row__label">Ziel</span>
              <span className="fm-row__value">{goalLabel}</span>
            </div>
            <div className="fm-row" style={{ borderBottom: "none" }}>
              <span className="fm-row__label">Ort &amp; Equipment</span>
              <span className="fm-row__value">{locationLabel}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <Button variant="ghost" onClick={startEditing}>
                Basisdaten ändern
              </Button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <BasicsFields
              weight={form.weight}
              onWeightChange={(v) => setForm((f) => ({ ...f, weight: v }))}
              targetWeight={form.targetWeight}
              onTargetWeightChange={(v) => setForm((f) => ({ ...f, targetWeight: v }))}
              goal={form.goal}
              onGoalChange={(v) => setForm((f) => ({ ...f, goal: v }))}
              location={form.location}
              onLocationChange={(v) => setForm((f) => ({ ...f, location: v }))}
            />
            {saveFailed && (
              <div className="fm-note" role="alert">
                Das Speichern hat gerade nicht geklappt. Versuch es gleich nochmal.
              </div>
            )}
            <Button variant="primary" disabled={!valid} onClick={save}>
              Speichern
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setForm(null);
                setSaveFailed(false);
              }}
            >
              Abbrechen
            </Button>
          </div>
        )}
      </div>

      {/* --- Erinnerung (§6) --- */}
      <div className="fm-section">
        <p className="fm-section__title" id="reminder-title">
          Erinnerung
        </p>
        <p className="fm-small" style={{ marginBottom: 12 }}>
          Optional. Eine ruhige Nachricht pro Tag: „Deine heutige Karte ist bereit.“
        </p>
        <div className="fm-choices" role="radiogroup" aria-labelledby="reminder-title">
          {REMINDER_OPTIONS.map((o) => (
            <Choice
              key={o.value}
              label={o.label}
              selected={p.reminder_setting === o.value}
              onSelect={() => setReminder(o.value)}
            />
          ))}
        </div>
        {/* TODO: Push-Registrierung erst mit echter Integration (§6) */}
      </div>

      {/* --- Abo (§9.3) --- */}
      <div className="fm-section">
        <p className="fm-section__title">Abo</p>
        <div className="fm-row">
          <span className="fm-row__label">Status</span>
          <span className="fm-row__value">{STATUS_LABELS[p.subscription_status]}</span>
        </div>
        {trialActive && (
          <div className="fm-row">
            <span className="fm-row__label">Testphase endet</span>
            <span className="fm-row__value">
              {new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long" }).format(
                trialEnds
              )}
            </span>
          </div>
        )}
        <div className="fm-row" style={{ borderBottom: "none" }}>
          <span className="fm-row__label">Preis</span>
          <span className="fm-row__value">150 € / Monat</span>
        </div>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <Button variant="ghost" onClick={openPortal}>
            Abo verwalten oder kündigen
          </Button>
          {portalHint === "mock" && (
            <div className="fm-note" role="status">
              Mock-Modus (kein Supabase konfiguriert): Hier öffnet sich später das Stripe Customer
              Portal — dort verwaltest und kündigst du dein Abo.
            </div>
          )}
          {portalHint === "error" && (
            <div className="fm-note" role="status">
              Das Abo-Portal konnte gerade nicht geöffnet werden. Versuch es gleich nochmal.
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="fm-textlink" onClick={signOut} style={{ width: "100%" }}>
          Abmelden
        </button>
        <p className="fm-small" style={{ textAlign: "center", marginTop: 10 }}>
          {/* TODO: Impressum, AGB, Datenschutz, Widerruf (§11) */}
          Impressum · AGB · Datenschutz · Widerruf
        </p>
      </div>
    </div>
  );
}
