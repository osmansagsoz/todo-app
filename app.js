/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
// functions to work with api
import { input } from './elements.js';
import { renderTodo, todos } from './lib.js';

// export function postTodo(query, callback) {
//   fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: query.title,
//       userId: 1,
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => callback(null, json))
//     .catch((error) => callback(error, null));
// }

// export function postTodo2(query) {
//   return fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: query.title,
//       userId: 1,
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then((response) => response.json())

    
// }

export async function postTodo(query) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: query.title,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    const json = await response.json();
    return json;
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
  // for getting a new todo you need to enter a number between 1-200 in input and click get todo button cause api works with id
  const query = input.value;
  fetch(`https://jsonplaceholder.typicode.com/todos/${query}`)
    .then((response) => response.json())
    .then((json) => {
      renderTodo(json);
      todos.push(json);
      input.value = '';
    });
}

export async function deleteFromApi(query) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${query}`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json;
}
