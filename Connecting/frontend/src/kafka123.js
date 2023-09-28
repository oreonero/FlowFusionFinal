import React, { memo } from "react";
import { Handle } from "reactflow";
import "./App.css";

export default memo(({ data, isConnectable }) => {
  return (
    <div
      style={{
        width: "100px",
        height: "45px",
        borderRadius: "15%",
        borderWidth: '15px',
        backgroundColor: "white",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:"FF795C",
        fontWeight: 'bolder',
        fontFamily: 'Georgia,serif'
    
    
      }}
    >
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div class="dropdown"><h7>{data.label}</h7></div>
      <div class="dropdown-content">
        <h5>Template on how to connect to kafka</h5><br></br>

      </div>
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
