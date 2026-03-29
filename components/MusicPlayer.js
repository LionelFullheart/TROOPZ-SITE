"use client";

import { useEffect, useRef, useState } from "react";

export function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    function startAfterInteraction() {
      if (!audioRef.current || isPlaying) {
        return;
      }

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsReady(true);
        })
        .catch(() => {
          setIsReady(true);
        });
    }

    window.addEventListener("pointerdown", startAfterInteraction, { once: true });
    window.addEventListener("keydown", startAfterInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
    };
  }, [isPlaying]);

  async function togglePlayback() {
    if (!audioRef.current) {
      return;
    }

    setIsReady(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src="/music/welcome-to-dawgs.mp3"
        loop
        preload="metadata"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <div className="music-helmet" aria-hidden="true">
        🪖
      </div>
      <div className="music-meta">
        <p className="music-label">Now Playing</p>
        <strong>1of1Soldier</strong>
        <span>Welcome To Dawgs</span>
      </div>
      <button type="button" className="music-button" onClick={togglePlayback}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      {!isReady ? <span className="music-hint">Starts after your first tap</span> : null}
    </div>
  );
}
