// FullScreenContext.js
import React, { createContext, useState, useContext } from 'react';

const FullScreenContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState({ fileType: null, data: null });

  const getFileType = (data) => {
    let fileType = null;
    if (data.label.includes("las")) {
      fileType = "las";
    } else if (data.label.includes("video_player")) {
      fileType = "video_player";
    } else {
      fileType = data.file.split(".")[1];
    }
    return fileType
  }

  const handleToggleFullScreen = (data) => {
    if(!data.label){
      setIsFullScreen({ fileType: null, data: null })
      return
    }
    const fileType = getFileType(data)
    setIsFullScreen({ fileType, data });
  };

  return (
    <FullScreenContext.Provider value={{ isFullScreen, handleToggleFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
};

export const useFullScreen = () => useContext(FullScreenContext);
