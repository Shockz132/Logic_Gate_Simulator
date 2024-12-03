import { useState } from 'react'
import PropTypes from 'prop-types';

import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export const logicGates = {
  'NOT': {
    name: 'NOT_Gate',
    type: 'NOTGateNode',
    imagePath: '/logic_gates/NOT_Gate.png',
    inputs: 1,
    outputs: 1,
  },
  'AND': {
    name: 'AND_Gate',
    type: 'ANDGateNode',
    imagePath: '/logic_gates/AND_Gate.png',
    inputs: 2,
    outputs: 1,
  },
  'NAND': {
    name: 'NAND_Gate',
    type: 'NANDGateNode',
    imagePath: '/logic_gates/NAND_Gate.png',
    inputs: 2,
    outputs: 1,
  },
  'OR': {
    name: 'OR_Gate',
    type: 'ORGateNode',
    imagePath: '/logic_gates/OR_Gate.png',
    inputs: 2,
    outputs: 1,
  },
  'NOR': {
    name: 'NOR_Gate',
    type: 'NORGateNode',
    imagePath: '/logic_gates/NOR_Gate.png',
    inputs: 2,
    outputs: 1,
  },
  'XOR': {
    name: 'XOR_Gate',
    type: 'XORGateNode',
    imagePath: '/logic_gates/XOR_Gate.png',
    inputs: 2,
    outputs: 1,
  },
  'XNOR': {
    name: 'XNOR_Gate',
    type: 'XNORGateNode',
    imagePath: '/logic_gates/XNOR_Gate.png',
    inputs: 2,
    outputs: 1,
  },
}


export const SideBar = ({ addNode }) => {

  const [sideBarState, setSideBarState] = useState(false);

  function test() {
    setSideBarState(!sideBarState);
  }

  const logicGatesList = Object.keys(logicGates).map((key, index) => {    
    return (
      <li className="col-span-1 rounded-lg bg-gray-100 p-2" key={index}>
        <button onClick={ addNode } className="addLogicGateBtn">
          <img src={logicGates[key].imagePath} alt={logicGates[key].name} />
          <div className="text-center">{key}</div>
        </button>
      </li>
  )});

  // rendering side bar
  if (!sideBarState) {
    return (
      <button onClick={test} id="sideBarBtn" className="absolute top-3 right-3 p-2 bg-slate-300 rounded-lg hover:bg-slate-500 z-10">
        <HamburgerMenuIcon />
      </button>
    )
  }
  else if (sideBarState) {

    return (
      <div className="absolute top-3 right-3 xl:w-[25vw] w-[15vh] bg-slate-300 rounded-lg text-right z-10">
        <button onClick={test} id="sideBarBtn" className="p-2 bg-slate-300 rounded-lg hover:bg-slate-500 z-10">
          <HamburgerMenuIcon />
        </button>
        <ul className="p-4 text-center grid gap-3 xl:grid-cols-2 md:grid-cols-1 max-h-[60vh] overflow-scroll z-10">
          {logicGatesList}
        </ul>
      </div>
    )
  }
}

SideBar.propTypes = {
  addNode: PropTypes.func.isRequired,
};
