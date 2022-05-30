/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
// functions to work with api
import { input, subHeader } from './elements.js';
import { renderTodo, todos } from './lib.js';
import { edit } from './handlers.js';


export async function postTodo(query) {
  const response = await fetch('https://todo-api-for-todos.herokuapp.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: query.title,
      id: query.id,
      completed: false
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    const json = await response.json();
    return json;
}

export async function editTodo(query) {
  const response = await fetch(`https://todo-api-for-todos.herokuapp.com/todos/${query.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: query.title
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    const json = await response.json();
    return json;
}

export async function getTodo() {
  const response = await fetch('https://todo-api-for-todos.herokuapp.com/todos', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
      },)
      const json = await response.json();
      console.log(json);
      return json;
}

export async function deleteFromApi(query) {
  const response = await fetch(`https://todo-api-for-todos.herokuapp.com/todos/${query}`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json;
}
