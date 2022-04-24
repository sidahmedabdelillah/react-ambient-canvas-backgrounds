import React from "react";
import { render } from "@testing-library/react";

import PipeLines from "../components/PipeLines";
import { PipeLineProps } from "../components/PipeLines/PipeLines";

describe("pipeLines-component", () => {
  let props: PipeLineProps;

  beforeEach(() => {
    props = {
      containerClass: 'test-class'
    };
  });

  const renderComponent = () => render(<PipeLines {...props} />);

  it("should have rendered", () => {
    const { getByTestId } = renderComponent();

    const testComponent = getByTestId("pipe-lines-test");

  });

});
