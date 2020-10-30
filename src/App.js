import React, { useState } from 'react'
import Chart from './components/chart.js'
import Main from './components/main.js'
import './App.css';

function App() {
  const [state, setState] = useState(['oh', 'ca', 'nd', 'sd', 'or'])

  return (
      
      <Main>
        {state.map(i => <Chart state={i} />)}
      </Main>
  );
}

export default App;
