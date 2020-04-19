import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import { showFormMsg, mealInputMsg, caloriesInputMsg } from "./Update";

const { pre, div, h1, form, label, input, button } = hh(h);

function fieldSet(textLabel, inputValue, oninput) {
  return div({ className: "mv3" }, [
    label(textLabel),
    input({ className: "pa2 w-100", type: "text", value: inputValue, oninput })
  ]);
}

function buttonSet(dispatch) {
  return div([
    button(
      { className: "f3 pv2 ph3 bg-blue white bn mr2", type: "submit" },
      "Save"
    ),
    button(
      {
        className: "f3 pv2 ph3 bg-light-gray dim bn",
        type: "button",
        onclick: () => dispatch(showFormMsg(false))
      },
      "Cancel"
    )
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;

  if (showForm) {
    return form({ className: "w-100 mv2" }, [
      fieldSet("Meal", description, e =>
        dispatch(mealInputMsg(e.target.value))
      ),
      fieldSet("Calories", calories || "", e =>
        dispatch(caloriesInputMsg(e.target.value))
      ),
      buttonSet(dispatch)
    ]);
  }

  return button(
    {
      className: "f3 pv2 ph3 bg-blue white bn",
      onclick: () => dispatch(showFormMsg(true))
    },
    "Add Meal"
  );
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Calorie Counter"),
    formView(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
