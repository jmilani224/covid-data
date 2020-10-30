import React, { useState } from 'react'
import Chart from './components/chart.js'
import Main from './components/main.js'
import './App.css';

function App() {
  const [state, setState] = useState('oh')

  return (
      
      <Main>
      <Chart state={state} />
      </Main>
  );
}

export default App;
