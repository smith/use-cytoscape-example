/// <reference types="react-scripts" />
import * as React from "react";
import * as cytoscape from "cytoscape";

declare module "cytoscape" {
  export interface Core {
    mount(element: ELement): cytoscape.Core;
  }
  export default cytoscape;
}

declare module "scheduler/tracing";

declare module "react" {
  export const unstable_Profiler: any;
  export default React;
}
