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
import LargePotreeView from './components/FullScreenViewer/potree_viewer/LargePotreeView';
import LargeIfcView from './components/FullScreenViewer/bim_viewer/LargeIfcView';
import LargePdftronViewer from './components/FullScreenViewer/pdftron_webviewer/LargePdftronViewer';
import { useAnnotations, useFullScreen } from './contextAPI/AppContext';
import ObjectTreeNode from './components/object-tree/ObjectTreeNode';


const nodeTypes = {
  ResizableNode,
  tableNode: TableNode,
  objectTreeNode: ObjectTreeNode
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
  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);
  const [activeNodes, setActiveNodes] = useState(savedActiveNodes);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const { isFullScreen, handleToggleFullScreen } = useFullScreen();
  const { getSelectedObject } = useAnnotations();

  const onConnect = useCallback(
    (params) => {
      const counts = countAnnotationsByViewerId(getSelectedObject());
      if (selectedNodes.length > 1 && params.target) {
        const newEdges = selectedNodes.map((node) => ({
          id: `e${node.id}-${params.target}`,
          source: node.id,
          target: params.target,
          animated: true,
          label: `${counts[node.id] || 0}`,
          labelBgPadding: [8, 4],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: '#FFCC00', color: '#fff', fontWeight: 700, height: "20px" },
          deletable: true,
        }))
        setEdges((eds) => [...eds, ...newEdges]);
      } else {
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              label: `${counts[params.source] || 0}`,
              labelBgPadding: [8, 4],
              labelBgBorderRadius: 4,
              labelBgStyle: { fill: '#FFCC00', color: '#fff', fontWeight: 700, height: "20px" },
              deletable: true,
              labelStyle: { fontSize: 12 },
              animated: true
            },
            eds
          )
        );
      }
    },
    [selectedNodes, setEdges, getSelectedObject]
  );


  const countAnnotationsByViewerId = (annotations) => {
    const countMap = {};

    annotations.forEach(({ viewerId }) => {
      if (!countMap[viewerId]) {
        countMap[viewerId] = 0;
      }
      countMap[viewerId] += 1;
    });

    return countMap;
  };

  useEffect(() => {
    const selectedObject = getSelectedObject();
    const counts = countAnnotationsByViewerId(selectedObject);

    const updatedEdges = edges.map((edge) => {
      const count = counts[edge.source] || 0;
      return {
        ...edge,
        label: `${count}`,
      };
    });

    // Only update edges if there are existing edges
    if (edges.length > 0) {
      setEdges(updatedEdges);
    }
  }, [getSelectedObject]);




  useEffect(() => {
    localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem(EDGES_STORAGE_KEY, JSON.stringify(edges));
  }, [edges]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_NODES_STORAGE_KEY, JSON.stringify(activeNodes));
  }, [activeNodes]);

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
    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(updatedNodes));
      return updatedNodes;
    });
  }, [nodes, setNodes]);

  const onAddWebPageViewer = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'ResizableNode',
      data: { label: `New_Node_web_page${nodes.length + 1}`, file: 'demo.pdf' },
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

  // Function to add a new table node
  const addTableNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'tableNode',
      data: { label: `Table Node ${nodes.length + 1}` },
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
  const addTreeViewNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'objectTreeNode',
      data: { label: `Tree Node ${nodes.length + 1}` },
      position: { x: 100, y: 300 },
      style: {
        width: 200,
        height: 600,
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

  const onSelectionChange = useCallback((elements) => {
    const selectedNodes = elements?.nodes || [];
    setSelectedNodes(selectedNodes);
  }, []);
  const styledNodes = nodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      border: selectedNodes.some((n) => n.id === node.id)
        ? '2px solid green'  // Border color for selected nodes
        : '1px solid #ddd', // Default border color
    },
  }));
  const generateUniqueId = () => {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const timestampPart = Date.now().toString(36);
    return randomPart + timestampPart;
  };
  const getRenderItem = () => {
    const { data, fileType } = isFullScreen
    const idValue = generateUniqueId();
    switch (fileType) {
      case "pdf":
        return <LargePdftronViewer file={data.file} />;
      case "wexbim":
        const path = `/files/${data.file}`;
        return <LargeIfcView modelPath={path} id={idValue} />;
      case "las":
        return <LargePotreeView id={idValue} file={data.file} />;
      case "video_player":
        return <></>
      // return <VideoAnnotations />; // Assuming VideoAnnotations is where you need full-screen functionality
      default:
        return <>NOT FOUND</>;
    }
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      {isFullScreen.data ? (
        <div style={{ width: "100vw", height: "100vh", display: "flex", gap: "10px" }}>
          <div style={{ width: '100%', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
            <div>
              <button onClick={() => handleToggleFullScreen({ fileType: null, data: null })}>back</button>
            </div>
            {getRenderItem()}
          </div>
        </div>
      ) : (
        <>
          <Sidebar
            files={files}
            onPdfSelect={handlePdfSelect}
            activeNodes={activeNodes}
            onContextMenu={handleContextMenu}
            onAddVideoPlayer={onAddVideoPlayer}
            onAddTableNode={addTableNode}
            addTreeViewNode={addTreeViewNode}
            onAddWebPageViewer={onAddWebPageViewer}
          />
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <ReactFlow
              nodes={styledNodes}
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
              onSelectionChange={onSelectionChange}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </>
      )}
    </div>
  );
}
