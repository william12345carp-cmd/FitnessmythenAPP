/* ============================================================================
   Session-Bootstrap beim App-Start (§9.4):
     Session vorhanden → profiles-Eintrag vorhanden? → direkt in die App,
     sonst Onboarding. Keine Session → Landing. Abgelaufener Magic Link →
     Login mit Hinweis. Zusätzlich: Rückkehr aus dem Stripe Checkout
     (?checkout=success) → Profil nachladen, bis der Webhook den Status
     gesetzt hat (§9.3 — das Frontend wartet auf die Wahrheit, statt sie zu raten).
============================================================================ */

import { useEffect } from "react";
import { useAppDispatch } from "../store/appStore.jsx";
import { isMockMode } from "../services/config.js";
import { authService } from "../services/authService.js";
import { profileService } from "../services/profileService.js";
import { logService } from "../services/logService.js";

const CHECKOUT_POLL_ATTEMPTS = 5;
const CHECKOUT_POLL_INTERVAL_MS = 2000;

export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMockMode) {
      dispatch({ type: "BOOT_COMPLETE" });
      return;
    }

    let cancelled = false;
    let knownUserId = null;

    /** Rückkehr aus Stripe Checkout: Webhook-Latenz mit kurzem Polling überbrücken. */
    async function syncAfterCheckout(userId) {
      const params = new URLSearchParams(window.location.search);
      const flag = params.get("checkout");
      if (!flag) return;
      params.delete("checkout");
      const query = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (query ? `?${query}` : ""));
      if (flag !== "success") return;

      for (let attempt = 0; attempt < CHECKOUT_POLL_ATTEMPTS; attempt++) {
        const profile = await profileService.fetchProfile(userId);
        if (cancelled) return;
        if (profile) dispatch({ type: "UPDATE_PROFILE", patch: profile });
        if (profile?.subscription_status === "active") return;
        await new Promise((resolve) => setTimeout(resolve, CHECKOUT_POLL_INTERVAL_MS));
        if (cancelled) return;
      }
    }

    async function enterSession(user) {
      if (knownUserId === user.id) return; // TOKEN_REFRESHED u. Ä. ignorieren
      knownUserId = user.id;
      dispatch({ type: "SIGN_IN", user: { id: user.id, email: user.email } });
      try {
        const profile = await profileService.fetchProfile(user.id);
        if (cancelled) return;
        if (!profile) {
          dispatch({ type: "BOOT_COMPLETE" });
          dispatch({ type: "NAVIGATE", route: "onboarding_medical" });
          return;
        }
        const logs = await logService.fetchLogs(user.id);
        if (cancelled) return;
        dispatch({
          type: "RESTORE_SESSION",
          user: { id: user.id, email: user.email },
          profile,
          logs,
        });
        await syncAfterCheckout(user.id);
      } catch (error) {
        console.error("[bootstrap] session restore failed", error);
        if (!cancelled) dispatch({ type: "BOOT_COMPLETE" });
      }
    }

    // Abgelaufener/ungültiger Magic Link landet als Fehlercode in der Redirect-URL.
    const authError = authService.consumeAuthErrorFromUrl();
    if (authError) dispatch({ type: "AUTH_LINK_EXPIRED" });

    authService.getSession().then((session) => {
      if (cancelled) return;
      if (session?.user) enterSession(session.user);
      else if (!authError) dispatch({ type: "BOOT_COMPLETE" });
    });

    const unsubscribe = authService.onAuthStateChange((event, session) => {
      if (cancelled) return;
      // setTimeout entkoppelt vom Auth-Lock des Supabase-Clients (bekannte
      // Deadlock-Falle: keine weiteren Supabase-Aufrufe direkt im Callback).
      if (event === "SIGNED_IN" && session?.user) {
        setTimeout(() => !cancelled && enterSession(session.user), 0);
      }
      if (event === "SIGNED_OUT") {
        knownUserId = null;
        dispatch({ type: "SIGN_OUT" });
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [dispatch]);
}
