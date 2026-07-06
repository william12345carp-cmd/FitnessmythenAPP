/* [7.5] Tagesfrage — 2 Fragen, 1 Screen (§2) */

import { useState } from "react";
import { useApp } from "../store/appStore.jsx";
import { daysSinceLastActivity, REENTRY_THRESHOLD_DAYS } from "../lib/ruleEngine.js";
import { TIME_OPTIONS, ENERGY_OPTIONS } from "../data/options.js";
import { Button } from "../components/ui/Button.jsx";
import { ChoiceGroup } from "../components/ui/ChoiceGroup.jsx";

export function DailyQuestionScreen({ todayKey, onAnswered }) {
  const { state } = useApp();
  const [time, setTime] = useState(null);
  const [energy, setEnergy] = useState(null);

  const reentry =
    daysSinceLastActivity(state.logs, todayKey) >= REENTRY_THRESHOLD_DAYS;

  return (
    <div className="fm-screen">
      <span className="fm-eyebrow fm-eyebrow--red">
        {reentry ? "Schön, dass du da bist" : "Deine Tagesfrage"}
      </span>
      <h1 className="fm-display fm-display--md" style={{ margin: "10px 0 26px" }}>
        Wie sieht dein Tag heute aus?
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 26, flex: 1 }}>
        <ChoiceGroup
          label="Wie viel Zeit hast du heute?"
          options={TIME_OPTIONS}
          value={time}
          onChange={setTime}
        />
        <ChoiceGroup
          label="Wie ist deine Energie heute?"
          options={ENERGY_OPTIONS}
          value={energy}
          onChange={setEnergy}
        />
      </div>

      <div style={{ marginTop: 28 }}>
        <Button
          variant="primary"
          disabled={!time || !energy}
          onClick={() => onAnswered({ time, energy })}
        >
          Meine Karte zeigen
        </Button>
      </div>
    </div>
  );
}
