/* eslint-disable import/extensions */
import { renderTodo, todos } from "./lib.js";
import { modalInner, todoList } from "./elements.js";

export function mirrorToLocalStorage() {
  console.info("Saving to localstorage");
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function restoreFromLocalStorage() {
  console.info("Restoring from LS");
  const lsTodos = JSON.parse(localStorage.getItem("todos"));
  // if (lsTodos.length) {
  //   todos.push(...lsTodos);
  //   todos.map(todo => renderTodo(todo));
  // }
  if(lsTodos !== null) {
    todos.push(...lsTodos);
    todos.map(todo => renderTodo(todo));

    const ticks = document.querySelectorAll("input[type=checkbox]");
    ticks.forEach(box => {
      const completedTodos = todos.filter(todo => todo.completed === true);
      if(completedTodos.map(todo => todo.id).includes(box.id)) {
        box.checked = true;
      }
    });
  }
}

export function removeFromLocalStorage(id) {
  console.log('Removing from ls');
  const lsTodos = JSON.parse(localStorage.getItem("todos"));
  console.log(lsTodos);
  const toBeRemoved = lsTodos.find(todo => (todo.id).toString() === id);
  console.log(toBeRemoved);
  localStorage.removeItem(toBeRemoved);
  console.log('c');
}

export function showLoaderInModal() {
  modalInner.innerHTML = `<div class="loader">
    <div class="circle"></div>
    <div class="circle"></div>
  </div>`;
}
