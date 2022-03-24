const todoForm = document.querySelector('.js-form');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('#todo');
const doneList = document.querySelector('.todo-list-done');
const emptyState = document.querySelector('.empty-state');
const subHeader = document.querySelector('.sub');
const subP = document.querySelector('.subP');

let todos = [];

function addTodo(e) {
    e.preventDefault();
    const name = e.currentTarget.todo.value;
    console.log(name);
    if (!name) return;

    const todo = {
        name,
        id: `${Date.now()}`,
        complete: false,
    };

    todos.push(todo);

    e.target.reset();

    todoList.dispatchEvent(new CustomEvent('todosUpdated'));

    renderTodo(todo);
}

function renderTodo(todo) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const button = document.createElement('button');
    li.dataset.todoid = todo.id;
    input.type = 'radio';
    // input.value = todo.name;
    input.id = todo.id;
    // input.name = todo.id;
    label.htmlFor = todo.id;
    label.textContent = todo.name;
    label.value = todo.id;
    button.ariaLabel = 'remove';
    button.className = 'remove';
    button.value = todo.id;
    button.textContent = 'x';
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(button);
    todoList.appendChild(li);
}

function markAsComplete(id) {
   
    const todoRef = todos.find(todo => todo.id === id);
    todoRef.complete = !todoRef.complete;
    
    const doneTodo = document.querySelector(`li[data-todoid='${id}']`);
    doneTodo.remove();
    doneList.appendChild(doneTodo);
    emptyState.classList.add('empty');
    todoList.dispatchEvent(new CustomEvent('todosUpdated'));
  }

function deleteTodo(todoId) {
    const deleteLi = document.querySelector(`li[data-todoid='${todoId}']`);
    deleteLi.remove();

    todos = todos.filter((todo) => todoId !== todo.id);
    if (todos.length === 0) {
       emptyState.classList.remove('empty');
       subHeader.textContent = 'She done already done had herses!';
        subP.textContent = '';
     }
     
}

function mirrorToLocalStorage() {
    console.info('Saving to localstorage');
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  function restoreFromLocalStorage() {
    console.info('Restoring from LS');
    const lsTodos = JSON.parse(localStorage.getItem('todos'));
    if (lsTodos.length) {
      todos.push(...lsTodos);
      todoList.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
  }
  

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