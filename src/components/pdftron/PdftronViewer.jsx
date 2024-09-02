import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

const PdftronViewer = ({ file }) => {
  const viewerContainerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const initializeViewer = async () => {
      // Cleanup previous instance if it exists
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }

      // Check if viewerContainerRef is set
      if (viewerContainerRef.current) {
        try {
          // Initialize WebViewer
          const instance = await WebViewer(
            {
              path: '/webviewer',
              licenseKey: 'YOUR_LICENSE_KEY',
              initialDoc: `/files/${file}`,
            },
            viewerContainerRef.current
          );
          instanceRef.current = instance;
        } catch (error) {
          console.error('WebViewer initialization failed:', error);
        }
      }
    };

    initializeViewer();

    // Cleanup on component unmount
    return () => {
      if (instanceRef.current) {
        // instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [file]);

  return (
    <div
      ref={viewerContainerRef}
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
};

export default PdftronViewer;






