// @flow
import React from "react";
import { render } from "react-dom";

import App from "./App";
import store from "./store";

const root: HTMLElement = global.window.document.getElementById("root");

render(<App store={store} />, root);
