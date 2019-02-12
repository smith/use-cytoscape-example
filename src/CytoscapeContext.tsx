import { createContext } from 'react'
import cytoscape from 'cytoscape'

const CytoscapeContext = createContext<cytoscape.Core>(cytoscape())

export default CytoscapeContext
