/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import {
  doneList, emptyState, loader, subHeader, subLine, subP, todoList
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
    renderTodo(result);}
  catch(error) {
    console.log('error');
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
  const button = document.createElement('button');
  li.dataset.todoid = todo.title;
  input.type = 'checkbox';
  input.value = todo.title;
  input.id = todo.id;
  // input.name = todo.id;
  myDiv.className = 'box';
  myDiv.textContent = "\u2714";
  label.htmlFor = todo.id;
  label.textContent = todo.title;
  label.value = todo.title;
  button.ariaLabel = 'remove';
  button.className = 'remove';
  button.value = todo.title;
  button.textContent = 'x';
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
    return result;
  } catch(error) {
    console.log('error');
  } finally {
    console.log('deleted from api');
    subLine.classList.add("fa-solid", "fa-align-center");
    loader.classList.add("hide-loader");

    if (todoList.innerHTML === '' && doneList.innerHTML === '') {
      emptyState.classList.remove('empty');
      subHeader.textContent = 'She done already done had herses!';
      subP.textContent = '';
    }
  }
  

  todoList.dispatchEvent(new CustomEvent('itemsUpdated'));
}
