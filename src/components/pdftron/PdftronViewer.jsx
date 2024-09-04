import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';
import { useAnnotations } from '../../contextAPI/AppContext';

const PdftronViewer = ({ file, id }) => {
  const viewerContainerRef = useRef(null);
  const instanceRef = useRef(null);
  const { addAnnotation, setSelectedAnnotation, clearSelectedAnnotations } = useAnnotations();

  const generateRandomTag = () => Math.floor(100 + Math.random() * 900);

  const generateRandomStatus = () => {
    const statuses = ['in-progress', 'completed', 'pending'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  useEffect(() => {
    const initializeViewer = async () => {
      // Check if viewerContainerRef is set
      if (viewerContainerRef.current) {
        try {
          // Prevent creating multiple instances on the same element
          if (!instanceRef.current) {
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

            // Access the annotationManager to listen for annotation changes
            const { annotationManager } = instance.Core;
            annotationManager.addEventListener('annotationChanged', (annotations, action) => {
              if (action === 'add') {
                annotations.forEach((annotation) => {
                  const annotationData = {
                    id: annotation.Id,
                    text: annotation.getContents(),
                    subject: annotation.Subject,
                    pageNumber: annotation.PageNumber,
                    name: annotation.Subject || 'Untitled',
                    nrTag: generateRandomTag(),
                    status: generateRandomStatus(),
                    color: 'blue',
                    height: 1,
                    viewerId: id
                  };
                  addAnnotation(annotationData);
                });
              }
            });
            annotationManager.addEventListener('annotationSelected', (annotations, action) => {
              if (action === 'selected') {
                annotations.forEach((annotation) => {
                  const annotationData = {
                    id: annotation.Id,
                    text: annotation.getContents(),
                    subject: annotation.Subject,
                    pageNumber: annotation.PageNumber,
                    name: annotation.Subject || 'Untitled',
                    nrTag: generateRandomTag(),
                    status: generateRandomStatus(),
                    color: 'blue',
                    height: 1,
                    viewerId: id
                  };
                  setSelectedAnnotation(annotationData);
                });
              }
            });

            annotationManager.addEventListener('annotationDeselected', (annotations) => {
              annotations.forEach((annotation) => {
                clearSelectedAnnotations(annotation.Id);
              });
            });
          }
        } catch (error) {
          console.error('WebViewer initialization failed:', error);
        }
      }
    };

    initializeViewer();

    return () => {

    };
  }, [file, id, addAnnotation]); // Dependencies

  return (
    <div
      ref={viewerContainerRef}
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
};

export default PdftronViewer;
