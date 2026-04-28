-- Run this in the Supabase SQL editor if leaderboard names are not appearing.
-- The app writes the entered name into test_attempts.candidate_name.

alter table public.test_attempts
add column if not exists candidate_name text;

comment on column public.test_attempts.candidate_name
is 'Optional display name entered before starting a KCET or BITSAT test.';

-- Enables "Beat My Score Room" links where friends compete on the same test.
alter table public.test_attempts
add column if not exists room_id text;

comment on column public.test_attempts.room_id
is 'Optional shared challenge room identifier for grouping friends on the same test leaderboard.';

create index if not exists test_attempts_room_lookup_idx
on public.test_attempts (exam_type, paper_id, room_id, score desc, time_taken_seconds asc, created_at asc);
