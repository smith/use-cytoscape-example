import React from "react";

export interface CountsProps {
  edgeCount: number;
  nodeCount: number;
}

export const Counts: React.FunctionComponent<CountsProps> = ({
  edgeCount,
  nodeCount
}) => {
  return (
    <>
      <p>{edgeCount} edges</p>
      <p>{nodeCount} nodes</p>
    </>
  );
};

export default React.memo(Counts);
