/* eslint-disable import/extensions */
import { todos } from "./lib.js";
import { todoList } from "./elements.js";

export function mirrorToLocalStorage() {
  console.info("Saving to localstorage");
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function restoreFromLocalStorage() {
  console.info("Restoring from LS");
  const lsTodos = JSON.parse(localStorage.getItem("todos"));
  if (lsTodos.length) {
    todos.push(...lsTodos);
    todoList.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}
