/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useCallback } from "react";

const Potree = window.Potree;

const PotreeViewer = ({ id, cloudUrl }) => {
  const potreeContainerDiv = useRef(null);
  const viewerInitialized = useRef(false);

  const initializeViewer = useCallback(() => {
    if (potreeContainerDiv.current && !viewerInitialized.current) {
      viewerInitialized.current = true;
      const viewerElem = potreeContainerDiv.current;
      const viewer = new Potree.Viewer(viewerElem);

      viewer.setEDLEnabled(true);
      viewer.setFOV(60);
      viewer.setPointBudget(1 * 1000 * 1000);
      viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
      viewer.loadSettingsFromURL();
      viewer.setControls(viewer.orbitControls);

      viewer.loadGUI(() => {
        viewer.setLanguage("en");
        viewer.toggleSidebar();
      });

      Potree.loadPointCloud(cloudUrl)
        .then((e) => {
          const pointcloud = e.pointcloud;
          const material = pointcloud.material;

          material.activeAttributeName = "rgba";
          material.minSize = 2;
          material.pointSizeType = Potree.PointSizeType.FIXED;

          viewer.scene.addPointCloud(pointcloud);
          viewer.fitToScreen();
        })
        .catch((e) => console.error("ERROR: ", e));
    }
  }, [cloudUrl]);

  useEffect(() => {
    initializeViewer();
  }, [initializeViewer]);

  return <div id={`potree_render_area_${id}`} ref={potreeContainerDiv} style={{ height: '100%', width: '100%' }}></div>;
};

export default React.memo(PotreeViewer);
