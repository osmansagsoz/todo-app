/* eslint-disable import/extensions */
import {
  doneList, emptyState, subHeader, subP, todoList
} from './elements.js';
import { deleteFromApi, postTodo } from './app.js';

export let todos = [];

export function addTodo(e) {
  e.preventDefault();
  const title = e.currentTarget.todo.value;
  console.log(title);
  if (!title) return;

  const todo = {
    title,
    id: `${Date.now()}`,
    complete: false,
  };

  todos.push(todo);

  e.target.reset();

  todoList.dispatchEvent(new CustomEvent('todosUpdated'));

  renderTodo(todo);

  postTodo(todo);
}

export function renderTodo(todo) {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const button = document.createElement('button');
  li.dataset.todoid = todo.id;
  input.type = 'radio';
  input.value = todo.id;
  input.id = todo.id;
  // input.name = todo.id;
  label.htmlFor = todo.id;
  label.textContent = todo.title;
  label.value = todo.id;
  button.ariaLabel = 'remove';
  button.className = 'remove';
  button.value = todo.id;
  button.textContent = 'x';
  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(button);
  todoList.appendChild(li);
  console.log(todos);
}
export function deleteTodo(todoId) {
  const deleteLi = document.querySelector(`li[data-todoid='${todoId}']`);
  deleteLi.remove();

  todos = todos.filter((todo) => todoId !== todo.id);

  deleteFromApi(todoId);

  if (todoList.innerHTML === '' && doneList.innerHTML === '') {
    emptyState.classList.remove('empty');
    subHeader.textContent = 'She done already done had herses!';
    subP.textContent = '';
  }
  todoList.dispatchEvent(new CustomEvent('itemsUpdated'));
}
