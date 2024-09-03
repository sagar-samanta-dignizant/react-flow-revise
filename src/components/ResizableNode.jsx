import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { Handle, Position, NodeResizer, useReactFlow } from '@xyflow/react';
import PdftronViewer from './pdftron/PdftronViewer';
import IfcViewer from './wexbim/IfcViewer';
import PotreeWrapper from './potree/PotreeWrapper';
import VideoAnnotations from './React_Video/VideoAnnotations';

const ResizableNode = ({ id, data }) => {

  const { setNodes, getNode } = useReactFlow();
  const [mode, setMode] = useState('default');
  const [previousStyle, setPreviousStyle] = useState(null);

  const onResize = useCallback(
    (event, { width, height }) => {
      if (mode === 'default') {
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
    } else if (data.label.includes("video_player")) {
      fileType = "video_player";
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
      case "video_player":
        return <VideoAnnotations />
      default:
        return null;
    }
  }, [data.file, id, data.label]);

  const containerStyles = {
    height: mode === 'work' ? 'calc(100vh - 40px)' : 'calc(100% - 30px)',
    width: '100%',
    padding: "10px",
    overflow: 'auto',
  };

  const handleModeChange = (event) => {
    const newMode = event.target.value;
    if (newMode === 'work') {
      // Save current style before changing to work mode
      const node = getNode(id);
      if (node) {
        setPreviousStyle(node.style);
        setNodes((nodes) =>
          nodes.map((n) =>
            n.id === id
              ? { ...n, style: { ...n.style, width: '100%', height: 'calc(100vh - 40px)' } }
              : n
          )
        );
      }
    } else if (newMode === 'default') {
      // Restore previous style when switching back to default mode
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id && previousStyle
            ? { ...n, style: previousStyle }
            : n
        )
      );
    }
    setMode(newMode);
  };

  useEffect(() => {
    // Apply saved styles when switching to 'work' mode
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
      <div style={{ padding: '5px', height: '30px', zIndex: "100" }}>
        <select onChange={handleModeChange} value={mode} style={{ padding: '5px', fontSize: '14px' }}>
          <option value="default">Default Mode</option>
          <option value="work">Work Mode</option>
        </select>
      </div>
      <NodeResizer
        minWidth={100}
        minHeight={10}
        onResize={onResize}
        isResizable={true}
        lineStyle={{ stroke: '#ddd' }}
        handleStyle={{ fill: '#ddd' }}
      />
      <div style={containerStyles}>
        {renderItem}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};
export default memo(ResizableNode, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id && prevProps.data.file === nextProps.data.file;
});
