import PropTypes from "prop-types";
import React from "react";
import cytoscape from "cytoscape";

export interface GraphProps {
  children?: React.ReactNode;
  dataUrl: string;
  styleUrl: string;
}

export class Graph extends React.Component<GraphProps> {
  // TODO: Simplify context
  // https://reactjs.org/blog/2018/03/29/react-v-16-3.html
  static childContextTypes = {
    cytoscape: PropTypes.object
  };
  getChildContext() {
    return { cytoscape: this.cy };
  }

  // TODO: Simplify container setting
  // https://reactjs.org/blog/2018/03/29/react-v-16-3.html
  cyContainer: HTMLDivElement | null = null;
  setCyContainer = (element: HTMLDivElement) => {
    this.cyContainer = element;
  };

  // TODO: Put side-effect logic all in once place
  // https://reactjs.org/blog/2019/02/06/react-v16.8.0.html
  cy = cytoscape({
    layout: { name: "random" }
  });
  async componentDidMount() {
    const { cy } = this;
    const { dataUrl, styleUrl } = this.props;

    const dataResponse = await fetch(dataUrl);
    const elements = await dataResponse.json();
    const styleResponse = await fetch(styleUrl);
    const style = await styleResponse.json();

    (cy as any).mount(this.cyContainer);
    cy.json({ elements, style });
  }
  componentWillUnmount() {
    const { cy } = this;
    cy.destroy();
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <div
          ref={this.setCyContainer}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
        {children}
      </>
    );
  }
}

export default Graph;
