/* ============================================================================
   [8] APP / ROUTING / SHELL
   Routing unverändert aus dem Prototyp: state.route steuert die Screens,
   der AppProvider (Reducer + Context) liegt jetzt in src/store/appStore.jsx.
============================================================================ */

import { AppProvider, useApp } from "./store/appStore.jsx";
import { LandingScreen } from "./screens/LandingScreen.jsx";
import { LoginScreen } from "./screens/LoginScreen.jsx";
import { OnboardingMedicalScreen } from "./screens/OnboardingMedicalScreen.jsx";
import { OnboardingBasicsScreen } from "./screens/OnboardingBasicsScreen.jsx";
import { AppShell } from "./components/AppShell.jsx";
import { DevPanel } from "./components/DevPanel.jsx";

function Root() {
  const { state } = useApp();

  let screen;
  if (state.route === "landing") screen = <LandingScreen />;
  else if (state.route === "login") screen = <LoginScreen />;
  else if (state.route === "onboarding_medical") screen = <OnboardingMedicalScreen />;
  else if (state.route === "onboarding_basics") screen = <OnboardingBasicsScreen />;
  else screen = <AppShell />;

  return (
    <div className="fm-root">
      <div className="fm-phone">
        {screen}
        <DevPanel />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
