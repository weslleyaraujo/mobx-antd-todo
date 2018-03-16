import React from "react";
import store from "./store";
import App from "./App";

it("renders App correctly", () => {
  const wrapper = shallow(<App store={store} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
