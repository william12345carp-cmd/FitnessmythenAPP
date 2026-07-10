/* [7.6] Tageskarte (§5.5, §5.6)
   Strukturierte Darstellung: Spec-Chips, nummerierte Übungsschritte, ruhiges
   Protein-Badge und Mahlzeiten als Liste — gerendert aus den Feldern der Karte
   (src/data/mockCards.js). Nur Darstellung; Kartenauswahl und Logik unverändert. */

import { useApp } from "../store/appStore.jsx";
import { resolveCardText, proteinTarget } from "../lib/ruleEngine.js";
import { formatFolioDate } from "../lib/date.js";
import { logService } from "../services/logService.js";
import { analyticsService } from "../services/analyticsService.js";
import { CheckIcon } from "../components/ui/CheckIcon.jsx";

export function DailyCardScreen({ log, card }) {
  const { state, dispatch } = useApp();
  const profile = state.profile;
  const r = (text) => resolveCardText(text, profile);

  const nutrition = card.nutrition;
  const hasMeals = Array.isArray(nutrition?.meals) && nutrition.meals.length > 0;
  const proteinG = proteinTarget(profile.target_weight_kg);

  function toggle() {
    const completed = !log.completed;
    dispatch({ type: "SET_COMPLETED", logDate: log.log_date, completed });
    // Optimistisch persistieren — der Haken darf nie am Netz hängen.
    logService
      .setCompleted(state.user.id, log.log_date, completed)
      .catch((error) => console.error("[daily_logs] completed update failed", error));
    analyticsService.track(completed ? "card_completed" : "card_unchecked");
  }

  return (
    <div className="fm-screen" style={{ paddingTop: 22 }}>
      <div className="fm-card">
        <div className="fm-card__folio">
          <span className="fm-eyebrow" style={{ color: "var(--ink)" }}>
            {formatFolioDate(log.log_date)}
          </span>
          <span className="fm-eyebrow fm-eyebrow--red">Heute</span>
        </div>

        {/* §5.5: Kern-Handlung fett, oben, mit Haken — einzige abhakbare Handlung */}
        <h2 className="fm-card__title">{r(card.core_action_text)}</h2>

        {/* Trainings-Spec als ruhige Chips (Sätze · Wdh · Pause) */}
        {Array.isArray(card.spec) && card.spec.length > 0 && (
          <div className="fm-spec">
            {card.spec.map((chip) => (
              <span className="fm-chip" key={chip}>
                {chip}
              </span>
            ))}
          </div>
        )}

        {card.intro && <p className="fm-card__detail">{r(card.intro)}</p>}

        {/* Übungsschritte, nummeriert und lesbar strukturiert */}
        {Array.isArray(card.steps) && card.steps.length > 0 && (
          <ol className="fm-steplist">
            {card.steps.map((step) => (
              <li className="fm-step" key={step.name}>
                <span className="fm-step__name">{r(step.name)}</span>
                <span className="fm-step__detail">{r(step.detail)}</span>
              </li>
            ))}
          </ol>
        )}

        {card.tip && <p className="fm-tip">{r(card.tip)}</p>}

        {/* Fließtext-Anleitung für Nicht-Trainingskarten (Gehen/Dehnen) */}
        {!card.steps && card.core_action_detail && (
          <p className="fm-card__detail">{r(card.core_action_detail)}</p>
        )}

        {/* §5.6: Begründung, max. 2–3 Sätze, ohne Fachjargon */}
        {card.core_action_reason && (
          <p className="fm-card__reason">
            <span className="fm-card__reason-label">Warum</span>
            {r(card.core_action_reason)}
          </p>
        )}

        {/* Nachrangiger Kontext auf DERSELBEN Karte, ohne eigenen Haken (§5.5) */}
        {nutrition && (
          <div className="fm-card__nutrition">
            {hasMeals && (
              <div className="fm-protein" role="note">
                <span className="fm-protein__label">Protein-Ziel heute</span>
                <span className="fm-protein__value">{proteinG} g</span>
              </div>
            )}

            {nutrition.lead && <p className="fm-nutrition__lead">{r(nutrition.lead)}</p>}

            {hasMeals && (
              <ul className="fm-meals">
                {nutrition.meals.map((meal) => (
                  <li className="fm-meal" key={meal.when}>
                    <span className="fm-meal__when">{meal.when}</span>
                    <span className="fm-meal__food">{r(meal.food)}</span>
                    <span className="fm-meal__grams">{meal.grams}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Reentry: sanfte Auswahl statt Mahlzeitenplan */}
            {Array.isArray(nutrition.options) && nutrition.options.length > 0 && (
              <ul className="fm-options">
                {nutrition.options.map((opt) => (
                  <li className="fm-option" key={opt.food}>
                    <span>{r(opt.food)}</span>
                    <span className="fm-option__grams">{opt.grams}</span>
                  </li>
                ))}
              </ul>
            )}

            {nutrition.footnote && <p className="fm-nutrition__foot">{r(nutrition.footnote)}</p>}

            {card.focus_text && (
              <p className="fm-nutrition__foot">
                <strong>Fokus:</strong> {r(card.focus_text)}
              </p>
            )}
            {card.shopping_hint && (
              <p className="fm-nutrition__foot">
                <strong>Einkauf:</strong> {r(card.shopping_hint)}
              </p>
            )}
          </div>
        )}

        <button className="fm-check" aria-pressed={log.completed} onClick={toggle} type="button">
          <span className="fm-check-circle">
            <CheckIcon />
          </span>
          <span>
            <span className="fm-check__label">
              {log.completed ? "Erledigt" : "Als erledigt abhaken"}
            </span>
            <span className="fm-check__sub" style={{ display: "block" }}>
              {log.completed
                ? "Stark. Das war deine Handlung für heute."
                : "Nur die Kern-Handlung zählt."}
            </span>
          </span>
        </button>
      </div>

      {log.completed && (
        <p className="fm-small" style={{ textAlign: "center", marginTop: 18 }}>
          Morgen wartet die nächste Karte. Bis dahin: nichts weiter zu tun.
        </p>
      )}
    </div>
  );
}
