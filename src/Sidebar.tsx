import React, { ChangeEvent, FunctionComponent, lazy, useContext, useEffect, useState } from "react";

import CytoscapeContext from './CytoscapeContext'

const Counts = lazy(()=>import('./Counts'))
export interface SidebarProps {}

export const Sidebar: FunctionComponent<SidebarProps> = props => {
  const [zoom, setZoom] = useState(1)

  const cy = useContext(CytoscapeContext)
  
    cy.minZoom(0.1)
    cy.maxZoom(2)

  useEffect(() => {
    cy.on('zoom', (event) => setZoom(event.cy.zoom()))
    return (() => { cy.off('zoom') })
  }, [])
  
  const handleZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
   cy.zoom((parseFloat(event.currentTarget.value)))
  }
  
  const edgeCount = cy.edges().length
  const nodeCount = cy.nodes().length

return <form className="sidebar">
    <label htmlFor="zoom">Zoom {zoom.toFixed(2)}</label>
    <input type="range" id="padding" max={2} min={0.1} step="any" onChange={handleZoomChange} value={zoom}/>
    <Counts edgeCount={edgeCount} nodeCount={nodeCount} />
  </form>;
};

export default Sidebar;
