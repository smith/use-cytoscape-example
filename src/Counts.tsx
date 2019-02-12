import React, { FunctionComponent, memo } from "react";

export interface CountsProps {
    edgeCount: number,
    nodeCount: number
}

export const Counts: FunctionComponent<CountsProps> = ({ edgeCount, nodeCount}) => {
  return <div>
      {edgeCount} edges<br />
      {nodeCount} nodes
      </div>;
};

export default memo(Counts);
