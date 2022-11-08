import React from "react";
import LibrarySong from "./librarySong";

const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
  libraryStatus,
  audioRef,
  isPlaying,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            name={song.name}
            cover={song.cover}
            artist={song.artist}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            key={song.id}
            id={song.id}
            songs={songs}
            setSongs={setSongs}
            active={song.active}
            audioRef={audioRef}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
