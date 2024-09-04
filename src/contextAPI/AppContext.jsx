// FullScreenContext.js
import React, { createContext, useState, useContext } from 'react';

const FullScreenContext = createContext();
const AnnotationContext = createContext();


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
    if (!data.label) {
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
export const AnnotationProvider = ({ children }) => {
  const [annotations, setAnnotations] = useState([]);
  const [selectedObject, setSelectedObject] = useState([])

  const addAnnotation = (nodeId, annotation) => {
    setAnnotations((prev) => [...prev, { ...annotation, nodeId }]);
  };

  const setSelectedAnnotation = (annotation) => {
    setSelectedObject((prev) => {
      if (!prev.find((a) => a.id === annotation.id)) {
        return [...prev, annotation];
      }
      return prev;
    });
  };

  const clearSelectedAnnotations = (id) => {
    setSelectedObject((prev) => prev.filter((annotation) => annotation.id !== id));
  };
  const getSelectedObject = () => selectedObject;
  const getAnnotations = (nodeId) => annotations[nodeId] || {};
  const getAllAnnotations = () => annotations || [];

  return (
    <AnnotationContext.Provider value={{ annotations, addAnnotation, getAnnotations, clearSelectedAnnotations, getAllAnnotations, getSelectedObject, setSelectedAnnotation }}>
      {children}
    </AnnotationContext.Provider>
  );
};

export const useFullScreen = () => useContext(FullScreenContext);
export const useAnnotations = () => useContext(AnnotationContext);
