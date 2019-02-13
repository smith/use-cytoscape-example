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

// TODO: Don't render every time!
// https://reactjs.org/blog/2018/10/23/react-v-16-6.html
export default Counts;
