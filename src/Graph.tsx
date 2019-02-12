import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import CytoscapeContext from './CytoscapeContext'
import cytoscape from "cytoscape";

export interface GraphProps {
    children?: React.ReactNode
    dataUrl: string,
    styleUrl: string
}

export const Graph: FunctionComponent<GraphProps> = ({ children, dataUrl, styleUrl}) => {
    const cy = cytoscape({
        layout: { animate: true,
      name: "cose", randomize: true },
      });
    const cyRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        (cy as any).mount(cyRef.current)
        return cy.destroy
    }, [])

    useEffect(() => {

        (async () =>{
        const dataResponse = await fetch(dataUrl)
        const data = await dataResponse.json()
        const styleResponse = await fetch(styleUrl)
        const style = await styleResponse.json()
        
        cy.json({ elements: Object.values(data), style })
      })
    }, [])

  return <CytoscapeContext.Provider value={cy}><div ref={cyRef} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} />{children}</CytoscapeContext.Provider>;
};

export default (Graph);
