import React, {Component, Suspense} from 'react';

import Graph from './Graph';
import Sidebar from './Sidebar'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Suspense fallback={'LOADING...'}>
       <Graph dataUrl="http://js.cytoscape.org/demos/cose-layout/data.json" styleUrl="http://js.cytoscape.org/demos/colajs-graph/cy-style.json">
       <Sidebar />
       </Graph>
       </Suspense>
      </div>
    );
  }
}

export default App;
