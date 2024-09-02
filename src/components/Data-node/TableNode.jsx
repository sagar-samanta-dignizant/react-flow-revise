import React, { memo, useCallback } from 'react';
import { Handle, Position, NodeResizer, useReactFlow } from '@xyflow/react';

const TableNode = ({ id, data }) => {
  const { setNodes } = useReactFlow();

  // Callback to handle resizing
  const onResize = useCallback(
    (event, { width, height }) => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, style: { ...node.style, width, height } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px', boxSizing: 'border-box' }}>
      <NodeResizer
        minWidth={200}
        minHeight={150}
        onResize={onResize}
        isResizable={true}
        lineStyle={{ stroke: '#ddd' }}
        handleStyle={{ fill: '#ddd' }}
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ height: '100%', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
            <tr>
              <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Segment</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Phase</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Completed</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Marketing</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Phase 1</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>$1,000</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>In Progress</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Development</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Phase 2</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>$2,500</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <Handle type="source" position={Position.Right} /> */}
    </div>
  );
};

export default memo(TableNode);
