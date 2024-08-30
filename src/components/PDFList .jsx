// components/PDFList.js
import React from 'react';

const PDFList = ({ pdfs, onOpen, onClear, onDelete }) => {
  return (
    <div>
      {pdfs.map((pdf) => (
        <div key={pdf} style={{ marginBottom: '10px' }}>
          <span>{pdf}</span>
          <button onClick={() => onOpen(pdf)}>Open</button>
          <button onClick={() => onClear(pdf)}>Clear</button>
          <button onClick={() => onDelete(pdf)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PDFList;
