import React, { useEffect, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ResizableNode from './components/ResizableNode';

const nodeTypes = {
  ResizableNode,
};

const NODES_STORAGE_KEY = 'react_flow_nodes';
const EDGES_STORAGE_KEY = 'react_flow_edges';

const initialNodes = [
  {
    id: '1',
    type: 'ResizableNode',
    data: { label: 'NodeResizer', file: 'pdf-6.pdf' },
    position: { x: 0, y: 50 },
    style: {
      width: 300,
      height: 300,
      background: '#fff',
      border: '1px solid black',
      borderRadius: 15,
      fontSize: 12,
    },
  },
];

export default function App() {
  const savedNodes = JSON.parse(localStorage.getItem(NODES_STORAGE_KEY)) || initialNodes;
  const savedEdges = JSON.parse(localStorage.getItem(EDGES_STORAGE_KEY)) || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem(EDGES_STORAGE_KEY, JSON.stringify(edges));
  }, [edges]);

  // Function to add a new node
  const addNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'ResizableNode',
      data: { label: `New Node ${nodes.length + 1}`, file: '11.pdf' },
      position: { x: 100, y: 300 },
      style: {
        width: 300,
        height: 300,
        background: '#fff',
        border: '1px solid black',
        borderRadius: 15,
        fontSize: 12,
      },
    };

    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(updatedNodes));
      return updatedNodes;
    });
  }, [nodes, setNodes]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <button onClick={addNode} style={{ position: 'absolute', zIndex: 10 }}>
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="react-flow-node-resizer-example"
        minZoom={0.2}
        maxZoom={4}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        nodeTypes={nodeTypes}
        fitViewOptions={{ padding: 0.2 }}
        style={{ width: '200vw', height: '200vh' }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
