import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="content-wrapper">
        {/* Status Display */}
        <div className="info-section">
          <div className="info-item">
            <strong>Status:</strong>
            <span id="progress"></span>
          </div>
          <div className="info-item">
            <strong>Selected:</strong>
            <span id="ids" /> <br />
            <span id="coords" />
          </div>
          <div className="info-item">
            <strong>Hover-over:</strong>
            <span id="hoverid" /> <br />
            <span id="hovercoords" />
          </div>
          <div className="info-item">
            <strong>Framerate (FPS):</strong>
            <span id="fps" />
          </div>
          <div className="info-item">
            <strong>WebGL version:</strong>
            <span id="webglVersion" />
          </div>
        </div>

        {/* Snapshot Section */}
        <div className="snapshot-section">
          <button
            className="sidebar-button"
            onClick={() => {
              window.cube.stopped = true;

              const view = Viewpoint.GetViewpoint(window.viewer, null);

              var img = document.createElement("img");
              img.src = "data:image/png;base64," + view.snapshot.snapshot_data;
              img.style.width = "100%";
              img.style.cursor = "pointer";

              var place = document.getElementById("snapshot");
              place.innerHTML = "";
              place.appendChild(img);

              img.onclick = () => {
                Viewpoint.SetViewpoint(window.viewer, view, null, 1000);
                place.innerHTML = "";
              };

              window.cube.stopped = false;
            }}
          >
            Take Snapshot
          </button>
          <div id="snapshot" className="snapshot-container" />
          <div id="initialSnapshot"></div>
        </div>

        {/* Rendering Mode Section */}
        <div className="rendering-mode-section">
          <strong>Rendering mode:</strong>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="radioRenderingMode"
                defaultValue="normal"
                defaultChecked="checked"
                onChange={() => {
                  window.viewer.renderingMode = RenderingMode.NORMAL;
                }}
              />
              Normal
            </label>
            <label>
              <input
                type="radio"
                name="radioRenderingMode"
                defaultValue="xray"
                onChange={() => {
                  window.viewer.renderingMode = RenderingMode.XRAY;
                }}
              />
              X-Ray
            </label>
            <label>
              <input
                type="radio"
                name="radioRenderingMode"
                defaultValue="ultraxray"
                onChange={() => {
                  window.viewer.renderingMode = RenderingMode.XRAY_ULTRA;
                }}
              />
              Ultra X-Ray
            </label>
            <label>
              <input
                type="radio"
                name="radioRenderingMode"
                defaultValue="gray"
                onChange={() => {
                  window.viewer.renderingMode = RenderingMode.GRAYSCALE;
                }}
              />
              Grayscale
            </label>
          </div>
        </div>

        {/* Cube and Grid Controls */}
        <div className="controls-section">
          <strong>Grid and navigation cube:</strong>
          <div className="button-group">
            <button className="sidebar-button" onClick={() => { window.cube.stopped = true; }}>
              Stop cube
            </button>
            <button className="sidebar-button" onClick={() => { window.cube.stopped = false; }}>
              Start cube
            </button>
            <button className="sidebar-button" onClick={() => { window.grid.stopped = true; }}>
              Stop grid
            </button>
            <button className="sidebar-button" onClick={() => { window.grid.stopped = false; }}>
              Start grid
            </button>
          </div>
        </div>

        {/* Adjustment Sliders */}
        <div className="sliders-section">
          <strong>Adjustments:</strong>
          <div className="slider-item">
            <label htmlFor="gamma">Gamma:</label>
            <input
              type="range"
              name="gamma"
              min={0}
              max={5}
              defaultValue={1.0}
              step="0.1"
              onInput={(evt) => {
                const value = parseFloat(evt.target.value);
                window.viewer.gamma = value;
              }}
            />
          </div>
          <div className="slider-item">
            <label htmlFor="contrast">Contrast:</label>
            <input
              type="range"
              name="contrast"
              min={0}
              max={5}
              defaultValue={1.0}
              step="0.1"
              onInput={(evt) => {
                const value = parseFloat(evt.target.value);
                window.viewer.contrast = value;
              }}
            />
          </div>
          <div className="slider-item">
            <label htmlFor="brightness">Brightness:</label>
            <input
              type="range"
              name="brightness"
              min={-1}
              max={1}
              defaultValue={0.0}
              step="0.1"
              onInput={(evt) => {
                const value = parseFloat(evt.target.value);
                window.viewer.brightness = value;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
