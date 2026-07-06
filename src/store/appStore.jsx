/* ============================================================================
   [5] APP-STATE — Context + Reducer
   Struktur spiegelt das Datenmodell §9.1 (profiles, daily_logs) wider.
   Prototyp: In-Memory. TODO: Persistenz via Supabase (RLS gemäß §9.2).

   Performance: State und Dispatch liegen in getrennten Contexts —
   `dispatch` ist referenzstabil, reine Aktions-Komponenten rendern dadurch
   nicht bei jeder State-Änderung neu.
============================================================================ */

import { createContext, useContext, useMemo, useReducer } from "react";

export const initialState = {
  route: "landing", // landing | login | onboarding_medical | onboarding_basics | app
  tab: "heute", // heute | profil
  user: null, // { id, email }
  profile: null, // Spalten wie in `profiles` (§9.1)
  logs: [], // Zeilen wie in `daily_logs` (§9.1): {log_date, time_today, energy_today, card_id, completed}
  // Nur Prototyp: simulierter Zeit-Offset in Tagen, um Tageswechsel,
  // Reentry (>=3 Tage) und Trial-Ende (7 Tage) testbar zu machen.
  devDayOffset: 0,
};

export function appReducer(state, action) {
  switch (action.type) {
    case "NAVIGATE":
      return { ...state, route: action.route };
    case "SET_TAB":
      return { ...state, tab: action.tab };
    case "SIGN_IN":
      return { ...state, user: action.user };
    case "SIGN_OUT":
      return { ...initialState, devDayOffset: state.devDayOffset };
    case "CREATE_PROFILE":
      return { ...state, profile: action.profile, route: "app", tab: "heute" };
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.patch } };
    case "ADD_LOG":
      return { ...state, logs: [...state.logs, action.log] };
    case "SET_COMPLETED":
      return {
        ...state,
        logs: state.logs.map((l) =>
          l.log_date === action.logDate ? { ...l, completed: action.completed } : l
        ),
      };
    case "DEV_ADVANCE_DAYS":
      return { ...state, devDayOffset: state.devDayOffset + action.days };
    case "DEV_SET_SUBSCRIPTION":
      return state.profile
        ? { ...state, profile: { ...state.profile, subscription_status: action.status } }
        : state;
    case "DEV_RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);

/** Kompatibler Sammel-Hook — bestehende Aufrufer bleiben unverändert nutzbar. */
export function useApp() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  return { state, dispatch };
}

/** "Jetzt" des Prototyps inkl. Dev-Zeitsimulation. */
export function useNow() {
  const state = useAppState();
  return useMemo(
    () => new Date(Date.now() + state.devDayOffset * 86400000),
    [state.devDayOffset]
  );
}
