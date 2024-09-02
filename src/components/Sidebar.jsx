import React from 'react';

const Sidebar = ({ files, onPdfSelect, activeNodes, onContextMenu, onAddNode, onAddTableNode }) => {
    // Function to check if a PDF file is active
    const isActive = (fileName) => activeNodes.includes(fileName);
    const getIcons = (file) => {
        const type = file.split(".")[1]
        
        switch (type) {
            case "pdf":

                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8XY_YDie7Ac8UKomGl9HCLTPt_Vi2vsa4Sw&s'
            case "ifc":

                return "https://thumbs.dreamstime.com/z/amazing-vector-icon-ifc-file-editable-design-269037711.jpg"
            case "las":
                return "https://cdn2.iconfinder.com/data/icons/file-documents-1-1/270932/68-512.png"
            default:
                break;
        }
    }
    return (
        <div style={{ width: '250px', backgroundColor: '#f8f9fa', borderRight: '1px solid #ddd', height: '100%', position: 'relative' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #ddd', display: "flex", flexDirection: "column", gap: "5px" }}>
                {/* <button
                    onClick={onAddNode}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'background-color 0.3s',
                        width: '100%'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Load New Viewer
                </button> */}
                <button
                    onClick={onAddTableNode}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'background-color 0.3s',
                        width: '100%'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                >
                    Add Data Table
                </button>
            </div>
            <div style={{ padding: '10px' }}>
                <h3>Files</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {files.map((file, index) => (
                        <li
                            key={index}
                            style={{
                                padding: '10px',
                                marginBottom: '5px',
                                backgroundColor: isActive(file.label) ? '#d4edda' : '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                display: "flex",
                                gap: "10px"
                            }}
                            onClick={() => onPdfSelect(file)}
                            onContextMenu={(e) => onContextMenu(e, file.value)}
                        >
                            <img style={{ height: "20px", width: "20px" }} alt='Not' src={getIcons(file.label)} />
                            {file.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
