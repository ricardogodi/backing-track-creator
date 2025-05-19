import React, { useState } from "react";
import styles from "./MyTracks.module.css";

export default function MyTracks({
  controller,
  setBarLabels,
  setBarsHaveChord,
  setBarsHaveTwoChords,
  setTempo,
  setStyle,
  setDrums,
  setBass,
  tracks,
  setTracks,
  isPlaying
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleLoad = () => {
    const track = tracks[selectedIndex];
    if (!track) return;
    console.log(track)

    controller.load(track.chords);
    controller.changeTempo(track.tempo);
    controller.setDrums(track.style, track.drums);
    controller.setBass(track.style, track.bass);

    setTempo(track.tempo);
    setStyle(track.style);
    setDrums(track.drums);
    setBass(track.bass);

    const updatedLabels = controller.getBarLabels();
    const formatLabel = (label) =>
      label ? `${label.root}${label.quality === "M" ? "" : label.quality}` : "";

    const formattedLabels = updatedLabels.map((label) => ({
      left: formatLabel(label.left),
      middle: formatLabel(label.middle),
      right: formatLabel(label.right),
    }));

    const newBarsHaveChord = updatedLabels.map(
      (label) => !!label.left || !!label.middle || !!label.right
    );

    const newBarsHaveTwoChords = updatedLabels.map(
      (label) => !!label.left && !!label.right
    );

    setBarLabels(formattedLabels);
    setBarsHaveChord(newBarsHaveChord);
    setBarsHaveTwoChords(newBarsHaveTwoChords);
  };

  const handleDelete = async () => {
    const track = tracks[selectedIndex];
    if (!track) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://backing-track-creator.onrender.com/api/track/${track._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete track");

      const data = await res.json();

      setTracks((prev) => prev.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);

      setMessage(data.message);
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      console.error("Error deleting track:", err.message);
      setMessage("Failed to delete track.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleClickItem = (idx) => {
    setSelectedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={`${styles.myTracksWrapper} ${isPlaying ? "disabled" : ""}`}>
      <h3>My Tracks</h3>
      <div className={styles.trackList}>
        {!token || token === "guest" ? (
          <div className={styles.guestMessage}>
            Log in to save and access your backing tracks.
          </div>
        ) : (
          tracks.map((track, idx) => (
            <div
              key={track._id}
              className={`${styles.trackItem} ${idx === selectedIndex ? "selected" : ""}`}
              onClick={() => handleClickItem(idx)}
            >
              {track.name}
            </div>
          ))
        )}
      </div>
      <div className={styles.buttonGroup}>
        <button
          onClick={handleLoad}
          disabled={selectedIndex === null || token === "guest"}
          className={styles.loadButton}
        >
          Load Track
        </button>
        <button
          onClick={handleDelete}
          disabled={selectedIndex === null || token === "guest"}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
      {message && <div className={styles.feedback}>{message}</div>}
    </div>
  );
}
