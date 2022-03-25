import { addTodo, todos, deleteTodo } from './lib.js';
import { mirrorToLocalStorage, restoreFromLocalStorage } from './utils.js';
import { todoForm, doneList, todoList, emptyState } from './elements.js';
import { markAsComplete } from './handlers.js';



todoForm.addEventListener('submit', addTodo);

doneList.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        deleteTodo(e.target.value);
      }
});

todoList.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        deleteTodo(e.target.value);
      }
});

todoList.addEventListener('click', function(e) {
    if (e.target.matches('input[type=radio] + label')) {
        markAsComplete(e.target.value);
      }
  });

  todoList.addEventListener('todosUpdated', mirrorToLocalStorage);

restoreFromLocalStorage();