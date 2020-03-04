import * as R from "ramda";

const MSGS = {
  TODO_INPUT: "TODO_INPUT",
  ADD_TODO: "ADD_TODO"
};

export function todoInputMsg(todo) {
  return {
    type: MSGS.TODO_INPUT,
    todo
  };
}

export const addTodoMsg = { type: MSGS.ADD_TODO };

function update(msg, model) {
  switch (msg.type) {
    case MSGS.TODO_INPUT: {
      return { ...model, todo: msg.todo };
    }
    case MSGS.ADD_TODO: {
      return {
        ...model,
        todoList: model.todoList.concat(model.todo),
        todo: ""
      };
    }
  }

  return model;
}

export default update;
