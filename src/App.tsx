import React from "react";

const Graph = React.lazy(() => import("./Graph"));
const Sidebar = React.lazy(() => import("./Sidebar"));

const Profiler = React.unstable_Profiler;

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Profiler id="App" onRender={() => {}}>
          <div className="App">
            <React.Suspense
              fallback={
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
              }
            >
              <Graph
                dataUrl="http://js.cytoscape.org/demos/cose-layout/data.json"
                styleUrl="http://js.cytoscape.org/demos/colajs-graph/cy-style.json"
              >
                <Sidebar />
              </Graph>
            </React.Suspense>
          </div>
        </Profiler>
      </React.StrictMode>
    );
  }
}

export default App;
