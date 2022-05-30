/* eslint-disable import/extensions */
import { addTodo, todos, deleteTodo } from "./lib.js";
import { mirrorToLocalStorage, restoreFromLocalStorage } from "./utils.js";
import {
  todoForm, todoList, emptyState, getButton, editButton, modalOuter
} from "./elements.js";
import { edit, markAsComplete, showGottenTodos } from "./handlers.js";
import { getTodo } from "./app.js";

todoForm.addEventListener("submit", addTodo);

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
  if (e.target.matches(".list-span")) {
    console.log(e.target.dataset.todoid);
    edit(e.target.dataset.todoid);
  }
});

todoList.addEventListener("todosUpdated", mirrorToLocalStorage);

getButton.addEventListener("click", showGottenTodos);

modalOuter.addEventListener("click", (e) => {
  const isOutside = !e.target.closest('.modal-inner');
  if(isOutside) {
    modalOuter.classList.remove('open');
  }
})

restoreFromLocalStorage();
