import React from "react";
import cytoscape from "cytoscape";

export const CytoscapeContext = React.createContext<cytoscape.Core>(
  cytoscape()
);

export default CytoscapeContext;
