
import Sidebar from "./Sidebar"
import ToolBar from "./ToolBar"
import XimViewerLarge from "./XimViewerLarge";
function LargeIfcView({ id, modelPath }) {
  return (
    <div className="LayoutWrapper">
      <Sidebar />
      <div className="ViewerContainer">
        <ToolBar />
        <XimViewerLarge modelPath={modelPath} id={id} />
      </div>
    </div>
  );
}

export default LargeIfcView;
