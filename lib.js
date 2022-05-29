/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import {
  emptyState, loader, subHeader, subLine, subP, todoList
} from './elements.js';
import { deleteFromApi, postTodo } from './app.js';

export let todos = [];

export async function addTodo(e) {
  e.preventDefault();
  const title = e.currentTarget.todo.value;
  console.log(title);
  if (!title) return;

  const todo = {
    title,
    id: `${Date.now()}`,
    completed: false,
  };

  todos.push(todo);

  e.target.reset();

  todoList.dispatchEvent(new CustomEvent('todosUpdated'));

  console.log('start posting todo');
  subLine.classList.remove("fa-solid", "fa-align-center");
  loader.classList.remove("hide-loader");

  try {
    const result = await postTodo(todo);
    console.log(result);
    renderTodo(result);
    subHeader.classList.add("info");
    subHeader.textContent = 'todo posted to API';
    setTimeout(() => {
      subHeader.textContent = '';
      subHeader.classList.remove("info");
    }, 3000);
  }
  catch(error) {
    subHeader.classList.add("info");
    subHeader.textContent = 'Something went wrong!';
    setTimeout(() => {
      subHeader.textContent = '';
      subHeader.classList.remove("info");
    }, 3000);
  } 
  finally {
    console.log('finished');
    subLine.classList.add("fa-solid", "fa-align-center");
    loader.classList.add("hide-loader");
  }
}

export function renderTodo(todo) {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const myDiv = document.createElement('div');
  const label = document.createElement('label');
  const mySpan = document.createElement('span');
  const textInput = document.createElement('input');
  const button = document.createElement('button');
  li.dataset.todoid = todo.id;
  input.type = 'checkbox';
  input.value = todo.title;
  input.id = todo.id;
  myDiv.className = 'box';
  myDiv.textContent = "\u2714";
  label.value = todo.id;
  label.dataset.todoid = todo.id;
  mySpan.textContent = todo.title;
  mySpan.dataset.todoid = todo.id;
  mySpan.className = 'list-span';
  textInput.type = 'text';
  textInput.className = 'list-input';
  textInput.dataset.todoid = todo.id;
  textInput.value = todo.title;
  // textInput.id = todo.id;
  button.ariaLabel = 'remove';
  button.className = 'remove';
  button.value = todo.id;
  button.textContent = 'x';
  // newForm.appendChild(textInput);
  // label.appendChild(newForm);
  label.appendChild(mySpan);
  label.appendChild(textInput);
  li.appendChild(input);
  li.appendChild(myDiv);
  li.appendChild(label);
  li.appendChild(button);
  todoList.appendChild(li);
  console.log(todos);
}

export async function deleteTodo(todoId) {
  const deleteLi = document.querySelector(`li[data-todoid='${todoId}']`);
  deleteLi.remove();

  todos = todos.filter((todo) => todoId !== todo.id);

  console.log('deleting todo from api');
  subLine.classList.remove("fa-solid", "fa-align-center");
  loader.classList.remove("hide-loader");

  try {
    const result = await deleteFromApi(todoId);
    subHeader.classList.add("info");
    subHeader.textContent = 'todo deleted from API';
    setTimeout(() => {
      subHeader.textContent = '';
      subHeader.classList.remove("info");
    }, 3000);
    return result;
    
  } catch(error) {
    subHeader.classList.add("info");
    subHeader.textContent = 'Something went wrong!';
    setTimeout(() => {
      subHeader.textContent = '';
      subHeader.classList.remove("info");
    }, 3000);
  } finally {
    subLine.classList.add("fa-solid", "fa-align-center");
    loader.classList.add("hide-loader");
    setTimeout(() => {
      if (todoList.children.length === 0) {
        emptyState.classList.remove('empty');
        subHeader.textContent = 'She done already done had herses!';
        subP.textContent = '';
      }
    }, 3500); 
  }
  

  todoList.dispatchEvent(new CustomEvent('itemsUpdated'));
}
