import { openDB } from "idb";

const DB_NAME = "offline-music-db";
const STORE_NAME = "songs";

export const getDB = () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });

// Save uploaded song
export const saveSongOffline = async (songId, file) => {
  const db = await getDB();
  await db.put(STORE_NAME, file, songId);
};

// Get song for playback
export const getSongOffline = async (songId) => {
  const db = await getDB();
  return db.get(STORE_NAME, songId);
};

// List all offline songs
export const getAllOfflineSongs = async () => {
  const db = await getDB();
  return db.getAllKeys(STORE_NAME);
};
