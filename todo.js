const todoForm = document.querySelector('.js-form');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('#todo');

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
    input.value = todo.name;
    input.id = todo.id;
    input.name = todo.id;
    label.htmlFor = todo.id;
    label.textContent = todo.name;
    button.ariaLabel = 'remove';
    button.className = 'remove';
    button.textContent = 'x';
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(button);
    todoList.appendChild(li);
}

function deleteTodo(todoId) {
    const deleteLi = document.querySelector(`li[data-todoid='${todoId}']`);
    console.log('deleting', deleteLi);

    deleteLi.remove();

    todos = todos.filter((todo) => todoId !== todo.id);
    
}

todoForm.addEventListener('submit', addTodo);

