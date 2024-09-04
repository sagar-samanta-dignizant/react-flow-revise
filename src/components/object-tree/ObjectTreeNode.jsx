import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { useAnnotations } from '../../contextAPI/AppContext';
import './ObjectTreeNode.css';

const ObjectTreeNode = ({ id }) => {
  const { getAllAnnotations, getSelectedObject } = useAnnotations();
  const annotations = getAllAnnotations();
  const selectedAnnotations = getSelectedObject();

  const isSelected = (annotationId) => selectedAnnotations.some((annotation) => annotation.id === annotationId);

  return (
    <div className="object-tree-node-container">
      <h4 className="object-tree-node-title">Object List</h4>
      <ul className="object-tree-node-list">
        {annotations.map((annotation) => (
          <li
            key={annotation.id}
            className={`object-tree-node-list-item ${isSelected(annotation.id) ? 'selected' : ''}`}
          >
            <div className="object-tree-node-item-content">
              <span className={`status-indicator ${annotation.status}`}></span>
              <span className="nr-tag" style={{ borderColor: annotation.color }}>
                {annotation.nrTag}
              </span>
              <span className="annotation-subject">{annotation.subject}</span>
            </div>
          </li>
        ))}
      </ul>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <NodeResizer
        minWidth={100}
        minHeight={50}
        isResizable={true}
        lineStyle={{ stroke: '#ddd' }}
        handleStyle={{ fill: '#ddd' }}
      />
    </div>
  );
};

export default memo(ObjectTreeNode);
