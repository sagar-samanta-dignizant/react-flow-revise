import PotreeViewer from "./PotreeViewer";
import SideToolbar from "./SideToolbar";

function PotreeWrapper({ id, file }) {
  
  return (
    <div
      className="potree_container"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        padding:"10px"
      }}
    >
      <PotreeViewer id={id} cloudUrl={file} />
      {/* <SideToolbar /> */}
    </div>
  );
}

export default PotreeWrapper;
