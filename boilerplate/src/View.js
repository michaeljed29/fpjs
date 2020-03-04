import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "ramda";

import {} from "./Update";

const { div, pre, h1 } = hh(h);

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Hello World"),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
