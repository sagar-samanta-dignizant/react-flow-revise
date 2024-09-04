import React, { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeResizer, useReactFlow } from '@xyflow/react';
import './TableNode.css'; // Import the CSS file for styling
import { useAnnotations } from '../../contextAPI/AppContext';

const TableNode = ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const { getAllConnectedNodes } = useAnnotations();
  const [statusFilter, setStatusFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [heightFilter, setHeightFilter] = useState('');
  const annotations = getAllConnectedNodes(id);


  // Filter annotations based on the filters
  const filteredAnnotations = annotations.filter((annotation) => {
    return (
      (statusFilter === '' || annotation.status === statusFilter.toLowerCase()) &&
      (subjectFilter === '' || annotation.subject.toLowerCase().includes(subjectFilter.toLowerCase())) &&
      (heightFilter === '' || annotation.height === parseInt(heightFilter, 10))
    );
  });

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
    <div className="table-node-container">
      <NodeResizer
        minWidth={200}
        minHeight={150}
        onResize={onResize}
        isResizable={true}
        lineStyle={{ stroke: '#ddd' }}
        handleStyle={{ fill: '#ddd' }}
      />
      <Handle type="target" position={Position.Left} />
      <div className="table-scroll-container">
        <table className="table-node-table">
          <thead>
            <tr>
              <th>
                <div className="header-content">
                  <span>Status</span>
                  <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </th>
              <th>
                <div className="header-content">
                  <span>Subject</span>
                  <input
                    className="filter-input"
                    type="text"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    placeholder="Filter by subject"
                  />
                </div>
              </th>
              <th>
                <div className="header-content">
                  <span>Height</span>
                  <input
                    className="filter-input"
                    type="number"
                    value={heightFilter}
                    onChange={(e) => setHeightFilter(e.target.value)}
                    placeholder="Filter by height"
                  />
                </div>
              </th>
              <th>Nr-Tag</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnotations.map((annotation) => (
              <tr key={annotation.id}>
                <td>{annotation.status}</td>
                <td>{annotation.subject}</td>
                <td>{annotation.height}</td>
                <td>{annotation.nrTag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Handle type="source" position={Position.Right} /> */}
    </div>
  );
};

export default memo(TableNode);
