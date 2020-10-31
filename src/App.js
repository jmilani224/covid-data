import React, { useState } from 'react'
import Chart from './components/chart.js'
import Main from './components/main.js'
import Sidebar from './components/sideBar.js'
import './App.css';
import SideBar from './components/sideBar.js';

export const theme = {
  color: {
    lightBlue: '#1553b6',
    darkBlue: '#081834',
  }
}

function App() {
  const [state, setState] = useState(['oh', 'nj', 'ny', 'ca', 'nd', 'sd', 'or'])

  return (
      
      <Main>
        <SideBar setState={setState} />
        {state.map(i => <Chart state={i} />)}
      </Main>
  );
}

export default App;
