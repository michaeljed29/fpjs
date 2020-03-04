import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let virtualNode = createElement(currentView);
  node.appendChild(virtualNode);

  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    virtualNode = patch(virtualNode, patches);
    // node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

export default app;
