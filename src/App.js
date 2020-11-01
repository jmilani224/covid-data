import React, { useState } from 'react'
import Chart from './components/chart.js'
import Main from './components/main.js'
import './App.css';
import SideBar from './components/sideBar.js';

export const theme = {
  color: {
    lightBlue: '#1553b6',
    darkBlue: '#081834',
  }
}

function App() {
  const [states, setStates] = useState(['oh'])

  return (
      
      <Main>
        <SideBar states={states} setStates={setStates} />
        {states.map(i => <Chart states={i} />)}
      </Main>
  );
}

export default App;
