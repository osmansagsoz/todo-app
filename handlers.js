/* eslint-disable import/extensions */
import { addTodo, renderTodo, todos } from "./lib.js";
import { emptyState, todoList, subLine, loader, subHeader, modalOuter, modalInner } from "./elements.js";
import { editTodo, getTodo } from "./app.js";
import { removeFromLocalStorage, showLoaderInModal } from "./utils.js";

export function markAsComplete(id) {
  const todoRef = todos.find((todo) => todo.id === id);
  todoRef.completed = !todoRef.completed;
  console.log(todos);
  todoList.dispatchEvent(new CustomEvent('todosUpdated'));
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
        todoList.dispatchEvent(new CustomEvent('todosUpdated'));
        console.log(todos);

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

export async function showGottenTodos() {
  modalOuter.classList.add("open");
  showLoaderInModal();
  try {
    const result = await getTodo();

    modalInner.innerHTML = `<label for="todo-select">Choose existing todo</label>
    <select name="gottenTodos" id="todo-select">`;
    const selector = document.querySelector("#todo-select");
    const gottenList = result.map(todo => {
      return `<option value="${todo.title}">${todo.title}</option>`;
    });
    selector.innerHTML = gottenList;
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'button-wrapper';
    const addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.textContent = 'Add';
    const doneButton = document.createElement('button');
    doneButton.className = 'done-button';
    doneButton.textContent = 'Done!';
    buttonWrapper.appendChild(addButton);
    buttonWrapper.appendChild(doneButton);
    modalInner.appendChild(buttonWrapper);
    function getSelectValue() {
      const selectedValue = document.getElementById("todo-select").value;
      const selectedTodo = result.find(todo => todo.title === selectedValue);
      addButton.addEventListener('click', (e) => {
        if(e.target.matches(".add-button")) {
          e.preventDefault();
          renderTodo(selectedTodo);
          todos.push(selectedTodo);
          todoList.dispatchEvent(new CustomEvent('todosUpdated'));
          console.log(e.target);
        }
      });
    }
    selector.addEventListener('change', getSelectValue);
    doneButton.addEventListener('click', (e) => {
      if(e.target.matches(".done-button")) {
        e.preventDefault();
        modalOuter.classList.remove("open");
      }
    })
  } catch(error) {
    console.log(error);
    const selector = document.querySelector("#todo-select");
    selector.innerHTML = `<option value="Whopps!">Something went wrong!</option>`;
  }
}