import React, { useState, useRef } from "react";
import Song from "./components/song";
import Player from "./components/player";
import Library from "./components/library";
import Nav from "./components/nav";
import getSongs from "./data";
import "./style/app.scss";

const App = () => {
  //Refs
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(getSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animatePercentage: 0,
  });

  const updateTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animatePercentage: percentage,
    });
  };

  return (
    <div className={`App ${libraryStatus ? "active-library" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        libraryStatus={libraryStatus}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
      ></audio>
    </div>
  );
};

export default App;
