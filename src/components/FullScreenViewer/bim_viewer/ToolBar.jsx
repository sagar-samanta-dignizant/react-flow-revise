import React from "react";
import "./ToolBar.css"; // Make sure to create this CSS file

const ToolBar = () => {
  return (
    <div className="toolbar-wrapper">
      {/* Orbit */}
      <button className="toolbar-button" onClick={() => { window.viewer.navigationMode = "orbit"; }}>
        <span className="icon">⭯</span> Orbit
      </button>
      
      {/* Free Orbit */}
      <button className="toolbar-button" onClick={() => { window.viewer.navigationMode = "free-orbit"; }}>
        <span className="icon">⭯</span> Free Orbit
      </button>
      
      {/* Pan */}
      <button className="toolbar-button" onClick={() => { window.viewer.navigationMode = "pan"; }}>
        <span className="icon">✋</span> Pan
      </button>
      
      {/* Zoom */}
      <button className="toolbar-button" onClick={() => { window.viewer.navigationMode = "zoom"; }}>
        <span className="icon">🔍</span> Zoom
      </button>
      
      {/* Look Around */}
      <button className="toolbar-button" onClick={() => { window.viewer.navigationMode = "look-around"; }}>
        <span className="icon">👁️</span> Look Around
      </button>
      
      {/* Walk */}
      <button className="toolbar-button" onClick={() => { window.viewer.navigationMode = "walk"; }}>
        <span className="icon">🚶</span> Walk
      </button>
      
      {/* Default View */}
      <button className="toolbar-button" onClick={() => { window.viewer.show(ViewType.DEFAULT); }}>
        <span className="icon">🔄</span> Default
      </button>
      
      {/* Zoom to Selection */}
      <button className="toolbar-button" onClick={() => { 
        const elements = window.viewer.getProductsWithState(State.HIGHLIGHTED);
        window.viewer.zoomTo(elements);
      }}>
        <span className="icon">🔎</span> Zoom to Selection
      </button>
      
      {/* Clip Model */}
      <button className="toolbar-button" onClick={() => { window.plane.stopped = false; }}>
        <span className="icon">✂️</span> Clip Model
      </button>
      
      {/* Reset Clipping */}
      <button className="toolbar-button" onClick={() => { 
        window.viewer.unclip();
        window.plane.stopped = true;
      }}>
        <span className="icon">❌</span> Reset Clipping
      </button>
    </div>
  );
};

export default ToolBar;
