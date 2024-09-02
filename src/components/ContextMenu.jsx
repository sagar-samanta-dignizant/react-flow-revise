// components/ContextMenu.js
import React from 'react';

const ContextMenu = ({ x, y, onDelete, onClose }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <button
        onClick={onDelete}
        style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          border: 'none',
          backgroundColor: '#dc3545',
          color: '#fff',
          cursor: 'pointer',
          borderBottom: '1px solid #ddd',
        }}
      >
        Delete
      </button>
      <button
        onClick={onClose}
        style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          border: 'none',
          backgroundColor: '#6c757d',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ContextMenu;
