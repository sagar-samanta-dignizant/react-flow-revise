import React, { useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import { useAnnotations } from '../../contextAPI/AppContext';
import './WebSiteViewer.css'; // Import CSS for styling
import axios from "axios"
const WebSiteViewer = ({ id }) => {
    const viewerContainerRef = useRef(null);
    const instanceRef = useRef(null);
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    const { addAnnotation, setSelectedAnnotation, clearSelectedAnnotations } = useAnnotations();

    const generateRandomTag = () => Math.floor(100 + Math.random() * 900);

    const generateRandomStatus = () => {
        const statuses = ['in-progress', 'completed', 'pending'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://shot.screenshotapi.net/screenshot', {
                params: {
                    url,
                    token: 'S5C8QRJ-J23MP5J-MHC76EH-10BX2WY',
                    full_page: true,
                    output: 'image',
                    file_type: 'png',
                    wait_for_event: 'load',
                },
                responseType: 'blob',
            });
            if (response) {
                setFile(response.request.responseURL)
            }


        } catch (error) {
            console.error('Failed to fetch screenshot:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const initializeViewer = async () => {

            if (viewerContainerRef.current) {
                try {
                    if (!instanceRef.current) {
                        const instance = await WebViewer(
                            {
                                path: '/webviewer',
                                licenseKey: 'YOUR_LICENSE_KEY',
                                initialDoc: file,
                            },
                            viewerContainerRef.current
                        );
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
        if (file) {
            initializeViewer();
        }
    }, [file, id, addAnnotation]);

    return (
        <div style={{ height: "100%" }}>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            {loading && (
                <div className="loader">
                    <div className="spinner"></div>
                </div>
            )}
            {file && <div
                ref={viewerContainerRef}
                style={{ height: '100%', width: '100%' }}
            ></div>}

        </div>
    );
};

export default WebSiteViewer;
