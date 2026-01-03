import { getOfflineTrack, saveTrackOffline } from "../utils/offlineCache";

export const useOfflineAudio = () => {
  const getPlayableSource = async (track) => {
    // 1️⃣ Try offline first
    const offlineBlob = await getOfflineTrack(track.id);

    if (offlineBlob) {
      return URL.createObjectURL(offlineBlob);
    }

    // 2️⃣ Otherwise stream + cache
    const response = await fetch(track.audio_url);
    const blob = await response.blob();

    await saveTrackOffline(track.id, blob);

    return URL.createObjectURL(blob);
  };

  return { getPlayableSource };
};
