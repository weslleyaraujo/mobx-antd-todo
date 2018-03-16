import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Todos from "../Todos";

it("renders Todos correctly", () => {
  const wrapper = shallow(<Todos />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
