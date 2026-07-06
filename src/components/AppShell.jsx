/* [8] App-Shell mit Bottom-Navigation und Abo-Sperre (§9.3) */

import { useApp, useNow } from "../store/appStore.jsx";
import { isSubscriptionLocked } from "../lib/ruleEngine.js";
import { TodayTab } from "../screens/TodayTab.jsx";
import { ProfileTab } from "../screens/ProfileTab.jsx";
import { PaywallScreen } from "../screens/PaywallScreen.jsx";

function NavIconToday() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M4 9.5H20" />
      <path d="M9 14.5L11 16.5L15.5 12.5" />
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

export function AppShell() {
  const { state, dispatch } = useApp();
  const now = useNow();
  const locked = isSubscriptionLocked(state.profile, now);

  return (
    <>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {state.tab === "heute" ? (locked ? <PaywallScreen /> : <TodayTab />) : <ProfileTab />}
      </div>
      <nav className="fm-nav" aria-label="Hauptnavigation">
        <button
          className="fm-nav__item"
          aria-current={state.tab === "heute" ? "page" : undefined}
          onClick={() => dispatch({ type: "SET_TAB", tab: "heute" })}
        >
          <NavIconToday />
          Heute
        </button>
        <button
          className="fm-nav__item"
          aria-current={state.tab === "profil" ? "page" : undefined}
          onClick={() => dispatch({ type: "SET_TAB", tab: "profil" })}
        >
          <NavIconProfile />
          Profil
        </button>
      </nav>
    </>
  );
}
