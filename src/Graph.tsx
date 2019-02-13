import React, { RefObject, useEffect } from "react";

import CytoscapeContext from "./CytoscapeContext";
import cytoscape from "cytoscape";

export interface GraphProps {
  children?: React.ReactNode;
  dataUrl: string;
  styleUrl: string;
}

function useCytoscape() {
  const cyContainer = React.useRef<HTMLDivElement>(null);
  const cy = cytoscape();

  useEffect(() => {
    (cy as any).mount(cyContainer.current);

    return cy.destroy;
  }, []);

  return [cy, cyContainer] as [cytoscape.Core, RefObject<HTMLDivElement>];
}

const Graph: React.FunctionComponent<GraphProps> = ({
  children,
  dataUrl,
  styleUrl
}) => {
  const [cy, cyContainer] = useCytoscape();

  useEffect(() => {
    (async () => {
      const dataResponse = await fetch(dataUrl);
      const elements = await dataResponse.json();
      const styleResponse = await fetch(styleUrl);
      const style = await styleResponse.json();
      cy.json({ elements, style });
    })();
  }, []);

  return (
    <CytoscapeContext.Provider value={cy}>
      <div
        ref={cyContainer}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />
      {children}
    </CytoscapeContext.Provider>
  );
};

export default Graph;
