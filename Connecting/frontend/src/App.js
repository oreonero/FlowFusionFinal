import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  applyEdgeChanges, 
  applyNodeChanges 
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import CircleNode from "./CircleNode.js";
//import TextUpdaterNode from './TextUpdaterNode.js';
import rabbitMQ from './rabbitMQ.js';
import kafka from './kafka123.js';
import Pulsar from './Pulsar.js';
import Boomi from './Boomi';
//import Kafka from "./kafka";
//import Rectangle from "./rectangle.js";

const edgeOptions = {
  animated: true,
  style: {
    stroke: "white",
  },
};
const flowKey = "example-flow";

const nodeTypes = {
  circle: CircleNode, 
  //textUpdater: TextUpdaterNode,
  // rectangle: Rectangle
  rabbitMQ: rabbitMQ,
  kafka: kafka,
  Pulsar: Pulsar,
  Boomi:Boomi,
};


const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
  // { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  // { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
];

const initialEdges = [];

const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
     // console.log(JSON.parse(localStorage.getItem(flowKey)))

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  var Appindex = 1;
  const onAddApp = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "App" + " " + Appindex++ },
      type: 'circle',
      position: {
        x: (Math.random() * 400)+300,
        y: (Math.random() * 400)+300,
      },
      sourcePosition: "right", // Set the source position
      targetPosition: "left", // Set the target position
      sourceHandle: "bottom", // Specify the connection point
      targetHandle: "top",
      style: {
        backgroundColor: "black",
        color: "black",
        borderColor: "black",

      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  //Add RABBITMQ
  const rabbitMQ = useCallback(() => {
    const newNode = {
      type: "rabbitMQ",
      id: getNodeId(),
      data: { label: "rabbitMQ" },
      position: {
        x: (Math.random() * 400)+300,
        y: (Math.random() * 400)+300,
      },
      sourcePosition: "right", // Set the source position
      targetPosition: "left", // Set the target position
      sourceHandle: "bottom", // Specify the connection point
      targetHandle: "top",
      style: {
        backgroundColor: "orange",
        color: "black",
        borderColor: "black",}
        
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  //KAFKA
  const Kafka = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Kafka" },
      type: "kafka",
      position: {
        x: (Math.random() * 400)+300,
        y: (Math.random() * 400)+300,
      },
      sourcePosition: "right", // Set the source position
      targetPosition: "left", // Set the target position
      sourceHandle: "bottom", // Specify the connection point
      targetHandle: "top",
      style: {
        backgroundColor: "black",
        color: "black",
        borderColor: "black",
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  //Pulsar
  const Pulsar = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "PULSAR" },
      type: "Pulsar",
      position: {
        x: (Math.random() * 400)+300,
        y: (Math.random() * 400)+300,
      },
      sourcePosition: "right", // Set the source position
      targetPosition: "left", // Set the target position
      sourceHandle: "bottom", // Specify the connection point
      targetHandle: "top",
      style: {
        backgroundColor: "black",
        color: "black",
        borderColor: "black",
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);
  
  //BOOMI
  const Boomi = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Boomi" },
      type: "Boomi",
      position: {
        x: (Math.random() * 400)+300,
        y: (Math.random() * 400)+300,
      },
      sourcePosition: "right", // Set the source position
      targetPosition: "left", // Set the target position
      sourceHandle: "bottom", // Specify the connection point
      targetHandle: "top",
      style: {
        backgroundColor: "black",
        color: "white",
        borderColor: "black",
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <ReactFlow
    defaultEdgeOptions={edgeOptions}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onInit={setRfInstance}
      style={{}}
    >
      <Panel position="top-middle">
        <p>Flow Options</p>
        <button className="addButtonApp" onClick={onAddApp}>
          add App
        </button>
       <button className="rabbitMQ" onClick={rabbitMQ}>
          rabbitMQ
        </button>
        <button className="addButtonCom2" onClick= {Kafka}>
          Kafka
        </button>
      
        <button className="Pulsar" onClick={Pulsar}>
          Pulsar
        </button>
        <button className="boomi" onClick={Boomi}>
          Boomi
        </button>
        <button className="saveButton" onClick={onSave}>
          Save
        </button>
        <button className="restoreButton" onClick={onRestore}>
          Restore
        </button>
      </Panel>
    </ReactFlow>
  );
};

export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
