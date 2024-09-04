import PotreeViewer from "./PotreeViewer";
import SideToolbar from "./SideToolbar";

function LargePotreeView({ id, file }) {
    return (
        <div
            className="potree_container"
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
            }}
        >
            <SideToolbar />
            <PotreeViewer id={id} cloudUrl={file} />
        </div>
    );
}

export default LargePotreeView;
