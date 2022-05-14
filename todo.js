/* eslint-disable import/extensions */
import { addTodo, todos, deleteTodo } from './lib.js';
import { mirrorToLocalStorage, restoreFromLocalStorage } from './utils.js';
import {
  todoForm, doneList, todoList, emptyState, getButton, editButton
} from './elements.js';
import { markAsComplete } from './handlers.js';
import { getTodo } from './app.js';

todoForm.addEventListener('submit', addTodo);

doneList.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    deleteTodo(e.target.value);
  }
});

todoList.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    deleteTodo(e.target.value);
  }
});

todoList.addEventListener('click', (e) => {
  if (e.target.matches('input[type=radio] + label')) {
    markAsComplete(e.target.value);
  }
  // console.log(e.target);
});

todoList.addEventListener('todosUpdated', mirrorToLocalStorage);

getButton.addEventListener('click', getTodo);

restoreFromLocalStorage();
