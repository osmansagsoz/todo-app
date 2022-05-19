/* eslint-disable import/extensions */
import { todos } from "./lib.js";
import { doneList, emptyState } from "./elements.js";

export function markAsComplete(title) {
  const todoRef = todos.find((todo) => todo.title === title);
  todoRef.complete = !todoRef.complete;

  showFinished(title);
}

export function showFinished(title) {
  const doneTodo = document.querySelector(`li[data-todoid='${title}']`);
  doneTodo.remove();
  doneList.appendChild(doneTodo);
  emptyState.classList.add("empty");
}
