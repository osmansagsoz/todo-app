/* eslint-disable import/extensions */
import { addTodo, todos } from "./lib.js";
import { emptyState, todoForm, subLine, loader, subHeader } from "./elements.js";
import { editTodo } from "./app.js";

export function markAsComplete(title) {
  const todoRef = todos.find((todo) => todo.title === title);
  todoRef.complete = !todoRef.complete;

  // showFinished(title);
}

export function edit(id) {
  const currentSpan = document.querySelector(`span[data-todoid='${id}']`);
  const currentInput = document.querySelector(`input[data-todoid='${id}']`);
  const currentLabel = document.querySelector(`label[data-todoid='${id}']`);
  // const currentInput = currentLabel.firstElementChild;
  currentInput.classList.add("show-input");

  currentInput.addEventListener("blur", () => {
    currentInput.classList.remove("show-input");
  })

  currentInput.addEventListener('keyup', async (e) => {
          if (e.keyCode === 13) {
          console.log('submitting');
          e.preventDefault();
        const newTitle = e.target.value;
        console.log(e.target, e.currentTarget);
        if (!newTitle) return;

        const toUpdate = todos.find((todo) => todo.id === id);
        toUpdate.title = newTitle;

        currentInput.classList.remove("show-input");
        currentSpan.textContent = newTitle;
        currentSpan.value = newTitle;
        currentInput.value = newTitle;


        subLine.classList.remove("fa-solid", "fa-align-center");
        loader.classList.remove("hide-loader");

        try {
          const result = await editTodo(toUpdate);
          console.log(result);
          subHeader.classList.add("info");
          subHeader.textContent = 'todo edited at API';
          setTimeout(() => {
            subHeader.textContent = '';
            subHeader.classList.remove("info");
          }, 3000);
        } catch(error) {
          subHeader.classList.add("info");
          subHeader.textContent = 'Something went wrong!';
          console.log(error);
          setTimeout(() => {
            subHeader.textContent = '';
            subHeader.classList.remove("info");
          }, 3000);
        } finally {
          subLine.classList.add("fa-solid", "fa-align-center");
          loader.classList.add("hide-loader");
        }
        
      }
  })
}


// export function showFinished(title) {
//   const doneTodo = document.querySelector(`li[data-todoid='${title}']`);
//   doneTodo.remove();
//   doneList.appendChild(doneTodo);
//   emptyState.classList.add("empty");
// }
