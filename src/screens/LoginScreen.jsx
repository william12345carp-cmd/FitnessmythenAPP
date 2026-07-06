/* [7.2] Login — Magic Link (§9.4). Real: Supabase signInWithOtp; der Link
   führt per Redirect zurück in die App (useAuthBootstrap übernimmt).
   Mock-Modus: Demo-Buttons simulieren das Öffnen des Links. */

import { useState } from "react";
import { useApp } from "../store/appStore.jsx";
import { isMockMode } from "../services/config.js";
import { authService } from "../services/authService.js";
import { Button } from "../components/ui/Button.jsx";
import { Field } from "../components/ui/Field.jsx";
import { Wordmark } from "../components/ui/Wordmark.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen() {
  const { state, dispatch } = useApp();
  const [email, setEmail] = useState("");
  // "expired" auch als Einstieg: der abgelaufene Link landet via Redirect hier (§9.4).
  const [phase, setPhase] = useState(state.loginNotice === "expired" ? "expired" : "enter");
  const [sendFailed, setSendFailed] = useState(false);
  const valid = EMAIL_PATTERN.test(email.trim());

  async function send() {
    if (!valid) return;
    setSendFailed(false);
    const result = await authService.sendMagicLink(email.trim());
    if (result.ok) setPhase("sent");
    else setSendFailed(true);
  }

  /** Nur Mock-Modus: simuliert das Öffnen des E-Mail-Links. */
  async function confirmDemo() {
    const { user } = await authService.confirmMagicLink(email.trim());
    dispatch({ type: "SIGN_IN", user });
    // §9.4: existiert ein profiles-Eintrag? Nein → Onboarding. (Mock: immer neu.)
    dispatch({ type: "NAVIGATE", route: "onboarding_medical" });
  }

  const emailField = (
    <Field
      label="E-Mail-Adresse"
      type="email"
      inputMode="email"
      autoComplete="email"
      placeholder="du@beispiel.de"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") send();
      }}
    />
  );

  const sendError = sendFailed && (
    <div className="fm-note" role="alert">
      Der Link konnte gerade nicht gesendet werden. Prüfe die Adresse und versuch es gleich nochmal.
    </div>
  );

  return (
    <div className="fm-screen fm-screen--center">
      <Wordmark />
      <h1 className="fm-display fm-display--lg" style={{ margin: "26px 0 10px" }}>
        Anmelden
      </h1>

      {phase === "enter" && (
        <>
          <p className="fm-body" style={{ marginBottom: 24 }}>
            Kein Passwort nötig. Wir senden dir einen Anmelde-Link per E-Mail.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {emailField}
            {sendError}
            <Button variant="primary" disabled={!valid} onClick={send}>
              Anmelde-Link senden
            </Button>
            <button
              className="fm-textlink"
              onClick={() => dispatch({ type: "NAVIGATE", route: "landing" })}
            >
              Zurück
            </button>
          </div>
        </>
      )}

      {phase === "sent" && (
        <div role="status">
          <p className="fm-body" style={{ marginBottom: 20 }}>
            Wir haben dir einen Anmelde-Link an <strong>{email}</strong> gesendet. Öffne die E-Mail
            und tippe auf den Link.
          </p>
          {isMockMode ? (
            <>
              <div className="fm-note" style={{ marginBottom: 20 }}>
                Mock-Modus (kein Supabase konfiguriert): Der E-Mail-Versand ist nicht angebunden.
                Die beiden Buttons unten simulieren das Öffnen des Links.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Button variant="primary" onClick={confirmDemo}>
                  Magic Link öffnen (Demo)
                </Button>
                <Button variant="ghost" onClick={() => setPhase("expired")}>
                  Abgelaufenen Link simulieren (Demo)
                </Button>
              </div>
            </>
          ) : (
            <button className="fm-textlink" onClick={() => setPhase("enter")}>
              Andere E-Mail-Adresse verwenden
            </button>
          )}
        </div>
      )}

      {phase === "expired" && (
        <div role="status">
          {/* §9.4: klarer, freundlicher Hinweis bei abgelaufenem Link */}
          <p className="fm-body" style={{ marginBottom: 20 }}>
            Link abgelaufen — das passiert nach 60 Minuten. Fordere einfach einen neuen Link an.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {emailField}
            {sendError}
            <Button variant="primary" disabled={!valid} onClick={send}>
              Neuen Link anfordern
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
