import { openDB } from "idb";

const DB_NAME = "offline-audio-db";
const STORE_NAME = "tracks";

export const getDB = () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });

export const saveTrackOffline = async (trackId, audioBlob) => {
  const db = await getDB();
  await db.put(STORE_NAME, audioBlob, trackId);
};

export const getOfflineTrack = async (trackId) => {
  const db = await getDB();
  return db.get(STORE_NAME, trackId);
};

export const isTrackOffline = async (trackId) => {
  const db = await getDB();
  const track = await db.get(STORE_NAME, trackId);
  return !!track;
};
