import { todoList } from "./elements.js";
import { doneList, emptyState, subHeader, subP } from "./elements.js";

export let todos = [];

export function addTodo(e) {
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

export function renderTodo(todo) {
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
    console.log(todos);
}
export function deleteTodo(todoId) {
    const deleteLi = document.querySelector(`li[data-todoid='${todoId}']`);
    deleteLi.remove();

    todos = todos.filter((todo) => todoId !== todo.id);
    if (todoList.innerHTML === '' && doneList.innerHTML === '') {
       emptyState.classList.remove('empty');
       subHeader.textContent = 'She done already done had herses!';
        subP.textContent = '';
     }
     todoList.dispatchEvent(new CustomEvent('itemsUpdated'));
}