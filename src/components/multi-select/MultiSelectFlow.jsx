import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Sample nodes and edges
const initialNodes = [
  { id: '1', type: 'default', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, style: {} },
  { id: '2', type: 'default', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, style: {} },
  { id: '3', type: 'default', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, style: {} },
];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [targetNode, setTargetNode] = useState(null);

  const onSelectionChange = useCallback((elements) => {
    const selectedNodes = elements?.nodes || [];
    setSelectedNodes(selectedNodes);
  }, []);

  const handleTargetNodeClick = (node) => {
    setTargetNode(node);
  };

  const connectSelectedNodes = () => {
    if (selectedNodes.length > 1 && targetNode) {
      const newEdges = selectedNodes.map((node) => ({
        id: `e${node.id}-${targetNode.id}`,
        source: node.id,
        target: targetNode.id,
      }));
      setEdges((eds) => [...eds, ...newEdges]);
    }
  };
  // Apply border color based on selection
  const styledNodes = nodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      border: selectedNodes.some((n) => n.id === node.id)
        ? '2px solid blue'  // Border color for selected nodes
        : '1px solid #ddd', // Default border color
    },
  }));

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <ReactFlow
          nodes={styledNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onSelectionChange={onSelectionChange}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>

        {/* Overlay for node selection and connection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            padding: '10px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              backgroundColor: '#fff',
              padding: '10px',
              borderRadius: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              pointerEvents: 'auto',
            }}
          >
            <h4>Selected Nodes:</h4>
            {selectedNodes.length > 0 ? (
              <ul>
                {selectedNodes.map((node) => (
                  <li key={node.id}>{node.id}: {node.data.label}</li>
                ))}
              </ul>
            ) : (
              <p>No nodes selected</p>
            )}
            <h4>Select Target Node:</h4>
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => handleTargetNodeClick(node)}
                style={{ margin: '5px' }}
              >
                {node.data.label}
              </button>
            ))}
            <button
              onClick={connectSelectedNodes}
              disabled={selectedNodes.length < 2 || !targetNode}
              style={{ marginTop: '10px' }}
            >
              Connect Selected Nodes to Target Node
            </button>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowChart;
