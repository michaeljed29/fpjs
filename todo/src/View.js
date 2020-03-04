import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "ramda";

import { addTodoMsg, todoInputMsg } from "./Update";

const { div, pre, h1, form, input, button, ul, li } = hh(h);

function todoForm(dispatch, model) {
  const { todo } = model;
  return form(
    {
      onsubmit: e => {
        e.preventDefault();
        dispatch(addTodoMsg);
      }
    },
    [
      input({
        className: "pa2 input-reset ba w-100 mb2",
        type: "text",
        value: todo,
        oninput: e => dispatch(todoInputMsg(e.target.value))
      }),
      button(
        { className: "f3 pv2 ph3 bg-blue white bn mr2 dim", type: "submit" },
        "Add"
      )
    ]
  );
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Hello World"),
    todoForm(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
