import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import './VideoAnnotations.css';

const VideoAnnotations = () => {
  const playerRef = useRef(null);
  const [annotations, setAnnotations] = useState([]);
  const [annotationText, setAnnotationText] = useState('');
  const [manualTimestamp, setManualTimestamp] = useState('');
  const [videoURL, setVideoURL] = useState('https://www.youtube.com/watch?v=JumU3MT7p2U');

  const handleAddAnnotation = () => {
    let timestamp;
    if (manualTimestamp) {
      timestamp = parseFloat(manualTimestamp);
    } else if (playerRef.current) {
      timestamp = playerRef.current.getCurrentTime();
    }

    if (timestamp !== undefined && annotationText) {
      setAnnotations([
        ...annotations,
        { time: timestamp, text: annotationText }
      ]);
      setAnnotationText('');
      setManualTimestamp('');
    }
  };

  const handleSeekTo = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, 'seconds');
    }
  };

  const handleDeleteAnnotation = (index) => {
    setAnnotations(annotations.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="url-input-container">
        <input
          type="text"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          placeholder="Enter video URL"
          className="url-input-field"
        />
      </div>
      <div className="container">

        <div className="video-container">
          <div className="player-wrapper">
            <ReactPlayer
              ref={playerRef}
              url={videoURL}
              controls
              width="100%"
              height="100%"
              className="react-player"
            />
          </div>
        </div>

        <div className="annotations-container">
          <div className="input-container">
            <input
              type="text"
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              placeholder="Enter text"
              onKeyDown={(e) => e.key === 'Enter' && handleAddAnnotation()}
              className="input-field"
            />
            <input
              type="text"
              value={manualTimestamp}
              onChange={(e) => setManualTimestamp(e.target.value)}
              placeholder="Enter timestamp (seconds)"
              className="timestamp-input-field"
            />
            <button onClick={handleAddAnnotation} className="add-button">Add Note</button>
          </div>
          <div className="annotations-list">
            <h3>Annotations</h3>
            <ul>
              {annotations.map((annotation, index) => (
                <li key={index} className="annotation-item">
                  <div className="annotation-content">
                    <button onClick={() => handleSeekTo(annotation.time)} className="timestamp-button">
                      {new Date(annotation.time * 1000).toISOString().substr(11, 8)}
                    </button>
                    <span>{annotation.text}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnotation(index)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VideoAnnotations;
