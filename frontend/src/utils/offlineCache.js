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

// song = { id, title, artist, album, cover, file }
export const saveSongOffline = async (song) => {
  const db = await getDB();
  await db.put(STORE_NAME, song, song.id);
};

export const getSongOffline = async (id) => {
  const db = await getDB();
  return db.get(STORE_NAME, id);
};

export const getAllSongsOffline = async () => {
  const db = await getDB();
  return db.getAll(STORE_NAME);
};

export const deleteSongOffline = async (id) => {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
};
