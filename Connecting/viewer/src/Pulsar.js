import React, { memo } from "react";
import { Handle } from "reactflow";
import "./App.css";

export default memo(({ data, isConnectable }) => {
  return (
    <div
      style={{
        width: "90px",
        height: "63px",
        borderRadius: "30%",
        borderWidth: '20px',
        backgroundColor: "",
        background: "rgb(104, 194, 194)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:"FF795C",
        fontWeight: 'bold',
    
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
