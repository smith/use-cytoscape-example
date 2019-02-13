// TODO: Code split these
// https://reactjs.org/blog/2018/10/23/react-v-16-6.html
import Graph from "./Graph";
import React from "react";
import Sidebar from "./Sidebar";

const Profiler = (React as any).unstable_Profiler;
// TODO: Ensure we aren't using any outdated APIs
//  https://reactjs.org/blog/2018/03/29/react-v-16-3.html
// TODO: Add some profiling
// https://reactjs.org/blog/2018/05/23/react-v-16-4.html
// https://github.com/bvaughn/rfcs/blob/profiler/text/0000-profiler.md#detailed-design
class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Profiler onRender={(...args: any) => console.log("onRender", args)}>
          <div className="App">
            <Graph
              dataUrl="http://js.cytoscape.org/demos/cose-layout/data.json"
              styleUrl="http://js.cytoscape.org/demos/colajs-graph/cy-style.json"
            >
              <Sidebar />
            </Graph>
          </div>
        </Profiler>
      </React.StrictMode>
    );
  }
}

export default App;
