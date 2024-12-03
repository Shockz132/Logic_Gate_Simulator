import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
} from '@xyflow/react';

import { logicGates,  SideBar } from './SideBar.jsx';
import { VariableA, VariableB, VariableC, VariableD, VariableX, NOTGate, ANDGate, NANDGate, ORGate, NORGate, XORGate, XNORGate } from './LogicGateNodes.jsx';
import ButtonEdge from './ButtonEdge.jsx';



import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  // source node
  { id: 'a', type: 'VariableA', position: { x: 50, y: 50 }, data: { label: 'A', sourceHandles: [{ id: 'a-s-a'}] } },
  { id: 'b', type: 'VariableB', position: { x: 50, y: 150 }, data: { label: 'B' , sourceHandles: [{ id: 'b-s-a'}] } },
  { id: 'c', type: 'VariableC', position: { x: 50, y: 250 }, data: { label: 'C' , sourceHandles: [{ id: 'c-s-a'}] } },
  { id: 'd', type: 'VariableD', position: { x: 50, y: 350 }, data: { label: 'D' , sourceHandles: [{ id: 'd-s-a'}] } },

  // example target node
  // { id: '10', targetPosition: 'left', position: { x: 250, y: 50 }, data: { label: 'test2' } },
  
  { id: 'x', type: 'VariableX', position: { x: 600, y: 200 }, data: { label: 'X', sourceHandles: [{ id: 'x-s-a'}], targetHandles: [{ id: 'x-t-a' }]  } },

  // test all logic gate nodes
  
  // { id: '11', type: 'NOTGateNode', position: { x: 275, y: 50 }, data: { label: 'test-NOT' } },
  // { id: '12', type: 'ANDGateNode', position: { x: 350, y: 150 }, data: { label: 'test-AND', targetHandles: [{ id: '12-t-a' }, { id: '12-t-b' }], sourceHandles: [{ id: '12-s-a'}] } },
  // { id: '13', type: 'NANDGateNode', position: { x: 275, y: 250 }, data: { label: 'test-NAND' } },
  // { id: '14', type: 'ORGateNode', position: { x: 275, y: 350 }, data: { label: 'test-OR' } },
  // { id: '15', type: 'NORGateNode', position: { x: 275, y: 450 }, data: { label: 'test-NOR' } },
  // { id: '16', type: 'XORGateNode', position: { x: 275, y: 550}, data: { label: 'test-XOR' } },
  // { id: '17', type: 'XNORGateNode', position: { x: 275, y: 650}, data: { label: 'test-XNOR' } },

];

const initialEdges = [];

const nodeTypes = {
  VariableA: VariableA,
  VariableB: VariableB,
  VariableC: VariableC,
  VariableD: VariableD,
  VariableX: VariableX,
  NOTGateNode: NOTGate,
  ANDGateNode: ANDGate,
  NANDGateNode: NANDGate,
  ORGateNode: ORGate,
  NORGateNode: NORGate,
  XORGateNode: XORGate,
  XNORGateNode: XNORGate,
};

const edgeTypes = {
  deleteBtnEdge: ButtonEdge,
}

function generateTargetHandles(numTargets, id) {
  const edgeLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let targetHandles = [];

  for (let i = 0; i < numTargets; i++) {
    targetHandles.push(
      { id: `${id}-t-${edgeLetters[i]}`}
    );
  }

  return targetHandles;
}

export const CircuitBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [selectedGateKey, setSelectedGateKey] = useState('NOT'); // e.g. OR, XOR, XNOR, NOT, etc.

  const elements = document.querySelectorAll('.addLogicGateBtn');

  elements.forEach(element => {
    element.addEventListener('click', () => {
      setSelectedGateKey(element.innerText);
    });
  });

  const onConnect = useCallback(
    (params) => {

      const newEdge = {
        id: `${params.sourceHandle}_${params.targetHandle}`,
        source: params.source,
        sourceHandle: `${params.sourceHandle}`,
        target: params.target,
        targetHandle: `${params.targetHandle}`,
        type: 'deleteBtnEdge',
        animated: true,
      };
      setEdges((eds => [...eds, newEdge]));
      
    }, [setEdges]
  );

  const addNode = useCallback(
    () => {
      setNodes(() => {
        const numTargets = logicGates[selectedGateKey].inputs;
        console.log(numTargets);
        const id = nodes.length + 1;

        const newNode = {
          id: `${selectedGateKey}${nodes.length + 1}`,
          type: `${logicGates[selectedGateKey].type}`,
          position: { x: 150, y: 150 },
          data: { 
            label: `${selectedGateKey}`,
            targetHandles: generateTargetHandles(numTargets, id),
            sourceHandles: [{ id: `${nodes.length + 1}-s-a` }],
          },
        }
        return [...nodes, newNode];
      });
    }, [nodes, setNodes, selectedGateKey]
  );

  const downloadTXT = () => {
    const formattedTXT = edges.map(edge => `${edge.source} -> ${edge.target}`).join('\n');

    const blob = new Blob([formattedTXT], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'logic_circuit.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const downloadJSON = () => {
    const formattedJSON = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([formattedJSON], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'logic_circuit.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh'}}>
      <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            maxzoom={4.0}
            attributionPosition="bottom-left"
            fitView
            fitViewOptions={{ padding: 0.2 }}
      >
        <Controls />
        <MiniMap />
        <Panel position="bottom-center">
          <button 
            onClick={ downloadTXT }
            className="bg-slate-200 hover:bg-slate-300 py-1 px-4 mx-1 text-sm font-black rounded-md hover:shadow-md transition-all ease-in duration-100"
          >
            Generate TXT
          </button>
          <button 
            onClick={ downloadJSON }
            className="bg-slate-200 hover:bg-slate-300 py-1 px-4 mx-1 text-sm font-black rounded-md hover:shadow-md transition-all ease-in duration-100"
          >
            Generate JSON
          </button>
        </Panel>
        <Background />

        <SideBar addNode={ addNode } />
        
      </ReactFlow>
    </div>
    
  );
}