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
    complete: false,
  };

  todos.push(todo);

  e.target.reset();

  todoList.dispatchEvent(new CustomEvent('todosUpdated'));

  console.log('start posting todo');
  subLine.classList.remove("fa-solid", "fa-align-center");
  loader.classList.remove("hide-loader");

  // postTodo(todo, (error, result) => {
  //   console.log('posting todo');
  //   if(error) {
  //     console.log('Something went wrong!');
  //   } else {
  //     renderTodo(result);
  //   }
  // });

  // postTodo2(todo)
  // .then(result => renderTodo(result))
  // .catch(err => console.log('error'));

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
  // const newForm = document.createElement('form');
  const textInput = document.createElement('input');
  const button = document.createElement('button');
  li.dataset.todoid = todo.title;
  input.type = 'checkbox';
  input.value = todo.title;
  input.id = todo.title;
  // input.name = todo.id;
  myDiv.className = 'box';
  myDiv.textContent = "\u2714";
  // label.htmlFor = todo.title;
  label.textContent = todo.title;
  label.value = todo.title;
  label.dataset.todoid = todo.title;
  // newForm.className = 'list-form';
  // newForm.dataset.todoid = todo.title;
  textInput.type = 'text';
  textInput.className = 'list-input';
  textInput.dataset.todoid = todo.title;
  button.ariaLabel = 'remove';
  button.className = 'remove';
  button.value = todo.title;
  button.textContent = 'x';
  // newForm.appendChild(textInput);
  // label.appendChild(newForm);
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

    if (todoList.innerHTML === '') {
      emptyState.classList.remove('empty');
      subHeader.textContent = 'She done already done had herses!';
      subP.textContent = '';
    }
  }
  

  todoList.dispatchEvent(new CustomEvent('itemsUpdated'));
}
