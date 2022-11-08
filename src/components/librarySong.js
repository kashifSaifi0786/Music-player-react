import React from "react";

const LibrarySong = ({
  name,
  cover,
  artist,
  setCurrentSong,
  id,
  songs,
  setSongs,
  active,
  audioRef,
  isPlaying,
}) => {
  const songHandler = async (e) => {
    const selectedSong = songs.filter((song) => song.id === id);
    await setCurrentSong({ ...selectedSong[0] });

    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songHandler}
      className={`library-song ${active ? "selected" : ""}`}
    >
      <img src={cover} alt={name} />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
