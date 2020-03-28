import React from 'react';
import './App.css';
import {sts} from "./data/s";
import {jbs} from "./data/j";
import {ppltn} from "./data/p";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <p>{Object.values(sts)[4]}</p>
          <p>{Object.keys(sts)[1]}</p>
          <p>{jbs[1].agriculture}</p>
          <pre>sts - {JSON.stringify(sts[Object.keys(sts)[0]], null, 2) }</pre>
          <pre>jbs - {JSON.stringify(jbs[0], null, 2) }</pre>
          <pre>ppltn - {JSON.stringify(ppltn[0], null, 2) }</pre>
      </header>
    </div>
  );
}

export default App;
