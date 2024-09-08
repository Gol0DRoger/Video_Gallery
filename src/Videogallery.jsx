import React, { useState } from "react";

const VideoGallery = () => {
  const [videoURLs, setVideoURLs] = useState([
    "https://archive.org/download/batmanstrangedays/Batman-Strange%20Days.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "/Hii.mp4",
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoElement, setVideoElement] = useState(null);

  // Function to handle video upload
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newVideoURL = URL.createObjectURL(file);
      setVideoURLs([newVideoURL, ...videoURLs]);  // Add the uploaded video at index 0
      setCurrentIndex(0); // Set the current video to the uploaded one
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextVideo = () => {
    setCurrentIndex((currentIndex + 1) % videoURLs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const previousVideo = () => {
    setCurrentIndex((currentIndex - 1 + videoURLs.length) % videoURLs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;
    setProgress((currentTime / duration) * 100);
  };

  const handleLoadedMetadata = (event) => {
    setVideoElement(event.target);
  };

  const handleProgressBarChange = (event) => {
    const newProgress = event.target.value;
    const duration = videoElement.duration;
    const newTime = (newProgress / 100) * duration;
    videoElement.currentTime = newTime;
    setProgress(newProgress);
  };


  return (
    <div className="video-gallery">

      <input id="file-input" type="file" accept="video/*" onChange={handleVideoUpload}></input>
      <video
        src={videoURLs[currentIndex]}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        width="608" height="340"
        controls={false}
      />
      
        <div className="controls">
        <button onClick={previousVideo}>&lt; Previous</button>
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={nextVideo}>Next &gt;</button>
      </div>
      
     
      <progress id="progress" value={progress} max="100" onChange={handleProgressBarChange}></progress>
      <input id="progress2" value={progress} max="100" onChange={handleProgressBarChange}></input>
    </div>
  );
};

export default VideoGallery;
