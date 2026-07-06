/* [7.2] Login — Magic Link (§9.4, Mock) */

import { useState } from "react";
import { useApp } from "../store/appStore.jsx";
import { authService } from "../services/authService.js";
import { Button } from "../components/ui/Button.jsx";
import { Field } from "../components/ui/Field.jsx";
import { Wordmark } from "../components/ui/Wordmark.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen() {
  const { dispatch } = useApp();
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState("enter"); // enter | sent | expired
  const valid = EMAIL_PATTERN.test(email.trim());

  async function send() {
    if (!valid) return;
    await authService.sendMagicLink(email.trim());
    setPhase("sent");
  }

  async function confirm() {
    const { user } = await authService.confirmMagicLink(email.trim());
    dispatch({ type: "SIGN_IN", user });
    // §9.4: existiert ein profiles-Eintrag? Nein → Onboarding. (Mock: immer neu.)
    dispatch({ type: "NAVIGATE", route: "onboarding_medical" });
  }

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
            Wir haben dir einen Anmelde-Link an <strong>{email}</strong> gesendet.
            Öffne die E-Mail und tippe auf den Link.
          </p>
          <div className="fm-note" style={{ marginBottom: 20 }}>
            Prototyp: Der E-Mail-Versand ist noch nicht angebunden. Die beiden
            Buttons unten simulieren das Öffnen des Links.
            {/* TODO: Supabase Magic Link real anbinden (§9.4) */}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Button variant="primary" onClick={confirm}>
              Magic Link öffnen (Demo)
            </Button>
            <Button variant="ghost" onClick={() => setPhase("expired")}>
              Abgelaufenen Link simulieren (Demo)
            </Button>
          </div>
        </div>
      )}

      {phase === "expired" && (
        <div role="status">
          {/* §9.4: klarer, freundlicher Hinweis bei abgelaufenem Link */}
          <p className="fm-body" style={{ marginBottom: 20 }}>
            Link abgelaufen — das passiert nach 60 Minuten. Fordere einfach einen
            neuen Link an.
          </p>
          <Button variant="primary" onClick={send}>
            Neuen Link anfordern
          </Button>
        </div>
      )}
    </div>
  );
}
