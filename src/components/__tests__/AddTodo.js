import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import AddTodo from "../AddTodo";

it("renders AddTodo correctly", () => {
  const wrapper = shallow(<AddTodo />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
