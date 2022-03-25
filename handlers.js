import { todos } from './lib.js';
import { doneList, emptyState } from './elements.js';

export function markAsComplete(id) {
   
    const todoRef = todos.find(todo => todo.id === id);
    todoRef.complete = !todoRef.complete;
    
    showFinished(id);
  }

 export function showFinished(id) {
    const doneTodo = document.querySelector(`li[data-todoid='${id}']`);
    doneTodo.remove();
    doneList.appendChild(doneTodo);
    emptyState.classList.add('empty');
  }
