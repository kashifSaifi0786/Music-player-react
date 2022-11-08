import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songInfo,
  setSongInfo,
  audioRef,
  songs,
  setSongs,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animatePercentage}%)`,
  };

  const formatTime = (Time) => {
    return (
      Math.floor(Time / 60) + ":" + ("0" + Math.floor(Time % 60)).slice(-2)
    );
  };

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const skipHandler = async (direction) => {
    let index = songs.findIndex((state) => state.id === currentSong.id);
    if (direction === "skip-forward") {
      activeLibraryHandler(songs[(index + 1) % songs.length]);
      await setCurrentSong(songs[(index + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((index - 1) % songs.length === -1) {
        activeLibraryHandler(songs[songs.length - 1]);
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();

        return;
      }
      activeLibraryHandler(songs[(index - 1) % songs.length]);
      await setCurrentSong(songs[(index - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="player">
      <div className="time-controls">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? formatTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="player-controls">
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-back")}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={handlePlay}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-forward")}
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
