// FullScreenContext.js
import React, { createContext, useState, useContext } from 'react';

const FullScreenContext = createContext();
const AnnotationContext = createContext();
const NODES_STORAGE_KEY = 'react_flow_nodes';
const EDGES_STORAGE_KEY = 'react_flow_edges';
const ACTIVE_NODES_STORAGE_KEY = 'active_nodes';

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

  const addAnnotation = (annotation) => {
    setAnnotations((prev) => [...prev, { ...annotation }]);
  };

  const setSelectedAnnotation = (annotation) => {
    setSelectedObject((prev) => {
      if (!prev.find((a) => a.id === annotation.id)) {
        return [...prev, annotation];
      }
      return prev;
    });
  };

  const getAllConnectedNodes = (nodeId) => {
    const savedEdges = JSON.parse(localStorage.getItem(EDGES_STORAGE_KEY)) || [];
    const targetNodes = savedEdges ? savedEdges.filter((o) => +o.target === +nodeId) : {}
    if (targetNodes && targetNodes.length) {
      const getAllSourceIds = targetNodes.map((o) => o.source)
      return selectedObject.filter((o) => getAllSourceIds.includes(o.viewerId))
    } else {
      return []
    }
  }

  const clearSelectedAnnotations = (id) => {
    setSelectedObject((prev) => prev.filter((annotation) => annotation.id !== id));
  };
  const getSelectedObject = () => selectedObject;
  const getAnnotations = (nodeId) => annotations[nodeId] || {};
  const getAllAnnotations = () => annotations || [];

  return (
    <AnnotationContext.Provider value={{ annotations, addAnnotation, getAnnotations, getAllConnectedNodes, clearSelectedAnnotations, getAllAnnotations, getSelectedObject, setSelectedAnnotation }}>
      {children}
    </AnnotationContext.Provider>
  );
};

export const useFullScreen = () => useContext(FullScreenContext);
export const useAnnotations = () => useContext(AnnotationContext);
