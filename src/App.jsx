import React, { useEffect, useCallback, useState } from 'react';
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
import TableNode from './components/Data-node/TableNode';
import Sidebar from './components/Sidebar';


const nodeTypes = {
  ResizableNode,
  tableNode: TableNode,
};

const NODES_STORAGE_KEY = 'react_flow_nodes';
const EDGES_STORAGE_KEY = 'react_flow_edges';
const ACTIVE_NODES_STORAGE_KEY = 'active_nodes';

const initialNodes = [
  // {
  //   id: '1',
  //   type: 'ResizableNode',
  //   data: { label: 'NodeResizer', file: 'pdf-6.pdf' },
  //   position: { x: 20, y: 20 },
  //   style: {
  //     width: 300,
  //     height: 300,
  //     background: '#fff',
  //     border: '1px solid #ddd',
  //     borderRadius: 15,
  //     fontSize: 12,
  //   },
  // },
];

const files = [
  { label: 'one.pdf', value: 'one.pdf' },
  { label: 'two.pdf', value: 'two.pdf' },
  { label: 'four.pdf', value: 'four.pdf' },
  { label: 'five.pdf', value: 'five.pdf' },
  { label: '11.pdf', value: '11.pdf' },
  { label: 'SampleHouse.ifc', value: 'SampleHouse.wexbim' },
  { label: 'BarracksEnvelope.ifc', value: 'BarracksEnvelope.wexbim' },
  { label: 'Restaurant.ifc', value: 'Restaurant.wexbim' },
  { label: 'FourWalls.ifc', value: 'FourWalls.wexbim' },
  { label: 'heidentor.las', value: 'http://5.9.65.151/mschuetz/potree/resources/pointclouds/archpro/heidentor/cloud.js' },
  { label: 'MLS_drive.las', value: 'http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js' },
]
  ;

export default function App() {
  const savedNodes = JSON.parse(localStorage.getItem(NODES_STORAGE_KEY)) || initialNodes;
  const savedEdges = JSON.parse(localStorage.getItem(EDGES_STORAGE_KEY)) || [];
  const savedActiveNodes = JSON.parse(localStorage.getItem(ACTIVE_NODES_STORAGE_KEY)) || [];
  const [activeWorkModeNodeId, setActiveWorkModeNodeId] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);
  const [activeNodes, setActiveNodes] = useState(savedActiveNodes);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem(EDGES_STORAGE_KEY, JSON.stringify(edges));
  }, [edges]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_NODES_STORAGE_KEY, JSON.stringify(activeNodes));
  }, [activeNodes]);

  const addNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'ResizableNode',
      data: { label: `New Node ${nodes.length + 1}`, file: 'demo.pdf' },
      position: { x: 100, y: 300 },
      style: {
        width: 300,
        height: 300,
        background: '#fff',
        border: '1px solid #ddd',
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

  const onAddVideoPlayer = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'ResizableNode',
      data: { label: `New_Node_video_player${nodes.length + 1}`, file: 'demo.pdf' },
      position: { x: 100, y: 300 },
      style: {
        width: 600,
        height: 300,
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: 15,
        fontSize: 12,
      },
    };
    console.log(newNode);
    

    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(updatedNodes));
      return updatedNodes;
    });
  }, [nodes, setNodes]);

  // Function to add a new table node
  const addTableNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'tableNode',
      data: { label: `Table Node ${nodes.length + 1}` },
      position: { x: 100, y: 300 },
      style: {
        width: 600,
        height: 300,
        background: '#fff',
        border: '1px solid #ddd',
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

  // Function to handle PDF selection
  const handlePdfSelect = useCallback((file) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'ResizableNode',
      data: { label: file.label, file: file.value },
      position: { x: 100, y: 300 },
      style: {
        width: 600,
        height: 500,
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: 15,
        fontSize: 12,
      },
    };

    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(updatedNodes));
      return updatedNodes;
    });

    // Update active nodes state
    setActiveNodes((active) => {
      const updatedActiveNodes = [...active, file.label];
      localStorage.setItem(ACTIVE_NODES_STORAGE_KEY, JSON.stringify(updatedActiveNodes));
      return updatedActiveNodes;
    });
  }, [nodes, setNodes, setActiveNodes]);

  const handleNodeDelete = useCallback((nodeId) => {

    setNodes((nds) => {
      const updatedNodes = nds.filter((node) => node.data.label !== nodeId);
      localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(updatedNodes));
      return updatedNodes;
    });

    setActiveNodes((active) => {
      const nodeToRemove = nodes.find((node) => node.data.label === nodeId);

      if (nodeToRemove) {
        const updatedActiveNodes = active.filter((fileName) => fileName !== nodeToRemove.data.file);
        localStorage.setItem(ACTIVE_NODES_STORAGE_KEY, JSON.stringify(updatedActiveNodes));
        return updatedActiveNodes;
      }
      return active;
    });
  }, [nodes, setNodes, setActiveNodes]);
  ;

  const handleContextMenu = useCallback((e, nodeId) => {
    e.preventDefault();
    if (window.confirm('Do you want to delete this node?')) {
      handleNodeDelete(nodeId);
    }
  }, [handleNodeDelete]);


  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <Sidebar
        files={files}
        onPdfSelect={handlePdfSelect}
        activeNodes={activeNodes}
        onContextMenu={handleContextMenu}
        onAddVideoPlayer={onAddVideoPlayer}
        onAddTableNode={addTableNode}
      />
      <div style={{ flexGrow: 1, position: 'relative' }}>
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
          style={{ width: '100%', height: '100%' }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
