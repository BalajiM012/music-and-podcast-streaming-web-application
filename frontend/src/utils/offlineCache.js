export const saveForOffline = async (id, blob) => {
  const db = await openDB("offline-audio", 1, {
    upgrade(db) {
      db.createObjectStore("tracks");
    }
  });

  await db.put("tracks", blob, id);
};

export const getOfflineTrack = async (id) => {
  const db = await openDB("offline-audio", 1);
  return db.get("tracks", id);
};
