/* ============================================================================
   [8] APP / ROUTING / SHELL
   Routing unverändert: state.route steuert die Screens. Neu: useAuthBootstrap
   stellt beim Start die Supabase-Session wieder her (§9.4); bis dahin zeigt
   die App einen ruhigen Boot-Screen statt einer aufblitzenden Landingpage.
============================================================================ */

import { AppProvider, useApp } from "./store/appStore.jsx";
import { useAuthBootstrap } from "./hooks/useAuthBootstrap.js";
import { LandingScreen } from "./screens/LandingScreen.jsx";
import { LoginScreen } from "./screens/LoginScreen.jsx";
import { OnboardingMedicalScreen } from "./screens/OnboardingMedicalScreen.jsx";
import { OnboardingBasicsScreen } from "./screens/OnboardingBasicsScreen.jsx";
import { AppShell } from "./components/AppShell.jsx";
import { DevPanel } from "./components/DevPanel.jsx";
import { Wordmark } from "./components/ui/Wordmark.jsx";

function Root() {
  const { state } = useApp();
  useAuthBootstrap();

  let screen;
  if (state.booting) screen = <BootScreen />;
  else if (state.route === "landing") screen = <LandingScreen />;
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

/** Ruhiger Platzhalter während des Session-Checks (§9.4) — kein Spinner-Drama. */
function BootScreen() {
  return (
    <div className="fm-screen fm-screen--center" aria-busy="true">
      <Wordmark />
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
