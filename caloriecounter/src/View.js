import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import {
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg,
  deleteMealMsg
} from "./Update";
import * as R from "ramda";

const { pre, div, h1, form, label, input, button, table, tr, td, i } = hh(h);

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
    return form(
      {
        className: "w-100 mv2",
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealMsg);
        }
      },
      [
        fieldSet("Meal", description, e =>
          dispatch(mealInputMsg(e.target.value))
        ),
        fieldSet("Calories", calories || "", e =>
          dispatch(caloriesInputMsg(e.target.value))
        ),
        buttonSet(dispatch)
      ]
    );
  }

  return button(
    {
      className: "f3 pv2 ph3 bg-blue white bn",
      onclick: () => dispatch(showFormMsg(true))
    },
    "Add Meal"
  );
}

function cell(className, value) {
  return td({ className }, value);
}

function tableRow(dispatch, meal) {
  const { id, description, calories } = meal;
  return tr([
    cell("pa2 ba", description),
    cell("pa2 ba", calories.toString()),
    cell("pa2 ba tr", [
      i({
        className: "ph1 fa fa-trash-o pointer",
        onclick: () => dispatch(deleteMealMsg(id))
      }),
      i({
        className: "ph1 fa fa-pencil-square-o pointer",
        onclick: () => console.log("you clicked edit")
      })
    ])
  ]);
}

function tableView(dispatch, model) {
  const { meals } = model;

  if (meals.length < 1) {
    return div({ className: "mv3" }, "No items");
  }

  return table({ className: "w-100 mv4 collapse" }, [
    tr([
      cell("pa2 ba", "Meal"),
      cell("pa2 ba", "Calories"),
      cell("pa2 ba", "")
    ]),
    R.map(R.partial(tableRow, [dispatch]), meals),
    tr([
      cell("pa2 ba", "TOTAL"),
      cell(
        "pa2 ba",
        R.pipe(
          R.map(meal => meal.calories),
          R.sum
        )(meals)
      ),
      cell("pa2 ba", "")
    ])
  ]);
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Calorie Counter"),
    formView(dispatch, model),
    tableView(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
