const todoForm = document.querySelector('.js-form');
const todoList = document.querySelector('.todo-list');

let todos = [];

function addTodo(e) {
    e.preventDefault();
    const name = e.currentTarget.todo.value;
    console.log(name);
    if (!name) return;

    const todo = {
        name,
        id: Date.now(),
        complete: false,
    };

    todos.push(todo);

    e.target.reset();

    todoList.dispatchEvent(new CustomEvent('todosUpdated'));
}

function displayTodos() {
    
}

todoForm.addEventListener('submit', addTodo);