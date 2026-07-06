/* [7.1] Landingpage (§2, Ton gemäß §7) */

import { useApp } from "../store/appStore.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Wordmark } from "../components/ui/Wordmark.jsx";

export function LandingScreen() {
  const { dispatch } = useApp();
  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <Wordmark />

      <div className="fm-landing-hero">
        <span className="fm-eyebrow fm-eyebrow--red">Evidenzbasiert. Ohne Mythen.</span>
        <h1 className="fm-display fm-display--xl" style={{ marginTop: 14 }}>
          Eine Handlung
          <br />
          pro Tag.
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>Mehr nicht.</em>
        </h1>
        <div className="fm-landing-rule" />
        <p className="fm-body">
          Fitnessmythen beantwortet dir jeden Tag genau eine Frage: Was ist heute die eine sinnvolle
          Handlung für meine Gesundheit? Kurz, wissenschaftlich belegt, alltagstauglich.
        </p>
      </div>

      <div className="fm-section">
        <p className="fm-section__title">Was Fitnessmythen nicht ist</p>
        <ul className="fm-not-list">
          <li>
            <s>Kalorienzähler</s>
          </li>
          <li>
            <s>Trainingsplan-Dschungel</s>
          </li>
          <li>
            <s>Motivationstheater</s>
          </li>
          <li>
            <s>Streaks, Punkte, Druck</s>
          </li>
        </ul>
      </div>

      <div className="fm-section">
        <p className="fm-section__title">So funktioniert es</p>
        <ol className="fm-steps">
          <li className="fm-body">
            Du beantwortest zwei kurze Fragen: Wie viel Zeit hast du heute? Wie ist deine Energie?
          </li>
          <li className="fm-body">
            Du bekommst eine Karte mit genau einer Kern-Handlung — und einer kurzen, ehrlichen
            Begründung.
          </li>
          <li className="fm-body">Du erledigst sie und hakst sie ab. Das war der Tag.</li>
        </ol>
      </div>

      <div className="fm-section">
        <p className="fm-section__title">Preis</p>
        <p className="fm-body">
          7 Tage kostenlos testen, danach 150&nbsp;€ pro Monat. Monatlich kündbar, ohne Bindung.
        </p>
      </div>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        <Button variant="red" onClick={() => dispatch({ type: "NAVIGATE", route: "login" })}>
          Kostenlos starten
        </Button>
        <button
          className="fm-textlink"
          onClick={() => dispatch({ type: "NAVIGATE", route: "login" })}
        >
          Ich habe bereits ein Konto
        </button>
        <p className="fm-small" style={{ textAlign: "center", marginTop: 8 }}>
          {/* TODO: Impressum, AGB, Datenschutz, Widerruf — rechtlich prüfen (§11) */}
          Impressum · AGB · Datenschutz · Widerruf
        </p>
      </div>
    </div>
  );
}
