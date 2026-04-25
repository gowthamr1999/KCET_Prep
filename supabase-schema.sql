-- Run this in the Supabase SQL editor if leaderboard names are not appearing.
-- The app writes the entered name into test_attempts.candidate_name.

alter table public.test_attempts
add column if not exists candidate_name text;

comment on column public.test_attempts.candidate_name
is 'Optional display name entered before starting a KCET or BITSAT test.';
