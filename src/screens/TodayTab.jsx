/* [7.7] Heute-Tab: Tagesfrage ODER Karte (§5.3: 1 Log pro Tag) */

import { useApp, useNow } from "../store/appStore.jsx";
import { CONTENT_CARDS } from "../data/mockCards.js";
import { selectCard, daysSinceLastActivity, REENTRY_THRESHOLD_DAYS } from "../lib/ruleEngine.js";
import { localDateKey } from "../lib/date.js";
import { logContentGap } from "../services/contentGapService.js";
import { analyticsService } from "../services/analyticsService.js";
import { DailyQuestionScreen } from "./DailyQuestionScreen.jsx";
import { DailyCardScreen } from "./DailyCardScreen.jsx";

export function TodayTab() {
  const { state, dispatch } = useApp();
  const now = useNow();
  const todayKey = localDateKey(now);
  const todayLog = state.logs.find((l) => l.log_date === todayKey);

  function handleAnswered(dailyInput) {
    const reentry = daysSinceLastActivity(state.logs, todayKey) >= REENTRY_THRESHOLD_DAYS;
    const { card, isContentGap } = selectCard(CONTENT_CARDS, state.profile, dailyInput, reentry);
    if (isContentGap) logContentGap(dailyInput, state.profile, reentry);
    dispatch({
      type: "ADD_LOG",
      log: {
        id: `log-${todayKey}`,
        user_id: state.user.id,
        log_date: todayKey,
        time_today: dailyInput.time,
        energy_today: dailyInput.energy,
        card_id: card.id,
        completed: false,
      },
    });
    analyticsService.track("daily_card_assigned", { reentry, gap: isContentGap });
  }

  if (!todayLog) {
    return <DailyQuestionScreen todayKey={todayKey} onAnswered={handleAnswered} />;
  }
  const card = CONTENT_CARDS.find((c) => c.id === todayLog.card_id);
  return <DailyCardScreen log={todayLog} card={card} />;
}
