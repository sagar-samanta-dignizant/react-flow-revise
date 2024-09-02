import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { Handle, Position, NodeResizer, useReactFlow } from '@xyflow/react';
import PdftronViewer from './pdftron/PdftronViewer';
import IfcViewer from './wexbim/IfcViewer';
import PotreeWrapper from './potree/PotreeWrapper';

const ResizableNode = ({ id, data, activeWorkModeNodeId, setActiveWorkModeNodeId }) => {
  const { setNodes, getNode } = useReactFlow();
  const [mode, setMode] = useState('default'); // State to manage mode

  const onResize = useCallback(
    (event, { width, height }) => {
      if (mode === 'default') { // Only resize in default mode
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? { ...node, style: { ...node.style, width, height } }
              : node
          )
        );
      }
    },
    [id, setNodes, mode]
  );

  const generateUniqueId = () => {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const timestampPart = Date.now().toString(36);
    return randomPart + timestampPart;
  };

  const renderItem = useMemo(() => {
    let fileType = null;
    if (data.label.includes("las")) {
      fileType = "las";
    } else {
      fileType = data.file.split(".")[1];
    }
    switch (fileType) {
      case "pdf":
        return <PdftronViewer file={data.file} />;
      case "wexbim":
        const path = `/files/${data.file}`;
        return <IfcViewer modelPath={path} id={id} />;
      case "las":
        const idValue = generateUniqueId();
        return <PotreeWrapper id={idValue} file={data.file} />;
      default:
        return null;
    }
  }, [data.file, id, data.label]);

  // Adjust container styles based on mode
  const containerStyles = {
    height: mode === 'work' ? 'calc(100vh - 40px)' : 'calc(100% - 30px)', // Full height in work mode
    width: '100%',
    padding: "10px",
    overflow: 'auto',
    pointerEvents: mode === 'work' ? 'none' : 'auto',
    opacity: mode === 'work' ? 0.5 : 1,
  };

  // Handle mode change
  const handleModeChange = (newMode) => {
    if (newMode === 'work') {
      setActiveWorkModeNodeId(id);
    } else {
      setActiveWorkModeNodeId(null);
    }
    setMode(newMode);
  };

  useEffect(() => {
    // Revert node size if not active in work mode
    if (mode === 'work' && activeWorkModeNodeId !== id) {
      setMode('default');
    }
  }, [activeWorkModeNodeId, id, mode]);

  useEffect(() => {
    if (mode === 'work') {
      const node = getNode(id);
      if (node) {
        setNodes((nodes) =>
          nodes.map((n) =>
            n.id === id
              ? { ...n, style: { ...n.style, width: '100%', height: 'calc(100vh - 40px)' } }
              : n
          )
        );
      }
    }
  }, [mode, id, getNode, setNodes]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', height: '30px' }}>
        <button onClick={() => handleModeChange('work')} style={{ marginRight: '5px' }}>Work Mode</button>
        <button onClick={() => handleModeChange('default')}>Default Mode</button>
      </div>
      {mode === 'default' && (
        <NodeResizer
          minWidth={100}
          minHeight={10}
          onResize={onResize}
          isResizable={true}
          lineStyle={{ stroke: '#ddd' }}
          handleStyle={{ fill: '#ddd' }}
        />
      )}
      <div style={containerStyles}>
        {renderItem}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

// Use a custom comparison function for React.memo
export default memo(ResizableNode, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id && prevProps.data.file === nextProps.data.file;
});
