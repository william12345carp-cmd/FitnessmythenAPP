// ============================================================================
// KI-Coach — Stufe 2 (Gemini) für den Wissen-Tab.
//
// Läuft bewusst serverseitig statt im Browser: Ein API-Key hinter VITE_*
// würde 1:1 im öffentlichen JS-Bundle landen und wäre für jeden Besucher
// auslesbar (Vite inlined import.meta.env.VITE_* zur Build-Zeit). GEMINI_API_KEY
// ist deshalb ein Supabase-Secret, nie ein Frontend-Env-Wert (siehe .env.example).
//
// Nur eingeloggte Nutzer dürfen aufrufen (schützt das kostenlose Gemini-Kontingent
// vor anonymem Missbrauch) — gleiches Muster wie create-checkout-session.
// ============================================================================

import { supabaseForRequest } from "../_shared/supabaseAdmin.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";

const ZIEL_LABELS: Record<string, string> = {
  abnehmen: "Abnehmen",
  energie_kraft: "Energie & Gesundheit",
  muskelaufbau: "Muskelaufbau",
};
const ORT_LABELS: Record<string, string> = {
  zuhause_ohne: "Zuhause ohne Geräte",
  zuhause_kurzhanteln: "Zuhause mit Kurzhanteln",
  fitnessstudio: "Fitnessstudio",
};

function buildSystemPrompt(profil: Record<string, unknown>) {
  const ziel = ZIEL_LABELS[String(profil?.goal)] ?? "unbekannt";
  const ort = ORT_LABELS[String(profil?.location_equipment)] ?? "unbekannt";

  return `Du bist ein evidenzbasierter Fitness- und Ernährungscoach für die Fitnessmythen App.

NUTZERPROFIL:
- Ziel: ${ziel}
- Körpergewicht: ${profil?.weight_kg ?? "?"} kg
- Zielgewicht: ${profil?.target_weight_kg ?? "?"} kg
- Ort & Equipment: ${ort}

DEINE REGELN:
1. Antworte immer auf Deutsch.
2. Antworte immer evidenzbasiert — keine Mythen, keine unbelegten Meinungen.
3. Antworte kurz und konkret — maximal 3-4 Sätze.
4. Gib immer eine konkrete Handlungsempfehlung am Ende.
5. Verweise bei medizinischen Fragen (Krankheiten, Schmerzen, Diagnosen) immer an einen Arzt.
6. Ernährung, Training, Schlaf, Stress, Gewohnheiten, Motivation — alles erlaubt.
7. Keine Diagnosen, keine Medikamentenempfehlungen.`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const {
      data: { user },
    } = await supabaseForRequest(req).auth.getUser();
    if (!user) return jsonResponse({ error: "unauthorized" }, 401);

    const { frage, profil } = await req.json();
    if (typeof frage !== "string" || !frage.trim() || frage.length > 500) {
      return jsonResponse({ error: "invalid_frage" }, 400);
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return jsonResponse({ error: "gemini_not_configured" }, 500);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: buildSystemPrompt(profil ?? {}) }] },
          contents: [{ parts: [{ text: frage }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.3 },
        }),
      }
    );

    if (!response.ok) {
      console.error("[ai-coach] gemini error", response.status, await response.text());
      return jsonResponse({ error: "gemini_error" }, 502);
    }

    const data = await response.json();
    const antwort = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!antwort) return jsonResponse({ error: "empty_response" }, 502);

    return jsonResponse({ antwort });
  } catch (err) {
    console.error("[ai-coach]", err);
    return jsonResponse({ error: "internal_error" }, 500);
  }
});
