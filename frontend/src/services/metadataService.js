// MusicBrainz – metadata (NO API KEY)
export const searchTrackMetadata = async (artist, title) => {
  const query = `recording:${title} AND artist:${artist}`;
  const res = await fetch(
    `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(
      query
    )}&fmt=json`,
    {
      headers: {
        "User-Agent": "OfflineMusicPlayer/1.0 (demo@app.com)"
      }
    }
  );

  const data = await res.json();
  return data.recordings?.[0];
};

// TheAudioDB – album artwork
export const fetchAlbumCover = async (artist) => {
  const res = await fetch(
    `https://theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(
      artist
    )}`
  );

  const data = await res.json();
  return data?.artists?.[0]?.strArtistThumb || null;
};
