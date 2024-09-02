import { Rnd } from "react-rnd";

const style = {
    border: "solid 1px #ddd",
    padding: "10px",
    boxSizing: "border-box"
};

const ReactDragResizeBox = ({ children, defaultPos, defaultSize }) => (
    <Rnd
        style={style}
        default={{
            ...defaultPos,
            ...defaultSize
        }}
    >
        {children}
    </Rnd>
);

export default ReactDragResizeBox;
