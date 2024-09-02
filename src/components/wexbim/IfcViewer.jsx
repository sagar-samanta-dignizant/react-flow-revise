/* eslint-disable react/display-name */
import { Grid, LoaderOverlay, NavigationCube, ViewType, Viewer } from "@xbim/viewer";
import React, { useCallback, useEffect } from "react";

const IfcViewer = React.memo(({ modelPath, id }) => {
  // Initialize viewer using useCallback to memoize the function
  const initializeViewer = useCallback((model) => {
    const canvasId = `${id}-xBIM-viewer2`; // Correctly concatenate id to create unique canvas ID
    const viewer = new Viewer(canvasId); // Pass the unique canvas ID to Viewer

    const overlay = new LoaderOverlay();
    viewer.addPlugin(overlay);
    overlay.show();

    // Viewer configuration settings
    viewer.readerOptions.orderGeometryBySize = true;
    viewer.cameraProperties.fov = 53;
    viewer.background = [0, 0, 0, 0];
    viewer.hoverPickEnabled = true;
    viewer.highlightingColour = [0, 0, 225, 200];

    // Add grid plugin to the viewer
    const grid = new Grid();
    window.grid = grid;
    grid.zFactor = 20;
    grid.colour = [0, 0, 0, 0.8];
    viewer.addPlugin(grid);

    // Define viewer styles
    viewer.defineStyle(0, [255, 0, 0, 255]);  // Red
    viewer.defineStyle(1, [0, 0, 255, 100]);  // Semi-transparent blue
    viewer.defineStyle(2, [255, 255, 255, 255]); // White

    // Load the model and set up event listeners
    viewer.load(model);
    viewer.on('loaded', () => {
      viewer.start();
      overlay.hide();
      viewer.show(ViewType.DEFAULT, undefined, undefined, false);
    });
  }, []);

  // Effect to initialize viewer on modelPath or id change
  useEffect(() => {
    initializeViewer(modelPath);
  }, [initializeViewer, modelPath]);

  return (
    // Assign unique ID to canvas element
    <canvas style={{ width: "100%", height: "100%" }} id={`${id}-xBIM-viewer2`}></canvas>
  );
});

export default IfcViewer;
