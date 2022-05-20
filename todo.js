/* eslint-disable import/extensions */
import { addTodo, todos, deleteTodo } from "./lib.js";
import { mirrorToLocalStorage, restoreFromLocalStorage } from "./utils.js";
import {
  todoForm, todoList, emptyState, getButton, editButton
} from "./elements.js";
import { edit, markAsComplete } from "./handlers.js";
import { getTodo } from "./app.js";

todoForm.addEventListener("submit", addTodo);

// doneList.addEventListener("click", (e) => {
//   if (e.target.matches("button")) {
//     deleteTodo(e.target.value);
//   }
// });

todoList.addEventListener("click", (e) => {
  if (e.target.matches("input[type=checkbox]")) {
    markAsComplete(e.target.value);
    console.log(e.target, e.currentTarget);
  }
  if (e.target.matches("button")) {
    deleteTodo(e.target.value);
  }
  if (e.target.matches("label")) {
    console.log(e.target.value);
    edit(e.target.value);
  }
});

todoList.addEventListener("todosUpdated", mirrorToLocalStorage);

getButton.addEventListener("click", getTodo);

restoreFromLocalStorage();
