import { useState } from "react";
import { supabase } from "../services/api";

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const upload = async () => {
    const path = `audio/${Date.now()}-${file.name}`;

    const { data } = await supabase.storage
      .from("audio")
      .upload(path, file);

    const { data: urlData } =
      supabase.storage.from("audio").getPublicUrl(data.path);

    await supabase.from("songs").insert({
      title,
      audio_url: urlData.publicUrl
    });

    alert("Uploaded!");
  };

  return (
    <div className="page">
      <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
