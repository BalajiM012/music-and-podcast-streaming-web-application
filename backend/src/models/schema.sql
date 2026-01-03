-- USERS
-- handled by Supabase Auth (auth.users)

-- SONGS TABLE
create table if not exists songs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,

  title text not null,
  artist text,
  album text,

  audio_url text not null,
  cover_url text,

  duration int, -- seconds
  created_at timestamp with time zone default now()
);

-- PLAYLISTS
create table if not exists playlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamp with time zone default now()
);

-- PLAYLIST ↔ SONGS (many-to-many)
create table if not exists playlist_songs (
  playlist_id uuid references playlists(id) on delete cascade,
  song_id uuid references songs(id) on delete cascade,
  position int default 0,

  primary key (playlist_id, song_id)
);

-- OFFLINE CACHE (metadata only, audio stored in IndexedDB)
create table if not exists offline_cache (
  user_id uuid references auth.users(id) on delete cascade,
  song_id uuid references songs(id) on delete cascade,
  cached_at timestamp with time zone default now(),

  primary key (user_id, song_id)
);
