// components/PdftronViewer.js
import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

const PdftronViewer = ({ file }) => {
  const viewer = useRef(null);

  useEffect(() => {
    if (viewer.current) {
      WebViewer(
        {
          path: '/webviewer',
          licenseKey: 'YOUR_LICENSE_KEY',
          initialDoc: `/${file}`,
        },
        viewer.current
      );
    }
  }, [file]);

  return (
    <div className="webviewer" ref={viewer} style={{ height: '100%', width: '100%' }}></div>
  );
};

export default PdftronViewer;
