import * as R from "ramda";

const MSGS = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT",
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_MEAL: "DELETE_MEAL"
};

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm
  };
}

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id
  };
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description
  };
}

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories
  };
}

function addMeal(model) {
  const { description, calories } = model;
  const meal = { id: Math.random().toString(), description, calories };
  const meals = [...model.meals, meal];
  return { ...model, meals, description: "", calories: 0, showForm: false };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: "", calories: 0 };
    }
    case MSGS.MEAL_INPUT: {
      const { description } = msg;
      return { ...model, description };
    }
    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(parseInt, R.defaultTo(0))(msg.calories);
      return { ...model, calories };
    }
    case MSGS.SAVE_MEAL: {
      return addMeal(model);
    }
    case MSGS.DELETE_MEAL: {
      const { id } = msg;
      const meals = R.filter(meal => meal.id != id, model.meals);
      return { ...model, meals };
    }
  }
  return model;
}

export default update;
