import { Handle, Position } from '@xyflow/react';

export const VariableA = (data) => {

  return (
    <>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <strong>A</strong>
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const VariableB = (data) => {

  return (
    <>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <strong>B</strong>
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const VariableC = (data) => {

  return (
    <>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <strong>C</strong>
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const VariableD = (data) => {

  return (
    <>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <strong>D</strong>
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const VariableX = (data) => {

  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <strong>X</strong>
      </div>
    </>
  );
};

export const NOTGate = (data) => {

  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <img src="/logic_gates/NOT_Gate.png" alt="NOT-GATE" width={'100px'} />
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const ANDGate = (data) => {

  console.log(data.data);

  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <img src="/logic_gates/AND_Gate.png" alt="AND-GATE" width={'100px'} />
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const NANDGate = (data) => {

  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <img src="/logic_gates/NAND_Gate.png" alt="NAND-GATE" width={'100px'} />
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const ORGate = (data) => {

  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <img src="/logic_gates/OR_Gate.png" alt="OR-GATE" width={'100px'} />
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const NORGate = (data) => {

  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <img src="/logic_gates/NOR_Gate.png" alt="NOR-GATE" width={'100px'} />
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const XORGate = (data) => {
  
  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <img src="/logic_gates/XOR_Gate.png" alt="XOR-GATE" width={'100px'} />
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};

export const XNORGate = (data) => {
  
  return (
    <>
      <div className="handles targets customHandles">
        {data.data.targetHandles?.map((handle) => (
          <Handle
            type="target"
            key={handle.id}
            id={handle.id}
            position={Position.Left}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
      <div className="w-fit h-fit text-center p-2 bg-gray-100">
        <img src="/logic_gates/XNOR_Gate.png" alt="XNOR-GATE" width={'100px'} />
      </div>
      <div className="handles sources customHandles">
        {data.data.sourceHandles?.map((handle) => (
          <Handle
            type="source"
            key={handle.id}
            id={handle.id}
            position={Position.Right}
            style={{ background: 'black' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={true}
          />
        ))}
      </div>
    </>
  );
};