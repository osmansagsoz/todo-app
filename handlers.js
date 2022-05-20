/* eslint-disable import/extensions */
import { addTodo, todos } from "./lib.js";
import { emptyState, todoForm } from "./elements.js";

export function markAsComplete(title) {
  const todoRef = todos.find((todo) => todo.title === title);
  todoRef.complete = !todoRef.complete;

  // showFinished(title);
}

export function edit(title) {
  const currentLabel = document.querySelector(`label[data-todoid='${title}']`);
  const currentInput = document.querySelector(`input[data-todoid='${title}']`);
  const toUpdate = todos.find((todo) => todo.title === title);
  // const currentInput = currentLabel.firstElementChild;
  currentInput.classList.add("show-input");

  currentInput.addEventListener("blur", () => {
    currentInput.classList.remove("show-input");
  })

  currentInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
    console.log('submitting');
    e.preventDefault();
  const newTitle = e.target.value;
  console.log(e.target, e.currentTarget);
  if (!newTitle) return;

  currentInput.classList.remove("show-input");
  currentLabel.textContent = newTitle;
  currentLabel.dataset.todoid = newTitle;
  currentLabel.value = newTitle;
  currentInput.dataset.todoid = newTitle;
  currentInput.value = newTitle;
  toUpdate.title = newTitle;
}
  })
}

export function updateTodo() {
  const toUpdate = todos.find((todo) => todo.title === title);

}

// export function showFinished(title) {
//   const doneTodo = document.querySelector(`li[data-todoid='${title}']`);
//   doneTodo.remove();
//   doneList.appendChild(doneTodo);
//   emptyState.classList.add("empty");
// }
