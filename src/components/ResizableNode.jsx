import { memo, useCallback } from 'react';
import { Handle, Position, NodeResizer, useReactFlow } from '@xyflow/react';
import PdftronViewer from './pdftron/PdftronViewer';

const ResizableNode = ({ id, data }) => {
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
    <>
      <NodeResizer
        minWidth={100}
        minHeight={10}
        onResize={onResize}
        isResizable={true}
        lineStyle={{ stroke: '#ddd' }}
        handleStyle={{ fill: '#ddd' }}
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ height: '100%', width: '100%', padding: "10px" }}>
        <PdftronViewer file={data.file} />
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNode);
