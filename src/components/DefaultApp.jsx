import {
    ReactFlow,
    MiniMap,
    Background,
    BackgroundVariant,
    Controls,
  } from '@xyflow/react';
  
  import '@xyflow/react/dist/style.css';
  import ResizableNode from './components/ResizableNode';
  
  
  const nodeTypes = {
    ResizableNode,
  };
  
  const initialNodes = [
    {
      id: '1',
      type: 'ResizableNode',
      data: { label: 'NodeResizer' },
      position: { x: 0, y: 50 },
      style: {
        background: '#fff',
        border: '1px solid black',
        borderRadius: 15,
        fontSize: 12,
      },
    },
    {
      id: '2',
      type: 'ResizableNode',
      data: { label: 'NodeResizer when selected' },
      position: { x: 100, y: 300 },
      style: {
        background: '#fff',
        border: '1px solid black',
        borderRadius: 15,
        fontSize: 12,
      },
    },
    {
      id: '3',
      type: 'ResizableNode',
      data: { label: 'Custom Resize Icon' },
      position: { x: 150, y: 150 },
      style: {
        background: '#fff',
        fontSize: 12,
        border: '1px solid black',
        padding: 5,
        borderRadius: 15,
        height: 100,
      },
    },
  ];
  
  const initialEdges = [];
  
  export default function NodeToolbarExample() {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <ReactFlow
          defaultNodes={initialNodes}
          defaultEdges={initialEdges}
          className="react-flow-node-resizer-example"
          minZoom={0.2}
          maxZoom={4}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    );
  }
  