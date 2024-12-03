import { CircuitBuilder } from './components/CircuitBuilder.jsx'
import { ReactFlowProvider } from '@xyflow/react';
import './App.css'

function App() {

  return (
    <>
      <div className="w-[100vw] h-[100vh]">
        <ReactFlowProvider>
          <CircuitBuilder />
        </ReactFlowProvider>
      </div>
    </>
  )
}

export default App
