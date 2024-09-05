import React from 'react';
import { getBezierPath } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, style, label }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <path id={id} style={style} d={edgePath} />
      <text
        x={(sourceX + targetX) / 2}
        y={(sourceY + targetY) / 2}
        dy="-10"
        textAnchor="middle"
        fill="#333" // Label text color
        fontSize="12px" // Font size
        fontFamily="Arial, sans-serif" // Font family
        backgroundColor="#f8f9fa" // Background color
        border="1px solid #ddd" // Border
        borderRadius="4px" // Rounded corners
        padding="2px 6px" // Padding
        boxShadow="0 2px 4px rgba(0,0,0,0.1)" // Shadow
      >
        {label}
      </text>
    </>
  );
};

export default CustomEdge;
