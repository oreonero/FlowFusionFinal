import React, { memo } from "react";
import { Handle } from "reactflow";
import "./App.css";

export default memo(({ data, isConnectable }) => {
  return (
    <div
      style={{
        width: "150px",
        height: "50px",
        borderRadius: "10%",
        backgroundColor: "rgb(34, 129, 218)",
        background: "71F853",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
