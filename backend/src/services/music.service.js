import { supabase } from "../config/supabase.js";

export const getSongsByUser = async (userId) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
