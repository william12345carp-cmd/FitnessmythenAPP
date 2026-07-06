-- ============================================================================
-- Fitnessmythen — Initiales Schema (§9.1) + RLS (§9.2)
--
-- Abo-Invarianten (§9.3):
--   * subscription_status setzt AUSSCHLIESSLICH der Stripe-Webhook
--     (Edge Function mit Service-Role-Key). Das Frontend kann die Abo-Spalten
--     nicht schreiben — erzwungen über Spalten-Grants, nicht nur Konvention.
--   * Option B (Entscheidung Gründer, 2026-07-06): Cardless Trial.
--     trial_ends_at setzt die DB beim Anlegen des Profils (Default now()+7d);
--     Stripe Checkout erscheint erst an der Paywall, ohne trial_period_days.
-- ============================================================================

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  weight_kg numeric not null check (weight_kg > 0),
  target_weight_kg numeric not null check (target_weight_kg > 0),
  goal text not null
    check (goal in ('abnehmen', 'energie_kraft', 'muskelaufbau')),
  location_equipment text not null
    check (location_equipment in ('zuhause_ohne', 'zuhause_kurzhanteln', 'fitnessstudio')),
  reminder_setting text not null default 'keine'
    check (reminder_setting in ('keine', 'morgens', 'mittags', 'abends')),
  subscription_status text not null default 'trial'
    check (subscription_status in ('trial', 'active', 'paused', 'cancelled')),
  trial_ends_at timestamptz not null default (now() + interval '7 days'),
  stripe_customer_id text,
  stripe_subscription_id text
);

-- Webhook-Lookup: Profil über die Stripe-Kundennummer finden.
create index profiles_stripe_customer_id_idx on public.profiles (stripe_customer_id);

create table public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  log_date date not null,
  time_today text not null check (time_today in ('kurz', 'mittel', 'lang')),
  energy_today text not null check (energy_today in ('niedrig', 'normal', 'gut')),
  card_id text not null,
  completed boolean not null default false,
  -- §5.3: genau ein Log pro Nutzer und Kalendertag.
  unique (user_id, log_date)
);

-- ----------------------------------------------------------------------------
-- RLS (§9.2): Nutzer sieht und schreibt NUR seine eigenen Zeilen.
-- ----------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.daily_logs enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using ((select auth.uid()) = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles
  for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
-- Kein DELETE-Policy: Profile werden in V1 nicht aus der App gelöscht
-- (Konto-Löschung läuft über auth.users → cascade).

create policy "daily_logs_select_own" on public.daily_logs
  for select using ((select auth.uid()) = user_id);
create policy "daily_logs_insert_own" on public.daily_logs
  for insert with check ((select auth.uid()) = user_id);
create policy "daily_logs_update_own" on public.daily_logs
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
-- Kein DELETE: die Historie ist Grundlage der Reentry-Logik (§5.2).

-- ----------------------------------------------------------------------------
-- Spalten-Grants: Das Frontend (Rolle authenticated) darf die Abo-Spalten
-- nicht schreiben — subscription_status, trial_ends_at, stripe_* setzt nur
-- der Webhook (service_role). §9.3 wird damit von der DB erzwungen.
-- ----------------------------------------------------------------------------

revoke insert, update, delete on table public.profiles from anon, authenticated;
grant insert (id, weight_kg, target_weight_kg, goal, location_equipment, reminder_setting)
  on table public.profiles to authenticated;
grant update (weight_kg, target_weight_kg, goal, location_equipment, reminder_setting)
  on table public.profiles to authenticated;

revoke insert, update, delete on table public.daily_logs from anon, authenticated;
grant insert (user_id, log_date, time_today, energy_today, card_id, completed)
  on table public.daily_logs to authenticated;
grant update (completed)
  on table public.daily_logs to authenticated;
