/* [7.3] Onboarding Schritt 1 — Medizinische Ausschlussfragen (§4) */

import { useId, useState } from "react";
import { useApp } from "../store/appStore.jsx";
import { analyticsService } from "../services/analyticsService.js";
import { MEDICAL_QUESTIONS } from "../data/options.js";
import { Button } from "../components/ui/Button.jsx";
import { Wordmark } from "../components/ui/Wordmark.jsx";

export function OnboardingMedicalScreen() {
  const { dispatch } = useApp();
  const baseId = useId();
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [blocked, setBlocked] = useState(false);
  const allAnswered = answers.every((a) => a !== null);

  function setAnswer(index, value) {
    setAnswers((a) => a.map((v, j) => (j === index ? value : v)));
  }

  function proceed() {
    if (answers.some((a) => a === true)) {
      setBlocked(true);
      analyticsService.track("onboarding_medical_blocked");
    } else {
      analyticsService.track("onboarding_medical_passed");
      dispatch({ type: "NAVIGATE", route: "onboarding_basics" });
    }
  }

  if (blocked) {
    return (
      <div className="fm-screen fm-screen--center" role="alert">
        <Wordmark />
        {/* §4: EXAKT dieser Text, Nutzer kann nicht fortfahren. */}
        <h1 className="fm-display fm-display--md" style={{ margin: "26px 0 14px" }}>
          Bitte sprich zuerst mit deinem Arzt. Diese App ersetzt keine medizinische
          Behandlung.
        </h1>
        <div style={{ marginTop: 24 }}>
          <Button variant="ghost" onClick={() => dispatch({ type: "NAVIGATE", route: "landing" })}>
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fm-screen">
      <span className="fm-eyebrow">Schritt 1 von 2</span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 6px" }}>
        Zuerst vier kurze Fragen zu deiner Gesundheit.
      </h1>
      <p className="fm-body" style={{ marginBottom: 26 }}>
        Damit wir sicher sind, dass Fitnessmythen für dich geeignet ist.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
        {MEDICAL_QUESTIONS.map((q, i) => {
          const questionId = `${baseId}-q${i}`;
          return (
            <div key={i}>
              <p
                id={questionId}
                className="fm-body"
                style={{ color: "var(--ink)", fontWeight: 500, marginBottom: 10 }}
              >
                {q}
              </p>
              <div className="fm-yn" role="radiogroup" aria-labelledby={questionId}>
                <button
                  className="fm-choice"
                  role="radio"
                  aria-checked={answers[i] === true}
                  onClick={() => setAnswer(i, true)}
                  type="button"
                >
                  Ja
                </button>
                <button
                  className="fm-choice"
                  role="radio"
                  aria-checked={answers[i] === false}
                  onClick={() => setAnswer(i, false)}
                  type="button"
                >
                  Nein
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28 }}>
        <Button variant="primary" disabled={!allAnswered} onClick={proceed}>
          Weiter
        </Button>
      </div>
    </div>
  );
}
