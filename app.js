/* eslint-disable import/prefer-default-export */
// functions to work with api
import { input } from './elements.js';
import { renderTodo, todos } from './lib.js';

export function postTodo(query) {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      id: query.id,
      title: query.title,
      completed: false,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function editTodo() {
  // this is not working right now cause i had an issue with editing the existing li and label. I've googled but couldn't find the solution. planning to ask you on tuesday :)
  fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'PATCH',
    body: JSON.stringify({
      title: 'foo',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function getTodo() {
  const query = input.value;
  fetch(`https://jsonplaceholder.typicode.com/todos/${query}`)
    .then((response) => response.json())
    .then((json) => {
      renderTodo(json);
      todos.push(json);
      input.value = '';
    });
}

export function deleteFromApi(query) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${query}`, {
    method: 'DELETE',
  });
  console.log('deleted from api');
}
