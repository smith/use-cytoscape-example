import CytoscapeContext from "./CytoscapeContext";
import React from "react";
import { unstable_trace as trace } from "scheduler/tracing";

const Counts = React.lazy(() => import("./Counts"));

export class Sidebar extends React.Component {
  static contextType = CytoscapeContext;

  state = {
    zoom: 1
  };

  // TODO: Put side-effect logic all in once place
  // https://reactjs.org/blog/2019/02/06/react-v16.8.0.html
  componentDidMount() {
    const cy = this.context;
    cy.minZoom(0.1);
    cy.maxZoom(2);

    cy.on("zoom", (event: cytoscape.EventObject) =>
      trace("zoom event", performance.now(), () => {
        this.setState({ zoom: event.cy.zoom() });
      })
    );
  }
  componentWillUnmount() {
    const cy = this.context;
    cy.off("zoom");
  }

  render() {
    const cy = this.context;
    const { zoom } = this.state;

    const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      trace("handleZoomChange", performance.now(), () => {
        cy.zoom(parseFloat(event.currentTarget.value));
      });
    };

    const edgeCount = cy.edges().length;
    const nodeCount = cy.nodes().length;
    const minZoom = cy.minZoom();
    const maxZoom = cy.maxZoom();

    return (
      <form className="sidebar">
        <label htmlFor="zoom">Zoom {zoom.toFixed(2)}</label>
        <br />
        <input
          type="range"
          id="zoom"
          max={maxZoom}
          min={minZoom}
          step="any"
          onChange={handleZoomChange}
          value={zoom}
        />
        <Counts edgeCount={edgeCount} nodeCount={nodeCount} />
      </form>
    );
  }
}

export default Sidebar;
