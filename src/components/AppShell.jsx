/* [8] App-Shell mit Bottom-Navigation und Abo-Sperre (§9.3)
   Schritt 1: 5 Tabs — Heute, Wissen, Plan, Einkauf, Profil.
   Die Abo-Sperre gilt nur für die Tageskarte (Heute); die übrigen
   Tabs bleiben auch ohne aktives Abo erreichbar. */

import { useApp, useNow } from "../store/appStore.jsx";
import { isSubscriptionLocked } from "../lib/ruleEngine.js";
import { TodayTab } from "../screens/TodayTab.jsx";
import { ProfileTab } from "../screens/ProfileTab.jsx";
import { PaywallScreen } from "../screens/PaywallScreen.jsx";
import { WissenScreen } from "../screens/WissenScreen.jsx";
import { PlanScreen } from "../screens/PlanScreen.jsx";
import { EinkaufScreen } from "../screens/EinkaufScreen.jsx";

function NavIconToday() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M4 9.5H20" />
      <path d="M9 14.5L11 16.5L15.5 12.5" />
    </svg>
  );
}
function NavIconWissen() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M12 6.5C10.5 5.3 8.4 4.8 5.5 5V17.5C8.4 17.3 10.5 17.8 12 19" />
      <path d="M12 6.5C13.5 5.3 15.6 4.8 18.5 5V17.5C15.6 17.3 13.5 17.8 12 19" />
      <path d="M12 6.5V19" />
    </svg>
  );
}
function NavIconPlan() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <rect x="4" y="5.5" width="16" height="14" rx="3" />
      <path d="M4 10H20" />
      <path d="M8.5 4V7" />
      <path d="M15.5 4V7" />
    </svg>
  );
}
function NavIconEinkauf() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M6 8H18L17 19.5H7L6 8Z" />
      <path d="M9 9.5V7.5C9 5.8 10.3 4.5 12 4.5C13.7 4.5 15 5.8 15 7.5V9.5" />
    </svg>
  );
}
function NavIconProfile() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19.5C6.4 16.4 9 15 12 15C15 15 17.6 16.4 19 19.5" />
    </svg>
  );
}

const TABS = [
  { id: "heute", label: "Heute", Icon: NavIconToday },
  { id: "wissen", label: "Wissen", Icon: NavIconWissen },
  { id: "plan", label: "Plan", Icon: NavIconPlan },
  { id: "einkauf", label: "Einkauf", Icon: NavIconEinkauf },
  { id: "profil", label: "Profil", Icon: NavIconProfile },
];

function renderTab(tab, locked) {
  switch (tab) {
    case "heute":
      return locked ? <PaywallScreen /> : <TodayTab />;
    case "wissen":
      return <WissenScreen />;
    case "plan":
      return <PlanScreen />;
    case "einkauf":
      return <EinkaufScreen />;
    case "profil":
      return <ProfileTab />;
    default:
      return locked ? <PaywallScreen /> : <TodayTab />;
  }
}

export function AppShell() {
  const { state, dispatch } = useApp();
  const now = useNow();
  const locked = isSubscriptionLocked(state.profile, now);

  return (
    <>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {renderTab(state.tab, locked)}
      </div>
      <nav className="fm-nav" aria-label="Hauptnavigation">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className="fm-nav__item"
            aria-current={state.tab === id ? "page" : undefined}
            onClick={() => dispatch({ type: "SET_TAB", tab: id })}
          >
            <Icon />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
