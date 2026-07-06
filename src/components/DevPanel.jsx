/* ---------- Dev-Panel — NUR PROTOTYP, vor Produktion entfernen ----------
   Zweck: Tageswechsel (§5.3), Reentry ab 3 Tagen (§5.2) und Trial-Ende nach
   7 Tagen (§9.3) sind ohne Zeitsimulation nicht testbar. Kein Produktfeature.
------------------------------------------------------------------------- */

import { useState } from "react";
import { useApp, useNow } from "../store/appStore.jsx";
import { localDateKey } from "../lib/date.js";

export function DevPanel() {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const now = useNow();

  return (
    <>
      <button className="fm-dev-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        DEV
      </button>
      {open && (
        <div className="fm-dev-panel">
          <strong>Prototyp-Werkzeuge</strong>
          <span>
            Simuliertes Datum: {localDateKey(now)}
            {state.devDayOffset !== 0 ? ` (+${state.devDayOffset} Tage)` : ""}
          </span>
          <button onClick={() => dispatch({ type: "DEV_ADVANCE_DAYS", days: 1 })}>
            +1 Tag (Tageswechsel testen)
          </button>
          <button onClick={() => dispatch({ type: "DEV_ADVANCE_DAYS", days: 3 })}>
            +3 Tage (Reentry testen)
          </button>
          <button onClick={() => dispatch({ type: "DEV_ADVANCE_DAYS", days: 7 })}>
            +7 Tage (Trial-Ende testen)
          </button>
          {state.profile && (
            <>
              <button onClick={() => dispatch({ type: "DEV_SET_SUBSCRIPTION", status: "paused" })}>
                Zahlung fehlgeschlagen simulieren
              </button>
              <button onClick={() => dispatch({ type: "DEV_SET_SUBSCRIPTION", status: "active" })}>
                Abo aktiv setzen
              </button>
            </>
          )}
          <button onClick={() => dispatch({ type: "DEV_RESET" })}>App zurücksetzen</button>
          <span style={{ color: "var(--ink-faint)" }}>TODO: vor Produktion entfernen.</span>
        </div>
      )}
    </>
  );
}
