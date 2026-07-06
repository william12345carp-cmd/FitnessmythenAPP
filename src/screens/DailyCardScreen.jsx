/* [7.6] Tageskarte (§5.5, §5.6) */

import { useApp } from "../store/appStore.jsx";
import { resolveCardText } from "../lib/ruleEngine.js";
import { formatFolioDate } from "../lib/date.js";
import { logService } from "../services/logService.js";
import { analyticsService } from "../services/analyticsService.js";
import { CheckIcon } from "../components/ui/CheckIcon.jsx";

export function DailyCardScreen({ log, card }) {
  const { state, dispatch } = useApp();
  const profile = state.profile;

  const core = resolveCardText(card.core_action_text, profile);
  const detail = resolveCardText(card.core_action_detail, profile);
  const reason = resolveCardText(card.core_action_reason, profile);
  const secondary = resolveCardText(card.secondary_text, profile);
  const focus = resolveCardText(card.focus_text, profile);
  const shopping = resolveCardText(card.shopping_hint, profile);

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
        <h2 className="fm-card__title">{core}</h2>
        {detail && <p className="fm-card__detail">{detail}</p>}

        {/* §5.6: Begründung, max. 2–3 Sätze, ohne Fachjargon */}
        {reason && <p className="fm-card__reason">Warum: {reason}</p>}

        {/* Nachrangiger Kontext auf DERSELBEN Karte, ohne eigenen Haken (§5.5) */}
        {(secondary || focus || shopping) && (
          <div className="fm-card__secondary">
            {secondary && <p style={{ margin: "0 0 8px" }}>{secondary}</p>}
            {focus && <p style={{ margin: "0 0 8px" }}>{focus}</p>}
            {shopping && (
              <p style={{ margin: 0 }}>
                <strong>Einkauf:</strong> {shopping}
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
